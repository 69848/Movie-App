import React, { useEffect,useState } from 'react';
import MovieContext from './MovieContext';

export default function MovieProvider({children}) {

  const [favMovies,setFavMovies] = useState([]);

  useEffect(() => {
    let localMovies = localStorage.getItem('favMovies');
    if(localMovies){
      setFavMovies(JSON.parse(localMovies));
    }
  },[])

  useEffect(() => {
    localStorage.setItem('favMovies',JSON.stringify(favMovies));
  },[favMovies])

  function addToFav(movie){
    setFavMovies(prev => [...prev,movie]);
  }

  function removeFromFav(movieId){
    setFavMovies(prev => prev.filter(m => m.id !== movieId));
  }

  function isFav(movieId){  
    return favMovies.some(m => m.id === movieId);
  }


  return (
    <MovieContext.Provider value={{favMovies,addToFav,removeFromFav,isFav}}>
        {children}
    </MovieContext.Provider>
  )
}
