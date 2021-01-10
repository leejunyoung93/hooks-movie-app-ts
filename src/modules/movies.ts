import { createAsyncAction, ActionType } from "typesafe-actions";
import { takeLatest } from "redux-saga/effects";
import service from "api";
import {
    createPromiseSagaById,
    reducerUtils,
    handleAsyncActions
} from "lib/asyncUtils";

//actions
const SEARCH_MOVIES = "SEARCH_MOVIES";
const SEARCH_MOVIES_SUCCESS = "SEARCH_MOVIES_SUCCESS";
const SEARCH_MOVIES_FAILURE = "SEARCH_MOVIES_FAILURE";

export const searchMovies = createAsyncAction(
    SEARCH_MOVIES,
    SEARCH_MOVIES_SUCCESS,
    SEARCH_MOVIES_FAILURE
)<
    {
        value: string;
    },
    {
        Search: Movie[];
        Response: string;
        totalResult: string;
    },
    string
>();

export const moviesActions = {
    searchMovies
};

export type MoviesAction = ActionType<typeof searchMovies>;

//reducer
type MoviesState = {
    movies: {
        loading: boolean;
        data: {
            Search: Movie[];
            Response: string;
            totalResult: string;
        } | null;
        error: string | null;
    };
};

export interface Movie {
    Title: string;
}

const initialState: MoviesState = {
    movies: reducerUtils.initial()
};

export function moviesReducer(
    state: MoviesState = initialState,
    action: MoviesAction
) {
    switch (action.type) {
        case SEARCH_MOVIES:
        case SEARCH_MOVIES_SUCCESS:
        case SEARCH_MOVIES_FAILURE:
            return {
                ...state,
                ...handleAsyncActions(
                    SEARCH_MOVIES,
                    "movies",
                    false
                )(state, action)
            };
        default:
            return state;
    }
}

//api
const api = {
    searchMovies: async payload => {
        const { value } = payload;
        return await service.get(`/?s=${value}`);
    }
};

//saga
const searchMoviesFunc = createPromiseSagaById(SEARCH_MOVIES, api.searchMovies);

export function* moviesSaga() {
    yield takeLatest(SEARCH_MOVIES, searchMoviesFunc);
}
