// Shared loan math engine. Every calculator imports from here — no calculator
// re-implements EMI / amortization maths. Full precision is kept internally;
// round only when displaying (see lib/format.js).

const EPS = 1e-9;

/** Annual percentage rate -> monthly rate as a fraction (12% -> 0.01). */
export function monthlyRate(annualRate) {
  return annualRate / 12 / 100;
}

/**
 * EMI = P * r * (1+r)^n / ((1+r)^n - 1). Uses log1p/expm1 so it stays accurate
 * for very small rates; r = 0 (interest-free) falls back to P / n.
 */
export function calcEmi(principal, annualRate, months) {
  const r = monthlyRate(annualRate);
  if (r === 0) return principal / months;
  const g = months * Math.log1p(r);
  const growth = Math.exp(g);
  if (!Number.isFinite(growth)) return principal * r; // extreme-rate guard
  return (principal * r * growth) / Math.expm1(g);
}

/** Principal that a given EMI can service: EMI * (1 - (1+r)^-n) / r. */
export function calcPrincipal(emi, annualRate, months) {
  const r = monthlyRate(annualRate);
  if (r === 0) return emi * months;
  const g = months * Math.log1p(r);
  return (emi * -Math.expm1(-g)) / r;
}

/**
 * Tenure in months (may be fractional) needed to repay `principal` with `emi`.
 * n = -ln(1 - P*r/EMI) / ln(1+r). Returns Infinity when the EMI does not even
 * cover the monthly interest.
 */
export function calcTenure(principal, annualRate, emi) {
  const r = monthlyRate(annualRate);
  if (r === 0) return principal / emi;
  const interestOnly = principal * r;
  if (emi <= interestOnly) return Infinity;
  return -Math.log1p(-interestOnly / emi) / Math.log1p(r);
}

/**
 * Annual rate (%) that turns `principal` into `emi` over `months`.
 * No closed form exists, so bisection on the monotonic EMI(r) function.
 * Returns null when no non-negative rate satisfies the inputs.
 */
export function solveRate(principal, emi, months) {
  const total = emi * months;
  if (!(principal > 0) || !(emi > 0) || !(months > 0)) return null;
  if (total < principal * (1 - 1e-12)) return null;
  if (Math.abs(total - principal) <= 1e-12 * principal) return 0;

  let lo = 0;
  let hi = 1; // monthly rate as a fraction (100% per month)
  while (calcEmi(principal, hi * 1200, months) < emi && hi < 1e4) hi *= 2;

  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (calcEmi(principal, mid * 1200, months) < emi) lo = mid;
    else hi = mid;
  }
  return ((lo + hi) / 2) * 1200;
}

/** Closed-form summary (no schedule): EMI, total payment, total interest. */
export function summarizeLoan(principal, annualRate, months) {
  const emi = calcEmi(principal, annualRate, months);
  const totalPayment = emi * months;
  return { emi, totalPayment, totalInterest: totalPayment - principal };
}

/**
 * Month-by-month amortization schedule.
 *
 * prepayment (optional): { month, amount, mode }
 *   - the lump sum is paid right after that month's EMI
 *   - mode "tenure": keep the EMI, loan closes earlier
 *   - mode "emi":    keep the tenure, EMI is recomputed on the new balance
 *
 * The final payment is adjusted so the ending balance is exactly 0.
 * Returns { rows, emi, months, totalInterest, totalPayment, totalPrepaid }.
 */
export function buildSchedule({ principal, annualRate, months, prepayment = null }) {
  const r = monthlyRate(annualRate);
  let emi = calcEmi(principal, annualRate, months);
  const initialEmi = emi;
  let balance = principal;
  const rows = [];
  let totalInterest = 0;
  let totalPrepaid = 0;

  for (let m = 1; m <= months && balance > EPS; m++) {
    const interest = balance * r;
    let payment = emi;
    let principalPart = payment - interest;

    if (m === months || principalPart >= balance - EPS) {
      principalPart = balance;
      payment = balance + interest;
    }
    balance -= principalPart;

    let prepaid = 0;
    if (prepayment && m === prepayment.month && balance > EPS && prepayment.amount > 0) {
      prepaid = Math.min(prepayment.amount, balance);
      balance -= prepaid;
      if (prepayment.mode === "emi" && balance > EPS) {
        emi = calcEmi(balance, annualRate, months - m);
      }
    }

    if (balance < EPS) balance = 0;
    totalInterest += interest;
    totalPrepaid += prepaid;
    rows.push({ month: m, payment, principal: principalPart, interest, prepayment: prepaid, balance });
  }

  return {
    rows,
    emi: initialEmi,
    months: rows.length,
    totalInterest,
    totalPayment: principal + totalInterest,
    totalPrepaid,
  };
}

/** Flat-rate EMI: interest is charged on the full principal for the whole tenure. */
export function flatRateEmi(principal, flatRate, months) {
  return (principal + (principal * flatRate * months) / 1200) / months;
}

/** Equivalent reducing-balance annual rate (%) for a flat rate over `months`. */
export function flatToReducingRate(flatRate, months) {
  return solveRate(1, flatRateEmi(1, flatRate, months), months);
}