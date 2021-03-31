import React from "react";
import Plot from "react-plotly.js";

export function TimeSeries(props) {

  /*
  let r1x = [];
  let r1y = [];

  for (let i = 0; i < props.data.length; i++) {
    const currData = props.data[i];
    if (currData.room === '1') {
      console.log(currData);
    }
  }
  */

  return (
    <Plot
      data={[
        {
          name: "Room 0",
          x: props.x,
          y: props.r0y,
          type: "scatter",
          marker: { color: "#db5f57" },
        },
        {
          name: "Room 1",
          x: props.x,
          y: props.r1y,
          type: "scatter",
          marker: { color: "#dbc257" },
        },
        {
          name: "Room 2",
          x: props.x,
          y: props.r2y,
          type: "scatter",
          marker: { color: "#91db57" },
        },
        {
          name: "Room 3",
          x: props.x,
          y: props.r3y,
          type: "scatter",
          marker: { color: "#57d3db" },
        },
        {
          name: "Room 4",
          x: props.x,
          y: props.r4y,
          type: "scatter",
          marker: { color: "#5770db" },
        },
        {
          name: "Room 6",
          x: props.x,
          y: props.r6y,
          type: "scatter",
          marker: { color: "#db57b2" },
        },
      ]}
      layout={{ width: "100%", height: 500, title: "Time Series" }}
    />
  );
}
