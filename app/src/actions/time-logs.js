import { resetTracker, stopTracker } from "./tracker";
import { withTrackerDataPostSave } from "./tracker-persistance";
import * as timeLogsApi from "./../api/time-logs-api";

export const TIME_LOG_ADD = "TIME_LOG_ADD";
export const TIME_LOG_LOAD_SUCCESS = "TIME_LOG_LOAD_SUCCESS";
export const TIME_LOG_SAVE = "TIME_LOG_LOAD";

export const addTimeLog = withTrackerDataPostSave((name, time) => dispatch => {
  dispatch(stopTracker());
  dispatch(resetTracker());

  const timeLog = {
    id: -1,
    name,
    time,
    createdAt: new Date()
  };

  dispatch({
    type: TIME_LOG_ADD,
    timeLog
  });

  dispatch(saveTimeLog(timeLog));

  //TODO: update timeLog id on success? Show toast on error?
});

//TODO: Add dates params
export const loadTimeLogs = () => dispatch =>
  timeLogsApi
    .getTimeLogs()
    .then(timeLogs => dispatch(loadTimeLogsSuccess(timeLogs)));

export const loadTimeLogsSuccess = timeLogs => ({
  type: TIME_LOG_LOAD_SUCCESS,
  timeLogs
});

export const saveTimeLog = timeLog => () => timeLogsApi.saveTimeLog(timeLog);
