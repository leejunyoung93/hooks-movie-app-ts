import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { store } from "store";
import { Header, Search, Movie } from "components";
import { moviesActions } from "modules/movies";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            moviesActions.searchMovies.request({
                searchValue: "man"
            })
        );
    }, []);

    return (
        <div className="container">
            <Header text="HOOKED" />
            <Search />
        </div>
    );
};

export default App;
