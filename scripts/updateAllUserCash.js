const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

async function main() {
  try {
    const result = await db.user.updateMany({
      data: {
        virtualCash: 1000000.00,
      },
    });
    console.log(`Successfully updated ${result.count} users.`);
  } catch (error) {
    console.error("Error updating users:", error);
  } finally {
    await db.$disconnect();
  }
}

main();


