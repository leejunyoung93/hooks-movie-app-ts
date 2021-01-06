import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Loader from "assets/ajax-loader.gif";
import { Header, Search, Movie } from "components";
import { moviesActions } from "modules/movies";

const App = () => {
    const dispatch = useDispatch();
    const movies = useSelector((state: any) => state.movies);
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

    return (
        <div className="App">
            <div className="m-container">
                <Header text="HOOKED" />
                <Search search={search} />
                <p className="App-intro">
                    Sharing a few of our favourite movies
                </p>
                <div className="movies">
                    {movies.loading ? (
                        <img src={Loader} alt="loader" />
                    ) : movies.errorMessage ? (
                        <p className="errorMessage">{movies.errorMessage}</p>
                    ) : (
                        movies.movies.Search.map((el, key) => (
                            <Movie movie={el} key={key} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
