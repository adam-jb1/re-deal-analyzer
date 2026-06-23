const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const analyzeDeal = async (req, res) => {
  const {
    purchasePrice,
    downPaymentPercent,
    interestRate,
    loanTermYears,
    monthlyRent,
    monthlyExpenses,
    address,
  } = req.body;

  if (!purchasePrice || !downPaymentPercent || !interestRate || !monthlyRent) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const downPayment = purchasePrice * (downPaymentPercent / 100);
  const loanAmount = purchasePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTermYears * 12;
  const monthlyMortgage =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  const totalMonthlyExpenses = monthlyExpenses + monthlyMortgage;
  const monthlyCashFlow = monthlyRent - totalMonthlyExpenses;
  const annualCashFlow = monthlyCashFlow * 12;
  const annualNOI = (monthlyRent - monthlyExpenses) * 12;
  const capRate = parseFloat(((annualNOI / purchasePrice) * 100).toFixed(2));
  const cashOnCashReturn = parseFloat(((annualCashFlow / downPayment) * 100).toFixed(2));
  const verdict = monthlyCashFlow > 0 ? 'Cash flow positive' : 'Cash flow negative';

  const property = await prisma.property.create({
    data: {
      address: address || null,
      purchasePrice,
      downPaymentPercent,
      interestRate,
      loanTermYears,
      monthlyRent,
      monthlyExpenses,
      monthlyCashFlow: parseFloat(monthlyCashFlow.toFixed(2)),
      annualCashFlow: parseFloat(annualCashFlow.toFixed(2)),
      capRate,
      cashOnCashReturn,
      verdict,
    },
  });

  res.json({
    id: property.id,
    summary: {
      purchasePrice,
      downPayment: downPayment.toFixed(2),
      loanAmount: loanAmount.toFixed(2),
      monthlyMortgage: monthlyMortgage.toFixed(2),
    },
    metrics: {
      monthlyCashFlow: monthlyCashFlow.toFixed(2),
      annualCashFlow: annualCashFlow.toFixed(2),
      capRate: `${capRate}%`,
      cashOnCashReturn: `${cashOnCashReturn}%`,
      verdict,
    },
  });
};

module.exports = { analyzeDeal };