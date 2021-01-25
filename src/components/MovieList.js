import React from 'react';

const MovieList = (props) => {
    return (
        <>
            {props.movies.map((movies,index) => (
                <div className="d-flex justify-content-start m-3">
                    <img src={movies.Poster} alt='movie'></img>
                </div>
            ))}
        </>
    )
}

export default MovieList;
