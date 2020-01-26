//TODO: memo evaluation string in component? Or create re-select selector?

export default function formatMsToTimeString(timeInMs) {
  let seconds = Math.floor(timeInMs / 1000 % 60);
  let minutes = Math.floor(timeInMs / 1000 / 60 % 60);
  let hours = Math.floor(timeInMs / 1000 / 60 / 60);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return `${hours}:${minutes}:${seconds}`;
}
