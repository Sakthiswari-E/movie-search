import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../services/omdb";

export default function MovieDetailsPage() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails({ imdbID });
        setMovie(data);
      } catch (err) {
        setError(err.message || "Error fetching movie");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [imdbID]);

  if (loading) return <p className="p-6 text-gray-400">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <Link
        to="/"
        className="text-blue-400 hover:text-blue-500 underline mb-6 inline-block"
      >
        ← Back to Search
      </Link>

      {movie && (
        <div
          className="bg-gray-800 rounded-xl shadow-lg overflow-hidden 
                     grid md:grid-cols-2 gap-8 p-6"
        >
          {/* Poster */}
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/400x600?text=No+Image"
            }
            alt={movie.Title}
            className="w-full h-auto rounded-lg shadow-md"
          />

          {/* Details */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white">{movie.Title}</h1>
            <p className="text-gray-400">
              {movie.Year} • {movie.Runtime} • {movie.Genre}
            </p>

            <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>

            <ul className="space-y-2 text-gray-300">
              <li>
                <span className="font-semibold text-white">Director:</span>{" "}
                {movie.Director}
              </li>
              <li>
                <span className="font-semibold text-white">Actors:</span>{" "}
                {movie.Actors}
              </li>
              <li>
                <span className="font-semibold text-white">Language:</span>{" "}
                {movie.Language}
              </li>
              <li>
                <span className="font-semibold text-yellow-400">
                  IMDB Rating:
                </span>{" "}
                ⭐ {movie.imdbRating}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
