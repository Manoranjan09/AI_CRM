const BASE_URL = "http://127.0.0.1:8000";

export interface InteractionPayload {
  hcp_name: string;
  hospital?: string;
  speciality?: string;
  interaction_type?: string;
  products?: string;
  notes?: string;
  summary?: string;
  follow_up_date?: string | null;
}

export async function createInteraction(
  data: InteractionPayload
) {
  const response = await fetch(
    `${BASE_URL}/interactions/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to save interaction.");
  }

  return response.json();
}
export async function getInteractions() {
  const response = await fetch("http://127.0.0.1:8000/interactions");

  if (!response.ok) {
    throw new Error("Failed to fetch interactions.");
  }

  return response.json();
}