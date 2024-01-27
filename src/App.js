
import './App.css';
import React, { useEffect, useState } from 'react'
import MovieList from './components/MovieList';
import Navbar from './components/Navbar';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFav from './components/RemoveFav';

const App = ()=>{
  const [movies, setMovies]=useState([]);
  const [searchValue, setSearchValue]=useState('');
  const [favourites,setFavourites]=useState([]);

const getMovieRequest = async (searchValue)=>{
  const url=`http://www.omdbapi.com/?s=${searchValue}&apikey=63aab8c9`
  const response= await fetch(url);
  const responseJson= await response.json();
  if(responseJson.Search){
  setMovies(responseJson.Search);
  }
}
useEffect(()=>{
  getMovieRequest(searchValue);
}, [searchValue]);

useEffect(()=>{
  const movieFavourites=JSON.parse(localStorage.getItem('react-movie-app-favourites'));
  setFavourites(movieFavourites);
},[]);

const saveToLocalStorage=(items)=>{
  localStorage.setItem('react-movie-app-favourites',JSON.stringify(items))
}

const addFavouriteMovie = (movie)=>{
  const newFavouriteList=[...favourites,movie];
  setFavourites(newFavouriteList);
  saveToLocalStorage(newFavouriteList);
}
 const removeFavMovie =(movie)=>{
   const newFavouriteList=favourites.filter((favourites)=>favourites.imdbID !== movie.imdbID);
   setFavourites(newFavouriteList);
   saveToLocalStorage(newFavouriteList);
 }
return(
<div className='conatiner-fluid movie-app'>
  <div className='row d-flex align-items-center mt-4 mb-4'>
    <Navbar title="Create your Favourite Movie List"/>
    <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
  </div>
  <div className='row'>
  <MovieList movies={movies} handleFavouritesClick={addFavouriteMovie} favouriteComponent={AddFavourites}/>
   
    </div>
    <div className='row d-flex align-items-center mt-4 mb-4'>
    <Navbar title="Favourites"/>
</div>
<div className='row'>
  <MovieList movies={favourites} 
  handleFavouritesClick={removeFavMovie} 
  favouriteComponent={RemoveFav}/>
  </div>
</div>
)
}
export default App;

