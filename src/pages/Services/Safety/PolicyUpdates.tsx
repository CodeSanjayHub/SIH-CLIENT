import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  FileText,
  Bell,
  AlertTriangle,
  Users,
  Phone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const gradientColor = "from-red-500 to-red-400";

const PolicyUpdates = () => {
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
        <h1 className="text-5xl font-bold mb-4">Policy Updates</h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          Real-time updates on laws, government schemes, and policy changes
          affecting transgender rights.
        </p>
      </section>

      {/* Page Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">

        {/* Overview Section */}
        <Card className="p-10 shadow-xl bg-white border">
          <div className="flex items-center gap-4 mb-10">
            <div
              className={`p-4 rounded-xl text-white bg-gradient-to-r ${gradientColor}`}
            >
              <FileText className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-3xl font-bold">Latest Policy & Law Updates</h2>
              <p className="text-muted-foreground mt-1">
                Stay informed about new transgender rights, welfare schemes,
                legal protections, and government notifications.
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 bg-red-50 border-red-200">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Law Changes
              </h3>
              <p className="text-sm text-gray-700">
                Updates on gender identity laws, protection acts, and legal
                amendments.
              </p>
            </Card>

            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" />
                Govt. Schemes
              </h3>
              <p className="text-sm text-gray-700">
                Notifications about welfare benefits, subsidies, and
                trans-inclusive programs.
              </p>
            </Card>

            <Card className="p-6 bg-green-50 border-green-200">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" />
                Community Rights
              </h3>
              <p className="text-sm text-gray-700">
                Information on workplace rights, healthcare equality, and
                anti-discrimination policies.
              </p>
            </Card>
          </div>
        </Card>

        {/* Policy Update Feed */}
        <section className="space-y-10">
          <h2 className="text-2xl font-bold">Recent Policy Highlights</h2>

          <Card className="p-6">
  <h3 className="text-xl font-bold mb-2">
    🏛️ New Workplace Equality Rules (2024)
  </h3>
  <p className="text-sm text-gray-700">
    The government made anti-discrimination cells mandatory in all workplaces
    with over 30 employees and strengthened transgender employee protection laws.
  </p>
</Card>

<Card className="p-6">
  <h3 className="text-xl font-bold mb-2">💰 Updated State Welfare Schemes</h3>
  <p className="text-sm text-gray-700">
    Tamil Nadu, Kerala, and Delhi expanded welfare programs for transgender
    individuals, including pensions, housing support, and skill training funds.
  </p>
</Card>

<Card className="p-6">
  <h3 className="text-xl font-bold mb-2">
    ⚖️ Simplified Gender Certificate Process
  </h3>
  <p className="text-sm text-gray-700">
    Transgender ID and gender change certificates can now be applied entirely
    online without medical examination under the 2024 update.
  </p>
</Card>

        </section>

        {/* Helplines */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Policy Assistance Helplines</h2>

          <Card className="p-5 bg-red-50 border-l-4 border-red-600 flex gap-4 items-start">
            <Phone className="w-6 h-6 text-red-600" />
            <div className="text-sm">
              <p>
                <b>Transgender Welfare Helpline:</b> 011-2338-2713
              </p>
              <p className="mt-1">
                For queries related to welfare schemes and legal rights.
              </p>
            </div>
          </Card>

          <Card className="p-5 bg-blue-50 border-l-4 border-blue-600 flex gap-4 items-start">
            <AlertTriangle className="w-6 h-6 text-blue-600" />
            <div className="text-sm">
              <p>
                <b>Rights & Policy Support Helpline:</b> 1800-425-0110
              </p>
              <p className="mt-1">
                Information on new laws, amendments, and legal aid.
              </p>
            </div>
          </Card>
        </section>

        {/* Disclaimer */}
        <div className="p-4 bg-gray-100 border-l-4 border-gray-500 rounded text-sm">
          ⚠️ <b>Note:</b> Policy updates shown here are simplified summaries. For
          official details, refer to government notifications.
        </div>
      </div>
    </div>
  );
};

export default PolicyUpdates;
