import { useId, useMemo, useState } from "react";
import { summarizeLoan } from "../../lib/loanMath.js";
import { formatMoney } from "../../lib/format.js";
import { siteConfig } from "../../config/site.js";
import DonutChart from "../donutchart/donutchart.jsx";
import "./loanemicalculator.css";

function NumberField({ label, value, onChange, min, max, step, prefix, suffix }) {
  const id = useId();
  const sliderValue = Math.min(Math.max(Number(value) || min, min), max);

  return (
    <div className="emi-field">
      <label htmlFor={id}>{label}</label>
      <div className="emi-field__input">
        {prefix && <span aria-hidden="true">{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {suffix && <span aria-hidden="true">{suffix}</span>}
      </div>
      <input
        className="emi-field__slider"
        type="range"
        aria-label={`${label} slider`}
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

// Reusable EMI calculator. Generic EMI, Home, Car, Bike, Personal, Education,
// Business and Gold loan pages are all this component with different props.
function LoanEmiCalculator({
  principalLabel = "Loan amount",
  defaults = { principal: 500000, rate: 10, tenure: 5 },
  limits = { principal: [10000, 100000000], rate: [1, 30], tenureYears: [1, 30] },
  currencySymbol = siteConfig.currencySymbol,
}) {
  const [principal, setPrincipal] = useState(String(defaults.principal));
  const [rate, setRate] = useState(String(defaults.rate));
  const [tenure, setTenure] = useState(String(defaults.tenure));
  const [unit, setUnit] = useState("years");
  const unitId = useId();

  const P = Number(principal);
  const R = Number(rate);
  const months = unit === "years" ? Number(tenure) * 12 : Number(tenure);
  const valid = P > 0 && R >= 0 && months >= 1 && Number.isFinite(P + R + months);

  const result = useMemo(
    () => (valid ? summarizeLoan(P, R, Math.round(months)) : null),
    [valid, P, R, months]
  );

  function changeUnit(next) {
    const t = Number(tenure) || 0;
    setTenure(String(next === "months" ? Math.round(t * 12) : Math.round((t / 12) * 100) / 100));
    setUnit(next);
  }

  const tenureLimits = unit === "years" ? limits.tenureYears : limits.tenureYears.map((y) => y * 12);

  return (
    <section className="emi-calc" aria-label="EMI calculator">
      <form className="emi-calc__form" onSubmit={(e) => e.preventDefault()}>
        <NumberField
          label={principalLabel}
          value={principal}
          onChange={setPrincipal}
          min={limits.principal[0]}
          max={limits.principal[1]}
          step={10000}
          prefix={currencySymbol}
        />
        <NumberField
          label="Interest rate (per year)"
          value={rate}
          onChange={setRate}
          min={limits.rate[0]}
          max={limits.rate[1]}
          step={0.05}
          suffix="%"
        />
        <NumberField
          label={`Tenure (${unit})`}
          value={tenure}
          onChange={setTenure}
          min={tenureLimits[0]}
          max={tenureLimits[1]}
          step={unit === "years" ? 0.5 : 1}
        />
        <div className="emi-field">
          <label htmlFor={unitId}>Tenure unit</label>
          <select id={unitId} value={unit} onChange={(e) => changeUnit(e.target.value)}>
            <option value="years">Years</option>
            <option value="months">Months</option>
          </select>
        </div>
      </form>

      <div className="emi-calc__result" aria-live="polite">
        {result ? (
          <>
            <p className="emi-calc__emi-label">Monthly EMI</p>
            <p className="emi-calc__emi">{formatMoney(result.emi, currencySymbol)}</p>
            <dl className="emi-calc__totals">
              <div>
                <dt>Principal</dt>
                <dd>{formatMoney(P, currencySymbol)}</dd>
              </div>
              <div>
                <dt>Total interest</dt>
                <dd>{formatMoney(result.totalInterest, currencySymbol)}</dd>
              </div>
              <div>
                <dt>Total payment</dt>
                <dd>{formatMoney(result.totalPayment, currencySymbol)}</dd>
              </div>
            </dl>
            <DonutChart principal={P} interest={result.totalInterest} />
          </>
        ) : (
          <p className="emi-calc__error" role="alert">
            Enter a loan amount above 0, a rate of 0 or more, and a tenure of at least 1 month.
          </p>
        )}
      </div>
    </section>
  );
}

export default LoanEmiCalculator;