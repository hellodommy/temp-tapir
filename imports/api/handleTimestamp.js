function formatTime(hour, min) {
  /**
   * Formats time in HH:MM from int inputs
   */
  let hourStr = hour.toString();
  let minStr = min.toString();
  if (hourStr.length < 2) hourStr = "0" + hourStr;
  if (minStr.length < 2) minStr = "0" + minStr;
  return `${hourStr}:${minStr}`;
}

function isInRange(startDate, startTime, endDate, endTime, currDate, currTime) {
  /**
   * Checks if a given timeframe is within range
   */
  const start = new Date(`${startDate}T${startTime}`);
  const end = new Date(`${endDate}T${endTime}`);
  const curr = new Date(`${currDate}T${currTime}`);
  return curr >= start && curr <= end;
}

export function removeColon(str) {
  return str.replace(":", "");
}

export function addColon(str) {
  return str.slice(0, 2) + ":" + str.slice(2, 4);
}

export function separateDateTime(str) {
  /**
   * Gets date and time from the format "2013-10-02 08:08:08.0157" given by plotly
   */

  const date = str.split(" ")[0];
  const time = str.split(" ")[1].slice(0, 5);
  return [date, time];
}

// TODO: Move to separate file if possible because it's not rly related to timestamp
export function filterData(startDate, startTime, endDate, endTime, data) {
  /**
   * Filters temperature data only for a specific timeframe
   */
  let dp0 = [];
  let dp1 = [];
  let dp2 = [];
  let dp3 = [];
  let dp4 = [];
  let dp5 = [];
  let dp6 = [];

  // Should only contain data within our date range
  for (let day = 0; day < data.length; day++) {
    // for each day
    const currDay = data[day];
    for (let i = 0; i < currDay.length; i++) {
      // for each room
      const currDoc = currDay[i];
      const currRoom = currDoc.room;
      const currData = currDoc.data;
      const currDate = currDoc.date;
      for (let j = 0; j < currData.length; j++) {
        // for each hour under the room
        const currHourBlock = currData[j];
        const currHour = currHourBlock.hour;
        const currDetails = currHourBlock.details;
        for (let k = 0; k < currDetails.length; k++) {
          const currMinBlock = currDetails[k];
          const currMin = currMinBlock.min;
          const currTime = formatTime(currHour, currMin);
          if (
            isInRange(
              startDate,
              startTime,
              endDate,
              endTime,
              currDate,
              currTime
            )
          ) {
            const datestring = currDate + "T" + currTime;
            const date = new Date(datestring);
            if (currRoom === 0) {
              dp0.push([date, currMinBlock.temp]);
            } else if (currRoom === 1) {
              dp1.push([date, currMinBlock.temp]);
            } else if (currRoom === 2) {
              dp2.push([date, currMinBlock.temp]);
            } else if (currRoom === 3) {
              dp3.push([date, currMinBlock.temp]);
            } else if (currRoom === 5) {
              dp5.push([date, currMinBlock.temp]);
            } else if (currRoom === 4) {
              dp4.push([date, currMinBlock.temp]);
            } else if (currRoom === 6) {
              dp6.push([date, currMinBlock.temp]);
            }
          }
        }
      }
    }
  }
  return [dp0, dp1, dp2, dp3, dp4, dp5, dp6];
}
