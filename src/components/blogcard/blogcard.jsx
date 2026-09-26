import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChartLine, faCarSide, faScaleBalanced } from "@fortawesome/free-solid-svg-icons";
import "./blogcard.css";

const illustrationIcon = {
  compare: faScaleBalanced,
  myths: faScaleBalanced,
  carcompare: faCarSide,
  keypicks: faCarSide,
  bestcarloan: faChartLine,
};

function BlogMedia({ post }) {
  const [failed, setFailed] = useState(false);
  const icon = illustrationIcon[post.illustration] || faChartLine;

  if (post.image && !failed) {
    return (
      <img
        className="blog-card__media-img"
        src={post.image}
        alt={post.title}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  return <FontAwesomeIcon icon={icon} className="blog-card__media-icon" />;
}

function BlogCard({ post, featured = false }) {
  return (
    <article className={`blog-card ${featured ? "blog-card--featured" : ""}`}>
      <a href={`/blog/${post.slug}/`} className="blog-card__media">
        <BlogMedia post={post} />
      </a>
      <div className="blog-card__body">
        <span className="blog-card__category">{post.category}</span>
        <h3 className="blog-card__title">
          <a href={`/blog/${post.slug}/`}>{post.title}</a>
        </h3>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        {featured && <span className="blog-card__date">{post.date}</span>}
        <a href={`/blog/${post.slug}/`} className="blog-card__link">
          Read more <FontAwesomeIcon icon={faArrowRight} />
        </a>
      </div>
    </article>
  );
}

export default BlogCard;
