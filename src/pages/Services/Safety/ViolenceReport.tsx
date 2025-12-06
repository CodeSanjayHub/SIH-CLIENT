import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  AlertTriangle,
  Upload,
  Phone,
  ShieldAlert,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const ViolenceReport = () => {
  const navigate = useNavigate();

  const [violenceType, setViolenceType] = useState("");
  const [description, setDescription] = useState("");
  const [evidence, setEvidence] = useState<FileList | null>(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!violenceType || !description) {
      alert("⚠️ Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const form = new FormData();
      form.append("userId", localStorage.getItem("userId") || "demoUser");
      form.append("violenceType", violenceType);
      form.append("description", description);
      if (location) form.append("location", location);

      // Evidence files
      if (evidence) {
        for (let i = 0; i < evidence.length; i++) {
          form.append("evidence", evidence[i]);
        }
      }

      const res = await fetch(`${API_BASE}/api/violence/report`, {
        method: "POST",
        body: form, // do NOT set Content-Type
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "Submit failed");

      alert("✅ Report successfully submitted!");
    } catch (err: any) {
      console.error(err);
      alert("Failed to submit report: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationFetch = () => {
    if (!navigator.geolocation) {
      alert("Location not supported.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = `${pos.coords.latitude}, ${pos.coords.longitude}`;
        setLocation(loc);
        alert("📍 Location captured successfully.");
      },
      () => alert("Unable to fetch location.")
    );
  };

  return (
    <div className="bg-muted/20 min-h-screen">
      <Navigation />

      {/* Back */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate("/services")}
            className="flex items-center text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </button>
        </div>
      </div>

      {/* Banner */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-400 text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Violence Reporting Tool</h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          Report harassment, discrimination, or violence safely and securely.
        </p>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Overview */}
        <Card className="p-10 bg-white shadow-xl border">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-4 rounded-xl bg-red-600 text-white">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Report Violence Safely</h2>
              <p className="text-muted-foreground mt-1">
                Your report will be kept confidential.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-8">
            {/* Violence Type */}
            <div>
              <label className="font-semibold text-sm">Type of Violence *</label>
              <select
                value={violenceType}
                onChange={(e) => setViolenceType(e.target.value)}
                className="w-full border px-4 py-3 rounded-lg mt-2"
              >
                <option value="">Select Type</option>
                <option>Physical Violence</option>
                <option>Harassment</option>
                <option>Cyberbullying</option>
                <option>Discrimination</option>
                <option>Sexual Violence</option>
                <option>Threats / Intimidation</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="font-semibold text-sm">Incident Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border px-4 py-3 rounded-lg h-32 mt-2"
                placeholder="Describe what happened..."
              />
            </div>

            {/* Evidence Upload */}
            <div>
              <label className="font-semibold text-sm">Upload Evidence</label>
              <div className="border p-4 rounded-lg bg-muted/40 mt-2 flex items-center gap-4">
                <Upload className="w-6 h-6 text-primary" />
                <input
                  type="file"
                  multiple
                  onChange={(e) => setEvidence(e.target.files)}
                  className="text-sm"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Supported: Images, Videos, Audio, PDF — Max 10MB each
              </p>
            </div>

            {/* Location */}
            <div>
              <label className="font-semibold text-sm">Location of Incident</label>
              <div className="flex gap-3 mt-2">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location or fetch GPS"
                  className="flex-1 border px-4 py-3 rounded-lg"
                />
                <Button onClick={handleLocationFetch} className="bg-blue-600 text-white px-6">
                  Auto-Fetch
                </Button>
              </div>
            </div>

            {/* Submit */}
            <Button
              className="w-full bg-gradient-to-r from-red-600 to-red-400 text-white py-3 text-lg"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Report"}
            </Button>
          </div>
        </Card>

        {/* Safety Tips */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Safety Tips</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-5 bg-yellow-50 border-yellow-200">
              <h3 className="font-bold mb-2">Stay Calm</h3>
              <p className="text-sm">Move to a safe public place immediately.</p>
            </Card>

            <Card className="p-5 bg-purple-50 border-purple-200">
              <h3 className="font-bold mb-2">Document Evidence</h3>
              <p className="text-sm">Save screenshots, photos, videos, or messages.</p>
            </Card>

            <Card className="p-5 bg-pink-50 border-pink-200">
              <h3 className="font-bold mb-2">Call Emergency Help</h3>
              <p className="text-sm">Dial 1091 or local authorities if in danger.</p>
            </Card>
          </div>
        </section>

        {/* Helplines */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Emergency Helplines</h2>

          <Card className="p-5 bg-red-50 border-l-4 border-red-600 flex gap-4">
            <Phone className="w-6 h-6 text-red-600" />
            <div className="text-sm">
              <p><b>Police Women & Trans Safety:</b> 1091</p>
            </div>
          </Card>

          <Card className="p-5 bg-blue-50 border-l-4 border-blue-600 flex gap-4">
            <AlertTriangle className="w-6 h-6 text-blue-600" />
            <div className="text-sm">
              <p><b>Mental Health Support:</b> 1800-599-0019</p>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default ViolenceReport;
