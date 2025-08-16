/*
  Warnings:

  - A unique constraint covering the columns `[userClerkId,name]` on the table `Watchlist` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "virtualCash" SET DEFAULT 1000000.00;

-- CreateTable
CREATE TABLE "public"."Stock" (
    "id" SERIAL NOT NULL,
    "ticker" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "marketCap" TEXT NOT NULL,
    "indices" TEXT[],
    "price" DECIMAL(65,30),
    "change" DECIMAL(65,30),
    "percentChange" DECIMAL(65,30),
    "volume" DECIMAL(65,30),
    "lastUpdatedAt" TIMESTAMP(3),

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stock_ticker_key" ON "public"."Stock"("ticker");

-- CreateIndex
CREATE UNIQUE INDEX "Watchlist_userClerkId_name_key" ON "public"."Watchlist"("userClerkId", "name");
