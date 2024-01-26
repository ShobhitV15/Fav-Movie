import './MovieList.css'
import React from "react";
import AddFavourites from "./AddFavourites";

const MovieList=(props)=>{
    const FavouriteComponent=props.favouriteComponent;
    return(
        <>
        {props.movies.map((movie,index)=>
        <div className="image-container d-flex justify-content-start m-3 movie-list">
            <img src={movie.Poster} alt="movie" />
            <div onClick={()=>props.handleFavouritesClick(movie)} 
            className="overlay d-flex align-items-center justify-content-center">
                <FavouriteComponent/>
            </div>
        </div>)}
        </>
    )

}
export default MovieList;