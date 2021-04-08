import React from "react";

class Floorplan extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
		
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
            fill="#FFAFAF"
            fillOpacity=".5"
          />
          <rect
            id="r1"
            x="210"
            y="470"
            width="140"
            height="220"
            fill="#FFAFAF"
            fillOpacity=".5"
          />
          <rect
            id="r2"
            x="355"
            y="470"
            width="140"
            height="220"
            fill="#228B22"
            fillOpacity=".5"
          />
          <rect
            id="r3"
            x="500"
            y="470"
            width="140"
            height="220"
            fill="#ffafaf"
            fillOpacity=".5"
          />
          <rect
            id="r4"
            x="650"
            y="470"
            width="140"
            height="220"
            fill="#228B22"
            fillOpacity=".5"
          />
          <rect
            id="r5"
            x="800"
            y="470"
            width="140"
            height="220"
            fill="#ffafaf"
            fillOpacity=".5"
          />
          <rect
            id="r6"
            x="945"
            y="470"
            width="140"
            height="220"
            fill="#228B22"
            fillOpacity=".5"
          />
        </svg>
      </div>
    );
  }
}

export default Floorplan;
