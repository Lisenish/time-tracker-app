import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

export const storeCreator = () =>
  createStore(rootReducer, applyMiddleware(thunk));

export default storeCreator();
