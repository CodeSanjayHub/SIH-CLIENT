// Client/src/pages/AdminLogin.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN || "7777"; // set via env or default
const ADMIN_KEY = "isAdmin"; // keep constant and shared with AdminDashboard
const ADMIN_TTL_MS = 1000 * 60 * 60; // 1 hour demo TTL

const AdminLogin: React.FC = () => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (pin.trim() === ADMIN_PIN) {
      // mark admin in localStorage for demo only (synchronous)
      try {
        localStorage.setItem(ADMIN_KEY, "1");
        localStorage.setItem("isAdminAt", String(Date.now()));
        localStorage.setItem("isAdminExpiry", String(Date.now() + ADMIN_TTL_MS));
      } catch (err) {
        console.error("Failed to write admin flag to localStorage", err);
        setError("Failed to persist login — please check browser settings.");
        return;
      }

      // navigate to admin dashboard replacing history (no back to login)
      navigate("/admin", { replace: true });
    } else {
      setError("Invalid PIN");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
        <form onSubmit={submit} className="space-y-3">
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter admin PIN"
            autoFocus
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
            Login
          </button>
        </form>
        <p className="text-xs text-muted mt-4">Demo PIN: <b>{ADMIN_PIN}</b></p>
      </div>
    </div>
  );
};

export default AdminLogin;
