import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Plot from "react-plotly.js";
import { TimeSeries } from "./TimeSeries";
import { TempCollection } from '../db/TempCollection';
import getDates from "../api/getDates";

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
  return (curr >= start) && (curr <= end);
}

function separateDateTime(str) {
  /**
   * Gets date and time from the format "2013-10-02 08:08:08.0157" given by plotly
   */

  const date = str.split(' ')[0];
  const time = str.split(' ')[1].slice(0, 5)
  return [date, time];
}

function filterData(startDate, startTime, endDate, endTime, data) {
  let r0y = [];
  let r1y = [];
  let r2y = [];
  let r3y = [];
  let r4y = [];
  let r6y = [];

  let x = new Set();

  // Should only contain data within our date range
  for (let day = 0; day < data.length; day++) { // for each day
    const currDay = data[day];
    for (let i = 0; i < currDay.length; i++) { // for each room
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
          if (isInRange(startDate, startTime, endDate, endTime, currDate, currTime)) {
            if (currRoom === 0) {
              r0y.push(currMinBlock.temp);
            } else if (currRoom === 1) {
              r1y.push(currMinBlock.temp);
            } else if (currRoom === 2) {
              r2y.push(currMinBlock.temp);
            } else if (currRoom === 3) {
              r3y.push(currMinBlock.temp);
            } else if (currRoom === 4) {
              r4y.push(currMinBlock.temp);
            } else if (currRoom === 6) {
              r6y.push(currMinBlock.temp);
            }
            x.add(currDate + "T" + currTime);
          }
        }
      }
    }
  }
  x = Array.from(x);
  return [r0y, r1y, r2y, r3y, r4y, r6y, x];
}

export const App = () => {
  const [startDate, setStartDate] = useState("2013-10-02");
  const [startTime, setStartTime] = useState("05:00");
  const [endDate, setEndDate] = useState("2013-10-02");
  const [endTime, setEndTime] = useState("15:30");
  const [sampleSize, setSampleSize] = useState(25);

  const dateRange = getDates(new Date(startDate), new Date(endDate));
  const { temps } = useTracker(() => {
    let temps = [];
    for (let i = 0; i < dateRange.length; i++) {
      const cuurrTemp = TempCollection.find(
        {date: dateRange[i]}
      ).fetch();
      temps.push(cuurrTemp)
    }
    return { temps };
  });

  const dataset = filterData(startDate, startTime, endDate, endTime, temps);

  const handleResize = (e) => {
    let xStart = e['xaxis.range[0]'];
    let xEnd = e["xaxis.range[1]"];
    xStart = separateDateTime(xStart);
    xEnd = separateDateTime(xEnd);
    setStartDate(xStart[0]);
    setStartTime(xStart[1]);
    setEndDate(xEnd[0]);
    setEndTime(xEnd[1]);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Temperature Tapir 🦡
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <form noValidate>
            <TextField
              id="startDate"
              label="Start Date"
              type="date"
              defaultValue={startDate}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </form>
        </Grid>
        <Grid item xs={6} sm={3}>
          <form noValidate>
            <TextField
              id="startTime"
              label="Start Time"
              type="time"
              defaultValue={startTime}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </form>
        </Grid>
        <Grid item xs={6} sm={3}>
          <form noValidate>
            <TextField
              id="endDate"
              label="End Date"
              type="date"
              defaultValue={endDate}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </form>
        </Grid>
        <Grid item xs={6} sm={3}>
          <form noValidate>
            <TextField
              id="endTime"
              label="End Time"
              type="time"
              defaultValue={endTime}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </form>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" gutterBottom>
            Sample size
          </Typography>
          <Slider
            defaultValue={sampleSize}
            aria-labelledby="discrete-slider-small-steps"
            step={1}
            marks
            min={1}
            max={50}
            valueLabelDisplay="auto"
            onChange={(e, v) => setSampleSize(v)}
          />
        </Grid>
        <Grid item xs={12}>
          <Plot
            onRelayout={handleResize}
            data={[
              {
                name: "Room 0",
                x: dataset[6],
                y: dataset[0],
                type: "scatter",
                marker: { color: "#db5f57" },
              },
              {
                name: "Room 1",
                x: dataset[6],
                y: dataset[1],
                type: "scatter",
                marker: { color: "#dbc257" },
              },
              {
                name: "Room 2",
                x: dataset[6],
                y: dataset[2],
                type: "scatter",
                marker: { color: "#91db57" },
              },
              {
                name: "Room 3",
                x: dataset[6],
                y: dataset[3],
                type: "scatter",
                marker: { color: "#57d3db" },
              },
              {
                name: "Room 4",
                x: dataset[6],
                y: dataset[4],
                type: "scatter",
                marker: { color: "#5770db" },
              },
              {
                name: "Room 6",
                x: dataset[6],
                y: dataset[5],
                type: "scatter",
                marker: { color: "#db57b2" },
              },
            ]}
            layout={{ width: "100%", height: 500, title: "Time Series" }}
          />
        </Grid>
      </Grid>
    </div>
  );
}; 
