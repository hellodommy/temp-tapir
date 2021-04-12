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
    const r0visible = this.props.visibility[0];
    const r1visible = this.props.visibility[1];
    const r2visible = this.props.visibility[2];
    const r3visible = this.props.visibility[3];
    const r4visible = this.props.visibility[4];
    const r5visible = this.props.visibility[5];
    const r6visible = this.props.visibility[6];
    const calcHeight = this.props.dim[0];
    const calcWidth = this.props.dim[1];
    return (
      <Plot
        config={{scrollZoom: true, displayModeBar: false}}
        onRelayout={this.handleResize}
        data={[
          {
            name: "Room 0",
            x: x0,
            y: y0,
            type: "scatter",
            marker: { color: "#db5f57" },
            visible: r0visible,
          },
          {
            name: "Room 1",
            x: x1,
            y: y1,
            type: "scatter",
            marker: { color: "#dbc257" },
            visible: r1visible,
          },
          {
            name: "Room 2",
            x: x2,
            y: y2,
            type: "scatter",
            marker: { color: "#91db57" },
            visible: r2visible,
          },
          {
            name: "Room 3",
            x: x3,
            y: y3,
            type: "scatter",
            marker: { color: "#57d3db" },
            visible: r3visible,
          },
          {
            name: "Room 4",
            x: x4,
            y: y4,
            type: "scatter",
            marker: { color: "#5770db" },
            visible: r4visible,
          },
          {
            name: "Room 5",
            x: x5,
            y: y5,
            type: "scatter",
            marker: { color: "#a157db" },
            visible: r5visible,
          },
          {
            name: "Room 6",
            x: x6,
            y: y6,
            type: "scatter",
            marker: { color: "#db57b2" },
            visible: r6visible,
          },
        ]}
        layout={{
          width: calcWidth,
          height: calcHeight,
          autosize: false,
          yaxis: { range: [8, 28], fixedrange: true },
        }}
      />
    );
  }
}

export default TimeSeries;
