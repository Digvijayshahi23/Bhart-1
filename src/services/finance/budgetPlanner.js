/**
 * Calculates budget ledger totals.
 */
export function calculateBudgetSummary(income, expenses = []) {
  const inc = parseFloat(income) || 0;
  const expTotal = expenses.reduce(
    (sum, item) => sum + (parseFloat(item.amount) || 0),
    0,
  );
  const remaining = inc - expTotal;

  return {
    income: inc,
    expensesTotal: expTotal,
    remainingSavings: remaining,
    savingsPercentage: inc > 0 ? Math.round((remaining / inc) * 100) : 0,
  };
}
export default calculateBudgetSummary;
