export function formatTime(hour, min) {
  /**
   * Formats time in HH:MM from int inputs
   */
  let hourStr = hour.toString();
  let minStr = min.toString();
  if (hourStr.length < 2) hourStr = "0" + hourStr;
  if (minStr.length < 2) minStr = "0" + minStr;
  return `${hourStr}:${minStr}`;
}

export function isInRange(startDate, startTime, endDate, endTime, currDate, currTime) {
  /**
   * Checks if a given timeframe is within range
   */
  const start = new Date(`${startDate}T${startTime}`);
  const end = new Date(`${endDate}T${endTime}`);
  const curr = new Date(`${currDate}T${currTime}`);
  return curr >= start && curr <= end;
}

export function separateDateTime(str) {
  /**
   * Gets date and time from the format "2013-10-02 08:08:08.0157" given by plotly
   */

  const date = str.split(" ")[0];
  const time = str.split(" ")[1].slice(0, 5);
  return [date, time];
}
