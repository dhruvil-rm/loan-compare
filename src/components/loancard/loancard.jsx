import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faArrowRight,
  faCar,
  faMotorcycle,
  faGraduationCap,
  faBuildingColumns,
  faLandmark,
} from "@fortawesome/free-solid-svg-icons";
import { formatAPR } from "../../data/loans.js";
import "./loancard.css";

const iconMap = {
  car: faCar,
  motorcycle: faMotorcycle,
  "graduation-cap": faGraduationCap,
  "building-columns": faBuildingColumns,
  landmark: faLandmark,
  bolt: faBolt,
};

function LoanLogo({ loan }) {
  const [failed, setFailed] = useState(false);
  const icon = iconMap[loan.icon] || faBuildingColumns;
  const src = loan.redirectDomain
    ? `https://www.google.com/s2/favicons?domain=${loan.redirectDomain}&sz=128`
    : null;

  return (
    <div className="loan-card__logo">
      {src && !failed ? (
        <img src={src} alt="" loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <FontAwesomeIcon icon={icon} style={{ color: loan.logoColor }} />
      )}
    </div>
  );
}

function LoanCard({ loan, badge }) {
  const badgeText = badge || loan.badge;

  return (
    <article className="loan-card">
      {badgeText && <span className="loan-card__badge">{badgeText}</span>}

      <div className="loan-card__top">
        <LoanLogo loan={loan} />
        <div className="loan-card__title-wrap">
          <h3 className="loan-card__title">
            <Link to={`/item/${loan.id}`}>{loan.shortName}</Link>
          </h3>
          <span className="loan-card__type">{loan.typeLabel}</span>
        </div>
        <span className="loan-card__apr">{formatAPR(loan)}</span>
      </div>

      <div className="loan-card__pills">
        <span className="loan-card__pill">{/^up to/i.test(loan.amountLabel) ? loan.amountLabel : `Up to ${loan.amountLabel}`}</span>
        <span className="loan-card__pill">{loan.tenureLabel.replace("months", "mo")}</span>
        {loan.speedTag && (
          <span className="loan-card__pill loan-card__pill--speed">
            <FontAwesomeIcon icon={faBolt} /> {loan.speedTag}
          </span>
        )}
      </div>

      <p className="loan-card__blurb">{loan.blurb}</p>

      <Link to={`/item/${loan.id}`} className="loan-card__cta">
        Check rates <FontAwesomeIcon icon={faArrowRight} />
      </Link>
    </article>
  );
}

export default LoanCard;
