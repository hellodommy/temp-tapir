import React from "react";
import * as fp from '../api/floorplan';

class Floorplan extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
		
		const avgTemps = this.props.avgTemps;
		const sortedTemps = fp.sortTemps(avgTemps);
		const assignedColour = fp.assignColour(sortedTemps);
		console.log(assignedColour);
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          verticalAlign: "middle",
          margin: 0,
          overflow: "hidden",
        }}
      >
        <svg viewBox="0 0 1280 720" preserveAspectRatio="xMinYMin meet">
          <image
            width="1280"
            height="720"
            href="https://i.imgur.com/GkYuQcu.png"
          />
          <rect
            id="r0"
            x="210"
            y="65"
            width="340"
            height="250"
            fill={assignedColour["r0avg"]}
            fillOpacity=".5"
          />
          <rect
            id="r1"
            x="210"
            y="470"
            width="140"
            height="220"
            fill={assignedColour["r1avg"]}
            fillOpacity=".5"
          />
          <rect
            id="r2"
            x="355"
            y="470"
            width="140"
            height="220"
            fill={assignedColour["r2avg"]}
            fillOpacity=".5"
          />
          <rect
            id="r3"
            x="500"
            y="470"
            width="140"
            height="220"
            fill={assignedColour["r3avg"]}
            fillOpacity=".5"
          />
          <rect
            id="r4"
            x="650"
            y="470"
            width="140"
            height="220"
            fill={assignedColour["r4avg"]}
            fillOpacity=".5"
          />
          <rect
            id="r5"
            x="800"
            y="470"
            width="140"
            height="220"
            fill={assignedColour["r5avg"]}
            fillOpacity=".5"
          />
          <rect
            id="r6"
            x="945"
            y="470"
            width="140"
            height="220"
            fill={assignedColour["r6avg"]}
            fillOpacity=".5"
          />
        </svg>
      </div>
    );
  }
}

export default Floorplan;
