// Client/src/pages/AdminDashboard.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
const ADMIN_KEY = "isAdmin";

const badgeClass = (status?: string) => {
  switch (status) {
    case "approved": return "bg-green-100 text-green-800";
    case "rejected": return "bg-red-100 text-red-800";
    case "processing": return "bg-yellow-100 text-yellow-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const AdminDashboard: React.FC = () => {
  const [apps, setApps] = useState<any[]>([]);
  const [violenceReports, setViolenceReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"apps" | "violence">("apps");
  const navigate = useNavigate();

  useEffect(() => {
    // client-side check for demo admin flag + expiry
    try {
      const isAdmin = localStorage.getItem(ADMIN_KEY);
      const expiry = Number(localStorage.getItem("isAdminExpiry") || 0);
      const now = Date.now();

      if (!isAdmin || (expiry && now > expiry)) {
        // clean stale flags
        localStorage.removeItem(ADMIN_KEY);
        localStorage.removeItem("isAdminAt");
        localStorage.removeItem("isAdminExpiry");
        // redirect to admin login
        navigate("/admin-login", { replace: true });
        return;
      }

      // ok - fetch initial tab
      if (activeTab === "apps") fetchApps();
      else fetchViolenceReports();
    } catch (err) {
      console.error("Admin auth check failed:", err);
      navigate("/admin-login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  function adminFetch(url: string, opts: RequestInit = {}) {
    const headers = {
      ...(opts.headers || {}),
      "x-admin-secret": import.meta.env.VITE_ADMIN_SECRET || "AdminSecret-DEV-2025"
    };
    return fetch(url, { ...opts, headers });
  }

  async function fetchApps() {
    setLoading(true);
    try {
      const res = await adminFetch(`${API_BASE}/api/admin/apps`);
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        console.error("fetchApps error:", data || (await res.text().catch(() => "no body")));
        alert("Failed to load apps: " + (data?.error || res.status));
        return;
      }
      setApps(data.apps || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load apps — network/server error.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchViolenceReports() {
    setLoading(true);
    try {
      const res = await adminFetch(`${API_BASE}/api/admin/violence-reports`);
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        console.error("fetchViolenceReports error:", data || (await res.text().catch(() => "no body")));
        alert("Failed to load violence reports: " + (data?.error || res.status));
        return;
      }
      setViolenceReports(data.items || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load violence reports — network/server error.");
    } finally {
      setLoading(false);
    }
  }

  async function downloadCsv() {
    try {
      const res = await adminFetch(`${API_BASE}/api/admin/export/smile-csv`);
      if (!res.ok) {
        const text = await res.text().catch(() => "unknown error");
        return alert("Export failed: " + text);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "smile_export.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Export failed");
    }
  }

  async function sendToMock(appId: string) {
    try {
      const res = await adminFetch(`${API_BASE}/api/admin/send-to-partner`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appId, partnerUrl: "MOCK" })
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        console.error("sendToMock failed:", data || await res.text());
        return alert("Send failed: " + (data?.error || res.status));
      }
      alert("Partner response: " + JSON.stringify(data.partnerResp, null, 2));
      fetchApps();
    } catch (err) {
      console.error(err);
      alert("Send failed");
    }
  }

  async function updateStatus(appId: string, status: string) {
    try {
      const res = await adminFetch(`${API_BASE}/api/admin/update-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appId, status })
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        console.error("updateStatus failed:", data || await res.text());
        return alert("Update failed: " + (data?.error || res.status));
      }
      // Refresh current tab
      if (activeTab === "apps") fetchApps();
      else fetchViolenceReports();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  }

  function docUrl(d: any) {
    if (!d) return "#";
    const u = d.url || d;
    if (!u) return "#";
    if (u.startsWith("http://") || u.startsWith("https://")) return u;
    const rel = u.startsWith("/") ? u : `/${u}`;
    return `${API_BASE}${rel}`;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>

        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-md bg-gray-100 p-1">
            <button
              onClick={() => setActiveTab("apps")}
              className={`px-3 py-1 rounded ${activeTab === "apps" ? "bg-white shadow" : "text-gray-600"}`}
            >
              Applications
            </button>
            <button
              onClick={() => setActiveTab("violence")}
              className={`px-3 py-1 rounded ${activeTab === "violence" ? "bg-white shadow" : "text-gray-600"}`}
            >
              Violence Reports
            </button>
          </div>

          <button onClick={downloadCsv} className="px-4 py-2 bg-blue-600 text-white rounded shadow-sm hover:bg-blue-700 transition">
            Download SMILE CSV
          </button>
          <button onClick={() => {
            if (activeTab === "apps") fetchApps();
            else fetchViolenceReports();
          }} className="px-4 py-2 bg-white border rounded shadow-sm hover:bg-gray-50">
            Refresh
          </button>
          <button onClick={() => { localStorage.removeItem(ADMIN_KEY); navigate("/admin-login", { replace: true }); }} className="px-4 py-2 bg-red-50 border rounded">
            Logout
          </button>
        </div>
      </div>

      {loading && <div className="text-sm text-gray-600 mb-4">Loading...</div>}

      {activeTab === "apps" && (
        <div className="space-y-4">
          {apps.length === 0 && !loading && (
            <div className="p-6 bg-white border rounded text-gray-600">No applications found.</div>
          )}

          {apps.map(app => (
            <div key={app._id} className="bg-white border rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row md:items-start md:justify-between">
              <div className="p-4 md:flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-lg font-medium">{app.policyName} — <span className="font-normal">{app.treatmentType}</span></div>
                    <div className="text-sm text-gray-500 mt-1">{app.identityNumber ? `${app.identityNumber} • ` : ""}{app.name} • {app.phone || app.email}</div>
                  </div>
                  <div className={`ml-4 inline-flex items-center px-3 py-1 rounded-full text-sm ${badgeClass(app.status)}`}>
                    {app.status || "submitted"}
                  </div>
                </div>

                <div className="mt-3 text-xs text-gray-500">Applied: {new Date(app.createdAt).toLocaleString()}</div>

                <div className="mt-3">
                  <div className="text-sm font-medium mb-2">Documents</div>
                  <div className="flex flex-wrap gap-2">
                    {(app.documents || []).length === 0 && <div className="text-sm text-gray-500">No documents uploaded.</div>}
                    {(app.documents || []).map((d: any, i: number) => (
                      <a key={i} className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-gray-50 border rounded hover:bg-gray-100" href={docUrl(d)} target="_blank" rel="noreferrer">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7v10a1 1 0 001 1h8a1 1 0 001-1V7m-6-4h2a2 2 0 012 2v2h-6V5a2 2 0 012-2z"/></svg>
                        <span>{d.filename || d.url || `file-${i+1}`}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-3 text-sm text-gray-600">
                  {app.preferredHospital && <div><strong>Hospital:</strong> {app.preferredHospital}</div>}
                  {app.estimatedTreatmentDate && <div><strong>Est. date:</strong> {new Date(app.estimatedTreatmentDate).toLocaleDateString()}</div>}
                </div>
              </div>

              <div className="p-4 border-t md:border-t-0 md:border-l md:w-56 flex flex-col gap-3 items-stretch">
                <button onClick={() => updateStatus(app._id, "approved")} className="w-full px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Approve</button>
                <button onClick={() => updateStatus(app._id, "rejected")} className="w-full px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">Reject</button>
                <button onClick={() => sendToMock(app._id)} className="w-full px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">Send to Mock NGO</button>

                <div className="mt-2 text-xs text-gray-500">
                  <div><strong>ID:</strong> {app._id}</div>
                  {app.partnerResponse && <div className="mt-1"><strong>Partner:</strong> {String(app.partnerResponse?.status || app.partnerResponse?.partnerId || "—")}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "violence" && (
        <div className="space-y-4">
          {violenceReports.length === 0 && !loading && (
            <div className="p-6 bg-white border rounded text-gray-600">No violence reports found.</div>
          )}

          {violenceReports.map(rep => (
            <div key={rep._id} className="bg-white border rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row md:items-start md:justify-between">
              <div className="p-4 md:flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-lg font-medium">{rep.violenceType} — <span className="font-normal">{rep.reporterName || rep.reporterPhone || "Anonymous"}</span></div>
                    <div className="text-sm text-gray-500 mt-1">{rep.reporterPhone || rep.reporterEmail} • {new Date(rep.createdAt).toLocaleString()}</div>
                  </div>
                  <div className={`ml-4 inline-flex items-center px-3 py-1 rounded-full text-sm ${badgeClass(rep.status)}`}>
                    {rep.status || "new"}
                  </div>
                </div>

                <div className="mt-3 text-sm text-gray-700 line-clamp-3">{rep.description}</div>

                <div className="mt-3">
                  <div className="text-sm font-medium mb-2">Evidence</div>
                  <div className="flex flex-wrap gap-2">
                    {(rep.evidence || []).length === 0 && <div className="text-sm text-gray-500">No evidence uploaded.</div>}
                    {(rep.evidence || []).map((d: any, i: number) => (
                      <a key={i} className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-gray-50 border rounded hover:bg-gray-100" href={docUrl(d)} target="_blank" rel="noreferrer">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7v10a1 1 0 001 1h8a1 1 0 001-1V7m-6-4h2a2 2 0 012 2v2h-6V5a2 2 0 012-2z"/></svg>
                        <span>{d.originalname || d.filename || `file-${i+1}`}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {rep.location && <div className="mt-3 text-sm text-gray-600"><strong>Location:</strong> {rep.location}</div>}
              </div>

              <div className="p-4 border-t md:border-t-0 md:border-l md:w-56 flex flex-col gap-3 items-stretch">
                <button onClick={() => updateStatus(rep._id, "processing")} className="w-full px-3 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition">Mark Reviewing</button>
                <button onClick={() => updateStatus(rep._id, "closed")} className="w-full px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Close</button>

                <div className="mt-2 text-xs text-gray-500">
                  <div><strong>ID:</strong> {rep._id}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
