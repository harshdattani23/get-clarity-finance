import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET() {
  try {
    console.log('Testing Clerk user fetching...\n');
    
    const clerk = await clerkClient();
    
    // Try different approaches to get users
    console.log('Approach 1: Default getUserList');
    const response1 = await clerk.users.getUserList();
    console.log(`- Received ${response1.data.length} users`);
    console.log(`- Total count: ${response1.totalCount}`);
    
    console.log('\nApproach 2: With explicit limit');
    const response2 = await clerk.users.getUserList({ limit: 100 });
    console.log(`- Received ${response2.data.length} users`);
    console.log(`- Total count: ${response2.totalCount}`);
    
    const userDetails = response2.data.map((user, index) => {
      const email = user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress;
      return {
        index: index + 1,
        id: user.id,
        email: email || 'no email',
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Anonymous',
        createdAt: new Date(user.createdAt).toLocaleDateString()
      };
    });
    
    // Try to get specific users by their Clerk IDs from database
    const userIds = [
      'user_31oXOI2jdxMUR6t2Ctb1ZXbtZLy',
      'user_31VpRE3cFF5l6TzY6yqCAIOa8fj', 
      'user_31BnCG7yGEhIEwv8ygvU65wUyZ4',
      'user_31BidNlhpr7CepFGpSmLqZc1zWm'
    ];
    
    const specificUserChecks = [];
    for (const userId of userIds) {
      try {
        const user = await clerk.users.getUser(userId);
        const email = user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress;
        specificUserChecks.push({
          userId,
          found: true,
          email
        });
      } catch (error) {
        specificUserChecks.push({
          userId,
          found: false,
          error: 'User not found in Clerk'
        });
      }
    }
    
    return NextResponse.json({
      approach1: {
        count: response1.data.length,
        totalCount: response1.totalCount
      },
      approach2: {
        count: response2.data.length,
        totalCount: response2.totalCount
      },
      users: userDetails,
      specificUserChecks
    });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch users',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
