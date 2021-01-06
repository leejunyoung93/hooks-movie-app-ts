import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import spinner from "assets/ajax-loader.gif";
import { Header, Search, Movie } from "components";
import { moviesActions } from "modules/movies";

const App = () => {
    const dispatch = useDispatch();
    const { movies, errorMessage, loading } = useSelector(
        (state: any) => state.movies
    );
    const [searchValue, setSearchValue] = useState("man");

    useEffect(() => {
        dispatch(
            moviesActions.searchMovies.request({
                searchValue
            })
        );
    }, [dispatch, searchValue]);

    const search = (searchValue: string) => {
        setSearchValue(searchValue);
    };

    const retrievedMovies = loading ? (
        <img className="spinner" src={spinner} alt="Loading spinner" />
    ) : errorMessage ? (
        <div className="errorMessage">{errorMessage}</div>
    ) : (
        movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
        ))
    );

    return (
        <div className="App">
            <div className="m-container">
                <Header text="HOOKED" />
                <Search search={search} />
                <p className="App-intro">
                    Sharing a few of our favourite movies
                </p>
                <div className="movies">{retrievedMovies}</div>
            </div>
        </div>
    );
};

export default App;
