/*
  Warnings:

  - You are about to drop the column `ticker` on the `Watchlist` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Watchlist_userClerkId_ticker_key";

-- AlterTable
ALTER TABLE "public"."Watchlist" DROP COLUMN "ticker",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'My Watchlist';

-- CreateTable
CREATE TABLE "public"."WatchlistItem" (
    "id" SERIAL NOT NULL,
    "watchlistId" INTEGER NOT NULL,
    "ticker" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WatchlistItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WatchlistItem_watchlistId_ticker_key" ON "public"."WatchlistItem"("watchlistId", "ticker");

-- AddForeignKey
ALTER TABLE "public"."WatchlistItem" ADD CONSTRAINT "WatchlistItem_watchlistId_fkey" FOREIGN KEY ("watchlistId") REFERENCES "public"."Watchlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
