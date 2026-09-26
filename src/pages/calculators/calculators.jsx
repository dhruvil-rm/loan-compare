import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faArrowRight, faCalculator } from "@fortawesome/free-solid-svg-icons";
import usePageMeta from "../../hooks/usePageMeta.js";
import { calculators, calculatorCategories } from "../../data/calculators.js";
import DisplayAd from "../../components/Ads/DisplayAd.jsx"
import "./calculators.css";

function Calculators() {
  usePageMeta(
    "Free Loan Calculators & Tools",
    "Free loan calculators and tools: estimate EMIs, interest and repayment schedules for home, car, bike, personal, education, business and gold loans. For information only."
  );

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return calculators.filter(
      (c) =>
        (category === "All" || c.category === category) &&
        (!q || `${c.title} ${c.summary} ${c.category}`.toLowerCase().includes(q))
    );
  }, [query, category]);

  return (
    <section className="calcs">
      <div className="container">
        <h1 className="calcs__title">Free Loan Calculators &amp; Tools</h1>
        <p className="calcs__intro">
          Estimate EMIs, interest and repayment schedules. Every calculation runs in your browser and
          nothing you enter is stored or sent anywhere.
        </p>

        <div className="calcs__controls">
          <div className="calcs__search">
            <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />
            <input
              type="search"
              aria-label="Search calculators"
              placeholder="Search calculators, e.g. home, car, EMI"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="calcs__filters" role="group" aria-label="Filter by category">
            {["All", ...calculatorCategories].map((cat) => (
              <button
                key={cat}
                type="button"
                className={`btn-outline ${category === cat ? "active" : ""}`}
                aria-pressed={category === cat}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <center className="pills">Advertisement</center>
        <DisplayAd
          adUnitPath="/23345011043/loanmathpro.com/dis-1"
          size={[300, 250]}
          divId="ad-top"
          sizeMapping={[
            [[1024, 0], [[728, 90], [468, 60], [336, 280], [300, 250]]],
            [[768, 0], [[468, 60], [300, 250], [320, 100]]],
            [[0, 0], [[300, 250], [320, 50]]],
          ]}
          style={{
            margin: "30px auto",
          }}
        />

        {visible.length ? (
          <ul className="calcs__grid card-grid">
            {visible.map((c) => (
              <li key={c.slug}>
                <Link to={`/calculators/${c.slug}`} className="calcs__card">
                  <span className="calcs__card-icon" aria-hidden="true">
                    <FontAwesomeIcon icon={faCalculator} />
                  </span>
                  <h2 className="calcs__card-title">{c.title}</h2>
                  <p className="calcs__card-text">{c.summary}</p>
                  <span className="calcs__card-cta">
                    Open calculator <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="calcs__empty" role="status">
            No calculators match your search.
          </p>
        )}
      </div>

      <center className="pills">Advertisement</center>
      <DisplayAd
        adUnitPath="/23345011043/loanmathpro.com/dis-2"
        size={[300, 250]}
        divId="ad-mid"
        sizeMapping={[
          [[1024, 0], [[728, 90], [468, 60], [336, 280], [300, 250]]],
          [[768, 0], [[468, 60], [300, 250], [320, 100]]],
          [[0, 0], [[300, 250], [320, 50]]],
        ]}
        style={{
          margin: "30px auto",
        }}
      />

    </section>
  );
}

export default Calculators;