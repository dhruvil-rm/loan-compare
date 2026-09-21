import { Link } from "react-router-dom";
import "./footer.css";

const legalLinks = [
  { label: "Disclosure", to: "/disclosure" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Use", to: "/terms" },
  { label: "Editorial Policy", to: "/editorial" },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <nav className="footer__nav">
          <Link to="/search">Browse All</Link>
          <Link to="/blog">Articles</Link>
        </nav>

        <hr className="footer__rule" />

        <p className="footer__copy">
          &copy; {year} Jyncow. Published and operated by 4ADS MEDIA LLC, registered in
          Florida, US (L21000233395), EIN 37-2002466, 5401 S Kirkman RD, Suite 135 - Orlando,
          FL 32819.
        </p>

        <p className="footer__disclosure">
          Terms and conditions apply. Loan offers, interest rates, and repayment terms are
          subject to the lender's final assessment and Reserve Bank of India (RBI) guidelines,
          including digital lending regulations. This website is an independent comparison
          portal and not a bank or Non-Banking Financial Company (NBFC) regulated by the RBI;
          we do not provide loans, make credit decisions, or guarantee approval.
        </p>

        <ul className="footer__legal">
          {legalLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
