import MovieCard from "./MovieCard";

export default function MovieGrid({ items, loading, emptyText }) {
  if (loading) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  if (!items || items.length === 0) {
    return <p className="text-center text-gray-500">{emptyText}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6 px-4">
      {items.map((movie) => (
        <div
          key={movie.imdbID}
          className="bg-gray-800 rounded-xl shadow-md overflow-hidden transform hover:scale-105 hover:shadow-2xl transition duration-300 cursor-pointer"
        >
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.jpg"}
            alt={movie.Title}
            className="w-full h-72 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white truncate">
              {movie.Title}
            </h3>
            <p className="text-sm text-gray-400">{movie.Year}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
