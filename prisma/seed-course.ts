import { PrismaClient, CourseDifficulty } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.course.upsert({
    where: { slug: 'investment-security-course' },
    update: {},
    create: {
      id: 'clx2no2g0000008l8g8r8g8r8', // A unique ID for the course
      slug: 'investment-security-course',
      category: 'Financial Literacy',
      difficulty: CourseDifficulty.BEGINNER,
      estimatedHours: 5,
      xpReward: 1500,
      isPublished: true,
      order: 1,
      imageUrl: '/images/stock-market-course/candlestick-anatomy.png',
      updatedAt: new Date(),
    },
  });
  console.log('Upserted course: Fraud Awareness Course');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
