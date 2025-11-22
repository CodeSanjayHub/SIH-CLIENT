// src/pages/Services/Shelter/Hostels.tsx

import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Home,
  Users,
  Shield,
  Bed,
  MapPin,
  Phone,
  Star,
  HeartHandshake,
  Search,
  ShieldCheck,
  DoorOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const gradientColor = "from-purple-500 to-purple-400";


interface Hostel {
  id: number;
  name: string;
  city: string;
  type: string; // "Men", "Women", "Shared"
  price: string;
  rating: number;
  phone: string;
  whatsapp: string;
  address: string;
  distance?: string;
  mapLink: string;
  facilities: string[];
  roomTypes: string[];
  rules: string[];
  verified: boolean;
}

const hostels: Hostel[] = [
  {
    id: 1,
    name: "Rainbow Haven Hostel",
    city: "Chennai",
    type: "Women Hostel",
    price: "₹4,500 / month",
    rating: 4.8,
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    address: "T. Nagar, Chennai",
    distance: "2.1 km from city center",
    mapLink: "https://www.google.com/maps?q=Rainbow+Haven+Hostel+Chennai",
    facilities: ["Wi-Fi", "24/7 Security", "Shared Rooms", "Attached Bathroom", "CCTV", "Safe Environment"],
    roomTypes: ["2-Sharing", "3-Sharing", "4-Sharing"],
    rules: ["No harassment / abuse", "Respect co-residents", "Visitor entry with permission only"],
    verified: true,
  },
  {
    id: 2,
    name: "Pride Home Stay",
    city: "Bengaluru",
    type: "Men Hostel",
    price: "₹3,800 / month",
    rating: 4.7,
    phone: "+91 90909 60606",
    whatsapp: "+91 90909 60606",
    address: "BTM Layout, Bengaluru",
    distance: "3.4 km from nearest metro",
    mapLink: "https://www.google.com/maps?q=Pride+Home+Stay+BTM+Bengaluru",
    facilities: ["Furnished Rooms", "Water Heater", "Security Cameras", "Laundry Support"],
    roomTypes: ["Single Room", "2-Sharing"],
    rules: ["No alcohol / drugs", "Quiet after 10 PM", "Mandatory ID proof at check-in"],
    verified: true,
  },
  {
    id: 3,
    name: "Trans Safe Nest",
    city: "Coimbatore",
    type: "Shared Rooms (All Gender Friendly)",
    price: "₹3,000 / month",
    rating: 4.6,
    phone: "+91 91234 56789",
    whatsapp: "+91 91234 56789",
    address: "RS Puram, Coimbatore",
    distance: "1.3 km from bus stand",
    mapLink: "https://www.google.com/maps?q=Trans+Safe+Nest+Coimbatore",
    facilities: ["Wi-Fi", "Laundry", "Community Support", "Common Kitchen"],
    roomTypes: ["3-Sharing", "4-Sharing"],
    rules: ["Zero-tolerance for transphobia", "No violence / threats", "Follow basic hostel timings"],
    verified: true,
  },
];

const Hostels = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHostel, setSelectedHostel] = useState<Hostel | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Booking form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [roomType, setRoomType] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const filteredHostels = hostels.filter((h) => {
    const term = searchTerm.toLowerCase();
    return (
      h.name.toLowerCase().includes(term) ||
      h.city.toLowerCase().includes(term) ||
      h.type.toLowerCase().includes(term)
    );
  });

  const openBookingModal = (hostel: Hostel) => {
    setSelectedHostel(hostel);
    setIsBookingOpen(true);
    setFullName(localStorage.getItem("name") || "");
    setPhone(localStorage.getItem("phone") || "");
    setMoveInDate("");
    setRoomType("");
    setNotes("");
  };

  const closeBookingModal = () => {
    setIsBookingOpen(false);
    setSelectedHostel(null);
  };

  const handleBookingSubmit = async () => {
    if (!selectedHostel || !fullName.trim() || !phone.trim() || !moveInDate || !roomType) {
      alert("Please fill all required fields (Name, Phone, Move-in Date, Room Type).");
      return;
    }

    setSubmitting(true);

    try {
      // In real app -> send to backend here
      // await fetch("http://localhost:5000/shelter/hostel-booking", { ... })

      alert(
        `Your booking/enquiry has been sent to ${selectedHostel.name}.\nThey will contact you on ${phone}.`
      );
      closeBookingModal();
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCall = (phone: string) => {
    const digits = phone.replace(/\s+/g, "");
    window.location.href = `tel:${digits}`;
  };

  const handleWhatsApp = (phone: string) => {
    const digits = phone.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${digits}`, "_blank");
  };

  const handleDirections = (mapLink: string) => {
    window.open(mapLink, "_blank");
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
        <h1 className="text-5xl font-bold mb-4">Trans-Friendly Hostels</h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          Safe, inclusive, and verified hostels for transgender individuals — providing
          security, privacy, and a respectful living environment.
        </p>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Overview Section */}
        <Card className="p-10 bg-white border shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <div
              className={`p-4 rounded-xl text-white bg-gradient-to-r ${gradientColor}`}
            >
              <Home className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Safe Living Spaces</h2>
              <p className="text-muted-foreground mt-1">
                All hostels listed here are manually verified and committed to
                non-discrimination, privacy, and safety for transgender residents.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="p-6 bg-purple-50 border-purple-200">
              <Bed className="w-6 h-6 text-purple-600 mb-3" />
              <h3 className="font-semibold text-lg">Room Options</h3>
              <p className="text-sm text-gray-700">
                Choose from single, double, or shared rooms based on your comfort and budget.
              </p>
            </Card>

            <Card className="p-6 bg-pink-50 border-pink-200">
              <Shield className="w-6 h-6 text-pink-600 mb-3" />
              <h3 className="font-semibold text-lg">Safety First</h3>
              <p className="text-sm text-gray-700">
                CCTV, 24/7 security, ID verification, and zero-tolerance policies for abuse.
              </p>
            </Card>

            <Card className="p-6 bg-blue-50 border-blue-200">
              <Users className="w-6 h-6 text-blue-600 mb-3" />
              <h3 className="font-semibold text-lg">Inclusive Community</h3>
              <p className="text-sm text-gray-700">
                Stay with people who understand and respect your identity.
              </p>
            </Card>

            <Card className="p-6 bg-green-50 border-green-200">
              <HeartHandshake className="w-6 h-6 text-green-600 mb-3" />
              <h3 className="font-semibold text-lg">Support Network</h3>
              <p className="text-sm text-gray-700">
                Many hostels are partnered with NGOs and community groups for extra support.
              </p>
            </Card>
          </div>
        </Card>

        {/* Search Bar */}
        <div className="flex items-center gap-3 border bg-white p-4 rounded-xl shadow-sm">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by hostel name, city, or type (e.g., women, shared)..."
            className="w-full text-sm outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Hostels List */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold">Available Hostels</h2>

          {filteredHostels.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm">
              No hostels found for this search. Try a different city or keyword.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredHostels.map((h) => (
                <Card
                  key={h.id}
                  className="p-6 border bg-white shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold">{h.name}</h3>
                        {h.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                            <ShieldCheck className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{h.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {h.city} {h.distance ? `• ${h.distance}` : ""}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs px-2 py-1 bg-yellow-50 text-yellow-700 rounded-full flex items-center justify-end gap-1">
                        <Star className="w-3 h-3" />
                        {h.rating.toFixed(1)}
                      </span>
                      <p className="text-sm mt-2 font-semibold text-emerald-600">
                        {h.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span className="text-sm">{h.address}</span>
                  </div>

                  {/* Facilities */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {h.facilities.map((f, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-1 bg-purple-50 border border-purple-200 rounded-full text-purple-700"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Room Types */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    <DoorOpen className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs text-muted-foreground">
                      Room Types:
                    </span>
                    {h.roomTypes.map((rt, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-1 bg-indigo-50 border border-indigo-200 rounded-full text-indigo-700"
                      >
                        {rt}
                      </span>
                    ))}
                  </div>

                  {/* Rules (small preview) */}
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-gray-700">House Rules:</p>
                    <ul className="mt-1 text-[11px] text-gray-600 list-disc list-inside space-y-0.5">
                      {h.rules.slice(0, 3).map((rule, i) => (
                        <li key={i}>{rule}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact Info */}
                  <div className="flex items-center gap-2 mt-3">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{h.phone}</span>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      className="w-full text-xs flex items-center justify-center gap-1"
                      onClick={() => handleCall(h.phone)}
                    >
                      <Phone className="w-3 h-3" />
                      Call Now
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full text-xs flex items-center justify-center gap-1"
                      onClick={() => handleWhatsApp(h.whatsapp)}
                    >
                      💬 WhatsApp
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full text-xs flex items-center justify-center gap-1"
                      onClick={() => handleDirections(h.mapLink)}
                    >
                      <MapPin className="w-3 h-3" />
                      Get Directions
                    </Button>
                  </div>

                  <Button
                    className={`w-full mt-4 bg-gradient-to-r ${gradientColor} text-white text-sm`}
                    onClick={() => openBookingModal(h)}
                  >
                    Request Booking / Enquiry
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Note */}
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-600 rounded text-sm">
          ⚠️ <b>Note:</b> Hostels listed here are community-verified, but conditions may
          change. Always call the hostel, confirm rules, and visit in person before
          finalizing your stay.
        </div>
      </div>

      {/* Booking / Enquiry Modal */}
      {isBookingOpen && selectedHostel && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full mx-4 shadow-xl p-6 relative">
            <button
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground text-xs"
              onClick={closeBookingModal}
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-2">
              Booking Enquiry – {selectedHostel.name}
            </h2>
            <p className="text-xs text-muted-foreground mb-4">
              Your details will be shared with the hostel owner/manager. They will
              contact you to confirm availability and next steps.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold">Full Name*</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded-lg bg-white text-sm mt-1"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold">Phone Number*</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded-lg bg-white text-sm mt-1"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 ..."
                />
              </div>

              <div>
                <label className="text-xs font-semibold">Expected Move-in Date*</label>
                <input
                  type="date"
                  className="w-full border px-3 py-2 rounded-lg bg-white text-sm mt-1"
                  value={moveInDate}
                  onChange={(e) => setMoveInDate(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold">Preferred Room Type*</label>
                <select
                  className="w-full border px-3 py-2 rounded-lg bg-white text-sm mt-1"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                >
                  <option value="">Select one</option>
                  {selectedHostel.roomTypes.map((rt, i) => (
                    <option key={i} value={rt}>
                      {rt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold">Additional Notes</label>
                <textarea
                  className="w-full border px-3 py-2 rounded-lg bg-white text-sm mt-1"
                  rows={3}
                  placeholder="Any specific needs? (e.g., privacy, floor preference, medical condition, etc.)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>

            <Button
              className={`w-full mt-4 bg-gradient-to-r ${gradientColor} text-white text-sm`}
              disabled={submitting}
              onClick={handleBookingSubmit}
            >
              {submitting ? "Sending Enquiry..." : "Send Booking Enquiry"}
            </Button>

            <p className="text-[10px] text-muted-foreground mt-2">
              By submitting, you agree that the hostel can contact you using the
              provided phone number. TransEmpower only facilitates the connection and
              is not responsible for hostel management.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hostels;
