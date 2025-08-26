// Real-time monitoring of news cron job progress
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function monitorProgress() {
  console.clear();
  console.log('📊 REAL-TIME CRON JOB MONITOR');
  console.log('=' .repeat(80));
  console.log('Press Ctrl+C to stop monitoring\n');

  let lastLogCount = 0;
  let lastNewsCount = {};

  const interval = setInterval(async () => {
    try {
      // Get latest fetch logs
      const logs = await prisma.newsFetchLog.findMany({
        take: 10,
        orderBy: {
          startedAt: 'desc'
        }
      });

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

      // Clear console and show updated stats
      console.clear();
      console.log('📊 REAL-TIME CRON JOB MONITOR');
      console.log('=' .repeat(80));
      console.log(`Last Update: ${new Date().toLocaleTimeString()}\n`);

      // Show current news counts
      console.log('🌍 News Items by Language:');
      console.log('-'.repeat(40));
      
      const langMap = {};
      newsCount.forEach(item => {
        langMap[item.language] = item._count;
      });

      const languages = ['en', 'hi', 'mr', 'gu', 'ta', 'te', 'bn'];
      const langNames = {
        'en': 'English  ',
        'hi': 'Hindi    ',
        'mr': 'Marathi  ',
        'gu': 'Gujarati ',
        'ta': 'Tamil    ',
        'te': 'Telugu   ',
        'bn': 'Bengali  '
      };

      languages.forEach(lang => {
        const count = langMap[lang] || 0;
        const diff = count - (lastNewsCount[lang] || 0);
        const diffStr = diff > 0 ? ` (+${diff})` : '';
        const bar = '█'.repeat(Math.min(count / 2, 50));
        console.log(`${langNames[lang]}: ${String(count).padStart(3)} ${diffStr.padEnd(6)} ${bar}`);
      });

      lastNewsCount = langMap;

      // Show recent fetch logs
      console.log('\n📋 Recent Fetch Operations:');
      console.log('-'.repeat(40));
      
      const newLogs = logs.slice(0, Math.min(5, logs.length));
      newLogs.forEach(log => {
        const time = log.startedAt.toLocaleTimeString();
        const status = log.status === 'SUCCESS' ? '✅' : log.status === 'FAILED' ? '❌' : '⏳';
        const sector = log.sector || 'general';
        const items = log.itemsCount || 0;
        console.log(`${status} ${time} | ${sector.padEnd(12)} | ${items} items`);
      });

      // Check for active/pending operations
      const pending = logs.filter(l => l.status === 'PENDING');
      if (pending.length > 0) {
        console.log(`\n⏳ Active Operations: ${pending.length}`);
        pending.forEach(p => {
          console.log(`   - ${p.sector || 'general'} (started ${new Date(p.startedAt).toLocaleTimeString()})`);
        });
      }

      // Show total stats
      const totalNews = newsCount.reduce((sum, item) => sum + item._count, 0);
      const successLogs = logs.filter(l => l.status === 'SUCCESS').length;
      const failedLogs = logs.filter(l => l.status === 'FAILED').length;
      
      console.log('\n📈 Overall Statistics:');
      console.log('-'.repeat(40));
      console.log(`Total News Items: ${totalNews}`);
      console.log(`Languages Active: ${newsCount.length}/7`);
      console.log(`Recent Operations: ${successLogs} successful, ${failedLogs} failed, ${pending.length} pending`);

      if (logs.length > lastLogCount && logs[0].status === 'SUCCESS') {
        console.log('\n🎉 NEW FETCH COMPLETED: ' + (logs[0].sector || 'general'));
      }
      lastLogCount = logs.length;

    } catch (error) {
      console.error('Monitor error:', error.message);
    }
  }, 2000); // Update every 2 seconds

  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    clearInterval(interval);
    console.log('\n\n👋 Monitoring stopped');
    await prisma.$disconnect();
    process.exit(0);
  });
}

monitorProgress();
