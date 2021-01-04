import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, compose, Store } from "redux";
import rootSaga from "./saga";
import rootReducer from "./reducer";

const composeEnhancer: typeof compose =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const appSagaMiddleware = createSagaMiddleware();

const middlewares = [appSagaMiddleware];

const store: Store<any, any> = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(...middlewares))
);

appSagaMiddleware.run(rootSaga);

export default store;
