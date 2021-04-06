import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Plot from "react-plotly.js";
import TimeSeries from "./TimeSeries";
import { TempCollection } from '../db/TempCollection';
import getDates from "../api/getDates";
import * as ts from "../api/handleTimestamp";
import * as samp from "../api/sample";

// TODO: handle seconds for smoother panning
function filterData(startDate, startTime, endDate, endTime, data) {
  let dp0 = [];
  let dp1 = [];
  let dp2 = [];
  let dp3 = [];
  let dp4 = [];
  let dp5 = [];
  let dp6 = [];

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
          const currTime = ts.formatTime(currHour, currMin);
          if (ts.isInRange(startDate, startTime, endDate, endTime, currDate, currTime)) {
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

export const App = () => {
  const [startDate, setStartDate] = useState("2013-10-02");
  const [startTime, setStartTime] = useState("05:00");
  const [endDate, setEndDate] = useState("2013-10-02");
  const [endTime, setEndTime] = useState("15:30");
  const [sampleSizeScale, setSampleSizeScale] = useState(5);

  const dateRange = getDates(new Date(startDate), new Date(endDate));
  const { temps } = useTracker(() => {
    let temps = [];
    for (let i = 0; i < dateRange.length; i++) {
      const cuurrTemp = TempCollection.find({ date: dateRange[i] }).fetch();
      temps.push(cuurrTemp);
    }
    return { temps };
  });

  const handleResize = (timeframe) => {
    setStartDate(timeframe[0][0]);
    setStartTime(timeframe[0][1]);
    setEndDate(timeframe[1][0]);
    setEndTime(timeframe[1][1]);
  };

  const dataset = filterData(startDate, startTime, endDate, endTime, temps);

  const r0 = samp.downsample(dataset[0], sampleSizeScale);
  const r1 = samp.downsample(dataset[1], sampleSizeScale);
  const r2 = samp.downsample(dataset[2], sampleSizeScale);
  const r3 = samp.downsample(dataset[3], sampleSizeScale);
  const r4 = samp.downsample(dataset[4], sampleSizeScale);
  const r5 = samp.downsample(dataset[5], sampleSizeScale);
  const r6 = samp.downsample(dataset[6], sampleSizeScale);

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
              value={startDate}
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
              value={startTime}
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
              value={endDate}
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
              value={endTime}
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
            defaultValue={sampleSizeScale}
            aria-labelledby="discrete-slider-small-steps"
            step={1}
            marks
            min={1}
            max={9}
            valueLabelDisplay="auto"
            onChange={(e, v) => setSampleSizeScale(v)}
          />
          <Typography variant="body2" gutterBottom>
            {samp.getSampleSizeString(sampleSizeScale)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TimeSeries
            onTimeframeChange={handleResize}
            r0={r0}
            r1={r1}
            r2={r2}
            r3={r3}
            r4={r4}
            r5={r5}
            r6={r6}
          />
        </Grid>
      </Grid>
    </div>
  );
}; 
