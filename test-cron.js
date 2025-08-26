// Test script to check cron job functionality
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkCurrentNews() {
  try {
    // Count news by language
    const newsCount = await prisma.newsItem.groupBy({
      by: ['language'],
      _count: true,
      where: {
        expiresAt: {
          gt: new Date()
        }
      }
    });
    
    console.log('📊 Current news count by language:');
    console.log('================================');
    newsCount.forEach(item => {
      console.log(`${item.language}: ${item._count} items`);
    });
    
    // Get latest news fetch logs
    const logs = await prisma.newsFetchLog.findMany({
      take: 5,
      orderBy: {
        startedAt: 'desc'
      }
    });
    
    console.log('\n📋 Latest fetch logs:');
    console.log('===================');
    logs.forEach(log => {
      console.log(`- ${log.startedAt.toISOString()} | ${log.status} | ${log.sector || 'general'} | ${log.itemsCount || 0} items`);
    });
    
    // Sample a news item in each language
    const languages = ['en', 'hi', 'mr', 'gu', 'ta', 'te', 'bn'];
    console.log('\n🌍 Sample news items by language:');
    console.log('=================================');
    
    for (const lang of languages) {
      const sample = await prisma.newsItem.findFirst({
        where: {
          language: lang,
          expiresAt: {
            gt: new Date()
          }
        },
        select: {
          title: true,
          language: true,
          sector: true
        }
      });
      
      if (sample) {
        console.log(`[${lang}] ${sample.title.substring(0, 60)}...`);
      } else {
        console.log(`[${lang}] No news found`);
      }
    }
    
  } catch (error) {
    console.error('Error checking news:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCurrentNews();
