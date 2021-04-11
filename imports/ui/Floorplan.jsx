import React from "react";
import assignColour from "../api/floorplan";

class Floorplan extends React.Component {
  constructor(props) {
    super(props);
		this.handleClick = this.handleClick.bind(this);
  }

	handleClick(e, room) {
		this.props.onRoomClick(room);
	}

  render() {
		
		const avgTemps = this.props.avgTemps;
    console.log(avgTemps);
		const assignedColour = assignColour(avgTemps);
		const r0visible = this.props.visibility[0] ? 0.5 : 0;
		const r1visible = this.props.visibility[1] ? 0.5 : 0;
		const r2visible = this.props.visibility[2] ? 0.5 : 0;
		const r3visible = this.props.visibility[3] ? 0.5 : 0;
		const r4visible = this.props.visibility[4] ? 0.5 : 0;
		const r5visible = this.props.visibility[5] ? 0.5 : 0;
		const r6visible = this.props.visibility[6] ? 0.5 : 0;

    return (
      <div>
        <svg
          style={{ maxWidth: 720 }}
          viewBox="0 0 1280 720"
          preserveAspectRatio="xMinYMin meet"
        >
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
            fillOpacity={r0visible}
            style={{ cursor: "pointer" }}
            onClick={(e) => this.handleClick(e, 0)}
          />
          <rect
            id="r1"
            x="210"
            y="470"
            width="140"
            height="220"
            fill={assignedColour["r1avg"]}
            fillOpacity={r1visible}
            style={{ cursor: "pointer" }}
            onClick={(e) => this.handleClick(e, 1)}
          />
          <rect
            id="r2"
            x="355"
            y="470"
            width="140"
            height="220"
            fill={assignedColour["r2avg"]}
            fillOpacity={r2visible}
            style={{ cursor: "pointer" }}
            onClick={(e) => this.handleClick(e, 2)}
          />
          <rect
            id="r3"
            x="500"
            y="470"
            width="140"
            height="220"
            fill={assignedColour["r3avg"]}
            fillOpacity={r3visible}
            style={{ cursor: "pointer" }}
            onClick={(e) => this.handleClick(e, 3)}
          />
          <rect
            id="r4"
            x="650"
            y="470"
            width="140"
            height="220"
            fill={assignedColour["r4avg"]}
            fillOpacity={r4visible}
            style={{ cursor: "pointer" }}
            onClick={(e) => this.handleClick(e, 4)}
          />
          <rect
            id="r5"
            x="800"
            y="470"
            width="140"
            height="220"
            fill={assignedColour["r5avg"]}
            fillOpacity={r5visible}
            style={{ cursor: "pointer" }}
            onClick={(e) => this.handleClick(e, 5)}
          />
          <rect
            id="r6"
            x="945"
            y="470"
            width="140"
            height="220"
            fill={assignedColour["r6avg"]}
            fillOpacity={r6visible}
            style={{ cursor: "pointer" }}
            onClick={(e) => this.handleClick(e, 6)}
          />
        </svg>
      </div>
    );
  }
}

export default Floorplan;
