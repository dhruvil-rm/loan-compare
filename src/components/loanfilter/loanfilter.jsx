import "./loanfilter.css";

function LoanFilter({ options, active, onChange }) {
  return (
    <div className="loan-filter" role="tablist">
      {options.map((opt) => (
        <button
          key={opt.key}
          type="button"
          role="tab"
          aria-selected={active === opt.key}
          className={`loan-filter__pill ${active === opt.key ? "loan-filter__pill--active" : ""}`}
          onClick={() => onChange(opt.key)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default LoanFilter;
