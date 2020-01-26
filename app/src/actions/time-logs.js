import { resetTracker, stopTracker } from "./tracker";
import { withTrackerDataPostSave } from "./tracker-persistance";
import { getTimeLogs } from "./../api/time-logs-api";

export const TIME_LOG_ADD = "TIME_LOG_ADD";
export const TIME_LOG_LOAD_SUCCESS = "TIME_LOG_LOAD_SUCCESS";
export const TIME_LOG_SAVE = "TIME_LOG_LOAD";

export const addTimeLog = withTrackerDataPostSave((name, time) => dispatch => {
  dispatch(stopTracker());
  dispatch(resetTracker());

  dispatch({
    type: TIME_LOG_ADD,
    timeLog: {
      id: -1,
      name,
      time,
      createdAt: new Date()
    }
  });
});

//TODO: Add dates params
export const loadTimeLogs = () => dispatch =>
  getTimeLogs().then(timeLogs => dispatch(loadTimeLogsSuccess(timeLogs)));

export const loadTimeLogsSuccess = timeLogs => ({
  type: TIME_LOG_LOAD_SUCCESS,
  timeLogs
});
