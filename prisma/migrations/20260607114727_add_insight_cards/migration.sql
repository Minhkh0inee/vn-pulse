-- CreateTable
CREATE TABLE "InsightCard" (
    "id" TEXT NOT NULL,
    "indexId" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InsightCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InsightCard_indexId_idx" ON "InsightCard"("indexId");

-- AddForeignKey
ALTER TABLE "InsightCard" ADD CONSTRAINT "InsightCard_indexId_fkey" FOREIGN KEY ("indexId") REFERENCES "MonthlyIndex"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
