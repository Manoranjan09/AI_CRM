const BASE_URL = "http://127.0.0.1:8000";

export async function getDashboardStats() {
  const response = await fetch(`${BASE_URL}/dashboard/stats`);

  if (!response.ok) {
    throw new Error("Failed to load dashboard.");
  }

  return response.json();
}
export async function getRecentInteractions() {
  const response = await fetch(
    "http://127.0.0.1:8000/dashboard/recent-interactions"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recent interactions.");
  }

  return response.json();
}