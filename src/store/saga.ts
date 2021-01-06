import { all, fork } from "redux-saga/effects";
import { moviesSaga } from "modules/movies";

export default function* rootSaga() {
    yield all([fork(moviesSaga)]);
}
