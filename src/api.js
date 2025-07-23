const BASE_URL = "http://localhost:7280/api";

export async function fetchDestinations() {
  const response = await fetch(`${BASE_URL}/destination`);
  if (!response.ok) {
    throw new Error("Failed to fetch destinations");
  }
  return await response.json();
}

export async function fetchDestinationByName(name) {
  const response = await fetch(`${BASE_URL}/destination/${encodeURIComponent(name)}`);
  if (!response.ok) {
    throw new Error("Destination not found");
  }
  return await response.json();
}

export async function registerUser(data) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return await response.json();
}

export async function loginUser(data) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return await response.json();
}


export async function bookTrip(destinationId) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ destinationId }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error("Booking failed: " + error);
  }

  return await response.json();
}


export async function fetchMyBookings() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/booking/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch your bookings");
  }

  return await response.json();
}
