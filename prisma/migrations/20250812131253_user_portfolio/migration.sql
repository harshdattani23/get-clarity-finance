/*
  Warnings:

  - You are about to drop the `VirtualPortfolio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."VirtualPortfolio" DROP CONSTRAINT "VirtualPortfolio_userClerkId_fkey";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "virtualCash" DECIMAL(65,30) NOT NULL DEFAULT 100000.00;

-- DropTable
DROP TABLE "public"."VirtualPortfolio";

-- CreateTable
CREATE TABLE "public"."PortfolioHolding" (
    "id" SERIAL NOT NULL,
    "userClerkId" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "averagePrice" DECIMAL(65,30) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortfolioHolding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioHolding_userClerkId_ticker_key" ON "public"."PortfolioHolding"("userClerkId", "ticker");

-- AddForeignKey
ALTER TABLE "public"."PortfolioHolding" ADD CONSTRAINT "PortfolioHolding_userClerkId_fkey" FOREIGN KEY ("userClerkId") REFERENCES "public"."User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
