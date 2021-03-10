import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import combineReducers from "./reducers";

const initialState = {};
const middleware = [thunk];

const store = createStore(
  combineReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
