import React from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";

export default function Home() {
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = async(e) => {
    e.preventDefault();
    if(!searchQuery) return;
    if(loading) return;
    setLoading(true);
    try{
        const searchedMovies = await searchMovies(searchQuery);
        setMovies(searchedMovies);
        setSearchQuery("");
        setError(null);
    }catch(error){
        console.error("Error searching movies:", error);
        setError("Failed to load movies. Please try again later.");
    }finally{
        setLoading(false);
    }
  };

  React.useEffect(() => {
    const loadedMovies = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadedMovies();
  }, []);
  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        "Loading movies..."
      ) : (
        <div className="movies-grid">
          {movies.map(
            (movie) =>
              movie.title.toLowerCase().startsWith(searchQuery) && (
                <MovieCard movie={movie} key={movie.id} />
              )
          )}
        </div>
      )}
    </div>
  );
}
