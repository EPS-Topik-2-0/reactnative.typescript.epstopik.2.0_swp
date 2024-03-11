import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "@redux-devtools/extension";

import reducers from "./reducers";
import sagas from "./saga";

export const APP_INIT = "APP_INIT";

const sagaMiddleware = createSagaMiddleware();

const composedEnhancers = composeWithDevTools(
  applyMiddleware(...[sagaMiddleware])
);

const reducer = combineReducers(reducers);

const rootReducer = (state: any, action: any) => {
  return reducer(state, action);
};

export const store = createStore(rootReducer, composedEnhancers);

sagaMiddleware.run(sagas);

export default store;
