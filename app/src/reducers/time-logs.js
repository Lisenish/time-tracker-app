import { TIME_LOG_ADD, TIME_LOG_LOAD_SUCCESS } from "../actions/time-logs";

const timeLogs = (state = [], action) => {
  switch (action.type) {
    case TIME_LOG_ADD:
      return [...state, action.timeLog];
    case TIME_LOG_LOAD_SUCCESS:
      return action.timeLogs;
    default:
      return state;
  }
};

export default timeLogs;
