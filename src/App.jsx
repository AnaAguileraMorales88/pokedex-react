import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import PokemonDetail from "./pages/Detail";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  const toggleFavorite = (id) => {
    let updated = favorites.includes(id)
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={<Home favorites={favorites} toggleFavorite={toggleFavorite} />}
        />
        <Route
          path="/pokemon/:id"
          element={<PokemonDetail favorites={favorites} toggleFavorite={toggleFavorite} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
