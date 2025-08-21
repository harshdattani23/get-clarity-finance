-- CreateEnum
CREATE TYPE "public"."LeaderboardPeriod" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'ALL_TIME');

-- CreateEnum
CREATE TYPE "public"."AchievementCategory" AS ENUM ('TRADING', 'PROFIT', 'LEARNING', 'STREAK', 'PORTFOLIO', 'SOCIAL', 'SPECIAL');

-- CreateEnum
CREATE TYPE "public"."AchievementTier" AS ENUM ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND');

-- CreateTable
CREATE TABLE "public"."LeaderboardEntry" (
    "id" SERIAL NOT NULL,
    "userClerkId" TEXT NOT NULL,
    "period" "public"."LeaderboardPeriod" NOT NULL,
    "rank" INTEGER NOT NULL,
    "totalReturn" DECIMAL(65,30) NOT NULL,
    "winRate" DECIMAL(65,30) NOT NULL,
    "totalTrades" INTEGER NOT NULL,
    "profitableTrades" INTEGER NOT NULL,
    "portfolioValue" DECIMAL(65,30) NOT NULL,
    "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeaderboardEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TradingStats" (
    "id" SERIAL NOT NULL,
    "userClerkId" TEXT NOT NULL,
    "totalTrades" INTEGER NOT NULL DEFAULT 0,
    "profitableTrades" INTEGER NOT NULL DEFAULT 0,
    "totalProfit" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "totalLoss" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "bestTrade" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "worstTrade" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "longestWinStreak" INTEGER NOT NULL DEFAULT 0,
    "longestLossStreak" INTEGER NOT NULL DEFAULT 0,
    "totalVolume" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "averageHoldTime" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TradingStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Achievement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "public"."AchievementCategory" NOT NULL,
    "tier" "public"."AchievementTier" NOT NULL,
    "icon" TEXT NOT NULL,
    "requirement" JSONB NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 10,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserAchievement" (
    "id" SERIAL NOT NULL,
    "userClerkId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "unlockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "progress" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserAchievement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LeaderboardEntry_period_rank_idx" ON "public"."LeaderboardEntry"("period", "rank");

-- CreateIndex
CREATE UNIQUE INDEX "LeaderboardEntry_userClerkId_period_calculatedAt_key" ON "public"."LeaderboardEntry"("userClerkId", "period", "calculatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "TradingStats_userClerkId_key" ON "public"."TradingStats"("userClerkId");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_name_key" ON "public"."Achievement"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserAchievement_userClerkId_achievementId_key" ON "public"."UserAchievement"("userClerkId", "achievementId");

-- AddForeignKey
ALTER TABLE "public"."LeaderboardEntry" ADD CONSTRAINT "LeaderboardEntry_userClerkId_fkey" FOREIGN KEY ("userClerkId") REFERENCES "public"."User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TradingStats" ADD CONSTRAINT "TradingStats_userClerkId_fkey" FOREIGN KEY ("userClerkId") REFERENCES "public"."User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserAchievement" ADD CONSTRAINT "UserAchievement_userClerkId_fkey" FOREIGN KEY ("userClerkId") REFERENCES "public"."User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserAchievement" ADD CONSTRAINT "UserAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "public"."Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
