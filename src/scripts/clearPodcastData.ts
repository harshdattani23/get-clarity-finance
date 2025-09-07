import { PrismaClient } from '@prisma/client';

/**
 * Script to delete all existing podcast episodes from the database
 * This will clear all podcast episodes, their key points, and sources
 */

async function clearPodcastData() {
  try {
    console.log('Initializing database connection...');
    const prisma = new PrismaClient();
    
    console.log('Connected to database. Preparing to delete all podcast data...');
    
    // Delete all podcast episodes
    // Due to cascading constraints, this should also delete all related key points and sources
    const result = await prisma.podcastEpisode.deleteMany({});
    
    console.log(`Successfully deleted ${result.count} podcast episodes and their related data.`);
    
    await prisma.$disconnect();
    console.log('Database connection closed. Cleanup complete.');
    
    return result.count;
  } catch (error) {
    console.error('Error clearing podcast data:', error);
    throw error;
  }
}

// If this script is run directly (not imported)
if (require.main === module) {
  clearPodcastData()
    .then(count => {
      console.log(`Operation complete. Deleted ${count} episodes.`);
      process.exit(0);
    })
    .catch(err => {
      console.error('Failed to clear podcast data:', err);
      process.exit(1);
    });
}

export default clearPodcastData;
