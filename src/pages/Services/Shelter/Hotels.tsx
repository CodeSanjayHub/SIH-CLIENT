import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Hotel,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Wallet,
  Sparkles,
  BedDouble,
  Wifi,
  Coffee,
  ShowerHead,
  Search,
  MessageCircle,
  CalendarClock,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const gradientColor = "from-purple-500 to-purple-400";


interface HotelType {
  id: number;
  name: string;
  city: string;
  area: string;
  price: string;
  minPrice: number;
  rating: number;
  distance: string;
  phone: string;
  whatsapp: string;
  verified: boolean;
  type: "Budget" | "Premium";
  facilities: string[];
  landmark: string;
  availableFrom: string;
}

const hotels: HotelType[] = [
  {
  id: 1,
  name: "PrideSafe Budget Inn",
  city: "Chennai",
  area: "T Nagar",
  price: "₹1,200 / day",
  minPrice: 1200,
  rating: 4.7,
  distance: "700m from T Nagar Bus Stand",
  phone: "98765 11223",
  whatsapp: "9876511223",
  verified: true,
  type: "Budget",
  facilities: ["Wi-Fi", "AC Room", "Attached Bathroom", "24/7 Support"],
  landmark: "Near Pothys Mall",
  availableFrom: "Available Today",
},
{
  id: 2,
  name: "BlueWave Premium Suites",
  city: "Bengaluru",
  area: "Indiranagar",
  price: "₹2,800 / day",
  minPrice: 2800,
  rating: 4.8,
  distance: "1km from Indiranagar Metro",
  phone: "90909 33445",
  whatsapp: "9090933445",
  verified: true,
  type: "Premium",
  facilities: ["Wi-Fi", "Mini Bar", "AC Room", "Breakfast Included", "Room Service"],
  landmark: "Near Toit Brewery",
  availableFrom: "Available Today",
},
{
  id: 3,
  name: "SafeStay Transit Hotel",
  city: "Coimbatore",
  area: "Gandhipuram",
  price: "₹900 / day",
  minPrice: 900,
  rating: 4.5,
  distance: "500m from Central Bus Stand",
  phone: "91234 77889",
  whatsapp: "9123477889",
  verified: true,
  type: "Budget",
  facilities: ["Wi-Fi", "AC Room", "Hot Water", "TV"],
  landmark: "Opp. Omni Bus Stand",
  availableFrom: "Available Today",
},

];

const Hotels = () => {
  const navigate = useNavigate();

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const [budgetFilter, setBudgetFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Booking Modal
  const [selectedHotel, setSelectedHotel] = useState<HotelType | null>(null);
  const [visitorName, setVisitorName] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [sending, setSending] = useState(false);

  const filteredHotels = hotels.filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCity = cityFilter === "all" || h.city === cityFilter;

    const matchesType = typeFilter === "all" || h.type === typeFilter;

    let matchesBudget = true;
    if (budgetFilter === "lt1500") matchesBudget = h.minPrice < 1500;
    if (budgetFilter === "15to25") matchesBudget = h.minPrice >= 1500 && h.minPrice <= 2500;
    if (budgetFilter === "gt2500") matchesBudget = h.minPrice > 2500;

    return matchesSearch && matchesCity && matchesType && matchesBudget;
  });

  const openBooking = (hotel: HotelType) => {
    setSelectedHotel(hotel);
    setVisitorName(localStorage.getItem("name") || "");
    setVisitDate("");
    setVisitTime("");
  };

  const closeBooking = () => {
    setSelectedHotel(null);
    setSending(false);
  };

  const handleBooking = () => {
    if (!visitorName || !visitDate || !visitTime) {
      alert("Please fill all booking details.");
      return;
    }

    setSending(true);

    setTimeout(() => {
      alert(`Booking request sent to ${selectedHotel?.name} (Demo Only).`);
      closeBooking();
    }, 1200);
  };

  // Call & WhatsApp
  const callHotel = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };
  const whatsAppHotel = (phone: string) => {
    const message = encodeURIComponent(
      "Hello, I am inquiring about your hotel listed on TransEmpower Shelter+. Can you assist me?"
    );
    window.open(`https://wa.me/91${phone}?text=${message}`, "_blank");
  };

  return (
    <div className="bg-muted/20 min-h-screen">
      <Navigation />

      {/* Back */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button onClick={() => navigate("/services")} className="flex items-center text-primary">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
          </button>
        </div>
      </div>

      {/* Banner */}
      <section className={`py-20 bg-gradient-to-r ${gradientColor} text-white text-center`}>
        <h1 className="text-5xl font-bold mb-4">Trans-Friendly Hotels</h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          Safe, inclusive, and verified short-stay hotels for transgender individuals.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Overview */}
        <Card className="p-10 bg-white border shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className={`p-4 rounded-xl bg-gradient-to-r ${gradientColor} text-white`}>
              <Hotel className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-3xl font-bold">Safe Stays for Short Visits</h2>
              <p className="text-muted-foreground mt-1">
                Inclusive hotels that welcome transgender guests without judgment.
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="p-6 bg-blue-50 border-blue-200">
              <ShieldCheck className="w-6 h-6 text-blue-600 mb-3" />
              <h3 className="font-semibold text-lg">Verified Listings</h3>
              <p className="text-sm text-gray-700">Manually checked for safety & inclusivity.</p>
            </Card>

            <Card className="p-6 bg-purple-50 border-purple-200">
              <Wallet className="w-6 h-6 text-purple-600 mb-3" />
              <h3 className="font-semibold text-lg">Budget & Premium</h3>
              <p className="text-sm text-gray-700">Choose hotels that fit your budget.</p>
            </Card>

            <Card className="p-6 bg-pink-50 border-pink-200">
              <Sparkles className="w-6 h-6 text-pink-600 mb-3" />
              <h3 className="font-semibold text-lg">Gender-Neutral Support</h3>
              <p className="text-sm text-gray-700">Respectful staff trained for trans safety.</p>
            </Card>

            <Card className="p-6 bg-green-50 border-green-200">
              <BedDouble className="w-6 h-6 text-green-600 mb-3" />
              <h3 className="font-semibold text-lg">Comfortable Rooms</h3>
              <p className="text-sm text-gray-700">Clean rooms with essential facilities.</p>
            </Card>
          </div>
        </Card>

        {/* Search + Filters */}
        <section className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3 bg-white border px-4 py-3 rounded-xl shadow-sm w-full md:w-1/2">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search hotels or location..."
                className="w-full text-sm outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-3 flex-wrap">
              <select
                className="border rounded-lg bg-white px-3 py-2 text-xs"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
              >
                <option value="all">All Cities</option>
                <option value="Chennai">Chennai</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Coimbatore">Coimbatore</option>
              </select>

              <select
                className="border rounded-lg bg-white px-3 py-2 text-xs"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="Budget">Budget</option>
                <option value="Premium">Premium</option>
              </select>

              <select
                className="border rounded-lg bg-white px-3 py-2 text-xs"
                value={budgetFilter}
                onChange={(e) => setBudgetFilter(e.target.value)}
              >
                <option value="all">Any Budget</option>
                <option value="lt1500">Below ₹1,500</option>
                <option value="15to25">₹1,500 – ₹2,500</option>
                <option value="gt2500">Above ₹2,500</option>
              </select>
            </div>
          </div>
        </section>

        {/* Hotel Cards */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Available Hotels</h2>

          {filteredHotels.length === 0 ? (
            <p className="text-center text-muted-foreground">No hotels found.</p>
          ) : (
            <div className="space-y-6">
              {filteredHotels.map((h) => (
                <Card key={h.id} className="p-6 bg-white border shadow-sm hover:shadow-lg transition">
                  <div className="flex flex-col md:flex-row md:justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold flex items-center gap-2">
                        {h.name}
                        {h.verified && (
                          <span className="text-[10px] px-2 py-1 bg-green-50 border border-green-200 text-green-700 rounded-full">
                            Verified
                          </span>
                        )}
                      </h3>
                      <p className="text-muted-foreground text-sm">{h.type} Hotel</p>

                      <div className="flex items-center gap-2 mt-2 text-sm">
                        <MapPin className="w-4 h-4 text-red-500" />
                        {h.area}, {h.city}
                      </div>

                      <p className="text-xs text-muted-foreground">Landmark: {h.landmark}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-semibold text-blue-600">{h.price}</p>
                      <p className="text-xs text-muted-foreground">Available: {h.availableFrom}</p>

                      <div className="flex items-center justify-end gap-1 text-yellow-500 mt-2 text-sm">
                        <Star className="w-4 h-4" />
                        <span>{h.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Facilities */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {h.facilities.map((f, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-1 bg-blue-50 border border-blue-200 rounded-full text-blue-800"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                    <div className="text-sm">
                      <p className="font-semibold">Contact: {h.phone}</p>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => callHotel(h.phone)}
                        className="flex items-center gap-2"
                      >
                        <Phone className="w-4 h-4" /> Call
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => whatsAppHotel(h.whatsapp)}
                        className="flex items-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" /> WhatsApp
                      </Button>

                      <Button
                        size="sm"
                        className={`bg-gradient-to-r ${gradientColor} text-white flex items-center gap-2`}
                        onClick={() => openBooking(h)}
                      >
                        <CalendarClock className="w-4 h-4" /> Book Room
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Disclaimer */}
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-700 rounded text-sm">
          ⚠️ <b>Note:</b> Always confirm hotel policies before arrival. Avoid advance
          payments unless it's through a verified channel.
        </div>
      </div>

      {/* Booking Modal */}
      {selectedHotel && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl relative">
            <button className="absolute top-2 right-2" onClick={closeBooking}>
              ✕
            </button>

            <h2 className="text-xl font-bold">Book a Room</h2>
            <p className="text-xs text-muted-foreground mb-3">
              Your booking request will be shared with hotel staff (demo only).
            </p>

            <Card className="p-3 bg-blue-50 border-blue-200 mb-4">
              <p className="font-semibold text-sm">{selectedHotel.name}</p>
              <p className="text-xs text-muted-foreground">
                {selectedHotel.area}, {selectedHotel.city} • {selectedHotel.price}
              </p>
            </Card>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold">Your Name</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold">Check-in Date</label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold">Check-in Time</label>
                <input
                  type="time"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  value={visitTime}
                  onChange={(e) => setVisitTime(e.target.value)}
                />
              </div>

              <Button
                className={`w-full bg-gradient-to-r ${gradientColor} text-white py-2`}
                disabled={sending}
                onClick={handleBooking}
              >
                {sending ? "Sending..." : "Submit Request"}
              </Button>
            </div>

            <p className="text-[10px] text-muted-foreground mt-2">
              Your privacy is protected. Only hotel staff will view your request.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotels;
