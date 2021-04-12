import React, { useState, Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import { TempCollection } from '../db/TempCollection';
import getDates from "../api/getDates";
import * as ts from "../api/handleTimestamp";
import * as samp from "../api/sample";

const Floorplan = React.lazy(() => import("./Floorplan"));
const TimeSeries = React.lazy(() => import("./TimeSeries"));

function getParams(location, field) {
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get(field) || "";
}

function hasParams(location, field) {
  const searchParams = new URLSearchParams(location.search);
  return searchParams.has(field);
}

function setParams(name, value) {
  const searchParams = new URLSearchParams();
  searchParams.set(name, value);
  return searchParams.toString();
}

const MainPage = (props) => {
  const { location } = props;
  const [startDate, setStartDate] = hasParams(location, "startDate")
    ? useState(getParams(location, "startDate"))
    : useState("2013-10-02");
  const [startTime, setStartTime] = hasParams(location, "startTime")
    ? useState(ts.addColon(getParams(location, "startTime")))
    : useState("05:00");
  const [endDate, setEndDate] = hasParams(location, "endDate")
    ? useState(getParams(location, "endDate"))
    : useState("2013-10-02");
  const [endTime, setEndTime] = hasParams(location, "endTime")
    ? useState(ts.addColon(getParams(location, "endTime")))
    : useState("15:30");
  const [sampleSizeScale, setSampleSizeScale] = hasParams(location, "sampleSizeScale")
    ? useState(parseInt(getParams(location, "sampleSizeScale")))
    : useState(5);
  const [isr0visible, setr0visible] = hasParams(location, "r0")
    ? useState(getParams(location, "r0") === 'true' ? true : false)
    : useState(true);
  const [isr1visible, setr1visible] = hasParams(location, "r1")
    ? useState(getParams(location, "r1") === "true" ? true : false)
    : useState(true);
  const [isr2visible, setr2visible] = hasParams(location, "r2")
    ? useState(getParams(location, "r2") === "true" ? true : false)
    : useState(true);
  const [isr3visible, setr3visible] = hasParams(location, "r3")
    ? useState(getParams(location, "r3") === "true" ? true : false)
    : useState(true);
  const [isr4visible, setr4visible] = hasParams(location, "r4")
    ? useState(getParams(location, "r4") === "true" ? true : false)
    : useState(true);
  const [isr5visible, setr5visible] = hasParams(location, "r5")
    ? useState(getParams(location, "r5") === "true" ? true : false)
    : useState(true);
  const [isr6visible, setr6visible] = hasParams(location, "r6")
    ? useState(getParams(location, "r6") === "true" ? true : false)
    : useState(true);

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
    const sdUrl = setParams("startDate", timeframe[0][0]);
    setStartTime(timeframe[0][1]);
    const stUrl = setParams("startTime", ts.removeColon(timeframe[0][1]));
    setEndDate(timeframe[1][0]);
    const edUrl = setParams("endDate", timeframe[1][0]);
    setEndTime(timeframe[1][1]);
    const etUrl = setParams("endTime", ts.removeColon(timeframe[1][1]));

    const ssUrl = setParams("sampleSizeScale", sampleSizeScale);
    const r0Url = setParams("r0", isr0visible);
    const r1Url = setParams("r1", isr1visible);
    const r2Url = setParams("r2", isr2visible);
    const r3Url = setParams("r3", isr3visible);
    const r4Url = setParams("r4", isr4visible);
    const r5Url = setParams("r5", isr5visible);
    const r6Url = setParams("r6", isr6visible);
    props.history.push(
      `?${sdUrl}&${stUrl}&${edUrl}&${etUrl}&${ssUrl}&${r0Url}&${r1Url}&${r2Url}&${r3Url}&${r4Url}&${r5Url}&${r6Url}`
    );
  };

  const handleRoomClick = (room) => {
    let r0Url = setParams("r0", isr0visible);
    let r1Url = setParams("r1", isr1visible);
    let r2Url = setParams("r2", isr2visible);
    let r3Url = setParams("r3", isr3visible);
    let r4Url = setParams("r4", isr4visible);
    let r5Url = setParams("r5", isr5visible);
    let r6Url = setParams("r6", isr6visible);

    switch (room) {
      case 0:
        setr0visible(!isr0visible);
        r0Url = setParams("r0", !isr0visible);
        break;
      case 1:
        setr1visible(!isr1visible);
        r1Url = setParams("r1", !isr1visible);
        break;
      case 2:
        setr2visible(!isr2visible);
        r2Url = setParams("r2", !isr2visible);
        break;
      case 3:
        setr3visible(!isr3visible);
        r3Url = setParams("r3", !isr3visible);
        break;
      case 4:
        setr4visible(!isr4visible);
        r4Url = setParams("r4", !isr4visible);
        break;
      case 5:
        setr5visible(!isr5visible);
        r5Url = setParams("r5", !isr5visible);
        break;
      case 6:
        setr6visible(!isr6visible);
        r6Url = setParams("r6", !isr6visible);
        break;
    }

    const sdUrl = setParams("startDate", startDate);
    const stUrl = setParams("startTime", ts.removeColon(startTime));
    const edUrl = setParams("endDate", endDate);
    const etUrl = setParams("endTime", ts.removeColon(endTime));
    const ssUrl = setParams("sampleSizeScale", sampleSizeScale);
    props.history.push(
      `?${sdUrl}&${stUrl}&${edUrl}&${etUrl}&${ssUrl}&${r0Url}&${r1Url}&${r2Url}&${r3Url}&${r4Url}&${r5Url}&${r6Url}`
    );
  };

  const handleDateTimeInputChange = (field, newValue) => {
    let sdUrl = setParams("startDate", startDate);
    let stUrl = setParams("startTime", ts.removeColon(startTime));
    let edUrl = setParams("endDate", endDate);
    let etUrl = setParams("endTime", ts.removeColon(endTime));
    let ssUrl = setParams("sampleSizeScale", sampleSizeScale);
    switch (field) {
      case "startDate":
        setStartDate(newValue);
        sdUrl = setParams("startDate", newValue);
        break;
      case "startTime":
        setStartTime(newValue);
        stUrl = setParams("startTime", ts.removeColon(newValue));
        break;
      case "endDate":
        setEndDate(newValue);
        edUrl = setParams("endDate", newValue);
        break;
      case "endTime":
        setEndTime(newValue);
        etUrl = setParams("endTime", ts.removeColon(newValue));
        break;
      case "sampleSizeScale":
        setSampleSizeScale(newValue);
        ssUrl = setParams("sampleSizeScale", newValue);
        break;
    }

    const r0Url = setParams("r0", isr0visible);
    const r1Url = setParams("r1", isr1visible);
    const r2Url = setParams("r2", isr2visible);
    const r3Url = setParams("r3", isr3visible);
    const r4Url = setParams("r4", isr4visible);
    const r5Url = setParams("r5", isr5visible);
    const r6Url = setParams("r6", isr6visible);

    props.history.push(
      `?${sdUrl}&${stUrl}&${edUrl}&${etUrl}&${ssUrl}&${r0Url}&${r1Url}&${r2Url}&${r3Url}&${r4Url}&${r5Url}&${r6Url}`
    );
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
            onChange={(e) =>
              handleDateTimeInputChange("startDate", e.target.value)
            }
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
            onChange={(e) =>
              handleDateTimeInputChange("startTime", e.target.value)
            }
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
            onChange={(e) =>
              handleDateTimeInputChange("endDate", e.target.value)
            }
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
            onChange={(e) =>
              handleDateTimeInputChange("endTime", e.target.value)
            }
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
          onChange={(e, v) => handleDateTimeInputChange("sampleSizeScale", v)}
        />
        <Typography variant="body2" gutterBottom>
          {samp.getSampleSizeString(sampleSizeScale)}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Suspense
          fallback={
            <div style={{ height: 450, width: 700 }}>
              Loading time series...
            </div>
          }
        >
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
        </Suspense>
      </Grid>
      <Grid item xs={12}>
        <Suspense
          fallback={
            <div style={{ width: 1280, height: 720 }}>
              Loading floor plan...
            </div>
          }
        >
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
        </Suspense>
      </Grid>
    </Grid>
  </div>
);
};

export const App = () => {
  return (
    <Router>
      <Route path="/" component={MainPage} />
    </Router>
  );
};
