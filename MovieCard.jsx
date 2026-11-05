export default function MovieCard({
  title,
  genre,
  year,
  rating,
  isAdded,
  onAdd,
}) {
  return (
    <article className="card">
      <div className="card-top">
        <span className="badge">{genre}</span>
        <span className="rating" title="Rating">
          ★ {rating.toFixed(1)}
        </span>
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-year">{year}</p>
      <button
        className={`btn ${isAdded ? "btn-added" : "btn-primary"}`}
        onClick={onAdd}
        disabled={isAdded}
      >
        {isAdded ? "Added" : "Add to Watchlist"}
      </button>
    </article>
  );
}
