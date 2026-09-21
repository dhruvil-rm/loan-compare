// Run with: npm test   (uses Node's built-in test runner — no extra dependency)
import test from "node:test";
import assert from "node:assert/strict";
import {
  calcEmi,
  calcPrincipal,
  calcTenure,
  solveRate,
  summarizeLoan,
  buildSchedule,
  flatToReducingRate,
} from "./loanMath.js";

const close = (a, b, tol = 1e-6) => assert.ok(Math.abs(a - b) <= tol, `${a} !~ ${b}`);

test("known EMI: P=100000, 10% p.a., 12 months ≈ 8791.59", () => {
  assert.equal(calcEmi(100000, 10, 12).toFixed(2), "8791.59");
});

test("r = 0 (interest-free) => EMI = P / n", () => {
  assert.equal(calcEmi(120000, 0, 12), 10000);
  const s = summarizeLoan(120000, 0, 12);
  assert.equal(s.totalInterest, 0);
  assert.equal(buildSchedule({ principal: 120000, annualRate: 0, months: 12 }).rows.at(-1).balance, 0);
});

test("amortization schedule ends at exactly 0 and principal sums to P", () => {
  for (const [p, rate, n] of [[100000, 10, 12], [5000000, 8.5, 240], [250000, 14.25, 37], [75000, 0.5, 60]]) {
    const { rows, months } = buildSchedule({ principal: p, annualRate: rate, months: n });
    assert.equal(months, n);
    assert.equal(rows.at(-1).balance, 0);
    close(rows.reduce((s, r) => s + r.principal, 0), p, 1e-4);
  }
});

test("summary matches schedule totals", () => {
  const s = summarizeLoan(500000, 9, 60);
  const sched = buildSchedule({ principal: 500000, annualRate: 9, months: 60 });
  close(s.totalInterest, sched.totalInterest, 1e-3);
});

test("prepayment — reduce tenure: closes earlier, saves interest", () => {
  const base = buildSchedule({ principal: 1000000, annualRate: 9, months: 240 });
  const pre = buildSchedule({
    principal: 1000000, annualRate: 9, months: 240,
    prepayment: { month: 12, amount: 200000, mode: "tenure" },
  });
  assert.ok(pre.months < base.months);
  assert.ok(pre.totalInterest < base.totalInterest);
  assert.equal(pre.rows.at(-1).balance, 0);
});

test("prepayment — reduce EMI: same tenure, lower EMI", () => {
  const base = buildSchedule({ principal: 1000000, annualRate: 9, months: 240 });
  const pre = buildSchedule({
    principal: 1000000, annualRate: 9, months: 240,
    prepayment: { month: 12, amount: 200000, mode: "emi" },
  });
  assert.equal(pre.months, 240);
  assert.ok(pre.rows[13].payment < base.rows[13].payment);
  assert.ok(pre.totalInterest < base.totalInterest);
  assert.equal(pre.rows.at(-1).balance, 0);
});

test("reverse solvers round-trip", () => {
  const emi = calcEmi(750000, 11.5, 84);
  close(calcPrincipal(emi, 11.5, 84), 750000, 1e-4);
  close(calcTenure(750000, 11.5, emi), 84, 1e-6);
  close(solveRate(750000, emi, 84), 11.5, 1e-6);
  assert.equal(solveRate(100000, 100, 12), null); // EMI too small to repay P
  assert.equal(calcTenure(100000, 10, 500), Infinity); // EMI below monthly interest
});

test("flat rate 10% over 12 months ≈ 17.97% reducing", () => {
  close(flatToReducingRate(10, 12), 17.97, 0.01);
});