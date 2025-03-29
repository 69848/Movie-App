import React from 'react';
import { useContext } from 'react';
import '../css/MovieCard.css';
import MovieContext from '../context/MovieContext.jsx';

export default function MovieCard({movie}) {
    
  const {isFav,addToFav,removeFromFav} = useContext(MovieContext);
  const fav = isFav(movie.id);
  
  const onFavoriteClick = (e) => {
        e.preventDefault();
        fav ? removeFromFav(movie.id) : addToFav(movie);
    }
  return (
    <div className='movie-card'>
        <div className='movie-poster'>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <div className='movie-overlay'>
                <button className={`favorite-btn ${fav ? 'active':''}`} onClick={onFavoriteClick}>&#x2665;</button>
            </div>
        </div>
        <div className='movie-info'>
            <h3>{movie.title}</h3>
            <p>{movie.release_date.split('-')[0]}</p>
        </div>
    </div>
  )
}
