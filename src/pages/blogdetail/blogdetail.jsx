import { useParams, Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import LoanCard from "../../components/loancard/loancard.jsx";
import BlogCard from "../../components/blogcard/blogcard.jsx";
import { getLoanById } from "../../data/loans.js";
import { blogPosts, getBlogBySlug } from "../../data/blogPosts.js";
import "./blogdetail.css";

const relatedLoanIds = [
  "axis-bank-car-loan",
  "icici-bank-car-loan",
  "sbi-new-car-loan",
  "hdfc-bank-new-car-loan",
  "hero-fincorp-two-wheeler",
  "axis-two-wheeler",
];

function GroupItem({ item }) {
  const loan = getLoanById(item.loanId);

  return (
    <div className="blog-detail__row">
      <div className="blog-detail__row-text">
        <h3>{item.heading}</h3>
        <p>{item.text}</p>
      </div>
      {loan && (
        <div className="blog-detail__row-card">
          <LoanCard loan={loan} badge={item.badge} />
        </div>
      )}
    </div>
  );
}

function BlogDetail() {
  const { slug } = useParams();
  const post = getBlogBySlug(slug);

  if (!post) return <Navigate to="/blog" replace />;

  const moreArticles = blogPosts.filter((p) => p.slug !== slug).slice(0, 4);
  const relatedLoans = relatedLoanIds.map(getLoanById).filter(Boolean);
  const closingLinkPost = post.closing?.linkSlug ? getBlogBySlug(post.closing.linkSlug) : null;

  return (
    <article className="blog-detail">
      <div className="container blog-detail__container">
        <div className="blog-detail__prose">
          <Link to="/blog" className="blog-detail__back">
            <FontAwesomeIcon icon={faArrowLeft} /> All articles
          </Link>

          <div className="blog-detail__meta">
            <span className="blog-detail__category">{post.category}</span>
            <span className="blog-detail__date">
              {post.date} &middot; {post.author}
            </span>
          </div>

          <p className="blog-detail__disclosure">
            Jyncow is an independent financial comparison platform. We may earn a commission
            when you click through.
          </p>

          <h1 className="blog-detail__title">{post.title}</h1>
          <p className="blog-detail__excerpt">{post.excerpt}</p>

          {post.quickPicks && (
            <div className="blog-detail__quickpicks">
              <h2>Quick Picks</h2>
              <ul>
                {post.quickPicks.map((pick) => {
                  const loan = getLoanById(pick.loanId);
                  return (
                    <li key={pick.label}>
                      <strong>{pick.label}:</strong>{" "}
                      {loan ? (
                        <Link to={`/item/${loan.id}`}>{loan.shortName}</Link>
                      ) : (
                        pick.label
                      )}
                      .
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {post.groups &&
            post.groups.map((group) => (
              <section className="blog-detail__group" key={group.groupHeading}>
                <h2 className="blog-detail__subheading">{group.groupHeading}</h2>
                {group.groupIntro && <p>{group.groupIntro}</p>}
                {group.disclaimer && (
                  <p className="blog-detail__disclaimer">{group.disclaimer}</p>
                )}
                {group.items.map((item) => (
                  <GroupItem item={item} key={item.heading} />
                ))}
              </section>
            ))}

          {post.body &&
            post.body.map((block, i) => (
              <div key={i}>
                {block.heading && <h2 className="blog-detail__subheading">{block.heading}</h2>}
                <p>{block.text}</p>
              </div>
            ))}

          {post.closing && (
            <p className="blog-detail__closing">
              {post.closing.text}
              {post.closing.linkText && closingLinkPost && (
                <>
                  {" "}
                  <Link to={`/blog/${post.closing.linkSlug}`} className="blog-detail__inline-link">
                    {post.closing.linkText}
                  </Link>
                  .
                </>
              )}
            </p>
          )}

          <Link to="/blog" className="blog-detail__all-articles">
            <FontAwesomeIcon icon={faArrowLeft} /> All articles
          </Link>
        </div>

        <h2 className="section-title blog-detail__section-title">You might also like</h2>
        <div className="blog-detail__grid card-grid">
          {relatedLoans.map((loan) => (
            <LoanCard key={loan.id} loan={loan} />
          ))}
        </div>

        <h2 className="section-title blog-detail__section-title">More articles</h2>
        <div className="blog-detail__articles-grid card-grid">
          {moreArticles.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </article>
  );
}

export default BlogDetail;
