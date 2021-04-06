import React from "react";
import Plot from "react-plotly.js";
import * as ts from "../api/handleTimestamp";

class TimeSeries extends React.Component {
  constructor(props) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
  }

  handleResize(e) {
    let xStart = e["xaxis.range[0]"];
    let xEnd = e["xaxis.range[1]"];
    xStart = ts.separateDateTime(xStart);
    xEnd = ts.separateDateTime(xEnd);
    this.props.onTimeframeChange([xStart, xEnd]);
  }

  render() {
    const x0 = this.props.r0[0];
    const y0 = this.props.r0[1];
    const x1 = this.props.r1[0];
    const y1 = this.props.r1[1];
    const x2 = this.props.r2[0];
    const y2 = this.props.r2[1];
    const x3 = this.props.r3[0];
    const y3 = this.props.r3[1];
    const x4 = this.props.r4[0];
    const y4 = this.props.r4[1];
    const x5 = this.props.r5[0];
    const y5 = this.props.r5[1];
    const x6 = this.props.r6[0];
    const y6 = this.props.r6[1];

    return (
      <Plot
        onRelayout={this.handleResize}
        data={[
          {
            name: "Room 0",
            x: x0,
            y: y0,
            type: "scatter",
            marker: { color: "#db5f57" },
          },
          {
            name: "Room 1",
            x: x1,
            y: y1,
            type: "scatter",
            marker: { color: "#dbc257" },
          },
          {
            name: "Room 2",
            x: x2,
            y: y2,
            type: "scatter",
            marker: { color: "#91db57" },
          },
          {
            name: "Room 3",
            x: x3,
            y: y3,
            type: "scatter",
            marker: { color: "#57d3db" },
          },
          {
            name: "Room 4",
            x: x4,
            y: y4,
            type: "scatter",
            marker: { color: "#5770db" },
          },
          {
            name: "Room 5",
            x: x5,
            y: y5,
            type: "scatter",
            marker: { color: "#a157db" },
          },
          {
            name: "Room 6",
            x: x6,
            y: y6,
            type: "scatter",
            marker: { color: "#db57b2" },
          },
        ]}
        layout={{
          width: "100%",
          height: 500,
          title: "Temperature",
          yaxis: { range: [5, 30], fixedrange: true },
        }}
      />
    );
  }
}

export default TimeSeries;
