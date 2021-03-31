import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import { TimeSeries } from "./TimeSeries";
import { TempCollection } from '../db/TempCollection';

function filterData(startTime, endTime, data) {
  const [startHour, startMin] = [
    parseInt(startTime.split(":")[0]),
    parseInt(startTime.split(":")[1]),
  ];
  const [endHour, endMin] = [
    parseInt(endTime.split(":")[0]),
    parseInt(endTime.split(":")[1]),
  ];
  let r0y = [];
  let r1y = [];
  let r2y = [];
  let r3y = [];
  let r4y = [];
  let r6y = [];

  let x = [];
  for (let i = 0; i < data.length; i++) { // each document (room)
    const currDoc = data[i];
    const currRoom = currDoc.room;
    const currData = currDoc.data;
    for (let j = 0; j < currData.length; j++) { // for each hour under the room
      const currHourBlock = currData[j];
      const currHour = parseInt(currHourBlock.hour);
      if (currHour >= startHour && currHour <= endHour) {
        const currDetails = currHourBlock.details;
        for (let k = 0; k < currDetails.length; k++) { // for each minute under the hour
          const currMinBlock = currDetails[k];
          const currMin = parseInt(currMinBlock.min);
          if (currMin >= startMin && currMin <= endMin) {
            if (currRoom === "0") {
              r0y.push(currMinBlock.temp);
            } else if (currRoom === "1") {
              r1y.push(currMinBlock.temp);
            } else if (currRoom === "2") {
              r2y.push(currMinBlock.temp);
            } else if (currRoom === "3") {
              r3y.push(currMinBlock.temp);
            } else if (currRoom === "4") {
              r4y.push(currMinBlock.temp);
            } else if (currRoom === "6") {
              r6y.push(currMinBlock.temp);
            }
            x.push(currHour.toString() + ":" + currMin.toString());
          }
        }
      }
    }
  }
  return [r0y, r1y, r2y, r3y, r4y, r6y, x];
}

export const App = () => {
  const [startDate, setStartDate] = useState("2013-10-02");
  const [startTime, setStartTime] = useState("05:00");
  const [endDate, setEndDate] = useState("2013-10-02");
  const [endTime, setEndTime] = useState("15:30");
  const [sampleSize, setSampleSize] = useState(25);

  const { temps } = useTracker(() => {
    const temps = TempCollection.find(
      {date: startDate}
    ).fetch();
    
    return { temps };
  })

  const dataset = filterData(startTime, endTime, temps);

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
          <TimeSeries
            r0y={dataset[0]}
            r1y={dataset[1]}
            r2y={dataset[2]}
            r3y={dataset[3]}
            r4y={dataset[4]}
            r6y={dataset[5]}
            x={dataset[6]}
          />
        </Grid>
      </Grid>
    </div>
  );
}; 
