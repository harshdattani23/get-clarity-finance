import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing achievements
  await prisma.userAchievement.deleteMany();
  await prisma.achievement.deleteMany();

  // Create achievements
  const achievements = [
    // TRADING Category (Learning-focused)
    {
      name: 'First Investment',
      description: 'Make your first virtual investment to start learning',
      category: 'TRADING',
      tier: 'BRONZE',
      icon: 'chart',
      requirement: { type: 'TRADES_COUNT', value: 1 },
      points: 10,
    },
    {
      name: 'Active Learner',
      description: 'Practice with 10 virtual investments',
      category: 'TRADING',
      tier: 'SILVER',
      icon: 'chart',
      requirement: { type: 'TRADES_COUNT', value: 10 },
      points: 25,
    },
    {
      name: 'Market Explorer',
      description: 'Gain experience with 50 virtual transactions',
      category: 'TRADING',
      tier: 'GOLD',
      icon: 'chart',
      requirement: { type: 'TRADES_COUNT', value: 50 },
      points: 50,
    },
    {
      name: 'Experienced Investor',
      description: 'Build expertise through 100 practice investments',
      category: 'TRADING',
      tier: 'PLATINUM',
      icon: 'chart',
      requirement: { type: 'TRADES_COUNT', value: 100 },
      points: 100,
    },
    {
      name: 'Investment Scholar',
      description: 'Master market dynamics with 500 educational trades',
      category: 'TRADING',
      tier: 'DIAMOND',
      icon: 'chart',
      requirement: { type: 'TRADES_COUNT', value: 500 },
      points: 250,
    },

    // PROFIT Category (Educational Returns)
    {
      name: 'Positive Returns',
      description: 'Generate ₹1,000 in virtual portfolio returns',
      category: 'PROFIT',
      tier: 'BRONZE',
      icon: 'coins',
      requirement: { type: 'TOTAL_PROFIT', value: 1000 },
      points: 15,
    },
    {
      name: 'Growing Portfolio',
      description: 'Achieve ₹5,000 in virtual investment returns',
      category: 'PROFIT',
      tier: 'SILVER',
      icon: 'coins',
      requirement: { type: 'TOTAL_PROFIT', value: 5000 },
      points: 30,
    },
    {
      name: 'Successful Investor',
      description: 'Build ₹10,000 in virtual portfolio value',
      category: 'PROFIT',
      tier: 'GOLD',
      icon: 'coins',
      requirement: { type: 'TOTAL_PROFIT', value: 10000 },
      points: 60,
    },
    {
      name: 'Portfolio Excellence',
      description: 'Achieve ₹25,000 in virtual investment growth',
      category: 'PROFIT',
      tier: 'PLATINUM',
      icon: 'coins',
      requirement: { type: 'TOTAL_PROFIT', value: 25000 },
      points: 120,
    },
    {
      name: 'Value Investing Master',
      description: 'Generate ₹50,000 in long-term virtual portfolio returns',
      category: 'PROFIT',
      tier: 'DIAMOND',
      icon: 'coins',
      requirement: { type: 'TOTAL_PROFIT', value: 50000 },
      points: 300,
    },

    // LEARNING Category (renamed from STREAK)
    {
      name: 'Market Research',
      description: 'Complete 3 profitable trades through careful analysis',
      category: 'LEARNING',
      tier: 'BRONZE',
      icon: 'fire',
      requirement: { type: 'WIN_STREAK', value: 3 },
      points: 20,
    },
    {
      name: 'Informed Investor',
      description: 'Make 5 well-researched profitable investment decisions',
      category: 'LEARNING',
      tier: 'SILVER',
      icon: 'fire',
      requirement: { type: 'WIN_STREAK', value: 5 },
      points: 40,
    },
    {
      name: 'Strategic Thinker',
      description: 'Successfully execute 10 planned investment strategies',
      category: 'LEARNING',
      tier: 'GOLD',
      icon: 'fire',
      requirement: { type: 'WIN_STREAK', value: 10 },
      points: 80,
    },
    {
      name: 'Master Analyst',
      description: 'Demonstrate consistent analytical skills with 15 successful trades',
      category: 'LEARNING',
      tier: 'PLATINUM',
      icon: 'fire',
      requirement: { type: 'WIN_STREAK', value: 15 },
      points: 150,
    },

    // PORTFOLIO Category
    {
      name: 'Balanced Portfolio',
      description: 'Achieve 55% successful investment decisions (min 20 trades)',
      category: 'PORTFOLIO',
      tier: 'BRONZE',
      icon: 'trophy',
      requirement: { type: 'WIN_RATE', value: 55, minTrades: 20 },
      points: 25,
    },
    {
      name: 'Smart Investor',
      description: 'Maintain 60% successful portfolio decisions (min 30 trades)',
      category: 'PORTFOLIO',
      tier: 'SILVER',
      icon: 'trophy',
      requirement: { type: 'WIN_RATE', value: 60, minTrades: 30 },
      points: 50,
    },
    {
      name: 'Portfolio Manager',
      description: 'Achieve 65% successful investment outcomes (min 50 trades)',
      category: 'PORTFOLIO',
      tier: 'GOLD',
      icon: 'trophy',
      requirement: { type: 'WIN_RATE', value: 65, minTrades: 50 },
      points: 100,
    },
    {
      name: 'Investment Expert',
      description: 'Demonstrate consistent portfolio growth with 70% success rate (min 100 trades)',
      category: 'PORTFOLIO',
      tier: 'PLATINUM',
      icon: 'trophy',
      requirement: { type: 'WIN_RATE', value: 70, minTrades: 100 },
      points: 200,
    },

    // VOLUME Category
    {
      name: 'Small Investor',
      description: 'Trade ₹100,000 in total volume',
      category: 'PORTFOLIO',
      tier: 'BRONZE',
      icon: 'star',
      requirement: { type: 'VOLUME', value: 100000 },
      points: 15,
    },
    {
      name: 'Active Investor',
      description: 'Trade ₹500,000 in total volume',
      category: 'PORTFOLIO',
      tier: 'SILVER',
      icon: 'star',
      requirement: { type: 'VOLUME', value: 500000 },
      points: 35,
    },
    {
      name: 'Big Player',
      description: 'Trade ₹1,000,000 in total volume',
      category: 'PORTFOLIO',
      tier: 'GOLD',
      icon: 'star',
      requirement: { type: 'VOLUME', value: 1000000 },
      points: 75,
    },
    {
      name: 'Market Whale',
      description: 'Trade ₹5,000,000 in total volume',
      category: 'PORTFOLIO',
      tier: 'PLATINUM',
      icon: 'star',
      requirement: { type: 'VOLUME', value: 5000000 },
      points: 150,
    },

    // SPECIAL Category
    {
      name: 'Early Bird',
      description: 'One of the first 100 users to trade',
      category: 'SPECIAL',
      tier: 'GOLD',
      icon: 'gem',
      requirement: { type: 'SPECIAL', value: 'EARLY_BIRD' },
      points: 100,
    },
    {
      name: 'Diamond Hands',
      description: 'Hold a position for 30+ days',
      category: 'SPECIAL',
      tier: 'DIAMOND',
      icon: 'gem',
      requirement: { type: 'SPECIAL', value: 'DIAMOND_HANDS' },
      points: 200,
    },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.create({
      data: achievement as any,
    });
  }

  console.log(`Created ${achievements.length} achievements`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
