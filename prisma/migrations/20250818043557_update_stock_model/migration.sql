/*
  Warnings:

  - The `marketCap` column on the `Stock` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Stock" ADD COLUMN     "avgVolume" DECIMAL(65,30),
ADD COLUMN     "beta" DECIMAL(65,30),
ADD COLUMN     "ceo" TEXT,
ADD COLUMN     "close" DECIMAL(65,30),
ADD COLUMN     "description" TEXT,
ADD COLUMN     "dividendYield" DECIMAL(65,30),
ADD COLUMN     "employees" INTEGER,
ADD COLUMN     "eps" DECIMAL(65,30),
ADD COLUMN     "headquarters" TEXT,
ADD COLUMN     "high" DECIMAL(65,30),
ADD COLUMN     "low" DECIMAL(65,30),
ADD COLUMN     "open" DECIMAL(65,30),
ADD COLUMN     "peRatio" DECIMAL(65,30),
ADD COLUMN     "sector" TEXT,
ADD COLUMN     "website" TEXT,
ALTER COLUMN "industry" DROP NOT NULL,
DROP COLUMN "marketCap",
ADD COLUMN     "marketCap" DECIMAL(65,30);
