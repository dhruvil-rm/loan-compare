import { formatPercent } from "../../lib/format.js";
import "./donutchart.css";

// Dependency-free SVG donut: principal vs interest split.
function DonutChart({ principal, interest }) {
  const total = principal + interest;
  const interestShare = total > 0 ? interest / total : 0;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="donut">
      <svg
        className="donut__svg"
        viewBox="0 0 200 200"
        role="img"
        aria-label={`Principal ${formatPercent((1 - interestShare) * 100)}, interest ${formatPercent(interestShare * 100)}`}
      >
        <circle cx="100" cy="100" r={radius} fill="none" stroke="var(--green-500)" strokeWidth="28" />
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="var(--orange-text)"
          strokeWidth="28"
          strokeDasharray={`${circumference * interestShare} ${circumference}`}
          transform="rotate(-90 100 100)"
        />
      </svg>
      <ul className="donut__legend">
        <li>
          <span className="donut__dot donut__dot--principal" aria-hidden="true" />
          Principal {formatPercent((1 - interestShare) * 100)}
        </li>
        <li>
          <span className="donut__dot donut__dot--interest" aria-hidden="true" />
          Interest {formatPercent(interestShare * 100)}
        </li>
      </ul>
    </div>
  );
}

export default DonutChart;