//TODO: better to return object here and memo string in component?

export default function formatMsToTimeString(timeInMs) {
  let seconds = Math.floor(timeInMs / 1000 % 60);
  let minutes = Math.floor(timeInMs / 1000 / 60 % 60);
  let hours = Math.floor(timeInMs / 1000 / 60 / 60);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return `${hours}:${minutes}:${seconds}`;
}
