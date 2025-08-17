import MovieCard from "../components/MovieCard";
import { useOutletContext } from "react-router-dom";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useOutletContext();

  return (
    <section className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white">⭐ My Favorite Movies</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-400">
          No favorites yet. Add some movies from the search page!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onRemove={() => removeFavorite(movie.imdbID)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
