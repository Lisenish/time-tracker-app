import { combineReducers } from "redux";
import timeLogs from "./time-logs";
import tracker from "./tracker";

const rootReducer = combineReducers({
  timeLogs,
  tracker
});

export default rootReducer;
