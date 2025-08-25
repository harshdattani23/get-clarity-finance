-- CreateEnum
CREATE TYPE "public"."NewsSentiment" AS ENUM ('POSITIVE', 'NEUTRAL', 'NEGATIVE');

-- CreateEnum
CREATE TYPE "public"."FetchStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'TIMEOUT');

-- CreateTable
CREATE TABLE "public"."NewsItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "sector" TEXT,
    "sentiment" "public"."NewsSentiment" NOT NULL DEFAULT 'NEUTRAL',
    "language" TEXT NOT NULL DEFAULT 'en',
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."NewsKeyPoint" (
    "id" TEXT NOT NULL,
    "newsItemId" TEXT NOT NULL,
    "point" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "NewsKeyPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."NewsTicker" (
    "id" TEXT NOT NULL,
    "newsItemId" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,

    CONSTRAINT "NewsTicker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."NewsSource" (
    "id" TEXT NOT NULL,
    "newsItemId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "title" TEXT,

    CONSTRAINT "NewsSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."NewsFetchLog" (
    "id" TEXT NOT NULL,
    "sector" TEXT,
    "topics" TEXT[],
    "status" "public"."FetchStatus" NOT NULL,
    "itemsCount" INTEGER NOT NULL DEFAULT 0,
    "error" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "NewsFetchLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "NewsItem_sector_publishedAt_idx" ON "public"."NewsItem"("sector", "publishedAt");

-- CreateIndex
CREATE INDEX "NewsItem_fetchedAt_idx" ON "public"."NewsItem"("fetchedAt");

-- CreateIndex
CREATE INDEX "NewsItem_expiresAt_idx" ON "public"."NewsItem"("expiresAt");

-- CreateIndex
CREATE INDEX "NewsKeyPoint_newsItemId_idx" ON "public"."NewsKeyPoint"("newsItemId");

-- CreateIndex
CREATE INDEX "NewsTicker_newsItemId_idx" ON "public"."NewsTicker"("newsItemId");

-- CreateIndex
CREATE INDEX "NewsTicker_ticker_idx" ON "public"."NewsTicker"("ticker");

-- CreateIndex
CREATE INDEX "NewsSource_newsItemId_idx" ON "public"."NewsSource"("newsItemId");

-- CreateIndex
CREATE INDEX "NewsFetchLog_status_startedAt_idx" ON "public"."NewsFetchLog"("status", "startedAt");

-- AddForeignKey
ALTER TABLE "public"."NewsKeyPoint" ADD CONSTRAINT "NewsKeyPoint_newsItemId_fkey" FOREIGN KEY ("newsItemId") REFERENCES "public"."NewsItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."NewsTicker" ADD CONSTRAINT "NewsTicker_newsItemId_fkey" FOREIGN KEY ("newsItemId") REFERENCES "public"."NewsItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."NewsSource" ADD CONSTRAINT "NewsSource_newsItemId_fkey" FOREIGN KEY ("newsItemId") REFERENCES "public"."NewsItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
