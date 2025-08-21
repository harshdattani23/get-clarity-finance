import { PrismaClient } from '@prisma/client';
import { allStocks } from '../src/lib/trading-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting stock data seed...');
  
  // Check if stocks already exist
  const existingCount = await prisma.stock.count();
  console.log(`Found ${existingCount} existing stocks in database`);
  
  let created = 0;
  let updated = 0;
  
  for (const stock of allStocks) {
    try {
      // Parse market cap to decimal if needed
      let marketCapValue: number | null = null;
      if (stock.marketCap) {
        const cleanMarketCap = stock.marketCap.replace(/[^\d.]/g, '');
        const multiplier = stock.marketCap.includes('T') ? 1e12 : 
                          stock.marketCap.includes('B') ? 1e9 : 
                          stock.marketCap.includes('M') ? 1e6 : 1;
        marketCapValue = parseFloat(cleanMarketCap) * multiplier;
      }
      
      // Calculate percent change if not provided
      const percentChange = stock.percentChange ?? 
        (stock.price > 0 ? (stock.change / stock.price) * 100 : 0);
      
      const result = await prisma.stock.upsert({
        where: { ticker: stock.ticker },
        update: {
          name: stock.name,
          price: stock.price,
          change: stock.change,
          percentChange: percentChange,
          industry: stock.industry || null,
          marketCap: stock.marketCap || null,
          indices: stock.indices || [],
          lastUpdatedAt: new Date(),
        },
        create: {
          ticker: stock.ticker,
          name: stock.name,
          price: stock.price,
          change: stock.change,
          percentChange: percentChange,
          industry: stock.industry || null,
          marketCap: stock.marketCap || null,
          indices: stock.indices || [],
          lastUpdatedAt: new Date(),
        },
      });
      
      if (result) {
        if (existingCount > 0) {
          updated++;
        } else {
          created++;
        }
      }
    } catch (error) {
      console.error(`Error seeding stock ${stock.ticker}:`, error);
    }
  }
  
  console.log(`Stock seed complete: ${created} created, ${updated} updated`);
  
  // Verify the data
  const totalStocks = await prisma.stock.count();
  console.log(`Total stocks in database: ${totalStocks}`);
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
