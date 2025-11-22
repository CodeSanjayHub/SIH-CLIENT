import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShieldAlert,
  AlertTriangle,
  Navigation2,
  Phone,
  ArrowLeft,
  Bell,
  MapPin,
  Users,
  Siren,
} from "lucide-react";
import { moduleColors } from "../ServicesData";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

const SOS = () => {
  const navigate = useNavigate();
const gradientColor = moduleColors["sos"] || "from-red-600 to-red-400";

  const [sendingSOS, setSendingSOS] = useState(false);

  // ---- SEND SOS (Frontend Demo) ----
  const handleSendSOS = async () => {
    setSendingSOS(true);
    setTimeout(() => {
      alert(
        "🚨 SOS Alert Triggered!\nYour emergency request has been sent to your trusted contacts (demo)."
      );
      setSendingSOS(false);
    }, 1500);
  };

  // ---- SHARE LIVE LOCATION ----
  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      alert("Location services not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const url = `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
        alert("Location Link:\n" + url);
      },
      () => {
        alert("Unable to fetch location. Please enable GPS.");
      }
    );
  };

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
        <h1 className="text-5xl font-bold mb-4">SOS Emergency Help</h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          Immediate support, emergency alerts, and quick safety tools designed
          especially for transgender and gender-diverse individuals.
        </p>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <Button
            onClick={handleSendSOS}
            className="px-10 py-5 rounded-full text-xl font-bold bg-white text-red-600 flex items-center gap-3 shadow-lg"
          >
            <Siren className="w-6 h-6" />
            {sendingSOS ? "Sending..." : "Send SOS Alert"}
          </Button>

         <Button
  variant="outline"
  className="border-white text-black rounded-full px-6 py-3 text-sm flex items-center gap-2"
  onClick={handleShareLocation}
>
  <Navigation2 className="w-4 h-4 text-black" />
  Share Live Location
</Button>

        </div>
      </section>

      {/* Page Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Overview Section */}
        <Card className="p-10 shadow-xl bg-white border">
          <div className="flex items-center gap-4 mb-10">
            <div
              className={`p-4 rounded-xl text-white bg-gradient-to-r ${gradientColor}`}
            >
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-3xl font-bold">Your Personal Safety Toolkit</h2>
              <p className="text-muted-foreground mt-1">
                These emergency tools ensure support, protection, and immediate
                assistance when you feel unsafe.
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 bg-red-50 border-red-200">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Emergency Alert
              </h3>
              <p className="text-sm text-gray-700">
                Instantly notify your trusted contacts when you feel unsafe.
              </p>
            </Card>

            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Navigation2 className="w-5 h-5 text-blue-600" />
                Live Location Sharing
              </h3>
              <p className="text-sm text-gray-700">
                Send your exact current GPS location in one tap.
              </p>
            </Card>

            <Card className="p-6 bg-green-50 border-green-200">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" />
                Trusted Contacts
              </h3>
              <p className="text-sm text-gray-700">
                Add 3–5 trusted people who receive alerts during emergencies.
              </p>
            </Card>
          </div>
        </Card>

        {/* Trusted Contacts Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Trusted Contacts</h2>
          <p className="text-sm text-muted-foreground">
            These contacts will receive your SOS alerts and location (demo only).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-5">
              <div className="flex items-start gap-4">
                <Bell className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-bold text-lg">Primary Contact</h3>
                  <p className="text-sm text-gray-700">
                    Add your closest or most trusted person here.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="font-bold text-lg">Secondary Contact</h3>
                  <p className="text-sm text-gray-700">
                    They will also receive emergency notifications.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Safety Tips */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Quick Safety Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-5 bg-yellow-50 border-yellow-200">
              <h3 className="font-bold mb-2">1. Stay Visible</h3>
              <p className="text-sm">
                Stay in public areas when you feel at risk. Avoid isolated spots.
              </p>
            </Card>

            <Card className="p-5 bg-purple-50 border-purple-200">
              <h3 className="font-bold mb-2">2. Share Location</h3>
              <p className="text-sm">
                Always keep one trusted person updated about your whereabouts.
              </p>
            </Card>

            <Card className="p-5 bg-pink-50 border-pink-200">
              <h3 className="font-bold mb-2">3. Call Emergency Help</h3>
              <p className="text-sm">
                Do not hesitate to call 1091 or local authorities if threatened.
              </p>
            </Card>
          </div>
        </section>

        {/* Helplines */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Emergency Helplines</h2>

          <Card className="p-5 bg-red-50 border-l-4 border-red-600 flex gap-4 items-start">
            <Phone className="w-6 h-6 text-red-600" />
            <div className="text-sm">
              <p>
                <b>Police Women & Trans Safety Helpline:</b> 1091
              </p>
              <p className="mt-1">
                Available in many states for harassment, violence, or unsafe
                situations.
              </p>
            </div>
          </Card>

          <Card className="p-5 bg-blue-50 border-l-4 border-blue-600 flex gap-4 items-start">
            <AlertTriangle className="w-6 h-6 text-blue-600" />
            <div className="text-sm">
              <p>
                <b>National Mental Health Helpline:</b> 1800-599-0019
              </p>
              <p className="mt-1">
                24×7 support for emotional crisis, panic, or trauma.
              </p>
            </div>
          </Card>
        </section>

        {/* Disclaimer */}
        <div className="p-4 bg-gray-100 border-l-4 border-gray-500 rounded text-sm">
          ⚠️ <b>Disclaimer:</b> SOS is a supportive feature and does not replace
          police or medical emergency services. If you are in immediate danger,
          always call your local authorities first.
        </div>
      </div>
    </div>
  );
};

export default SOS;
