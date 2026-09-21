import BlogCard from "../../components/blogcard/blogcard.jsx";
import LoanCard from "../../components/loancard/loancard.jsx";
import { loans } from "../../data/loans.js";
import { blogPosts } from "../../data/blogPosts.js";
import "./blog.css";

const trendingLoanIds = [
  "axis-bank-car-loan",
  "icici-bank-car-loan",
  "sbi-new-car-loan",
  "hdfc-bank-new-car-loan",
  "poonawalla-fincorp-personal",
  "1d69da18-458c-4046-bb38-39b2ea8b40b0",
];

function Blog() {
  const [featured, ...rest] = blogPosts;
  const trending = trendingLoanIds
    .map((id) => loans.find((l) => l.id === id))
    .filter(Boolean);

  return (
    <section className="blog-page">
      <div className="container">
        <header className="blog-page__header">
          <h1>Blog</h1>
          <p>Guides, comparisons, and expert analysis</p>
        </header>

        <BlogCard post={featured} featured />

        <div className="blog-page__grid card-grid">
          {rest.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <h2 className="section-title blog-page__trending-title">Trending items</h2>
        <div className="blog-page__trending-grid card-grid">
          {trending.map((loan) => (
            <LoanCard key={loan.id} loan={loan} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;
