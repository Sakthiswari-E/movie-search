export default function TypeFilter({ type, onTypeChange }) {
  return (
    <select
      value={type}
      onChange={(e) => onTypeChange(e.target.value)}
      className="border p-2 rounded text-blue-950"
    >
      <option value="">All Types</option>
      <option value="movie">Movies</option>
      <option value="series">Series</option>
      <option value="episode">Episodes</option>
    </select>
  );
}

