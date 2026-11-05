export default function GenreFilter({ genres, selected, onSelect }) {
  return (
    <div className="filters" role="group" aria-label="Filter by genre">
      {genres.map((genre) => (
        <button
          key={genre}
          className={`chip ${selected === genre ? "chip-active" : ""}`}
          onClick={() => onSelect(genre)}
          aria-pressed={selected === genre}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
