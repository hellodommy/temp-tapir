import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

function valuetext(value) {
  return `${value} samples`;
}

export const Control = () => (
  <div>
    <Grid container spacing={3}>
      <Grid item xs={6} sm={3}>
        <form noValidate>
          <TextField
            id="startDate"
            label="Start Date"
            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
      </Grid>
      <Grid item xs={6} sm={3}>
        <form noValidate>
          <TextField
            id="startTime"
            label="Start Time"
            type="time"
            defaultValue="07:30"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
        </form>
      </Grid>
      <Grid item xs={6} sm={3}>
        <form noValidate>
          <TextField
            id="endDate"
            label="End"
            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
      </Grid>
      <Grid item xs={6} sm={3}>
        <form noValidate>
          <TextField
            id="startTime"
            label="Start Time"
            type="time"
            defaultValue="07:30"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
        </form>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" gutterBottom>
          Sample size
        </Typography>
        <Slider
          defaultValue={25}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-small-steps"
          step={1}
          marks
          min={1}
          max={50}
          valueLabelDisplay="auto"
        />
      </Grid>
    </Grid>
  </div>
);
