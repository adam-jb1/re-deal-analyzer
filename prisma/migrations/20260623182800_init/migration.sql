-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "address" TEXT,
    "purchasePrice" DOUBLE PRECISION NOT NULL,
    "downPaymentPercent" DOUBLE PRECISION NOT NULL,
    "interestRate" DOUBLE PRECISION NOT NULL,
    "loanTermYears" INTEGER NOT NULL,
    "monthlyRent" DOUBLE PRECISION NOT NULL,
    "monthlyExpenses" DOUBLE PRECISION NOT NULL,
    "monthlyCashFlow" DOUBLE PRECISION NOT NULL,
    "annualCashFlow" DOUBLE PRECISION NOT NULL,
    "capRate" DOUBLE PRECISION NOT NULL,
    "cashOnCashReturn" DOUBLE PRECISION NOT NULL,
    "verdict" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);
