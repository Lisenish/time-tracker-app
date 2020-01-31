
export const getTimeLogs = state =>
  state.timeLogs.allIds.map(id => state.timeLogs.byId[id]);

export const getFilter = state => state.timeLogs.filter;

export const getLoadRange = state => state.timeLogs.loadRange;


