import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "dattaniharsh12@gmail.com";

export async function GET() {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get current user and verify admin
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const userEmail = user.emailAddresses.find(email => email.id === user.primaryEmailAddressId)?.emailAddress;
    
    if (userEmail !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Forbidden - Admin access only" }, { status: 403 });
    }

    // Fetch all users from DATABASE instead of Clerk
    console.log("Fetching users from database...");
    const dbUsers = await prisma.user.findMany({
      select: {
        clerkId: true,
        email: true,
        username: true,
        createdAt: true,
        onboarded: true,
        CourseEnrollment: {
          select: {
            courseId: true,
            status: true,
            completedAt: true,
            totalXpEarned: true
          }
        },
        courseProgress: {
          select: {
            courseId: true,
            lessonId: true,
            status: true,
            completedAt: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`Found ${dbUsers.length} users in database`);

    // Fetch ALL verification logs (user queries to AI agents)
    const verificationLogs = await prisma.verificationLog.findMany({
      orderBy: {
        createdAt: 'desc'
      }
      // Removed limit to get all queries
    });

    // Fetch fraud reports
    const fraudReports = await prisma.fraudReport.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Calculate statistics
    const totalUsers = dbUsers.length;
    
    // Count users with any course progress
    const usersWithProgress = dbUsers.filter(user => 
      user.CourseEnrollment.length > 0 || user.courseProgress.length > 0
    ).length;

    // Mock module stats for fraud awareness course
    // In a real implementation, we'd track this properly
    const moduleStats: Record<string, number> = {
      "intro-to-frauds": 0,
      "intermediate-frauds": 0,
      "advanced-frauds": 0,
      "prevention": 0
    };

    // Special case for demo user
    const demoUser = dbUsers.find(u => u.email === "harsh@abhyas.guru");
    if (demoUser) {
      moduleStats["intro-to-frauds"] = 1;
    }

    // Calculate completion rates for each module  
    const moduleCompletionRates = {
      "intro-to-frauds": totalUsers > 0 ? (moduleStats["intro-to-frauds"] || 0) / totalUsers * 100 : 0,
      "intermediate-frauds": totalUsers > 0 ? (moduleStats["intermediate-frauds"] || 0) / totalUsers * 100 : 0,
      "advanced-frauds": totalUsers > 0 ? (moduleStats["advanced-frauds"] || 0) / totalUsers * 100 : 0,
      "prevention": totalUsers > 0 ? (moduleStats["prevention"] || 0) / totalUsers * 100 : 0,
    };

    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentUsers = dbUsers.filter(u => new Date(u.createdAt) > sevenDaysAgo).length;

    // Get user details with progress
    const userProgressList = dbUsers.map((user) => {
      // Mock progress data - in production this would come from actual tracking
      const completedModules: string[] = [];
      const unlockedModules: string[] = ["intro-to-frauds"];
      
      // Special case for demo
      if (user.email === "harsh@abhyas.guru") {
        completedModules.push("intro-to-frauds");
        unlockedModules.push("intermediate-frauds");
      }

      // Calculate progress from course enrollments
      const totalCourses = 4; // Assuming 4 modules in fraud awareness
      const completedCourses = user.CourseEnrollment.filter(e => e.status === "COMPLETED").length;
      const progressFromEnrollments = (completedCourses / totalCourses) * 100;
      
      return {
        id: user.clerkId,
        name: user.username || user.email.split('@')[0] || "Anonymous",
        email: user.email,
        imageUrl: "", // We don't store image URLs in database
        createdAt: user.createdAt.getTime(),
        completedModules,
        unlockedModules,
        progressPercentage: Math.max((completedModules.length / 4) * 100, progressFromEnrollments),
        lastActive: user.createdAt.toISOString(),
      };
    });

    // Sort users by creation date (newest first)
    userProgressList.sort((a, b) => b.createdAt - a.createdAt);

    // Calculate average completion rate
    const avgCompletionRate = userProgressList.length > 0 
      ? userProgressList.reduce((acc, user) => acc + user.progressPercentage, 0) / userProgressList.length
      : 0;

    // Process verification logs for statistics
    const totalQueries = verificationLogs.length;
    const queriesLast7Days = verificationLogs.filter(
      log => new Date(log.createdAt) > sevenDaysAgo
    ).length;

    // Group queries by type (agent type)
    const queryTypes = verificationLogs.reduce((acc, log) => {
      const agentType = log.searchType || 'unknown';
      acc[agentType] = (acc[agentType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate queries by agent for display
    const agentQueryBreakdown = {
      'deepfake': queryTypes['deepfake'] || queryTypes['video'] || 0,
      'social': queryTypes['social'] || queryTypes['social-media'] || 0,
      'announcement': queryTypes['announcement'] || queryTypes['corporate'] || 0,
      'sebi-query': queryTypes['sebi-query'] || queryTypes['sebi'] || queryTypes['registry'] || 0,
      'advisor-verifier': queryTypes['advisor-verifier'] || queryTypes['advisor'] || 0,
      'other': queryTypes['other'] || queryTypes['unknown'] || 0
    };

    // Process fraud reports
    const totalReports = fraudReports.length;
    const pendingReports = fraudReports.filter(r => r.status === 'pending').length;
    const verifiedReports = fraudReports.filter(r => r.status === 'verified').length;
    const reportedToSEBI = fraudReports.filter(r => r.sebiReported).length;

    // Get top fraud types
    const fraudTypeStats = fraudReports.reduce((acc, report) => {
      acc[report.fraudType] = (acc[report.fraudType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const dashboardData = {
      stats: {
        totalUsers,
        activeUsers: usersWithProgress,
        avgCompletionRate: avgCompletionRate.toFixed(1),
        recentActivity: recentUsers,
        totalQueries,
        queriesLast7Days,
        totalReports,
        pendingReports,
      },
      moduleCompletionRates,
      userProgress: userProgressList,
      recentUpdates: userProgressList
        .filter(user => new Date(user.createdAt) > sevenDaysAgo)
        .slice(0, 10),
      verificationLogs: verificationLogs.slice(0, 50).map(log => ({
        id: log.id,
        query: log.searchQuery,
        type: log.searchType,
        found: log.found,
        riskScore: log.riskScore,
        legitimacyStatus: log.legitimacyStatus,
        createdAt: log.createdAt.toISOString(),
      })),
      fraudReports: fraudReports.slice(0, 10).map(report => ({
        id: report.id,
        reportId: report.reportId,
        entityName: report.entityName,
        fraudType: report.fraudType,
        riskScore: report.riskScore,
        status: report.status,
        sebiReported: report.sebiReported,
        createdAt: report.createdAt.toISOString(),
      })),
      queryTypes,
      agentQueryBreakdown,
      fraudTypeStats,
      reportStats: {
        total: totalReports,
        pending: pendingReports,
        verified: verifiedReports,
        reportedToSEBI,
      },
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("Admin dashboard error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
