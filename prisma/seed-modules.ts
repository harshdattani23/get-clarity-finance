import { PrismaClient, CourseDifficulty } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const course = await prisma.course.findUnique({
    where: { slug: 'investment-security-course' },
  });

  if (!course) {
    console.error('Course "investment-security-course" not found.');
    return;
  }

  const newModules = [
    {
      id: 'clx2p4qj0000108l8g8r8g8r8',
      slug: 'advanced-fee-schemes',
      title: 'Advanced Fee & High-Yield Schemes',
      order: 7,
      difficulty: CourseDifficulty.INTERMEDIATE,
      xpReward: 150,
    },
    {
      id: 'clx2p4qj0000208l8g8r8g8r8',
      slug: 'spoofing-wash-trading',
      title: 'Spoofing & Wash Trading',
      order: 8,
      difficulty: CourseDifficulty.ADVANCED,
      xpReward: 200,
    },
    {
      id: 'clx2p4qj0000308l8g8r8g8r8',
      slug: 'broker-fraud',
      title: 'Broker-Related Fraud',
      order: 9,
      difficulty: CourseDifficulty.INTERMEDIATE,
      xpReward: 150,
    },
  ];

  for (const moduleData of newModules) {
    await prisma.courseModule.upsert({
      where: { courseId_slug: { courseId: course.id, slug: moduleData.slug } },
      update: { ...moduleData, courseId: course.id, updatedAt: new Date() },
      create: { ...moduleData, courseId: course.id, updatedAt: new Date() },
    });
    console.log(`Upserted module: ${moduleData.title}`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
