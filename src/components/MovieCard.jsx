import { Link, useOutletContext } from "react-router-dom";

export default function MovieCard({ movie }) {
  const { favorites, addFavorite, removeFavorite } = useOutletContext();
  const isFav = favorites.some((m) => m.imdbID === movie.imdbID);

  return (
    <div
      className="bg-gray-800 rounded-xl shadow-md overflow-hidden 
                 transform hover:scale-105 hover:shadow-2xl 
                 transition duration-300"
    >
      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.jpg"}
          alt={movie.Title}
          className="w-full h-72 object-cover"
        />
      </Link>

      <div className="p-4 space-y-2">
        {/* Title */}
        <h3 className="text-lg font-semibold text-white truncate">
          {movie.Title}
        </h3>
        <p className="text-sm text-gray-400">{movie.Year}</p>

        {/* Type Badge */}
        <span className="inline-block px-2 py-1 text-xs font-medium 
                        bg-blue-600/20 text-blue-400 rounded">
          {movie.Type}
        </span>

        {/* Favorite Button */}
        <button
          onClick={() =>
            isFav ? removeFavorite(movie.imdbID) : addFavorite(movie)
          }
          className={`mt-3 px-3 py-1 text-sm rounded-lg font-medium w-full transition
            ${
              isFav
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
        >
          {isFav ? "★ Remove Favorite" : "☆ Add to Favorite"}
        </button>
      </div>
    </div>
  );
}
