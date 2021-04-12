export function getParams(location, field) {
	/**
	 * Gets given parameter from URL
	 */
	const searchParams = new URLSearchParams(location.search);
	return searchParams.get(field) || "";
}

export function hasParams(location, field) {
	/**
	 * Checks if URL has given parameter
	 */
  const searchParams = new URLSearchParams(location.search);
  return searchParams.has(field);
}

export function setParams(name, value) {
	/**
	 * Creates URL parameter based on given name and value
	 */
  const searchParams = new URLSearchParams();
  searchParams.set(name, value);
  return searchParams.toString();
}
