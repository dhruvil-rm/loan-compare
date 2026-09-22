import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowRight,
  faShieldHalved,
  faLock,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import LoanFilter from "../loanfilter/loanfilter.jsx";
import { loanTypeTabs } from "../../data/loans.js";
import "./hero.css";

const featureCards = [
  {
    key: "low-interest",
    to: "/search?sort=apr",
    title: "Low Interest Loans",
    badge: "POPULAR",
    text: "Compare rates from trusted lenders",
  },
  {
    key: "fast-approval",
    to: "/search?sort=fast",
    title: "Fast Approval",
    badge: "TRENDING",
    text: "Compare rates from trusted lenders",
  },
  {
    key: "flexible-repayment",
    to: "/search?sort=tenure",
    title: "Flexible Repayment",
    badge: "NEW",
    text: "Compare rates from trusted lenders",
  },
];

const tabFilters = {
  personal: { loan_type: "personal" },
  express: { loan_type: "personal", sort: "fast" },
  quick: { sort: "fast" },
  secured: { loan_type: "auto" },
};

function Hero() {
  const [activeType, setActiveType] = useState("personal");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = query.trim();
    const params = new URLSearchParams(trimmed ? {} : tabFilters[activeType] || {});
    if (trimmed) params.set("q", trimmed);
    const qs = params.toString();
    navigate(`/search${qs ? `?${qs}` : ""}`);
  }

  return (
    <section className="hero">
      <div className="container">
        <h1 className="hero__title">Compare personal loans</h1>
        <p className="hero__subtitle">
          Real rates from banks and fintechs. Compared side by side, no affiliate bias.
        </p>

        <form className="hero__panel" onSubmit={handleSubmit}>
          <div className="hero__panel-tabs">
            <span className="hero__panel-label">LOAN TYPE</span>
            <LoanFilter options={loanTypeTabs} active={activeType} onChange={setActiveType} />
          </div>

          <div className="hero__panel-search">
            <div className="hero__search-input">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input
                type="text"
                placeholder="e.g. bad credit, home improvement, debt consolidation"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary hero__search-btn">
              Find Loans <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </form>

        <div className="hero__feature-grid">
          {featureCards.map((card) => (
            <article className="hero__feature-card" key={card.key}>
              <div className="hero__feature-top">
                <h3>{card.title}</h3>
                <span className={`hero__feature-badge hero__feature-badge--${card.badge.toLowerCase()}`}>
                  {card.badge}
                </span>
              </div>
              <p>{card.text}</p>
              <button
                type="button"
                className="hero__feature-link"
                onClick={() => navigate(card.to)}
              >
                Browse <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </article>
          ))}
        </div>

        <ul className="hero__trust">
          <li>
            <FontAwesomeIcon icon={faShieldHalved} /> Independent comparison
          </li>
          <li>
            <FontAwesomeIcon icon={faLock} /> No credit score impact
          </li>
          <li>
            <FontAwesomeIcon icon={faClock} /> Updated daily
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Hero;