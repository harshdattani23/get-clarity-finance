import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Function to create a new PrismaClient with proper configuration
function createPrismaClient() {
  // During build time, DATABASE_URL might be undefined, so we need to handle this case
  const databaseUrl = process.env.DATABASE_URL;
  
  // If DATABASE_URL is not available (e.g., during build), provide a dummy URL
  // This allows the build to complete successfully without database connection
  const fallbackUrl = "postgresql://dummy:dummy@localhost:5432/dummy";
  
  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl || fallbackUrl,
      },
    },
    // Configure connection pool to prevent "too many connections" error
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });
}

// Create singleton instance
export const prisma = global.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// Handle graceful shutdown
if (typeof window === 'undefined') {
  process.on('beforeExit', async () => {
    await prisma.$disconnect();
  });
  
  process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
  
  process.on('SIGTERM', async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

export default prisma;
