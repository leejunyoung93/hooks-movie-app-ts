import { combineReducers } from "redux";
import { moviesReducer as movies } from "modules/movies";

const createRootReducer = () =>
    combineReducers({
        movies
    });

const rootReducer = createRootReducer();

export default rootReducer;
