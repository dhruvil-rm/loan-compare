import { siteConfig } from "../config/site.js";

// Display-only rounding (2 decimals). Calculations keep full precision.
export function formatMoney(value, symbol = siteConfig.currencySymbol) {
  if (!Number.isFinite(value)) return "—";
  const n = new Intl.NumberFormat(siteConfig.locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  return `${symbol}${n}`;
}

export function formatPercent(value, digits = 1) {
  return Number.isFinite(value) ? `${value.toFixed(digits)}%` : "—";
}