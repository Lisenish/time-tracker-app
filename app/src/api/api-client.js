export const API_HOST = "http://localhost:1323";

export function get(url) {
  return fetch(url).then(data => data.json());
}

export function post(url, data) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(data => data ? data.json() : null);
}
