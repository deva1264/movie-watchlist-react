# CineList · Movie Watchlist (React)

Phase 3 · React — Assignment No. 4: **Build a Movie Watchlist App with React**

A movie browsing app where you can filter by genre, add movies to a watchlist, and remove them again.

## Features

- `MovieCard` component receiving `title`, `genre`, `year` and `rating` as props
- `useState` watchlist with add, remove and duplicate prevention (button becomes a disabled **Added**)
- `Watchlist` component with a **Remove** button on every entry
- `useEffect` + Axios fetch from a local `movies.json`, with a loading spinner
- Genre filter buttons (All, Action, Comedy, Drama, Sci-Fi, Horror), generated from the data
- Conditional rendering: spinner, error message, and **No movies found** for an empty filtered list
- Immutable state updates only (spread and `filter`, never `push` or direct mutation)

## Project structure

```
src/
  App.jsx                  state, data fetching, filtering
  App.css
  main.jsx
  components/
    MovieCard.jsx
    Watchlist.jsx
    GenreFilter.jsx
    Spinner.jsx
public/
  movies.json              movie data
```

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

## Build

```bash
npm run build
```
