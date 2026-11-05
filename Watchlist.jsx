export default function Watchlist({ movies, onRemove }) {
  return (
    <div className="watchlist">
      <div className="section-head">
        <h2>My Watchlist</h2>
        <span className="count">{movies.length}</span>
      </div>

      {movies.length === 0 ? (
        <p className="empty">
          Nothing here yet. Add a movie to start your list.
        </p>
      ) : (
        <ul className="watch-items">
          {movies.map((movie) => (
            <li key={movie.id} className="watch-item">
              <div>
                <p className="watch-title">{movie.title}</p>
                <p className="watch-meta">
                  {movie.genre} · {movie.year} · ★ {movie.rating.toFixed(1)}
                </p>
              </div>
              <button
                className="btn btn-remove"
                onClick={() => onRemove(movie.id)}
                aria-label={`Remove ${movie.title} from watchlist`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
