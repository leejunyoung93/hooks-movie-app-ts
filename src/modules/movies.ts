import { createAsyncAction, ActionType, createReducer } from "typesafe-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import service from "api";

//actions
const SEARCH_MOVIES_REQUEST = "SEARCH_MOVIES_REQUEST";
const SEARCH_MOVIES_SUCCESS = "SEARCH_MOVIES_SUCCESS";
const SEARCH_MOVIES_FAILURE = "SEARCH_MOVIES_FAILURE";

export const searchMovies = createAsyncAction(
    SEARCH_MOVIES_REQUEST,
    SEARCH_MOVIES_SUCCESS,
    SEARCH_MOVIES_FAILURE
)<
    { searchValue: string },
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
    loading: boolean;
    movies: {
        Search: Movie[];
        Response: string;
        totalResult: string;
    };
    errorMessage?: string;
};

export interface Movie {
    Title: string;
}

const initialState: MoviesState = {
    loading: true,
    movies: {
        Search: [],
        Response: "",
        totalResult: ""
    },
    errorMessage: ""
};

export const moviesReducer = createReducer<MoviesState, MoviesAction>(
    initialState,
    {
        [SEARCH_MOVIES_REQUEST]: state => ({
            ...state,
            loading: true,
            errorMessage: ""
        }),
        [SEARCH_MOVIES_SUCCESS]: (state, action) => ({
            ...state,
            movies: action.payload,
            loading: false
        }),
        [SEARCH_MOVIES_FAILURE]: (state, action) => ({
            ...state,
            errorMessage: action.payload,
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
        if (res.data.Response === "True") {
            yield put({
                type: SEARCH_MOVIES_SUCCESS,
                payload: res
            });
        } else {
            const { Error } = res;
            yield put({
                type: SEARCH_MOVIES_FAILURE,
                payload: Error
            });
        }
    } catch (e) {
        console.log(e);
    }
}

export function* moviesSaga() {
    yield takeLatest(SEARCH_MOVIES_REQUEST, searchMoviesFunc);
}
