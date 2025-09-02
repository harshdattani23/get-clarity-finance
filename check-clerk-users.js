import { clerkClient } from "@clerk/nextjs/server";

async function checkClerkUsers() {
  try {
    console.log('Fetching users from Clerk...\n');
    
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
    
    console.log('\nUser details from Clerk:');
    console.log('------------------------');
    response2.data.forEach((user, index) => {
      const email = user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress;
      console.log(`${index + 1}. ${user.firstName || ''} ${user.lastName || ''} (${email || 'no email'})`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Created: ${new Date(user.createdAt).toLocaleDateString()}`);
    });
    
    // Try to get specific users by their Clerk IDs from database
    console.log('\n\nChecking specific users by ID:');
    const userIds = [
      'user_31oXOI2jdxMUR6t2Ctb1ZXbtZLy',
      'user_31VpRE3cFF5l6TzY6yqCAIOa8fj',
      'user_31BnCG7yGEhIEwv8ygvU65wUyZ4',
      'user_31BidNlhpr7CepFGpSmLqZc1zWm'
    ];
    
    for (const userId of userIds) {
      try {
        const user = await clerk.users.getUser(userId);
        const email = user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress;
        console.log(`✓ Found: ${email}`);
      } catch (error) {
        console.log(`✗ Not found: ${userId}`);
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

checkClerkUsers();
