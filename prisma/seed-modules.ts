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

// No additional modules to seed - all modules are managed via API setup
const newModules: any[] = [];

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
