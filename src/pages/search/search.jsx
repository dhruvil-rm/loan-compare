import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LoanCard from "../../components/loancard/loancard.jsx";
import LoanFilter from "../../components/loanfilter/loanfilter.jsx";
import { loans, categories } from "../../data/loans.js";
import "./search.css";

const MIN_AMOUNT = 10000;
const MAX_AMOUNT = 5000000;
const STOP_WORDS = new Set(["loan", "loans", "for", "the", "and", "with", "get", "best"]);

function formatCurrency(value) {
  return `\u20b9${Number(value).toLocaleString("en-IN")}`;
}

function speedRank(loan) {
  const s = (loan.speedTag || "").toLowerCase();
  if (/minute/.test(s)) return 0;
  if (/same day|hour/.test(s)) return 1;
  const m = s.match(/(\d+)/);
  if (/day/.test(s) && m) return 1 + Number(m[1]);
  return 99;
}

function tenureMax(loan) {
  const nums = (loan.tenureLabel || "").match(/\d+/g);
  return nums ? Math.max(...nums.map(Number)) : 0;
}

function loanHaystack(loan) {
  return [
    loan.name,
    loan.lender,
    loan.tagline,
    loan.subtitle,
    loan.blurb,
    loan.bestFor,
    loan.typeLabel,
    loan.category,
    ...(loan.requirements || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function matchesQuery(loan, tokens) {
  if (tokens.length === 0) return true;
  const hay = loanHaystack(loan);
  return tokens.every((t) => hay.includes(t));
}

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get("loan_type") || "all";
  const amountParam = Number(searchParams.get("amount")) || MIN_AMOUNT;
  const query = searchParams.get("q") || "";
  const sort = searchParams.get("sort") || "relevance";

  const [amount, setAmount] = useState(amountParam);
  useEffect(() => setAmount(amountParam), [amountParam]);

  function updateParams(patch, replace = false) {
    const next = new URLSearchParams(searchParams);
    Object.entries(patch).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });
    setSearchParams(next, { replace });
  }

  const results = useMemo(() => {
    const tokens = query
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((t) => t.length > 2 && !STOP_WORDS.has(t));

    const list = loans.filter((loan) => {
      const matchesCategory = activeCategory === "all" || loan.category === activeCategory;
      const withinAmount = (loan.amountMin ?? 0) <= amount && loan.amountMax >= amount;
      return matchesCategory && withinAmount && matchesQuery(loan, tokens);
    });

    if (sort === "apr") list.sort((a, b) => a.aprMin - b.aprMin);
    else if (sort === "fast") list.sort((a, b) => speedRank(a) - speedRank(b));
    else if (sort === "tenure") list.sort((a, b) => tenureMax(b) - tenureMax(a));

    return list;
  }, [activeCategory, amount, query, sort]);

  const pct = ((amount - MIN_AMOUNT) / (MAX_AMOUNT - MIN_AMOUNT)) * 100;

  return (
    <section className="search-page">
      <div className="container">
        <label className="search-page__label" htmlFor="amount-slider">
          How much do you need?
        </label>
        <div className="search-page__amount-row">
          <div className="search-page__slider-box">
            <input
              id="amount-slider"
              type="range"
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              step={5000}
              value={amount}
              style={{ "--pct": `${pct}%` }}
              onChange={(e) => {
                setAmount(Number(e.target.value));
                updateParams({ amount: e.target.value }, true);
              }}
            />
            <span className="search-page__amount-value">{formatCurrency(amount)}</span>
          </div>
          <button
            type="button"
            className="btn-primary search-page__amount-btn"
            onClick={() => updateParams({ amount })}
          >
            Search
          </button>
        </div>

        <LoanFilter
          options={categories}
          active={activeCategory}
          onChange={(key) => updateParams({ loan_type: key === "all" ? null : key })}
        />

        <hr className="search-page__rule" />

        <div className="search-page__head">
          <h2 className="search-page__count">
            {results.length} {results.length === 1 ? "result" : "results"}
            {query && <span className="search-page__query"> for &ldquo;{query}&rdquo;</span>}
          </h2>
          <label className="search-page__sort">
            Sort by
            <select value={sort} onChange={(e) => updateParams({ sort: e.target.value === "relevance" ? null : e.target.value })}>
              <option value="relevance">Relevance</option>
              <option value="apr">Lowest APR</option>
              <option value="fast">Fastest approval</option>
              <option value="tenure">Longest tenure</option>
            </select>
          </label>
        </div>

        {results.length === 0 ? (
          <p className="search-page__empty">
            No loans match these filters yet. Try a lower amount or a different category.
          </p>
        ) : (
          <div className="search-page__grid card-grid">
            {results.map((loan) => (
              <LoanCard key={loan.id} loan={loan} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Search;