export async function fetchMetadata() {
  const response = await fetch(new Request('/api/metadata'));
  const data = await response.json();

  return data;
}

export async function fetchModelPerformance() {
  const response = await fetch(new Request('/api/performance'));
  const data = await response.json();

  return data;
}
