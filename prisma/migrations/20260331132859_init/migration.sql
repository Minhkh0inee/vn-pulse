-- CreateTable
CREATE TABLE "MonthlyIndex" (
    "id" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month_num" INTEGER NOT NULL,
    "totalScore" DOUBLE PRECISION NOT NULL,
    "fundingScore" DOUBLE PRECISION NOT NULL,
    "jobPostingScore" DOUBLE PRECISION NOT NULL,
    "newsVolumeScore" DOUBLE PRECISION NOT NULL,
    "pollScore" DOUBLE PRECISION NOT NULL,
    "fundingWeight" DOUBLE PRECISION NOT NULL DEFAULT 0.30,
    "jobPostingWeight" DOUBLE PRECISION NOT NULL DEFAULT 0.25,
    "newsVolumeWeight" DOUBLE PRECISION NOT NULL DEFAULT 0.25,
    "pollWeight" DOUBLE PRECISION NOT NULL DEFAULT 0.20,
    "rawFundingDeals" INTEGER,
    "rawFundingValue" DOUBLE PRECISION,
    "rawJobPostings" INTEGER,
    "rawNewsArticles" INTEGER,
    "rawPollAvg" DOUBLE PRECISION,
    "rawPollCount" INTEGER,
    "commentary" TEXT NOT NULL,
    "summaryVi" TEXT,
    "summaryEn" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MonthlyIndex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectorScore" (
    "id" TEXT NOT NULL,
    "indexId" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "trend" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SectorScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poll" (
    "id" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "closedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PollResponse" (
    "id" TEXT NOT NULL,
    "pollId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "ipHash" TEXT NOT NULL,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PollResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verifyToken" TEXT,
    "source" TEXT,
    "unsubscribedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "indexId" TEXT,
    "action" TEXT NOT NULL,
    "details" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageView" (
    "id" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "referrer" TEXT,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyIndex_month_key" ON "MonthlyIndex"("month");

-- CreateIndex
CREATE INDEX "MonthlyIndex_year_month_num_idx" ON "MonthlyIndex"("year", "month_num");

-- CreateIndex
CREATE INDEX "MonthlyIndex_isPublished_idx" ON "MonthlyIndex"("isPublished");

-- CreateIndex
CREATE INDEX "SectorScore_sector_idx" ON "SectorScore"("sector");

-- CreateIndex
CREATE UNIQUE INDEX "SectorScore_indexId_sector_key" ON "SectorScore"("indexId", "sector");

-- CreateIndex
CREATE UNIQUE INDEX "Poll_month_key" ON "Poll"("month");

-- CreateIndex
CREATE INDEX "PollResponse_pollId_idx" ON "PollResponse"("pollId");

-- CreateIndex
CREATE UNIQUE INDEX "PollResponse_pollId_ipHash_key" ON "PollResponse"("pollId", "ipHash");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_email_key" ON "Subscriber"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_verifyToken_key" ON "Subscriber"("verifyToken");

-- CreateIndex
CREATE INDEX "Subscriber_isVerified_idx" ON "Subscriber"("isVerified");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "AuditLog_userId_idx" ON "AuditLog"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_indexId_idx" ON "AuditLog"("indexId");

-- CreateIndex
CREATE INDEX "PageView_page_createdAt_idx" ON "PageView"("page", "createdAt");

-- AddForeignKey
ALTER TABLE "SectorScore" ADD CONSTRAINT "SectorScore_indexId_fkey" FOREIGN KEY ("indexId") REFERENCES "MonthlyIndex"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollResponse" ADD CONSTRAINT "PollResponse_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_indexId_fkey" FOREIGN KEY ("indexId") REFERENCES "MonthlyIndex"("id") ON DELETE SET NULL ON UPDATE CASCADE;
