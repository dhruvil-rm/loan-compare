import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/navbar.jsx";
import Footer from "./components/footer/footer.jsx";
import ScrollToTop from "./components/scrolltotop/scrolltotop.jsx";
import Home from "./pages/home/home.jsx";
import Search from "./pages/search/search.jsx";
import Blog from "./pages/blog/blog.jsx";
import BlogDetail from "./pages/blogdetail/blogdetail.jsx";
import ItemDetail from "./pages/itemdetail/itemdetail.jsx";
import LegalPage from "./pages/legal/legal.jsx";
import Contact from "./pages/contact/contact.jsx";
import Calculators from "./pages/calculators/calculators.jsx";
import CalculatorPage from "./pages/calculator/calculator.jsx";

function App() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/calculators/:slug" element={<CalculatorPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
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