-- CreateTable
CREATE TABLE "histories" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sambalId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "histories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "histories_userId_idx" ON "histories"("userId");

-- CreateIndex
CREATE INDEX "histories_sambalId_idx" ON "histories"("sambalId");

-- AddForeignKey
ALTER TABLE "histories" ADD CONSTRAINT "histories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "histories" ADD CONSTRAINT "histories_sambalId_fkey" FOREIGN KEY ("sambalId") REFERENCES "sambals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
