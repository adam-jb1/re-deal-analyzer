const analyzeDeal = (req, res) => {
    const {
      purchasePrice,
      downPaymentPercent,
      interestRate,
      loanTermYears,
      monthlyRent,
      monthlyExpenses,
    } = req.body;
  
    // Validate inputs
    if (!purchasePrice || !downPaymentPercent || !interestRate || !monthlyRent) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    // Mortgage calculation
    const downPayment = purchasePrice * (downPaymentPercent / 100);
    const loanAmount = purchasePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTermYears * 12;
    const monthlyMortgage =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  
    // Deal metrics
    const totalMonthlyExpenses = monthlyExpenses + monthlyMortgage;
    const monthlyCashFlow = monthlyRent - totalMonthlyExpenses;
    const annualCashFlow = monthlyCashFlow * 12;
    const annualNOI = (monthlyRent - monthlyExpenses) * 12;
    const capRate = ((annualNOI / purchasePrice) * 100).toFixed(2);
    const cashOnCashReturn = ((annualCashFlow / downPayment) * 100).toFixed(2);
  
    res.json({
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
        verdict: monthlyCashFlow > 0 ? 'Cash flow positive' : 'Cash flow negative',
      },
    });
  };
  
  module.exports = { analyzeDeal };