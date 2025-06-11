/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `sambals` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "sambals" ADD COLUMN     "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "sambals_name_key" ON "sambals"("name");
