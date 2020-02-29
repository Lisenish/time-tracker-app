import { API_HOST, get, post } from "./api-client";

//TODO: handle potential errors in fetch, maybe remove hard-coded url, remove stubs

export function getTimeLogs(from, to) {
  return get(
    `${API_HOST}/time-logs?from=${from.toISOString()}&to=${to.toISOString()}`
  ).then(mapJSONToTimeLogs);
}

export function saveTimeLog(timeLog) {
  const timeLogDto = mapTimeLogToDto(timeLog);

  return post(`${API_HOST}/time-logs`, timeLogDto);
}

export function updateTimeLog(timeLog) {
  const timeLogDto = mapTimeLogToDto(timeLog);

  return post(`${API_HOST}/time-logs/${timeLog.id}`, timeLogDto);
}

const mapTimeLogToDto = timeLog => ({ name: timeLog.name, time: timeLog.time });

const mapJSONToTimeLogs = timeLogs =>
  timeLogs.map(timeLog => ({
    ...timeLog,
    createdAt: new Date(timeLog.createdAt)
  }));
