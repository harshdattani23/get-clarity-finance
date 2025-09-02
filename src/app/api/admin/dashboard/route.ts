import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

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

    // Fetch all users from Clerk
    console.log("Fetching users from Clerk...");
    
    try {
      // First, try to get users without pagination to see the total count
      const initialResponse = await clerk.users.getUserList({ limit: 500 });
      console.log(`Initial fetch - received ${initialResponse.data.length} users`);
      console.log(`Total count from API: ${initialResponse.totalCount}`);
      
      let allUsers = [...initialResponse.data];
      
      // If there might be more users, fetch them
      if (initialResponse.totalCount > 500) {
        const remaining = initialResponse.totalCount - 500;
        const additionalResponse = await clerk.users.getUserList({ 
          limit: remaining,
          offset: 500 
        });
        allUsers.push(...additionalResponse.data);
        console.log(`Additional fetch - received ${additionalResponse.data.length} more users`);
      }
      
      console.log(`Total users fetched: ${allUsers.length}`);
      
      const users = {
        data: allUsers,
        totalCount: initialResponse.totalCount || allUsers.length
      };
      
      // Log first few users to debug
      console.log("Sample users:", allUsers.slice(0, 3).map(u => ({
        id: u.id,
        email: u.emailAddresses?.[0]?.emailAddress,
        firstName: u.firstName,
        lastName: u.lastName
      })));
      
      // Since we don't have a database table yet, we'll create mock progress data
      // In production, this would come from the database
      const moduleCompletions: any[] = [];

      // Calculate statistics
      const totalUsers = users.totalCount;
      const usersWithProgress = moduleCompletions.length;
      
      // Module completion stats (mock data for now)
      const moduleStats: Record<string, number> = {
      "intro-to-frauds": 0,
      "intermediate-frauds": 0,
      "advanced-frauds": 0,
      "prevention": 0
      };

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
      
      const recentCompletions = 0; // Will be populated when we have real data

      // Get user details with progress
      const userProgressList = users.data.map((user) => {
      const userEmail = user.emailAddresses.find(
        email => email.id === user.primaryEmailAddressId
      )?.emailAddress || "No email";
      
      // Mock progress data - in production this would come from database
      const completedModules: string[] = [];
      const unlockedModules: string[] = ["intro-to-frauds"];
      
      // Special case for demo
      if (userEmail === "harsh@abhyas.guru") {
        completedModules.push("intro-to-frauds");
        unlockedModules.push("intermediate-frauds");
      }
      
      return {
        id: user.id,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Anonymous",
        email: userEmail,
        imageUrl: user.imageUrl,
        createdAt: user.createdAt,
        completedModules,
        unlockedModules,
        progressPercentage: (completedModules.length / 4) * 100, // Assuming 4 total modules
        lastActive: user.createdAt,
      };
      });

      // Sort users by activity
      userProgressList.sort((a, b) =>
      new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
      );

      // Calculate average completion rate
      const avgCompletionRate = userProgressList.length > 0
      ? userProgressList.reduce((acc, user) => acc + user.progressPercentage, 0) / userProgressList.length
        : 0;

      const dashboardData = {
      stats: {
        totalUsers,
        activeUsers: usersWithProgress,
        avgCompletionRate: avgCompletionRate.toFixed(1),
        recentActivity: recentCompletions,
      },
      moduleCompletionRates,
      userProgress: userProgressList,
      recentUpdates: userProgressList
        .filter(user => new Date(user.lastActive) > sevenDaysAgo)
        .slice(0, 10),
      };

      return NextResponse.json(dashboardData);
    } catch (userFetchError) {
      console.error("Error fetching users:", userFetchError);
      throw userFetchError;
    }
  } catch (error) {
    console.error("Admin dashboard error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
