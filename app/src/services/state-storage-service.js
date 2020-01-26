const storageKey = "pento_tracking_app_tracker_state";

export function saveState(state) {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

export function loadState() {
  return JSON.parse(localStorage.getItem(storageKey));
}

export function clearState() {
  localStorage.removeItem(storageKey);
}
