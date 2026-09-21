import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet, faPhone, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
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
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__brand-head">
              <span className="footer__brand-mark">
                <FontAwesomeIcon icon={faDroplet} />
              </span>
              <div>
                <div className="footer__brand-name">ON-TAP SOLUTION</div>
                <div className="footer__brand-sub">IT &amp; SOFTWARE SERVICES</div>
              </div>
            </div>
            <p className="footer__proprietor">
              Proprietor: <strong>JITENDRA SURESHBHAI PAGHDAR</strong>
            </p>
            <p className="footer__about">
              IT and software services for growing businesses &mdash; managed IT support and
              software applications, ready the moment you need it.
            </p>
          </div>

          <div className="footer__contact">
            <h3>Get in touch</h3>
            <ul>
              <li>
                <FontAwesomeIcon icon={faPhone} />
                <a href="tel:+917405246374">7405246374</a>
              </li>
              <li>
                <FontAwesomeIcon icon={faEnvelope} />
                <a href="mailto:admin@jitendrasureshbhaipaghdar.com">
                  admin@jitendrasureshbhaipaghdar.com
                </a>
              </li>
              <li>
                <FontAwesomeIcon icon={faLocationDot} />
                <address>
                  GROUND FLOOR, 282, SARITANAGAR SOCIETY, PUNA GAM
                  <br />
                  CHORASI, Surat, Gujarat, 395010
                </address>
              </li>
            </ul>
          </div>
        </div>

        <hr className="footer__rule" />

        <nav className="footer__nav">
          <Link to="/search">Browse All</Link>
          <Link to="/blog">Articles</Link>
        </nav>

        <hr className="footer__rule" />

        <p className="footer__copy">
          &copy; {year} ON-TAP SOLUTION. Published and operated by ON-TAP SOLUTION (Proprietor:
          JITENDRA SURESHBHAI PAGHDAR), Ground Floor, 282, Saritanagar Society, Puna Gam,
          Chorasi, Surat, Gujarat, 395010.
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

        <hr className="footer__rule" />

        <p className="footer__notice">
          ON-TAP SOLUTION does not provide loans, lending, credit, financial advice, or other
          financial services. The Loan EMI Calculator is only a software calculation tool.
        </p>
        <p className="footer__operated">
          &copy; {year} ON-TAP SOLUTION &mdash; Operated by JITENDRA SURESHBHAI PAGHDAR
          (Proprietor). All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;