const BASE_URL = "http://127.0.0.1:8000";

export async function globalSearch(query: string) {
  const response = await fetch(
    `${BASE_URL}/search?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Search failed.");
  }

  return response.json();
}