export function getParams(location, field) {
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get(field) || "";
}

export function hasParams(location, field) {
  const searchParams = new URLSearchParams(location.search);
  return searchParams.has(field);
}

export function setParams(name, value) {
  const searchParams = new URLSearchParams();
  searchParams.set(name, value);
  return searchParams.toString();
}
