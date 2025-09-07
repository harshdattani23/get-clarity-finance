import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "dattaniharsh12@gmail.com";

export async function GET() {
  try {
    // Check if DATABASE_URL is available
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('dummy')) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }

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

    // Fetch ALL agent queries from the new logging system
    const agentQueries = await prisma.agentQuery.findMany({
      orderBy: {
        createdAt: 'desc'
      }
      // Removed limit to get all queries
    });

    // Fetch suspicious activity reports
    const suspiciousReports = await prisma.fraudReport.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Fetch document analyzer data (file metadata)
    const documentFiles = await prisma.fileMetadata.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        uploadedAt: 'desc'
      },
      take: 50 // Limit for dashboard display
    });

    // Fetch file access logs
    const fileAccessLogs = await prisma.fileAccessLog.findMany({
      orderBy: {
        accessedAt: 'desc'
      },
      take: 50 // Recent access logs
    });

    // Calculate statistics
    const totalUsers = dbUsers.length;
    
    // Count users with any course progress
    const usersWithProgress = dbUsers.filter(user => 
      user.CourseEnrollment.length > 0 || user.courseProgress.length > 0
    ).length;

    // Mock module stats for suspicious activity awareness course
    // In a real implementation, we'd track this properly
    const moduleStats: Record<string, number> = {
      "intro-to-suspicious-activity": 0,
      "intermediate-suspicious-activity": 0,
      "advanced-suspicious-activity": 0,
      "prevention": 0
    };

    // Special case for demo user
    const demoUser = dbUsers.find(u => u.email === "harsh@abhyas.guru");
    if (demoUser) {
      moduleStats["intro-to-suspicious-activity"] = 1;
    }

    // Calculate completion rates for each module  
    const moduleCompletionRates = {
      "intro-to-suspicious-activity": totalUsers > 0 ? (moduleStats["intro-to-suspicious-activity"] || 0) / totalUsers * 100 : 0,
      "intermediate-suspicious-activity": totalUsers > 0 ? (moduleStats["intermediate-suspicious-activity"] || 0) / totalUsers * 100 : 0,
      "advanced-suspicious-activity": totalUsers > 0 ? (moduleStats["advanced-suspicious-activity"] || 0) / totalUsers * 100 : 0,
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
      const unlockedModules: string[] = ["intro-to-suspicious-activity"];
      
      // Special case for demo
      if (user.email === "harsh@abhyas.guru") {
        completedModules.push("intro-to-suspicious-activity");
        unlockedModules.push("intermediate-suspicious-activity");
      }

      // Calculate progress from course enrollments
      const totalCourses = 4; // Assuming 4 modules in suspicious activity awareness
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

    // Process agent queries for comprehensive statistics
    const totalAgentQueries = agentQueries.length;
    const agentQueriesLast7Days = agentQueries.filter(
      query => new Date(query.createdAt) > sevenDaysAgo
    ).length;

    // Group agent queries by type
    const agentQueryTypes = agentQueries.reduce((acc, query) => {
      const agentType = query.agentType || 'unknown';
      acc[agentType] = (acc[agentType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate success rate for agent queries
    const successfulQueries = agentQueries.filter(q => q.success).length;
    const successRate = totalAgentQueries > 0 ? (successfulQueries / totalAgentQueries) * 100 : 0;

    // Calculate average execution time
    const queriesWithExecTime = agentQueries.filter(q => q.executionTime);
    const avgExecutionTime = queriesWithExecTime.length > 0 
      ? queriesWithExecTime.reduce((acc, q) => acc + (q.executionTime || 0), 0) / queriesWithExecTime.length
      : 0;

    // Process legacy verification logs for backward compatibility
    const totalLegacyQueries = verificationLogs.length;
    const legacyQueriesLast7Days = verificationLogs.filter(
      log => new Date(log.createdAt) > sevenDaysAgo
    ).length;

    // Group legacy queries by type (agent type)
    const legacyQueryTypes = verificationLogs.reduce((acc, log) => {
      const agentType = log.searchType || 'unknown';
      acc[agentType] = (acc[agentType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate combined queries by agent for display
    const agentQueryBreakdown = {
      'deepfake-detector': (agentQueryTypes['deepfake-detector'] || 0) + (agentQueryTypes['deepfake-detector-v2'] || 0) + (legacyQueryTypes['deepfake'] || legacyQueryTypes['video'] || 0),
      'social-monitor': (agentQueryTypes['social-monitor'] || 0) + (legacyQueryTypes['social'] || legacyQueryTypes['social-media'] || 0),
      'announcement-verifier': (agentQueryTypes['announcement-verifier'] || 0) + (legacyQueryTypes['announcement'] || legacyQueryTypes['corporate'] || 0),
      'sebi-query': (agentQueryTypes['sebi-query'] || 0) + (legacyQueryTypes['sebi-query'] || legacyQueryTypes['sebi'] || legacyQueryTypes['registry'] || 0),
      'advisor-verifier': (agentQueryTypes['advisor-verifier'] || 0) + (legacyQueryTypes['advisor-verifier'] || legacyQueryTypes['advisor'] || 0),
      'document-analyzer': agentQueryTypes['document-analyzer'] || 0,
      'other': (agentQueryTypes['other'] || 0) + (legacyQueryTypes['other'] || legacyQueryTypes['unknown'] || 0)
    };

    // Combine total queries
    const totalQueries = totalAgentQueries + totalLegacyQueries;
    const queriesLast7Days = agentQueriesLast7Days + legacyQueriesLast7Days;

    // Process suspicious activity reports
    const totalReports = suspiciousReports.length;
    const pendingReports = suspiciousReports.filter(r => r.status === 'pending').length;
    const verifiedReports = suspiciousReports.filter(r => r.status === 'verified').length;
    const reportedToSEBI = suspiciousReports.filter(r => r.sebiReported).length;

    // Get top suspicious activity types
    const suspiciousTypeStats = suspiciousReports.reduce((acc, report) => {
      acc[report.fraudType] = (acc[report.fraudType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Process document analyzer data
    const totalFiles = documentFiles.length;
    const filesThisWeek = documentFiles.filter(
      file => new Date(file.uploadedAt) > sevenDaysAgo
    ).length;
    const totalFileSize = documentFiles.reduce((acc, file) => acc + file.fileSize, 0);
    
    // Group files by type
    const fileTypeStats = documentFiles.reduce((acc, file) => {
      const mimeType = file.mimeType;
      const category = mimeType.startsWith('image/') ? 'Images' : 
                      mimeType === 'application/pdf' ? 'PDFs' :
                      mimeType === 'text/plain' ? 'Text Files' : 'Other';
      acc[category] = (acc[category] || 0) + 1;
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
        // New agent query stats
        totalAgentQueries,
        agentQueriesLast7Days,
        successRate: successRate.toFixed(1),
        avgExecutionTime: Math.round(avgExecutionTime),
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
      // Add agent queries to the response
      agentQueries: agentQueries.slice(0, 50).map(query => ({
        id: query.id,
        reportId: query.reportId,
        agentType: query.agentType,
        query: query.query,
        response: query.response ? query.response.substring(0, 500) + '...' : null, // Truncate for display
        success: query.success,
        error: query.error,
        executionTime: query.executionTime,
        userId: query.userId,
        createdAt: query.createdAt.toISOString(),
      })),
      suspiciousReports: suspiciousReports.slice(0, 10).map(report => ({
        id: report.id,
        reportId: report.reportId,
        entityName: report.entityName,
        suspiciousType: report.fraudType,
        riskScore: report.riskScore,
        status: report.status,
        sebiReported: report.sebiReported,
        createdAt: report.createdAt.toISOString(),
      })),
      queryTypes: legacyQueryTypes, // Legacy query types
      agentQueryTypes, // New agent query types
      agentQueryBreakdown,
      suspiciousTypeStats,
      reportStats: {
        total: totalReports,
        pending: pendingReports,
        verified: verifiedReports,
        reportedToSEBI,
      },
      // Document Analyzer Data
      documentFiles: documentFiles.map(file => ({
        id: file.id,
        fileId: file.fileId,
        originalName: file.originalName,
        fileSize: file.fileSize,
        mimeType: file.mimeType,
        uploadedBy: file.uploadedBy,
        uploadedAt: file.uploadedAt.toISOString(),
        analysisReportId: file.analysisReportId,
        accessLevel: file.accessLevel,
        expiresAt: file.expiresAt?.toISOString(),
      })),
      fileAccessLogs: fileAccessLogs.map(log => ({
        id: log.id,
        fileId: log.fileId,
        accessedBy: log.accessedBy,
        accessedAt: log.accessedAt.toISOString(),
        accessType: log.accessType,
      })),
      fileStats: {
        totalFiles,
        filesThisWeek,
        totalSizeMB: Math.round(totalFileSize / (1024 * 1024) * 100) / 100,
        fileTypeStats,
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
