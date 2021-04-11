import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import TimeSeries from "./TimeSeries";
import { TempCollection } from '../db/TempCollection';
import getDates from "../api/getDates";
import * as ts from "../api/handleTimestamp";
import * as samp from "../api/sample";
import Floorplan from "./Floorplan";

export const App = () => {
  const [startDate, setStartDate] = useState("2013-10-02");
  const [startTime, setStartTime] = useState("05:00");
  const [endDate, setEndDate] = useState("2013-10-02");
  const [endTime, setEndTime] = useState("15:30");
  const [sampleSizeScale, setSampleSizeScale] = useState(5);
  const [isr0visible, setr0visible] = useState(true);
  const [isr1visible, setr1visible] = useState(true);
  const [isr2visible, setr2visible] = useState(true);
  const [isr3visible, setr3visible] = useState(true);
  const [isr4visible, setr4visible] = useState(true);
  const [isr5visible, setr5visible] = useState(true);
  const [isr6visible, setr6visible] = useState(true);

  const dateRange = getDates(new Date(startDate), new Date(endDate));
  
  const { temps, isLoading } = useTracker(() => {
    /**
     * Retrieves documents for a given date range
     */
    const noDataAvailable = { temps: [] };

    const handler = Meteor.subscribe("temps");

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    let temps = [];
    for (let i = 0; i < dateRange.length; i++) {
      const cuurrTemp = TempCollection.find({ date: dateRange[i] }).fetch();
      temps.push(cuurrTemp);
    }
    return { temps };
  });

  const handleResize = (timeframe) => {
    /**
     * Adjusts timeframe when user pans on graph
     */
    setStartDate(timeframe[0][0]);
    setStartTime(timeframe[0][1]);
    setEndDate(timeframe[1][0]);
    setEndTime(timeframe[1][1]);
  };

  const handleRoomClick = (room) => {
    switch (room) {
      case 0:
        setr0visible(!isr0visible);
        break;
      case 1:
        setr1visible(!isr1visible);
        break;
      case 2:
        setr2visible(!isr2visible);
        break;
      case 3:
        setr3visible(!isr3visible);
        break;
      case 4:
        setr4visible(!isr4visible);
        break;
      case 5:
        setr5visible(!isr5visible);
        break;
      case 6:
        setr6visible(!isr6visible);
        break;
    }
  }

  const dataset = ts.filterData(startDate, startTime, endDate, endTime, temps);

  const r0 = samp.downsample(dataset[0], sampleSizeScale);
  const r1 = samp.downsample(dataset[1], sampleSizeScale);
  const r2 = samp.downsample(dataset[2], sampleSizeScale);
  const r3 = samp.downsample(dataset[3], sampleSizeScale);
  const r4 = samp.downsample(dataset[4], sampleSizeScale);
  const r5 = samp.downsample(dataset[5], sampleSizeScale);
  const r6 = samp.downsample(dataset[6], sampleSizeScale);

  let avgTemps = {
    r0avg: samp.getAvg(r0[1]),
    r1avg: samp.getAvg(r1[1]),
    r2avg: samp.getAvg(r2[1]),
    r3avg: samp.getAvg(r3[1]),
    r4avg: samp.getAvg(r4[1]),
    r5avg: samp.getAvg(r5[1]),
    r6avg: samp.getAvg(r6[1])
  }

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
            visibility={[
              isr0visible,
              isr1visible,
              isr2visible,
              isr3visible,
              isr4visible,
              isr5visible,
              isr6visible,
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <Floorplan
            onRoomClick={handleRoomClick}
            avgTemps={avgTemps}
            visibility={[
              isr0visible,
              isr1visible,
              isr2visible,
              isr3visible,
              isr4visible,
              isr5visible,
              isr6visible,
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
};
