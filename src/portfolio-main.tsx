// src/portfolio-main.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

// Lazy load pages for performance (Explicit .tsx extensions)
const Home = lazy(() => import("./pages/Home.tsx"));
const Articles = lazy(() => import("./pages/Articles/index.tsx"));
const ArticleDetail = lazy(() => import("./pages/Articles/ArticleDetail.tsx"));
const Resume = lazy(() => import("./pages/Resume.tsx"));
const Skills = lazy(() => import("./pages/Skills.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const Speaking = lazy(() => import("./pages/Speaking.tsx"));

function Portfolio() {
  return (
    <Router>
      <Navigation />
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/speaking" element={<Speaking />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default Portfolio;