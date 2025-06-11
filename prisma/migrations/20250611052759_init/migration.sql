/*
  Warnings:

  - The primary key for the `histories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `sambalId` on the `histories` table. All the data in the column will be lost.
  - The primary key for the `sambals` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId]` on the table `histories` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `id` on the `histories` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `histories` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `sambals` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "histories" DROP CONSTRAINT "histories_sambalId_fkey";

-- DropForeignKey
ALTER TABLE "histories" DROP CONSTRAINT "histories_userId_fkey";

-- DropIndex
DROP INDEX "histories_sambalId_idx";

-- DropIndex
DROP INDEX "histories_userId_idx";

-- AlterTable
ALTER TABLE "histories" DROP CONSTRAINT "histories_pkey",
DROP COLUMN "sambalId",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
ADD CONSTRAINT "histories_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "sambals" DROP CONSTRAINT "sambals_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "sambals_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "history_sambals" (
    "historyId" UUID NOT NULL,
    "sambalId" UUID NOT NULL,

    CONSTRAINT "history_sambals_pkey" PRIMARY KEY ("historyId","sambalId")
);

-- CreateIndex
CREATE UNIQUE INDEX "histories_userId_key" ON "histories"("userId");

-- AddForeignKey
ALTER TABLE "histories" ADD CONSTRAINT "histories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history_sambals" ADD CONSTRAINT "history_sambals_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "histories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history_sambals" ADD CONSTRAINT "history_sambals_sambalId_fkey" FOREIGN KEY ("sambalId") REFERENCES "sambals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
