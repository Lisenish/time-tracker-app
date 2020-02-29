import { resetTracker, stopTracker } from "./tracker";
import { withTrackerDataPostSave } from "./tracker-persistance";
import * as timeLogsApi from "./../api/time-logs-api";
import nanoid from "nanoid";

export const TIME_LOG_ADD = "TIME_LOG_ADD";
export const TIME_LOG_LOAD_SUCCESS = "TIME_LOG_LOAD_SUCCESS";
export const TIME_LOG_UPDATE = "TIME_LOG_UPDATE";
export const TIME_LOG_UPDATE_SUCCESS = "TIME_LOG_UPDATE_SUCCESS";
export const TIME_LOG_DELETE = "TIME_LOG_DELETE";
export const TIME_LOG_FILTER_CHANGE = "TIME_LOG_FILTER_CHANGE";

export const addTimeLog = withTrackerDataPostSave((name, time) => dispatch => {
  dispatch(stopTracker());
  dispatch(resetTracker());

  const timeLog = {
    id: nanoid(10),
    name,
    time,
    createdAt: new Date()
  };

  dispatch({
    type: TIME_LOG_ADD,
    timeLog
  });

  timeLogsApi.saveTimeLog(timeLog);

  //TODO: update timeLog id on success? Show toast on error?
});

export const updateTimeLog = timeLog => dispatch => {
  dispatch({
    type: TIME_LOG_UPDATE,
    timeLog
  });

  timeLogsApi
    .updateTimeLog(timeLog)
    .then(timeLog => dispatch(updateTimeLogSuccess(timeLog)));
};

export const loadTimeLogs = (from, to) => dispatch =>
  timeLogsApi
    .getTimeLogs(from, to)
    .then(timeLogs => dispatch(loadTimeLogsSuccess(timeLogs)));

export const changeTimeLogFilter = filter => ({
  type: TIME_LOG_FILTER_CHANGE,
  filter
});

const loadTimeLogsSuccess = timeLogs => ({
  type: TIME_LOG_LOAD_SUCCESS,
  timeLogs
});

const updateTimeLogSuccess = timeLog => ({
  type: TIME_LOG_LOAD_SUCCESS,
  timeLog
});
