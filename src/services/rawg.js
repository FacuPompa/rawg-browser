const BASE_URL = 'https://api.rawg.io/api';
const KEY_PARAM = `?key=${import.meta.env.VITE_RAWG_API_KEY}`;

export async function fetchGamesList({ page = 1, pageSize = 20, search, ordering, dates, platforms } = {}) {
  let url = `${BASE_URL}/games${KEY_PARAM}&page=${page}&page_size=${pageSize}`;
  if (search) url += `&search=${encodeURIComponent(search)}`;
  if (ordering) url += `&ordering=${ordering}`;
  if (dates) url += `&dates=${dates}`;
  if (platforms) url += `&platforms=${platforms}`;

  console.log('Fetching RAWG URL:', url);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`RAWG API error: ${res.status}`);
  const json = await res.json();
  console.log('RAWG response JSON:', json);
  return json.results;
}

export async function fetchGameDetails(id) {
  const url = `${BASE_URL}/games/${id}${KEY_PARAM}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`RAWG API error: ${res.status}`);
  return await res.json();
}

export async function fetchGameScreenshots(id) {
  const url = `${BASE_URL}/games/${id}/screenshots${KEY_PARAM}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`RAWG API error: ${res.status}`);
  const json = await res.json();
  return json.results || [];
}

export async function fetchGameTrailers(id) {
  const url = `${BASE_URL}/games/${id}/movies${KEY_PARAM}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`RAWG API error: ${res.status}`);
  const json = await res.json();
  return json.results || [];
}