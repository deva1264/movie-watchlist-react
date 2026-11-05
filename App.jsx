import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./components/MovieCard.jsx";
import Watchlist from "./components/Watchlist.jsx";
import GenreFilter from "./components/GenreFilter.jsx";
import Spinner from "./components/Spinner.jsx";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Fetch movies once on mount (local movies.json served from /public).
  // A short delay makes the loading spinner visible.
  useEffect(() => {
    let cancelled = false;

    const fetchMovies = async () => {
      try {
        const [response] = await Promise.all([
          axios.get("/movies.json"),
          new Promise((resolve) => setTimeout(resolve, 900)),
        ]);
        if (!cancelled) setMovies(response.data);
      } catch (err) {
        if (!cancelled) setError("Could not load movies. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchMovies();
    return () => {
      cancelled = true;
    };
  }, []);

  // Add without mutating state; guard against duplicates.
  const addToWatchlist = (movie) => {
    setWatchlist((prev) =>
      prev.some((m) => m.id === movie.id) ? prev : [...prev, movie]
    );
  };

  // Remove using filter (returns a new array).
  const removeFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== id));
  };

  // Derived data: no extra state needed.
  const genres = ["All", ...new Set(movies.map((m) => m.genre))];
  const filteredMovies =
    selectedGenre === "All"
      ? movies
      : movies.filter((m) => m.genre === selectedGenre);

  return (
    <div className="app">
      <header className="hero">
        <p className="eyebrow">Your personal cinema log</p>
        <h1>
          Cine<span>List</span>
        </h1>
        <p className="tagline">
          Discover great films and build a watchlist worth your weekend.
        </p>
      </header>

      <main className="layout">
        <section className="browse" aria-label="Browse movies">
          <div className="section-head">
            <h2>Browse movies</h2>
            {!loading && !error && (
              <span className="count">{filteredMovies.length} titles</span>
            )}
          </div>

          {loading && <Spinner />}

          {error && <p className="message error">{error}</p>}

          {!loading && !error && (
            <>
              <GenreFilter
                genres={genres}
                selected={selectedGenre}
                onSelect={setSelectedGenre}
              />

              {filteredMovies.length === 0 ? (
                <p className="message">No movies found</p>
              ) : (
                <div className="grid">
                  {filteredMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      title={movie.title}
                      genre={movie.genre}
                      year={movie.year}
                      rating={movie.rating}
                      isAdded={watchlist.some((m) => m.id === movie.id)}
                      onAdd={() => addToWatchlist(movie)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </section>

        <aside className="sidebar" aria-label="Your watchlist">
          <Watchlist movies={watchlist} onRemove={removeFromWatchlist} />
        </aside>
      </main>

      <footer className="footer">Built with React, Hooks &amp; Axios</footer>
    </div>
  );
}
