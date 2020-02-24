import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

export const createTimeTrackerStore = initialState =>
  createStore(rootReducer, initialState, applyMiddleware(thunk));

export default createTimeTrackerStore();
