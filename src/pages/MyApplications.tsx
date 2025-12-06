// Client/src/pages/MyApplications.tsx
import React, { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";

const MyApplications: React.FC<{ userId?: string }> = ({ userId }) => {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const uid = userId || localStorage.getItem("userId") || ""; // demo

  useEffect(() => {
    if (!uid) return;
    fetchApps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  async function fetchApps() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/insurance/user/${uid}`);
      if (!res.ok) {
        alert("Failed to load your apps");
        setApps([]);
        return;
      }
      const data = await res.json();
      setApps(data.items || []);
    } catch (err) {
      console.error(err);
      setApps([]);
    } finally {
      setLoading(false);
    }
  }

  if (!uid) return <div>Please login / provide userId for demo (saved in localStorage as userId)</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h3 className="text-xl font-semibold mb-4">My Applications</h3>
      {loading && <div>Loading...</div>}
      {(!loading && apps.length === 0) && <div>No applications found.</div>}
      <div className="space-y-3">
        {apps.map(a => (
          <div key={a._id} className="p-3 border rounded">
            <div className="flex justify-between">
              <div>
                <div className="font-medium">{a.policyName} • {a.treatmentType}</div>
                <div className="text-sm text-gray-600">{a.preferredHospital}</div>
              </div>
              <div className="text-sm">{a.status}</div>
            </div>
            <div className="text-xs text-gray-500 mt-2">Applied: {new Date(a.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;
