import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";

function Navbar() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    navigate(`/search${query ? `?q=${encodeURIComponent(query)}` : ""}`);
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" aria-label="NOVAAPPS SOLUTIONS PRIVATE LIMITED home">
          <span className="navbar__logo-mark">$</span>
        </Link>

        <form className="navbar__search" onSubmit={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className="navbar__search-icon" />
          <input
            type="text"
            placeholder="Search loans..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        <nav className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/search" onClick={() => setMenuOpen(false)}>
            Compare Loans
          </Link>
          <Link to="/blog" onClick={() => setMenuOpen(false)}>
            Blog
          </Link>
        </nav>

        <button
          className="navbar__toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
