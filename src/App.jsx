import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

export default function App() {
  const [favorites, setFavorites] = useState([]);

  // Add to favorites
  const addFavorite = (movie) => {
    setFavorites((prev) =>
      prev.some((m) => m.imdbID === movie.imdbID) ? prev : [...prev, movie]
    );
  };

  // Remove from favorites
  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((m) => m.imdbID !== id));
  };




  return (
    <div className=" min-h-screen bg-gray-900 pt-10 text-white p-4">
      {/* Navbar */}
      <nav className="flex items-center justify-between border-b pb-6 mb-6">
  {/* Center Title */}
  <h2 className="absolute left-1/2 -translate-x-1/2 text-3xl font-bold text-white">
    🎬 Movies Now
  </h2>

  {/* Right Links */}
  <div className="flex gap-4">
    <Link
      to="/"
      className="px-3 py-2 bg-gray-800 text-white rounded-md shadow hover:bg-yellow-400 hover:text-black transition"
    >
      🔍 Search
    </Link>

    <Link
      to="/favorites"
      className="px-3 py-2 bg-gray-800 text-white rounded-md shadow hover:bg-yellow-400 hover:text-black transition"
    >
      ❤️ Favorites ({favorites.length})
    </Link>
  </div>
</nav>


      {/* Pass context down to all children */}
      <Outlet context={{ favorites, addFavorite, removeFavorite }} />
    </div>
  );
}
