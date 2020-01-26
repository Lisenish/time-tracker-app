import { withTrackerDataPostSave } from "./tracker-persistance";

export const TRACKER_START = "TRACKER_START";
export const TRACKER_STOP = "TRACKER_STOP";
export const TRACKER_RESET = "TRACKER_RESET";
export const TRACKER_TIMER_TICK = "TRACKER_TIME_TICK";
export const TRACKER_SESSION_NAME_CHANGE = "TRACKER_SESSION_NAME_CHANGE";
export const TRACKER_STATE_LOADED = "TRACKER_STATE_LOADED";

const timerTick = 1000;

let timerId;

const _startTracker = () => dispatch => {
  timerId = setInterval(() => {
    dispatch(_addTimerTick());
  }, timerTick);

  dispatch({
    type: TRACKER_START
  });
};

const _stopTracker = () => dispatch => {
  clearInterval(timerId);

  dispatch({
    type: TRACKER_STOP
  });
};

const _changeSessionName = newName => ({
  type: TRACKER_SESSION_NAME_CHANGE,
  newName
});

const _resetTracker = () => ({
  type: TRACKER_RESET
});

const _addTimerTick = withTrackerDataPostSave(() => ({
  type: TRACKER_TIMER_TICK,
  incrementMs: timerTick
}));

export const startTracker = withTrackerDataPostSave(_startTracker);
export const stopTracker = withTrackerDataPostSave(_stopTracker);
export const resetTracker = withTrackerDataPostSave(_resetTracker);
export const changeSessionName = withTrackerDataPostSave(_changeSessionName);

export const loadedTrackerState = loadedState => ({
  type: TRACKER_STATE_LOADED,
  loadedState
});
