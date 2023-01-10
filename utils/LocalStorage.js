export function setLocalData(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalData(key) {
  return JSON.parse(window.localStorage.getItem(key));
}
