import {
  TRACKER_START,
  TRACKER_STOP,
  TRACKER_TIMER_TICK,
  TRACKER_STATE_LOADED,
  TRACKER_SESSION_NAME_CHANGE,
  TRACKER_RESET
} from "../actions/tracker";
import { TIME_LOG_ADD } from "../actions/time-logs";

const initialState = {
  elapsedTime: 0,
  isStarted: false,
  sessionName: ""
};

const tracker = (state = initialState, action) => {
  switch (action.type) {
    case TRACKER_STATE_LOADED:
      return { ...action.loadedState, isStarted: false } || initialState;
    case TRACKER_START:
      return {
        ...state,
        isStarted: true
      };
    case TRACKER_TIMER_TICK:
      return { ...state, elapsedTime: state.elapsedTime + action.incrementMs };
    case TRACKER_STOP:
      return {
        ...state,
        isStarted: false
      };
    case TRACKER_RESET:
      return initialState;
    case TIME_LOG_ADD:
      return {
        ...state,
        elapsedTime: 0
      };
    case TRACKER_SESSION_NAME_CHANGE:
      return {
        ...state,
        sessionName: action.newName
      };
    default:
      return state;
  }
};

export default tracker;
