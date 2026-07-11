const BASE_URL = "http://127.0.0.1:8000";

export async function getHCPs() {
  const response = await fetch(`${BASE_URL}/hcp`);

  if (!response.ok) {
    throw new Error("Failed to fetch doctors.");
  }

  return response.json();
}

export async function createHCP(data: any) {
  const response = await fetch(`${BASE_URL}/hcp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create doctor.");
  }

  return response.json();
}

export async function updateHCP(id: number, data: any) {
  const response = await fetch(`${BASE_URL}/hcp/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update doctor.");
  }

  return response.json();
}

export async function deleteHCP(id: number) {
  const response = await fetch(`${BASE_URL}/hcp/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete doctor.");
  }

  return response.json();
}