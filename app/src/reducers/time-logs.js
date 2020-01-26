import { TIME_LOG_ADD } from "../actions/time-logs";

const timeLogs = (state = [], action) => {
  switch (action.type) {
    case TIME_LOG_ADD:
      return [...state, action.timeLog];
    default:
      return state;
  }
};

export default timeLogs;
