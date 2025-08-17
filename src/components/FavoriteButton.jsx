import { useState, useEffect } from "react";

export default function FavoriteButton({ movie, onToggle }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(storedFavorites.some((fav) => fav.imdbID === movie.imdbID));
  }, [movie]);

  const toggleFavorite = () => {
    let storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      storedFavorites = storedFavorites.filter(
        (fav) => fav.imdbID !== movie.imdbID
      );
    } else {
      storedFavorites.push(movie);
    }
    localStorage.setItem("favorites", JSON.stringify(storedFavorites));
    setIsFavorite(!isFavorite);
    if (onToggle) onToggle(!isFavorite);
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`min-w-[180px] px-4 py-2 rounded-lg border flex items-center justify-center gap-2 font-medium transition-colors ${
        isFavorite
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-gray-200 text-black hover:bg-gray-300"
      }`}
    >
      <span>{isFavorite ? "❤️" : "🤍"}</span>
      {isFavorite ? "Remove Favorite" : "Add to Favorites"}
    </button>
  );
}
