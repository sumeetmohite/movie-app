import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
const App = () => {
  const[movies, setMovies] = useState([]);
  const[searchValue, setSearchValue] = useState('');
  const[favourites, setFavourites] =useState([]);

    const getMovieRequest = async (searchValue) => {
      const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=8c909aca`;

      const response = await fetch(url);
      const responseJson = await response.json();

      if(responseJson.Search){
      setMovies(responseJson.Search);
      }
    }

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites'));
    setFavourites(movieFavourites);
  },[]);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
  }

  const addFavouriteMovie = (movie) =>{ 
    var count=0;
    for(var i=0; i< favourites.length; i++){
      if(movie === favourites[i]){count++}
    }
    if(count === 0){
    const newFavouritesList = [...favourites, movie];
    setFavourites(newFavouritesList);
    saveToLocalStorage(newFavouritesList);
    }
    else {alert("Already in your favourites !!");}
  }

  const removeFavouriteMovie = (movie) =>{
    const newFavouritesList = favourites.filter((favourite) =>favourite.imdbID !== movie.imdbID);
    setFavourites(newFavouritesList);
    saveToLocalStorage(newFavouritesList);
  }

  return (
    <div className='container-fluid movie-app'> 
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="Movies"/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className='row'>
        <MovieList movies={movies} 
        favouriteComponent={AddFavourites}
        handleFavourtiesClick={addFavouriteMovie}/>

      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="Favourites"/>
      </div>
      <div className='row'>
        <MovieList movies={favourites} 
        favouriteComponent={RemoveFavourites}
        handleFavourtiesClick={removeFavouriteMovie}/>

      </div>

    </div>
  );
}

export default App;
