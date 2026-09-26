import Hero from "../../components/hero/hero.jsx";
import LoanCard from "../../components/loancard/loancard.jsx";
import BlogCard from "../../components/blogcard/blogcard.jsx";
import { getLoanById } from "../../data/loans.js";
import { blogPosts } from "../../data/blogPosts.js";
import DisplayAd from "../../components/Ads/DisplayAd.jsx"
import "./home.css";

// Matches the "Recently added" order seen on the live site.
const recentlyAddedOrder = [
  "bob-gyan-education",
  "hdfc-bank-new-car-loan",
  "poonawalla-fincorp-personal",
  "axis-education",
  "sbi-new-car-loan",
  "1d69da18-458c-4046-bb38-39b2ea8b40b0",
  "icici-education",
  "icici-bank-car-loan",
  "icici-bank-personal",
  "canara-vidya-turant",
  "axis-two-wheeler",
  "axis-bank-personal",
  "pnb-saraswati-education",
  "icici-two-wheeler",
  "kotak-mahindra-personal",
  "sbi-student-loan-scheme",
  "hdfc-two-wheeler",
  "idfc-first-personal",
  "hdfc-education",
  "hero-fincorp-two-wheeler",
];

function Home() {
  const recentlyAdded = recentlyAddedOrder.map(getLoanById).filter(Boolean);
  const latestBlogPosts = blogPosts.slice(0, 3);
  const firstBatch = recentlyAdded.slice(0, 6);
  const remainingBatch = recentlyAdded.slice(6);

  return (
    <>
      <Hero />

      <section className="home-recent">
        <div className="container">
          <h2 className="section-title">Recently added</h2>
          <div className="home-recent__grid card-grid">
            {firstBatch.map((loan) => (
              <LoanCard key={loan.id} loan={loan} />
            ))}
          </div>

          {remainingBatch.length > 0 && (
            <>
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

              <div className="home-recent__grid card-grid">
                {remainingBatch.map((loan) => (
                  <LoanCard key={loan.id} loan={loan} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="home-blog">
        <div className="container">
          <h2 className="section-title">Latest from the blog</h2>
          <div className="home-blog__grid card-grid">
            {latestBlogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <center className="pills">Advertisement</center>
      <DisplayAd
        adUnitPath="/23345011043/loanmathpro.com/dis-3"
        size={[300, 250]}
        divId="ad-bottom"
        sizeMapping={[
          [[1024, 0], [[728, 90], [468, 60], [336, 280], [300, 250]]],
          [[768, 0], [[468, 60], [300, 250], [320, 100]]],
          [[0, 0], [[300, 250], [320, 50]]],
        ]}
        style={{
          margin: "30px auto",
        }}
      />
    </>
  );
}

export default Home;