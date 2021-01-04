import { createAsyncAction, ActionType, createReducer } from "typesafe-actions";
import { call, put, takeLatest } from "redux-saga/effects";

//actions
const SEARCH_MOVIES_REQUEST = "SEARCH_MOVIES_REQUEST";
const SEARCH_MOVIES_SUCCESS = "SEARCH_MOVIES_SUCCESS";
const SEARCH_MOVIES_FAILURE = "SEARCH_MOVIES_FAILURE";

export const searchMovies = createAsyncAction(
    SEARCH_MOVIES_REQUEST,
    SEARCH_MOVIES_SUCCESS,
    SEARCH_MOVIES_FAILURE
)<{}>();

export const moviesActions = {
    searchMovies
};

export type MoviesActions = ActionType<typeof searchMovies>;

//reducer
type MoviesState = {};

const initialState: MoviesState = {};

export const moviesReducer = createReducer<MoviesState, MoviesActions>(
    initialState,
    {
        [SEARCH_MOVIES_REQUEST]: state => ({})
    }
);

//saga
function* searchMoviesFunc() {
    try {
    } catch (e) {}
}

export function* moviesSaga() {
    yield takeLatest(SEARCH_MOVIES_REQUEST, searchMoviesFunc);
}
