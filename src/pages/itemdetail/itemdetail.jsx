import { useParams, Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faPenNib,
  faBullseye,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import LoanCard from "../../components/loancard/loancard.jsx";
import BlogCard from "../../components/blogcard/blogcard.jsx";
import { loans, getLoanById, formatAPR } from "../../data/loans.js";
import { blogPosts } from "../../data/blogPosts.js";
import "./itemdetail.css";

function ItemDetail() {
  const { id } = useParams();
  const loan = getLoanById(id);

  if (!loan) return <Navigate to="/" replace />;

  const similarOptions = loans
    .filter((l) => l.category === loan.category && l.id !== loan.id)
    .slice(0, 6);

  const relatedArticles = blogPosts.slice(0, 5);

  return (
    <article className="item-detail">
      <div className="container item-detail__container">
        <div className="item-detail__prose">
          <Link to="/search" className="item-detail__back">
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </Link>

          <p className="item-detail__checked">
            Last checked on {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.
            We may earn a commission when you click through.
          </p>

          <span className="item-detail__type">{loan.typeLabel}</span>

          <h1 className="item-detail__title">{loan.name} - {loan.tagline}</h1>
          <p className="item-detail__lender">{loan.lender}</p>
          <p className="item-detail__updated">Updated {loan.updated}</p>

          <div className="item-detail__pills">
            <span className="item-detail__apr">{formatAPR(loan)}</span>
            <span className="item-detail__pill">{loan.amountLabel}</span>
            <span className="item-detail__pill">{loan.tenureLabel}</span>
            {loan.speedTag && <span className="item-detail__pill item-detail__pill--speed">{loan.speedTag}</span>}
          </div>

          <div className="item-detail__apply-panel">
            <div>
              <p className="item-detail__apply-title">Ready to apply? Check your eligibility now.</p>
            </div>
            <a
              href={`https://${loan.redirectDomain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary item-detail__apply-btn"
            >
              Check eligibility <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </div>

          <p className="item-detail__redirect-note">You&rsquo;ll be redirected to {loan.redirectDomain}</p>

          <div className="item-detail__box item-detail__box--verdict">
            <h3>
              <FontAwesomeIcon icon={faPenNib} /> Our Verdict
            </h3>
            <p>{loan.verdict}</p>
          </div>

          <div className="item-detail__box">
            <h3>
              <FontAwesomeIcon icon={faBullseye} /> Best For
            </h3>
            <p>{loan.bestFor}</p>
          </div>

          <div className="item-detail__box item-detail__box--warn">
            <h3>
              <FontAwesomeIcon icon={faTriangleExclamation} /> Watch Out
            </h3>
            <p>{loan.watchOut}</p>
          </div>

          <div className="item-detail__box">
            <h3>Requirements</h3>
            <ol className="item-detail__requirements">
              {loan.requirements.map((req, i) => (
                <li key={req}>
                  <span className="item-detail__req-num">{i + 1}</span>
                  {req}
                </li>
              ))}
            </ol>
          </div>

          <h2 className="item-detail__section-title">Expert Analysis</h2>
          {loan.expertAnalysis.map((para, i) => (
            <p key={i} className="item-detail__analysis-para">
              {para}
            </p>
          ))}

          <div className="item-detail__final-cta">
            <p className="item-detail__final-note">
              Rates shown are representative. Your actual rate may differ based on your
              circumstances. We may earn a commission for referrals.
            </p>
            <div className="item-detail__final-cta-right">
              <a
                href={`https://${loan.redirectDomain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Check eligibility <FontAwesomeIcon icon={faArrowRight} />
              </a>
              <span className="item-detail__final-redirect">You&rsquo;ll be redirected to {loan.redirectDomain}</span>
            </div>
          </div>
        </div>

        {similarOptions.length > 0 && (
          <>
            <h2 className="item-detail__section-title">Similar options</h2>
            <div className="item-detail__grid card-grid">
              {similarOptions.map((l) => (
                <LoanCard key={l.id} loan={l} />
              ))}
            </div>
          </>
        )}

        <h2 className="item-detail__section-title">Related Articles</h2>
        <div className="item-detail__articles-grid card-grid">
          {relatedArticles.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </article>
  );
}

export default ItemDetail;
