import { Link, Navigate, useParams } from "react-router-dom";
import LoanEmiCalculator from "../../components/loanemicalculator/loanemicalculator.jsx";
import usePageMeta from "../../hooks/usePageMeta.js";
import DisplayAd from "../../components/Ads/DisplayAd.jsx";
import { getCalculator } from "../../data/calculators.js";
import "./calculator.css";

const components = {
  emi: LoanEmiCalculator,
};

function CalculatorPage() {
  const { slug } = useParams();
  const calc = getCalculator(slug);
  usePageMeta(calc?.metaTitle, calc?.metaDescription);

  if (!calc) return <Navigate to="/" replace />;
  const Tool = components[calc.kind];

  return (
    <article className="calc-page">
      <div className="container calc-page__container">
        <nav className="calc-page__crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link> / <Link to="/calculators">Calculators</Link> / <span aria-current="page">{calc.title}</span>
        </nav>

        <h1 className="calc-page__title">{calc.title}</h1>
        <p className="calc-page__intro">{calc.intro}</p>

        <center className="pills">Advertisement</center>
        <DisplayAd
          adUnitPath="/23345011043/loanmathpro.com/dis-6"
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

        <Tool {...calc.props} />

        <section>
          <h2>About this calculator</h2>
          {calc.about.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </section>

        <section>
          <h2>Formula used</h2>
          <p className="calc-page__formula">
            <code>{calc.formula.main}</code>
          </p>
          <ul className="calc-page__where">
            {calc.formula.where.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <p className="calc-page__note">
          Results are estimates for informational and educational purposes only, not financial advice.
        </p>

        <center className="pills">Advertisement</center>
        <DisplayAd
          adUnitPath="/23345011043/loanmathpro.com/dis-7"
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
      </div>
    </article>
  );
}

export default CalculatorPage;