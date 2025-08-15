-- DropForeignKey
ALTER TABLE "public"."WatchlistItem" DROP CONSTRAINT "WatchlistItem_watchlistId_fkey";

-- AddForeignKey
ALTER TABLE "public"."WatchlistItem" ADD CONSTRAINT "WatchlistItem_watchlistId_fkey" FOREIGN KEY ("watchlistId") REFERENCES "public"."Watchlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
