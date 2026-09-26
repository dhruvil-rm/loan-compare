import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/navbar.jsx";
import Footer from "./components/footer/footer.jsx";
import ScrollToTop from "./components/scrolltotop/scrolltotop.jsx";
import Home from "./pages/home/home.jsx";
import Search from "./pages/search/search.jsx";
import ItemDetail from "./pages/itemdetail/itemdetail.jsx";
import LegalPage from "./pages/legal/legal.jsx";
import Contact from "./pages/contact/contact.jsx";
import Calculators from "./pages/calculators/calculators.jsx";
import CalculatorPage from "./pages/calculator/calculator.jsx";
import InterstitialAd from "./components/Ads/InterstitialAd";
import AnchorAd from "./components/Ads/AnchorAd";

function App() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <InterstitialAd adUnitPath="23345011043/loanmathpro.com/inter" />

      <AnchorAd adUnitPath="23345011043/loanmathpro.com/anchor" isTop={false} />
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/calculators/:slug" element={<CalculatorPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/disclosure" element={<LegalPage slug="disclosure" />} />
          <Route path="/about" element={<LegalPage slug="about" />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<LegalPage slug="privacy" />} />
          <Route path="/terms" element={<LegalPage slug="terms" />} />
          <Route path="/editorial" element={<LegalPage slug="editorial" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;