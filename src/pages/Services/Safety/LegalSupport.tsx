import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Scale,
  FileText,
  Users,
  Phone,
  AlertTriangle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const gradientColor = "from-red-500 to-red-400";

const LegalSupport = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-muted/20 min-h-screen">
      <Navigation />

      {/* Back Button */}
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
      <section
        className={`py-20 bg-gradient-to-r ${gradientColor} text-white text-center`}
      >
        <h1 className="text-5xl font-bold mb-4">Legal Support Directory</h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          Access trusted, low-cost and pro bono lawyers specializing in
          transgender and LGBTQ+ rights.
        </p>
      </section>

      {/* Page Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Overview */}
        <Card className="p-10 shadow-xl bg-white border">
          <div className="flex items-center gap-4 mb-10">
            <div
              className={`p-4 rounded-xl text-white bg-gradient-to-r ${gradientColor}`}
            >
              <Scale className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-3xl font-bold">Your Legal Aid Toolkit</h2>
              <p className="text-muted-foreground mt-1">
                Verified lawyers, legal advice, document support, and rights
                assistance — all under one place.
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 bg-red-50 border-red-200">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-red-600" />
                Pro Bono Lawyers
              </h3>
              <p className="text-sm text-gray-700">
                Verified advocates offering free or low-cost legal support.
              </p>
            </Card>

            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Document Assistance
              </h3>
              <p className="text-sm text-gray-700">
                Help with filing FIRs, affidavits, name/gender change documents.
              </p>
            </Card>

            <Card className="p-6 bg-green-50 border-green-200">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-green-600" />
                Case Guidance
              </h3>
              <p className="text-sm text-gray-700">
                Support for harassment, discrimination, workplace abuse and more.
              </p>
            </Card>
          </div>
        </Card>

        {/* Directory Section */}
        <section className="space-y-10">
          <h2 className="text-2xl font-bold">Available Legal Contacts</h2>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-2">LGBTQ+ Rights Lawyer</h3>
            <p className="text-sm text-gray-700 mb-2">
              Specializes in transgender rights, workplace discrimination, and
              harassment cases.
            </p>
            <p className="font-semibold">📞 Contact: +91 98765 43210</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-2">Legal Aid Board (Govt.)</h3>
            <p className="text-sm text-gray-700 mb-2">
              Free legal services for marginalized communities including
              transgender individuals.
            </p>
            <p className="font-semibold">📞 Helpline: 15100</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-2">Community Legal Volunteers</h3>
            <p className="text-sm text-gray-700 mb-2">
              Peer volunteers who guide in basic legal processes and documentation.
            </p>
            <p className="font-semibold">📞 Contact: +91 90000 11223</p>
          </Card>
        </section>

        {/* Helplines */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Emergency Legal Helplines</h2>

          <Card className="p-5 bg-red-50 border-l-4 border-red-600 flex gap-4 items-start">
            <Phone className="w-6 h-6 text-red-600" />
            <div className="text-sm">
              <p>
                <b>National Legal Services Authority (NALSA):</b> 15100
              </p>
              <p className="mt-1">
                Free legal aid for all citizens, including transgender persons.
              </p>
            </div>
          </Card>

          <Card className="p-5 bg-blue-50 border-l-4 border-blue-600 flex gap-4 items-start">
            <AlertTriangle className="w-6 h-6 text-blue-600" />
            <div className="text-sm">
              <p>
                <b>Legal Women & Trans Helpline:</b> 1091
              </p>
              <p className="mt-1">
                Support for harassment, abuse, or unsafe situations.
              </p>
            </div>
          </Card>
        </section>

        {/* Disclaimer */}
        <div className="p-4 bg-gray-100 border-l-4 border-gray-500 rounded text-sm">
          ⚠️ <b>Disclaimer:</b> Legal support information is for guidance only.
          For serious cases, always consult certified lawyers or authorities.
        </div>
      </div>
    </div>
  );
};

export default LegalSupport;
