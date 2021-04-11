export default function assignColour(temps) {
	/**
	 * Assigns each room a colour based on its average temperature
	 */
	const colours = [
    "#caf0f8",
    "#48cae4",
    "#0096C7",
    "#023E8A",
  ];

	let assignedColours = {};

	for (const [room, temp] of Object.entries(temps)) {
		if (temp <= 15) {
			assignedColours[room] = colours[3];
		} else if (temp <= 20) {
			assignedColours[room] = colours[2];
		} else if (temp <= 23) {
			assignedColours[room] = colours[1];
		} else {
			assignedColours[room] = colours[0];
		}
  }

	return assignedColours;
}
