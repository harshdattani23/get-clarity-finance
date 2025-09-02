const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    console.log('Checking users in database...\n');
    
    // Count total users
    const userCount = await prisma.user.count();
    console.log(`Total users in database: ${userCount}`);
    
    // Get all users
    const users = await prisma.user.findMany({
      select: {
        clerkId: true,
        email: true,
        username: true,
        createdAt: true,
        onboarded: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    console.log('\nUser details:');
    console.log('-------------------');
    users.forEach((user, index) => {
      console.log(`${index + 1}. Email: ${user.email}`);
      console.log(`   Clerk ID: ${user.clerkId}`);
      console.log(`   Username: ${user.username || 'N/A'}`);
      console.log(`   Created: ${user.createdAt.toLocaleDateString()}`);
      console.log(`   Onboarded: ${user.onboarded}`);
      console.log('');
    });
    
    // Check for any course enrollments
    const enrollmentCount = await prisma.courseEnrollment.count();
    console.log(`Total course enrollments: ${enrollmentCount}`);
    
    // Check for course progress
    const progressCount = await prisma.courseProgress.count();
    console.log(`Total course progress records: ${progressCount}`);
    
  } catch (error) {
    console.error('Error checking users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
