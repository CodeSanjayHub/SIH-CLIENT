// Client/src/lib/api.ts
export const API_BASE = (import.meta.env.VITE_API_BASE || "http://localhost:5000").replace(/\/$/, "");
export const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET || "AdminSecret-DEV-2025";

export async function adminFetch(path: string, opts: RequestInit = {}) {
  const url = `${API_BASE}/api/admin${path}`;
  const headers = { ...(opts.headers || {}), "x-admin-secret": ADMIN_SECRET };
  const final = { ...opts, headers };
  return fetch(url, final);
}
