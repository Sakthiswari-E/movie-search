import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on first render
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(saved);
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function addFavorite(movie) {
    if (!favorites.find((m) => m.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  }

  function removeFavorite(id) {
    setFavorites(favorites.filter((m) => m.imdbID !== id));
  }

  return { favorites, addFavorite, removeFavorite };
}
