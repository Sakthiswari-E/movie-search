const API_BASE = "https://www.omdbapi.com/";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;



const withAbort = (signal) => ({
  signal,
  headers: { 'Accept': 'application/json' },
});

/**
 * Search movies by text, page, and optional type.
 * @param {Object} params
 * @param {string} params.query - search text
 * @param {number} params.page - page number (1..)
 * @param {'movie'|'series'|'episode'|''} [params.type]
 * @param {AbortSignal} [params.signal]
 */
export async function searchMovies({ query, page = 1, type = '', signal }) {
  const url = new URL(API_BASE);
  url.searchParams.set('apikey', API_KEY);
  url.searchParams.set('s', query?.trim() || 'a'); // OMDB requires `s`
  url.searchParams.set('page', String(page));
  if (type) url.searchParams.set('type', type);

  const res = await fetch(url.toString(), withAbort(signal));
  const data = await res.json();

  if (!res.ok) throw new Error(data?.Error || 'Network error');
  if (data?.Response === 'False') {
    const err = new Error(data?.Error || 'No results');
    err.code = 'NO_RESULTS';
    throw err;
  }

  return {
    items: Array.isArray(data.Search) ? data.Search : [],
    total: Number(data.totalResults || 0),
  };
}

/**
 * Get full movie details by imdbID
 */
export async function getMovieDetails({ imdbID, signal }) {
  const url = new URL(API_BASE);
  url.searchParams.set('apikey', API_KEY);
  url.searchParams.set('i', imdbID);
  url.searchParams.set('plot', 'full');

  const res = await fetch(url.toString(), withAbort(signal));
  const data = await res.json();

  if (!res.ok) throw new Error(data?.Error || 'Network error');
  if (data?.Response === 'False') throw new Error(data?.Error || 'Not found');
  return data;
}
