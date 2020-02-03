import {
  TIME_LOG_ADD,
  TIME_LOG_FILTER_CHANGE,
  TIME_LOG_LOAD_SUCCESS
} from "../actions/time-logs";
import { FilterRange } from "../enums/filterRange";
import {

  getMonday,
  getSunday,
  toDayEnd,
  toDayStart,
  getFirstDayOfMonth,
  getLastDayOfMonth
} from "../services/date-service";

const initialState = {
  byId: {},
  allIds: [],
  filter: FilterRange.DAY,
  loadRange: calculateLoadRangeFromFilter(FilterRange.DAY)
};

const timeLogs = (state = initialState, action) => {
  switch (action.type) {
    case TIME_LOG_ADD:
      //TODO: check if we in current load range
      return {
        ...state,
        byId: byIdReducer(state.byId, action),
        allIds: allIdsReducer(state.allIds, action)
      };
    case TIME_LOG_LOAD_SUCCESS:
      return {
        ...state,
        byId: byIdReducer(state.byId, action),
        allIds: allIdsReducer(state.allIds, action)
      };
    case TIME_LOG_FILTER_CHANGE:
      return {
        ...state,
        filter: action.filter,
        loadRange: calculateLoadRangeFromFilter(action.filter)
      };
    default:
      return state;
  }
};

const byIdReducer = (state, action) => {
  switch (action.type) {
    case TIME_LOG_ADD:
      return { ...state, ...{ [action.timeLog.id]: action.timeLog } };

    case TIME_LOG_LOAD_SUCCESS:
      return action.timeLogs.reduce((map, timeLog) => {
        map[timeLog.id] = timeLog;
        return map;
      }, {});
    default:
      return state;
  }
};

const allIdsReducer = (state, action) => {
  switch (action.type) {
    case TIME_LOG_ADD:
      return [...state, action.timeLog.id];

    case TIME_LOG_LOAD_SUCCESS:
      return action.timeLogs.map(timeLog => timeLog.id);
    default:
      return state;
  }
};

//Should be cacheable selector from reselect, but I decided not to bring another dependency to that simple project
function calculateLoadRangeFromFilter(filter) {
  const now = new Date();

  switch (filter) {
    case FilterRange.DAY:
      return {
        from: toDayStart(now),
        to: toDayEnd(now)
      };
    case FilterRange.WEEK:
      return {
        from: getMonday(toDayStart(now)),
        to: getSunday(toDayEnd(now))
      };
    case FilterRange.MONTH:
      return {
        from: getFirstDayOfMonth(toDayStart(now)),
        to: getLastDayOfMonth(toDayEnd(now))
      };
    default:
      throw new Error(`Unexpected filter value = ${filter}`);
  }
}

export default timeLogs;
