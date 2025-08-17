import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import TypeFilter from "../components/TypeFilter";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [type, setType] = useState("");

  // Get favorites context from App.jsx
  const { favorites, addFavorite, removeFavorite } = useOutletContext();

  // Fetch search results
  const searchMovies = async (term) => {
    if (!term) return;
    const res = await fetch(
      `https://www.omdbapi.com/?s=${term}&page=1&type=${type}&apikey=fc1fef96`
    );
    const data = await res.json();
    setResults(data.Response === "True" ? data.Search : []);
  };

  // Fetch movie details
  const getMovieDetails = async (id) => {
    const res = await fetch(
      `https://www.omdbapi.com/?i=${id}&apikey=fc1fef96`
    );
    const data = await res.json();
    setSelectedMovie(data);
    setResults([]); // hide search list
    setQuery("");   // clear input
  };
  
useEffect(() => {
  if (query.trim()) {
    searchMovies(query.trim());
  }
}, [query, type]);

  // Check if selected movie is in favorites
  const isFavorite = selectedMovie
    ? favorites.some((m) => m.imdbID === selectedMovie.imdbID)
    : false;

  return (
    <div className="movie-search-app p-6 text-center">

      {/* Search Box */}
      <div className="flex justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg shadow-md 
             border border-gray-600 bg-gray-800 text-white 
             placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <TypeFilter type={type} onTypeChange={setType} />
      </div>



      {/* Search Results */}
      {results.length > 0 && (
        <div className="bg-gray-900 rounded-lg shadow-lg divide-y divide-gray-700 max-w-md mx-auto">
          {results.map((movie) => (
            <div
              key={movie.imdbID}
              className="flex items-center gap-3 p-3 cursor-pointer 
                         hover:bg-gray-800 transition"
              onClick={() => getMovieDetails(movie.imdbID)}
            >
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "image_not_found.png"}
                alt={movie.Title}
                className="w-12 h-16 object-cover rounded"
              />
              <div>
                <h4 className="font-semibold text-white">{movie.Title}</h4>
                <p className="text-sm text-gray-400">{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Movie Details */}
      {selectedMovie && (
        <div className="mt-8 bg-gray-800 rounded-xl shadow-lg p-6 grid md:grid-cols-2 gap-6">
          {/* Poster */}
          <div className="flex justify-center">
            <img
              src={selectedMovie.Poster !== "N/A" ? selectedMovie.Poster : "image_not_found.png"}
              alt="poster"
              className="w-60 rounded-lg shadow-md"
            />
          </div>

          {/* Info */}
          <div className="space-y-2 text-gray-300">
            <h2 className="text-2xl font-bold text-white">{selectedMovie.Title}</h2>
            <ul className="space-y-1">
              <li><b>Year:</b> {selectedMovie.Year}</li>
              <li><b>Rated:</b> {selectedMovie.Rated}</li>
              <li><b>Released:</b> {selectedMovie.Released}</li>
            </ul>
            <p><b>Genre:</b> {selectedMovie.Genre}</p>
            <p><b>Writer:</b> {selectedMovie.Writer}</p>
            <p><b>Actors:</b> {selectedMovie.Actors}</p>
            <p><b>Plot:</b> {selectedMovie.Plot}</p>
            <p><b>Language:</b> {selectedMovie.Language}</p>
            <p><b>Awards:</b> {selectedMovie.Awards}</p>

            {/* Add / Remove Favorite button */}
            <button
              onClick={() =>
                isFavorite
                  ? removeFavorite(selectedMovie.imdbID)
                  : addFavorite(selectedMovie)
              }
              className={`mt-4 w-full px-4 py-2 rounded-lg font-semibold transition
                ${isFavorite
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-green-500 hover:bg-green-600 text-white"
                }`}
            >
              {isFavorite ? "★ Remove from Favorites" : "☆ Add to Favorites"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
