import { call, put } from "redux-saga/effects";

export const createPromiseSaga = (type, promiseCreator) => {
    const [SUCCESS, FAILURE] = [`${type}_SUCCESS`, `${type}_FAILURE`];
    return function* saga(action) {
        try {
            const res = yield call(promiseCreator, action.payload);
            yield put({ type: SUCCESS, payload: res });
        } catch (e) {
            yield put({ type: FAILURE, error: true, payload: e });
        }
    };
};

export const createPromiseSagaById = (type, promiseCreator) => {
    const [SUCCESS, FAILURE] = [`${type}_SUCCESS`, `${type}_FAILURE`];
    return function* saga(action) {
        try {
            const res = yield call(promiseCreator, action.payload);
            if (res.Response === "True") {
                yield put({ type: SUCCESS, payload: res });
            } else {
                yield put({ type: FAILURE, payload: res.Error });
            }
        } catch (e) {
            yield put({ type: FAILURE, error: e });
        }
    };
};

export const reducerUtils = {
    initial: (initialData = null) => ({
        loading: true,
        data: initialData,
        error: null
    }),
    loading: (prevState = null) => ({
        loading: true,
        data: prevState,
        error: null
    }),
    success: payload => ({
        loading: false,
        data: payload,
        error: null
    }),
    failure: error => ({
        loading: false,
        data: null,
        error: error
    })
};

export const handleAsyncActions = (type, key, keepData = false) => {
    const [SUCCESS, FAILURE] = [`${type}_SUCCESS`, `${type}_FAILURE`];
    return (state, action) => {
        switch (action.type) {
            case type:
                return {
                    ...state,
                    [key]: reducerUtils.loading(
                        keepData ? state[key].data : null
                    )
                };
            case SUCCESS:
                return {
                    ...state,
                    [key]: reducerUtils.success(action.payload)
                };
            case FAILURE:
                return {
                    ...state,
                    [key]: reducerUtils.failure(action.payload)
                };
            default:
                return state;
        }
    };
};
