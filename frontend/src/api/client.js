import { API_BASE_URL } from "../config/api";

// A response that can't be parsed as JSON (e.g. an HTML error page from a
// proxy, or a misconfigured REACT_APP_API_URL) is never a valid success —
// treat it as a failed request rather than silently falling back to `{}`.
async function parseJSON(res) {
  try {
    return await res.json();
  } catch {
    const err = new Error("The server returned an unexpected response.");
    err.status = res.status;
    throw err;
  }
}

async function postJSON(path, body) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await parseJSON(res);
  if (!res.ok) {
    const err = new Error(data.error || "Request failed");
    err.details = data.details || [];
    err.status = res.status;
    throw err;
  }
  return data;
}

async function getJSON(path) {
  const res = await fetch(`${API_BASE_URL}${path}`);
  const data = await parseJSON(res);
  if (!res.ok) {
    const err = new Error(data.error || "Request failed");
    err.status = res.status;
    throw err;
  }
  return data;
}

export const api = {
  health: () => getJSON("/api/health"),
  modelInfo: () => getJSON("/api/model-info"),
  predictDiabetes: (payload) => postJSON("/api/diabetes", payload),
  predictHeart: (payload) => postJSON("/api/heart", payload),
  predictLiver: (payload) => postJSON("/api/liver", payload),
  predictKidney: (payload) => postJSON("/api/kidney", payload),
};
