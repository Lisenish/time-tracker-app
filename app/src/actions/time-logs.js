import { resetTracker, stopTracker } from "./tracker";
import { withTrackerDataPostSave } from "./tracker-persistance";
import * as timeLogsApi from "./../api/time-logs-api";

export const TIME_LOG_ADD = "TIME_LOG_ADD";
export const TIME_LOG_LOAD_SUCCESS = "TIME_LOG_LOAD_SUCCESS";
export const TIME_LOG_SAVE = "TIME_LOG_LOAD";
export const TIME_LOG_FILTER_CHANGE = "TIME_LOG_FILTER_CHANGE";

export const addTimeLog = withTrackerDataPostSave((name, time) => dispatch => {
  dispatch(stopTracker());
  dispatch(resetTracker());

  const timeLog = {
    id: "generated_id", //TODO: generate id here
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

export const loadTimeLogs = (from, to) => dispatch =>
  timeLogsApi
    .getTimeLogs(from, to)
    .then(timeLogs => dispatch(loadTimeLogsSuccess(timeLogs)));

export const loadTimeLogsSuccess = timeLogs => ({
  type: TIME_LOG_LOAD_SUCCESS,
  timeLogs
});

export const changeTimeLogFilter = filter => ({
  type: TIME_LOG_FILTER_CHANGE,
  filter
});

export const saveTimeLog = timeLog => () => timeLogsApi.saveTimeLog(timeLog);
