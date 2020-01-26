//TODO: handle potential errors in fetch, maybe remove hard-coded url, remove stubs

const API_HOST = "localhost";

const timeLogsStub = [
  {
    id: 1,
    name: "Session 1",
    time: 56245000,
    createdAt: new Date("2020-01-26")
  },
  {
    id: 2,
    name: "Session 2",
    time: 1234522,
    createdAt: new Date("2020-01-24")
  },
  {
    id: 3,
    name: "Session 3",
    time: 77777754,
    createdAt: new Date("2020-01-01")
  }
];

export async function getTimeLogs() {
  return Promise.resolve(timeLogsStub);
  //   return get(`${API_HOST}/time-logs`);
}

export async function saveTimeLog(timeLog) {
  return post(`${API_HOST}/time-logs`, timeLog);
}

function get(url) {
  return fetch(url).then(data => data.json());
}

function post(url, data) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(data => data.json());
}
