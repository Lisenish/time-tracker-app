import { getTrackerState } from "../selectors/tracker";
import * as storageService from "../services/state-storage-service";
import { loadedTrackerState } from "./tracker";

/**  Action creator decorator which will save current tracker state to temp client storage (local storage) */
export const withTrackerDataPostSave = actionCreator => (
  ...args
) => dispatch => {
  dispatch(actionCreator(...args));
  dispatch(saveTrackerState());
};

export const saveTrackerState = () => (_, getState) => {
  const trackerState = getTrackerState(getState());

  storageService.saveState(trackerState);
};

export const loadTrackerState = () => dispatch => {
  const trackerState = storageService.loadState();

  dispatch(loadedTrackerState(trackerState));
};
