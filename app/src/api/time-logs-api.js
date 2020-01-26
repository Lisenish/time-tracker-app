//TODO: handle potential errors in fetch, maybe remove hard-coded url, remove stubs

const API_HOST = "localhost";

export async function getTimeLogs() {
  return get(`${API_HOST}/time-logs`);
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
