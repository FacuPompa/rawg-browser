const BASE_URL = 'https://api.rawg.io/api';
const KEY_PARAM = `?key=${import.meta.env.VITE_RAWG_API_KEY}`;

export async function fetchGamesList({ page = 1, pageSize = 20, search } = {}) {
  let url = `${BASE_URL}/games${KEY_PARAM}&page=${page}&page_size=${pageSize}`;
  if (search) url += `&search=${encodeURIComponent(search)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`RAWG API error: ${res.status}`);
  const json = await res.json();
  return json.results;
}

export async function fetchGameDetails(id) {
  const res = await fetch(`${BASE_URL}/games/${id}${KEY_PARAM}`);
  if (!res.ok) throw new Error(`RAWG API error: ${res.status}`);
  return await res.json();
}