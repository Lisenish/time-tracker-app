export const API_HOST = "http://localhost:1323";

export function get(url) {
  return fetch(url).then(parseResponse);
}

export function post(url, data) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(parseResponse);
}

function parseResponse(response) {
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response ? response.json() : null;
}
