import { stopTracker } from "./tracker";
import { withTrackerDataPostSave } from "./tracker-persistance";

export const TIME_LOG_ADD = "TIME_LOG_ADD";
export const TIME_LOG_LOAD = "TIME_LOG_LOAD";
export const TIME_LOG_SAVE = "TIME_LOG_LOAD";

export const addTimeLog = withTrackerDataPostSave(
  (name, elapsedTime) => dispatch => {
    dispatch(stopTracker());

    const timeLog = {
      name,
      elapsedTime,
      createdDate: new Date()
    };

    dispatch({
      type: TIME_LOG_ADD,
      timeLog
    });
  }
);
