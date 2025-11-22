// PridePath.tsx

import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Users,
  Sparkles,
  HeartHandshake,
  Zap,
  MessagesSquare,
  CalendarClock,
  Star,
  UserCircle,
  Target,
  Lightbulb,
  Phone,
  Video,
  Upload,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const gradientColor = "from-green-600 to-emerald-400";

const PridePath = () => {
  const navigate = useNavigate();

  // ---- BOOKING MODAL STATE ----
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const [sessionType, setSessionType] = useState("video");
  const [sessionDate, setSessionDate] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [documents, setDocuments] = useState<FileList | null>(null);

  const openBooking = (mentor: any) => {
    setSelectedMentor(mentor);
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setSelectedMentor(null);
    setSessionType("video");
    setSessionDate("");
    setSessionTime("");
    setDocuments(null);
  };

  const handleBooking = () => {
    if (!sessionDate || !sessionTime) {
      alert("Please choose date & time");
      return;
    }

    alert(
      `🎉 Session booked with ${selectedMentor.name} on ${sessionDate} at ${sessionTime}`
    );
    closeBooking();
  };

  // ---- Mentors List ----
  const mentors = [
    {
      id: 1,
      name: "Aisha (She/Her)",
      role: "HR Manager • Resume Expert",
      iconColor: "text-emerald-600",
      stars: 4.5,
      bio: "Helped 200+ trans individuals with job prep, resume training & communication.",
    },
    {
      id: 2,
      name: "Riya (She/Her)",
      role: "Designer • Skill Coach",
      iconColor: "text-purple-600",
      stars: 5,
      bio: "Guides learners on design, branding, creative skills & freelancing.",
    },
    {
      id: 3,
      name: "Arun (He/Him)",
      role: "Software Developer • Tech Mentor",
      iconColor: "text-blue-600",
      stars: 4.7,
      bio: "Helps learners enter IT—coding, web development & tech careers.",
    },
  ];

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
        <h1 className="text-5xl font-bold mb-4">PridePath Mentorship</h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          Connect with transgender mentors for career, confidence, skill growth & life guidance.
        </p>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Overview Section */}
        <Card className="p-10 bg-white border shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <div
              className={`p-4 rounded-xl text-white bg-gradient-to-r ${gradientColor}`}
            >
              <Users className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-3xl font-bold">Empowerment Through Mentorship</h2>
              <p className="text-muted-foreground mt-1">
                Learn from transgender mentors who understand the journey, struggles & growth pathways.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="p-6 bg-blue-50 border-blue-200">
              <Sparkles className="w-6 h-6 text-blue-600 mb-3" />
              <h3 className="font-semibold text-lg">1-on-1 Mentorship</h3>
              <p className="text-sm text-gray-700">
                Personalized guidance from trained trans mentors.
              </p>
            </Card>

            <Card className="p-6 bg-purple-50 border-purple-200">
              <Target className="w-6 h-6 text-purple-600 mb-3" />
              <h3 className="font-semibold text-lg">Career Planning</h3>
              <p className="text-sm text-gray-700">
                Resume, interviews, job mapping & confidence building.
              </p>
            </Card>

            <Card className="p-6 bg-pink-50 border-pink-200">
              <Lightbulb className="w-6 h-6 text-pink-600 mb-3" />
              <h3 className="font-semibold text-lg">Skill Guidance</h3>
              <p className="text-sm text-gray-700">
                Learn useful skills: coding, design, business & more.
              </p>
            </Card>

            <Card className="p-6 bg-green-50 border-green-200">
              <HeartHandshake className="w-6 h-6 text-green-600 mb-3" />
              <h3 className="font-semibold text-lg">Networking Support</h3>
              <p className="text-sm text-gray-700">
                Meet mentors, NGOs, community leaders & employers.
              </p>
            </Card>
          </div>
        </Card>

        {/* Mentor Profiles */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Meet Our Mentors</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mentors.map((m) => (
              <Card key={m.id} className="p-6 bg-white border shadow-sm">
                <UserCircle className={`w-16 h-16 mx-auto mb-4 ${m.iconColor}`} />
                <h3 className="text-xl font-bold text-center">{m.name}</h3>
                <p className="text-sm text-center text-muted-foreground">{m.role}</p>

                {/* Stars */}
                <div className="flex justify-center items-center gap-1 text-yellow-500 mt-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i <= Math.round(m.stars) ? "opacity-100" : "opacity-50"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-sm mt-3 text-gray-700">{m.bio}</p>

                <Button
                  className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-400 text-white"
                  onClick={() => openBooking(m)}
                >
                  Book Session
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Booking Modal */}
        {isBookingOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg mx-4 rounded-xl shadow-xl p-6 relative">
              <button
                className="absolute top-3 right-3 text-muted-foreground hover:text-black"
                onClick={closeBooking}
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-bold mb-2">Book Session</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Mentor: <b>{selectedMentor?.name}</b>
              </p>

              {/* Session Type */}
              <label className="text-xs font-semibold">Session Type</label>
              <select
                className="w-full border px-3 py-2 rounded-lg bg-white text-sm mb-3"
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
              >
                <option value="video">Video Call</option>
                <option value="audio">Audio Call</option>
                <option value="chat">Chat Session</option>
              </select>

              {/* Date */}
              <label className="text-xs font-semibold">Choose Date</label>
              <input
                type="date"
                className="w-full border px-3 py-2 rounded-lg bg-white text-sm mb-3"
                value={sessionDate}
                onChange={(e) => setSessionDate(e.target.value)}
              />

              {/* Time */}
              <label className="text-xs font-semibold">Choose Time</label>
              <input
                type="time"
                className="w-full border px-3 py-2 rounded-lg bg-white text-sm mb-3"
                value={sessionTime}
                onChange={(e) => setSessionTime(e.target.value)}
              />

              {/* Upload */}
              <label className="text-xs font-semibold">Upload Resume (Optional)</label>
              <div className="flex items-center gap-3 border p-2 rounded-lg bg-muted/40 mb-4">
                <Upload className="w-5 h-5 text-primary" />
                <input
                  type="file"
                  onChange={(e) => setDocuments(e.target.files)}
                  className="text-xs"
                />
              </div>

              <Button
                className="w-full bg-gradient-to-r from-green-600 to-emerald-400 text-white"
                onClick={handleBooking}
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        )}

        {/* How it works */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">How Mentorship Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 bg-white border text-center shadow-sm">
              <Sparkles className="w-10 h-10 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">1. Choose Mentor</h3>
            </Card>

            <Card className="p-6 bg-white border text-center shadow-sm">
              <CalendarClock className="w-10 h-10 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">2. Select Session Time</h3>
            </Card>

            <Card className="p-6 bg-white border text-center shadow-sm">
              <MessagesSquare className="w-10 h-10 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">3. Attend Session</h3>
            </Card>

            <Card className="p-6 bg-white border text-center shadow-sm">
              <Zap className="w-10 h-10 text-amber-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">4. Start Growing</h3>
            </Card>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="p-4 bg-gray-100 border-l-4 border-gray-600 rounded text-sm">
          ⚠️ <b>Note:</b> Mentorship does not guarantee jobs but guides you with skills,
          confidence & opportunities.
        </div>
      </div>
    </div>
  );
};

export default PridePath;
