import { useState } from "react";
import { searchMovies } from "../services/omdb";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const movies = await searchMovies(query.trim());
      if (movies.length === 0) {
        setError("No movies found.");
      } else {
        setError("");
      }
      setResults(movies);
    } catch (err) {
      setError("Failed to fetch movies. Check API key or network.");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full flex justify-center mb-6"
      >
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg shadow-md border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Search
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-center text-red-500 font-medium">{error}</p>}

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {results.map((movie) => (
          <div
            key={movie.imdbID}
            className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition duration-300 cursor-pointer"
          >
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/300x450"
              }
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
    </div>
  );
}
