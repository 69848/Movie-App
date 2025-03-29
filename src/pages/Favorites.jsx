import React, { useContext } from "react";
import "../css/Favorites.css";
import MovieCard from "../components/MovieCard";
import MovieContext from "../context/MovieContext";

export default function Favorites() {
  const { favMovies } = useContext(MovieContext);

  if (favMovies.length > 0) {
    return (
      <div className="favorites">
        <h2>My Favorite Movies</h2>
        <div className="movies-grid">
          {favMovies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No Favorite movies yet</h2>
      <p>Start adding movies to your favorites and they will appear here.</p>
    </div>
  );
}
