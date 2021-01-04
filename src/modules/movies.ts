import { createAsyncAction, ActionType, createReducer } from "typesafe-actions";
import { call, takeLatest } from "redux-saga/effects";
import service from "api";

//actions
const SEARCH_MOVIES_REQUEST = "SEARCH_MOVIES_REQUEST";
const SEARCH_MOVIES_SUCCESS = "SEARCH_MOVIES_SUCCESS";
const SEARCH_MOVIES_FAILURE = "SEARCH_MOVIES_FAILURE";

export const searchMovies = createAsyncAction(
    SEARCH_MOVIES_REQUEST,
    SEARCH_MOVIES_SUCCESS,
    SEARCH_MOVIES_FAILURE
)<{ searchValue: string }>();

export const moviesActions = {
    searchMovies
};

export type MoviesAction = ActionType<typeof searchMovies>;

//reducer
type MoviesState = {
    loading: boolean;
};

const initialState: MoviesState = {
    loading: true
};

export const moviesReducer = createReducer<MoviesState, MoviesAction>(
    initialState,
    {
        [SEARCH_MOVIES_SUCCESS]: state => ({
            ...state,
            loading: false
        })
    }
);

//api
const api = {
    searchMovies: async payload => {
        const { searchValue } = payload;
        return await service.get(`/?s=${searchValue}`);
    }
};

//saga
function* searchMoviesFunc(action: MoviesAction) {
    try {
        const { payload } = action;
        const res = yield call(api.searchMovies, payload);
        console.log(res, "res");
    } catch (e) {}
}

export function* moviesSaga() {
    yield takeLatest(SEARCH_MOVIES_REQUEST, searchMoviesFunc);
}
