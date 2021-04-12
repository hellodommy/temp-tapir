import React, { useState, useEffect, Suspense } from "react";
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
import * as link from "../api/linkability";

const Floorplan = React.lazy(() => import("./Floorplan"));
const TimeSeries = React.lazy(() => import("./TimeSeries"));

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

const MainPage = (props) => {
  const { location } = props;
  const [startDate, setStartDate] = link.hasParams(location, "startDate")
    ? useState(link.getParams(location, "startDate"))
    : useState("2013-10-02");
  const [startTime, setStartTime] = link.hasParams(location, "startTime")
    ? useState(ts.addColon(link.getParams(location, "startTime")))
    : useState("05:00");
  const [endDate, setEndDate] = link.hasParams(location, "endDate")
    ? useState(link.getParams(location, "endDate"))
    : useState("2013-10-02");
  const [endTime, setEndTime] = link.hasParams(location, "endTime")
    ? useState(ts.addColon(link.getParams(location, "endTime")))
    : useState("15:30");
  const [sampleSizeScale, setSampleSizeScale] = link.hasParams(location, "sampleSizeScale")
    ? useState(parseInt(link.getParams(location, "sampleSizeScale")))
    : useState(5);
  const [isr0visible, setr0visible] = link.hasParams(location, "r0")
    ? useState(link.getParams(location, "r0") === 'true' ? true : false)
    : useState(true);
  const [isr1visible, setr1visible] = link.hasParams(location, "r1")
    ? useState(link.getParams(location, "r1") === "true" ? true : false)
    : useState(true);
  const [isr2visible, setr2visible] = link.hasParams(location, "r2")
    ? useState(link.getParams(location, "r2") === "true" ? true : false)
    : useState(true);
  const [isr3visible, setr3visible] = link.hasParams(location, "r3")
    ? useState(link.getParams(location, "r3") === "true" ? true : false)
    : useState(true);
  const [isr4visible, setr4visible] = link.hasParams(location, "r4")
    ? useState(link.getParams(location, "r4") === "true" ? true : false)
    : useState(true);
  const [isr5visible, setr5visible] = link.hasParams(location, "r5")
    ? useState(link.getParams(location, "r5") === "true" ? true : false)
    : useState(true);
  const [isr6visible, setr6visible] = link.hasParams(location, "r6")
    ? useState(link.getParams(location, "r6") === "true" ? true : false)
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

  const getStates = () => {
    /**
     * Retrieve all states with link parameters set
     */
    const sdUrl = link.setParams("startDate", startDate);
    const stUrl = link.setParams("startTime", ts.removeColon(startTime));
    const edUrl = link.setParams("endDate", endDate);
    const etUrl = link.setParams("endTime", ts.removeColon(endTime));
    const ssUrl = link.setParams("sampleSizeScale", sampleSizeScale);
    const r0Url = link.setParams("r0", isr0visible);
    const r1Url = link.setParams("r1", isr1visible);
    const r2Url = link.setParams("r2", isr2visible);
    const r3Url = link.setParams("r3", isr3visible);
    const r4Url = link.setParams("r4", isr4visible);
    const r5Url = link.setParams("r5", isr5visible);
    const r6Url = link.setParams("r6", isr6visible);
    return {
      startDate: sdUrl,
      startTime: stUrl,
      endDate: edUrl,
      endTime: etUrl,
      sampleSizeScale: ssUrl,
      r0: r0Url,
      r1: r1Url,
      r2: r2Url,
      r3: r3Url,
      r4: r4Url,
      r5: r5Url,
      r6: r6Url,
    };
  };

  const setUrl = (states) => {
    /**
     * Sets URL based on the given states
     */
    props.history.push(
      `?${states["startDate"]}&${states["startTime"]}&${states["endDate"]}&${states["endTime"]}&${states["sampleSizeScale"]}&${states["r0"]}&${states["r1"]}&${states["r2"]}&${states["r3"]}&${states["r4"]}&${states["r5"]}&${states["r6"]}`
    );
  };

  const handleResize = (timeframe) => {
    /**
     * Adjusts timeframe when user pans on graph
     */
    let states = getStates();
    setStartDate(timeframe[0][0]);
    states["startDate"] = link.setParams("startDate", timeframe[0][0]);
    setStartTime(timeframe[0][1]);
    states["startTime"] = link.setParams("startTime", ts.removeColon(timeframe[0][1]));
    setEndDate(timeframe[1][0]);
    states["endDate"] = link.setParams("endDate", timeframe[1][0]);
    setEndTime(timeframe[1][1]);
    states["endTime"] = link.setParams("endTime", ts.removeColon(timeframe[1][1]));

    setUrl(states);
  };

  const handleRoomClick = (room) => {
    /**
     * Toggles room visbility based on which room was clicked
     */
    let states = getStates();

    switch (room) {
      case 0:
        setr0visible(!isr0visible);
        states["r0"] = link.setParams("r0", !isr0visible);
        break;
      case 1:
        setr1visible(!isr1visible);
        states["r1"] = link.setParams("r1", !isr1visible);
        break;
      case 2:
        setr2visible(!isr2visible);
        states["r2"] = link.setParams("r2", !isr2visible);
        break;
      case 3:
        setr3visible(!isr3visible);
        states["r3"] = link.setParams("r3", !isr3visible);
        break;
      case 4:
        setr4visible(!isr4visible);
        states["r4"] = link.setParams("r4", !isr4visible);
        break;
      case 5:
        setr5visible(!isr5visible);
        states["r5"] = link.setParams("r5", !isr5visible);
        break;
      case 6:
        setr6visible(!isr6visible);
        states["r6"] = link.setParams("r6", !isr6visible);
        break;
    }

    setUrl(states);
  };

  const handleInputChange = (field, newValue) => {
    /**
     * Sets state based on user input for timeframe and sample size
     */
    let states = getStates();
    switch (field) {
      case "startDate":
        setStartDate(newValue);
        states["startDate"] = link.setParams("startDate", newValue);
        break;
      case "startTime":
        setStartTime(newValue);
        states["startTime"] = link.setParams("startTime", ts.removeColon(newValue));
        break;
      case "endDate":
        setEndDate(newValue);
        states["endDate"] = link.setParams("endDate", newValue);
        break;
      case "endTime":
        setEndTime(newValue);
        states["endTime"] = link.setParams("endTime", ts.removeColon(newValue));
        break;
      case "sampleSizeScale":
        setSampleSizeScale(newValue);
        states["sampleSizeScale"] = link.setParams("sampleSizeScale", newValue);
        break;
    }

    setUrl(states);
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

  const size = useWindowSize();
  const width = size["width"];
  const calcWidth = 0.9*width;
  const calcHeight = calcWidth / 3 * 2;

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
              onChange={(e) => handleInputChange("startDate", e.target.value)}
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
              onChange={(e) => handleInputChange("startTime", e.target.value)}
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
              onChange={(e) => handleInputChange("endDate", e.target.value)}
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
              onChange={(e) => handleInputChange("endTime", e.target.value)}
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
            onChange={(e, v) => handleInputChange("sampleSizeScale", v)}
          />
          <Typography variant="body2" gutterBottom>
            {samp.getSampleSizeString(sampleSizeScale)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Suspense
            fallback={
              <div style={{ height: calcHeight, width: calcWidth }}>
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
              dim={[calcHeight, calcWidth]}
            />
          </Suspense>
        </Grid>
        <Grid item xs={12}>
          <Suspense
            fallback={
              <div style={{ width: calcWidth, height: calcHeight }}>
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
              dim={[calcHeight, calcWidth]}
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
