// Client/src/pages/ApplicationForm.tsx
import React, { useState } from "react";
import { API_BASE } from "@/lib/api";

const ApplicationForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    const form = new FormData(e.target as HTMLFormElement);
    // ensure userId is present — for demo we accept a manual input field or identityNumber
    if (!form.get("userId")) {
      return setMsg("userId is required (for demo).");
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/insurance/apply`, {
        method: "POST",
        body: form
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setMsg("Submit failed: " + (data?.error || res.status));
        return;
      }
      setMsg("Application submitted (id: " + data.id + ")");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
      setMsg("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h3 className="text-xl font-semibold mb-4">Apply for Insurance</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-3">
        <input name="userId" placeholder="userId (for demo)" className="w-full border px-2 py-1" />
        <input name="name" placeholder="Full name" className="w-full border px-2 py-1" />
        <input name="identityNumber" placeholder="Identity (TG... or Aadhaar)" className="w-full border px-2 py-1" />
        <input name="email" placeholder="Email" className="w-full border px-2 py-1" />
        <input name="phone" placeholder="Phone" className="w-full border px-2 py-1" />
        <select name="treatmentType" className="w-full border px-2 py-1">
          <option value="">Select treatment</option>
          <option value="gender-affirming-surgery">Gender Affirming Surgery</option>
        </select>
        <input name="preferredHospital" placeholder="Preferred hospital" className="w-full border px-2 py-1" />
        <label className="block">ID Proof <input name="idProof" type="file" /></label>
        <label className="block">Doctor Letter <input name="doctorLetter" type="file" /></label>
        <label className="block">Other Documents <input name="documents" type="file" multiple /></label>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-primary text-white rounded">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {msg && <div className="mt-3 text-sm">{msg}</div>}
    </div>
  );
};

export default ApplicationForm;
