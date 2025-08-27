/*
  Warnings:

  - The values [TIMEOUT] on the enum `FetchStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."FetchStatus_new" AS ENUM ('PENDING', 'IN_PROGRESS', 'SUCCESS', 'FAILED');
ALTER TABLE "public"."NewsFetchLog" ALTER COLUMN "status" TYPE "public"."FetchStatus_new" USING ("status"::text::"public"."FetchStatus_new");
ALTER TYPE "public"."FetchStatus" RENAME TO "FetchStatus_old";
ALTER TYPE "public"."FetchStatus_new" RENAME TO "FetchStatus";
DROP TYPE "public"."FetchStatus_old";
COMMIT;

-- CreateTable
CREATE TABLE "public"."SEBIIntermediary" (
    "id" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tradeName" TEXT,
    "category" TEXT NOT NULL,
    "subcategory" TEXT,
    "validity" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "email" TEXT,
    "phone" TEXT,
    "website" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "pincode" TEXT,
    "exchanges" TEXT[],
    "segments" TEXT[],
    "aifCategory" TEXT,
    "aifType" TEXT,
    "sponsor" TEXT,
    "trustee" TEXT,
    "fundManager" TEXT,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataSource" TEXT NOT NULL DEFAULT 'SEBI',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SEBIIntermediary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."VerificationLog" (
    "id" TEXT NOT NULL,
    "searchQuery" TEXT NOT NULL,
    "searchType" TEXT NOT NULL,
    "found" BOOLEAN NOT NULL,
    "riskScore" INTEGER,
    "legitimacyStatus" TEXT,
    "intermediaryId" TEXT,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificationLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FraudReport" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "entityName" TEXT NOT NULL,
    "registrationClaim" TEXT,
    "fraudType" TEXT NOT NULL,
    "riskScore" INTEGER NOT NULL,
    "evidence" JSONB,
    "reportedBy" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "sebiReported" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FraudReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SEBIIntermediary_registrationNumber_key" ON "public"."SEBIIntermediary"("registrationNumber");

-- CreateIndex
CREATE INDEX "SEBIIntermediary_category_idx" ON "public"."SEBIIntermediary"("category");

-- CreateIndex
CREATE INDEX "SEBIIntermediary_name_idx" ON "public"."SEBIIntermediary"("name");

-- CreateIndex
CREATE INDEX "SEBIIntermediary_registrationNumber_idx" ON "public"."SEBIIntermediary"("registrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "FraudReport_reportId_key" ON "public"."FraudReport"("reportId");

-- CreateIndex
CREATE INDEX "FraudReport_fraudType_idx" ON "public"."FraudReport"("fraudType");

-- CreateIndex
CREATE INDEX "FraudReport_status_idx" ON "public"."FraudReport"("status");
