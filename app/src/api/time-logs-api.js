import { API_HOST, get, post } from "./api-client";

//TODO: handle potential errors in fetch, maybe remove hard-coded url, remove stubs

export async function getTimeLogs(from, to) {
  return get(
    `${API_HOST}/time-logs?from=${from.toISOString()}&to=${to.toISOString()}`
  ).then(mapJSONToTimeLogs);
}

export async function saveTimeLog(timeLog) {
  const timeLogDto = { name: timeLog.name, time: timeLog.time };

  return post(`${API_HOST}/time-logs`, timeLogDto);
}

const mapJSONToTimeLogs = timeLogs =>
  timeLogs.map(timeLog => ({
    ...timeLog,
    createdAt: new Date(timeLog.createdAt)
  }));
