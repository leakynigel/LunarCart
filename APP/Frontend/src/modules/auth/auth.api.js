const BASE_URL = "http://localhost:8080";
const API_PREFIX = "/api/v1/auth";

async function request(path, data) {
  try {
    const res = await fetch(`${BASE_URL}${API_PREFIX}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const payload = await res.json();
    if (!res.ok) {
      throw new Error(payload.message || 'Request failed');
    }
    return payload;
  } catch (error) {
    return { error: error.message || 'Network error' };
  }
}

export function register(data) {
  return request('/register', data);
}

export function login(data) {
  return request('/login', data);
}