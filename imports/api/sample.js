import { LTOB } from "downsample";

function calculateSampleSize(scale) {
  /**
   * Calculates the sample size based on power of 2
   */
  return Math.pow(2, scale);
}

export function getSampleSizeString(scale) {
  /**
   * Expresses sample size in string format for user
   */
  return `2^${scale} = ${calculateSampleSize(scale)} samples`;
}

export function downsample(datapoints, scale) {
  /**
   * Adjusts sample to the appropriate sample size
   */
  const sampleSize = calculateSampleSize(scale);
  let x = [];
  let y = [];

  const downsampled = LTOB(datapoints, sampleSize);
  for (let i = 0; i < downsampled.length; i++) {
    const curr = downsampled[i];
    x.push(curr[0]);
    y.push(curr[1]);
  }
  return [x, y];
}
