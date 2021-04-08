export function sortTemps(avgTemps) {
	/**
	 * Sorts average temperatures in ascending order of temperature
	 */
	let sortedTemp = [];
	for (let avgTemp in avgTemps) {
		sortedTemp.push([avgTemp, avgTemps[avgTemp]]);
	}
	sortedTemp.sort(function (a, b) {
    return a[1] - b[1];
  });
	return sortedTemp;
}

export function assignColour(sortedTemps) {
	/**
	 * Assigns each room a colour based on its average temperature
	 */
	const colours = [
    "#caf0f8",
    "#90e0ef",
    "#48cae4",
    "#00B4D8",
    "#0096C7",
    "#0077B6",
    "#023E8A",
  ];
	let assignedColours = {};
	for (let i = 0; i < sortedTemps.length; i++) {
		const room = sortedTemps[i][0];
		assignedColours[room] = colours[i];
	}
	return assignedColours;
}
