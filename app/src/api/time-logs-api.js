import { API_HOST, get, post } from "./api-client";

//TODO: handle potential errors in fetch, maybe remove hard-coded url, remove stubs

export async function getTimeLogs() {
  return get(`${API_HOST}/time-logs`).then(mapTimeLogs);
}

const mapTimeLogs = timeLogs =>
  timeLogs.map(timeLog => ({
    ...timeLog,
    createdAt: new Date(timeLog.createdAt)
  }));

export async function saveTimeLog(timeLog) {
  return post(`${API_HOST}/time-logs`, timeLog);
}
