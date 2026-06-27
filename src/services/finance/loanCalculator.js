/**
 * Calculates monthly EMI and total interest payable parameters.
 */
export function calculateEMI(principal, rate, tenureYears) {
  const p = parseFloat(principal);
  const r = parseFloat(rate) / 12 / 100;
  const n = parseFloat(tenureYears) * 12;

  if (isNaN(p) || isNaN(r) || isNaN(n) || p <= 0 || r <= 0 || n <= 0) {
    return { emi: 0, interestPayable: 0, totalPayment: 0 };
  }

  const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const interestPayable = totalPayment - p;

  return {
    emi: Math.round(emi),
    interestPayable: Math.round(interestPayable),
    totalPayment: Math.round(totalPayment),
  };
}
export default calculateEMI;
