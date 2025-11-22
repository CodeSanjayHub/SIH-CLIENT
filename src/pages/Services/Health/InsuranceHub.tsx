import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Upload, Info, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { moduleColors } from "../ServicesData";
import { useNavigate } from "react-router-dom";

const InsuranceHub = () => {
  const navigate = useNavigate();
  const gradientColor = moduleColors["health"];

  const [treatmentType, setTreatmentType] = useState("");
  const [documents, setDocuments] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!treatmentType || !documents) {
      alert("Please fill all fields");
      return;
    }

    const form = new FormData();
    form.append("userId", localStorage.getItem("userId") || "demo-user");
    form.append("policyName", "SRS+ Gender Affirming Surgery Insurance");
    form.append("treatmentType", treatmentType);
    for (let file of documents) form.append("documents", file);

    await fetch("http://localhost:5000/insurance/apply", {
      method: "POST",
      body: form,
    });

    alert("Insurance request submitted!");
  };

  return (
    <div className="bg-muted/20 min-h-screen">
      <Navigation />

      {/* Back Button */}
      <div className="w-full bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate("/services")}
            className="flex items-center text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Services
          </button>
        </div>
      </div>

      {/* Banner */}
      <section
        className={`py-20 bg-gradient-to-r ${gradientColor} text-center text-white`}
      >
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Insurance Hub</h1>
          <p className="text-lg opacity-90">
            Apply for secure and inclusive gender-affirming surgery insurance.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">

        {/* Insurance Overview */}
        <Card className="p-10 shadow-xl bg-white border">
          <div className="flex items-center gap-4 mb-10">
            <div
              className={`p-4 rounded-xl text-white bg-gradient-to-r ${gradientColor}`}
            >
              <Shield className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-3xl font-bold">SRS+ Gender Affirming Insurance</h2>
              <p className="text-muted-foreground mt-1">
                Trusted coverage designed for transgender individuals.
              </p>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="text-lg font-bold mb-3">Coverage Highlights</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>✔ ₹3,00,000 SRS support</li>
                <li>✔ Hospitalization coverage</li>
                <li>✔ Post-operative support</li>
              </ul>
            </Card>

            <Card className="p-6 bg-purple-50 border-purple-200">
              <h3 className="text-lg font-bold mb-3">Documents Needed</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>✔ ID proof</li>
                <li>✔ Doctor recommendation</li>
                <li>✔ Medical history report</li>
              </ul>
            </Card>

            <Card className="p-6 bg-green-50 border-green-200">
              <h3 className="text-lg font-bold mb-3">Approval Steps</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>✔ Submit documents</li>
                <li>✔ Admin verifies</li>
                <li>✔ Approval granted</li>
              </ul>
            </Card>
          </div>
        </Card>

        {/* Apply Section (REPLACED + COMBINED) */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Apply for Pre-Authorization
          </h2>

          <Card className="p-10 shadow-xl border bg-white space-y-8">

            {/* USER DETAILS */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Your Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <label className="text-sm font-medium">Name</label>
                  <input
                    type="text"
                    value={localStorage.getItem("name") || "User Name"}
                    readOnly
                    className="w-full border px-4 py-3 rounded-lg bg-gray-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="text"
                    value={localStorage.getItem("email") || "user@example.com"}
                    readOnly
                    className="w-full border px-4 py-3 rounded-lg bg-gray-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <input
                    type="text"
                    value={localStorage.getItem("phone") || "+91 00000 00000"}
                    readOnly
                    className="w-full border px-4 py-3 rounded-lg bg-gray-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Date of Birth</label>
                  <input
                    type="text"
                    value={localStorage.getItem("dob") || "01/01/2000"}
                    readOnly
                    className="w-full border px-4 py-3 rounded-lg bg-gray-100"
                  />
                </div>

              </div>
            </div>

            {/* TREATMENT DETAILS */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Treatment Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <label className="text-sm font-semibold">Treatment Type</label>
                  <select
                    className="w-full border px-4 py-3 rounded-lg bg-white"
                    value={treatmentType}
                    onChange={(e) => setTreatmentType(e.target.value)}
                  >
                    <option value="">Select Treatment</option>
                    <option value="Top Surgery">Top Surgery</option>
                    <option value="Bottom Surgery">Bottom Surgery</option>
                    <option value="Hormone Therapy">Hormone Therapy</option>
                    <option value="Facial Feminization">Facial Feminization</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold">Preferred Hospital</label>
                  <select className="w-full border px-4 py-3 rounded-lg bg-white">
                    <option>Select Hospital</option>
                    <option>Apollo Hospitals</option>
                    <option>MIOT Hospitals</option>
                    <option>Fortis Healthcare</option>
                    <option>Government Hospital</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold">Estimated Treatment Date</label>
                  <input
                    type="date"
                    className="w-full border px-4 py-3 rounded-lg bg-white"
                  />
                </div>

              </div>
            </div>

            {/* DOCUMENT UPLOADS */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Documents Upload</h3>

              <div className="space-y-6">

                {/* ID PROOF */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    ID Proof (Aadhaar / Trans ID)
                  </label>
                  <div className="flex items-center gap-4 border p-4 rounded-lg bg-muted/40">
                    <Upload className="w-6 h-6 text-primary" />
                    <input type="file" className="text-sm" />
                  </div>
                </div>

                {/* DOCTOR LETTER */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Doctor Recommendation Letter
                  </label>
                  <div className="flex items-center gap-4 border p-4 rounded-lg bg-muted/40">
                    <Upload className="w-6 h-6 text-primary" />
                    <input type="file" className="text-sm" />
                  </div>
                </div>

                {/* MEDICAL ESTIMATE */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Medical Estimate PDF
                  </label>
                  <div className="flex items-center gap-4 border p-4 rounded-lg bg-muted/40">
                    <Upload className="w-6 h-6 text-primary" />
                    <input type="file" className="text-sm" />
                  </div>
                </div>

                {/* ADDITIONAL FILES */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Additional Documents
                  </label>
                  <div className="flex items-center gap-4 border p-4 rounded-lg bg-muted/40">
                    <Upload className="w-6 h-6 text-primary" />
                    <input
                      type="file"
                      multiple
                      onChange={(e) => setDocuments(e.target.files)}
                      className="text-sm"
                    />
                  </div>
                </div>

              </div>

              <p className="text-xs text-muted-foreground mt-2">
                Supported Formats: PDF, JPG, PNG — Max 10 MB each
              </p>

              <div className="mt-3 text-green-700 text-sm flex items-center gap-2">
                🔒 Your documents are securely encrypted and transmitted.
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <Button
              className={`w-full bg-gradient-to-r ${gradientColor} text-white py-3 text-lg`}
              onClick={handleApply}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </Button>

          </Card>
        </section>

        {/* Info Box */}
        <div className="flex items-start gap-4 p-6 border-l-4 border-blue-600 bg-blue-50 rounded-xl">
          <Info className="w-6 h-6 text-blue-600" />
          <p className="text-gray-700 text-sm leading-relaxed">
            Your application will be reviewed by authorized officers.
            You can track updates in <b>My Applications → Insurance</b>.
          </p>
        </div>

      </div>
    </div>
  );
};

export default InsuranceHub;
