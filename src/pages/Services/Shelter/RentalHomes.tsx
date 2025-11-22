import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Home,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
  Star,
  BedDouble,
  Ruler,
  Wallet,
  MessageCircle,
  CalendarClock,
  DoorOpen,
  Info,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const gradientColor = "from-purple-500 to-purple-400";


interface RentalHome {
  id: number;
  name: string;
  city: string;
  area: string;
  type: "Private Apartment" | "Shared Home" | "Studio";
  bhk: string; // "1RK", "1BHK", etc.
  rentRange: string; // "₹7,000 – ₹10,000 / month"
  minRent: number;
  rating: number;
  distance: string;
  furnished: "Fully Furnished" | "Semi-Furnished" | "Unfurnished";
  landlordName: string;
  landlordType: "Individual" | "NGO Partner" | "Housing Collective";
  phone: string;
  whatsapp: string;
  verified: boolean;
  genderPreference: "Trans women" | "Trans men" | "All transgender persons";
  availabilityFrom: string;
  amenities: string[];
  rules: string[];
  landmark: string;
}

const rentalHomes: RentalHome[] = [
  {
    id: 1,
    name: "Rainbow Residency",
    city: "Chennai",
    area: "Velachery",
    type: "Private Apartment",
    bhk: "2BHK",
    rentRange: "₹9,000 – ₹12,000 / month",
    minRent: 9000,
    rating: 4.8,
    distance: "1.2 km from Velachery Railway Station",
    furnished: "Fully Furnished",
    landlordName: "Priya Housing",
    landlordType: "NGO Partner",
    phone: "98765 43210",
    whatsapp: "9876543210",
    verified: true,
    genderPreference: "All transgender persons",
    availabilityFrom: "1 Dec 2025",
    amenities: ["Wi-Fi", "Separate Kitchen", "Attached Bathroom", "Washing Machine", "Fridge", "Parking"],
    rules: ["No harassment / transphobia", "Respect roommates’ privacy", "Visitors allowed till 9 PM"],
    landmark: "Near Phoenix Market City",
  },
  {
    id: 2,
    name: "Pride Villa Shared Home",
    city: "Bengaluru",
    area: "BTM Layout",
    type: "Shared Home",
    bhk: "3BHK (Room Sharing)",
    rentRange: "₹6,000 – ₹8,000 / month",
    minRent: 6000,
    rating: 4.7,
    distance: "900 m from BTM Bus Stop",
    furnished: "Semi-Furnished",
    landlordName: "Mr. Arjun",
    landlordType: "Individual",
    phone: "90909 60606",
    whatsapp: "9090960606",
    verified: true,
    genderPreference: "Trans women",
    availabilityFrom: "Available Immediately",
    amenities: ["High-speed Wi-Fi", "Common Hall", "Shared Kitchen", "CCTV", "Daily Cleaning"],
    rules: ["No alcohol / drugs inside", "Noise control after 10 PM", "ID proof mandatory"],
    landmark: "Near Silk Board Junction",
  },
  {
    id: 3,
    name: "SafeSpace Studio Homes",
    city: "Coimbatore",
    area: "RS Puram",
    type: "Studio",
    bhk: "1RK",
    rentRange: "₹5,500 – ₹7,000 / month",
    minRent: 5500,
    rating: 4.6,
    distance: "2.0 km from Gandhipuram",
    furnished: "Fully Furnished",
    landlordName: "SafeSpace Trust",
    landlordType: "NGO Partner",
    phone: "91234 56789",
    whatsapp: "9123456789",
    verified: true,
    genderPreference: "Trans men",
    availabilityFrom: "15 Dec 2025",
    amenities: ["Single Room", "Attached Bathroom", "Bed & Wardrobe", "Mini Kitchen", "Secure Entry"],
    rules: ["No violence / abuse", "Rent due before 5th", "No subletting"],
    landmark: "Near RS Puram Signal",
  },
];

const RentalHomes = () => {
  const navigate = useNavigate();

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [budgetFilter, setBudgetFilter] = useState("all");

  // Visit request modal state
  const [selectedHome, setSelectedHome] = useState<RentalHome | null>(null);
  const [visitName, setVisitName] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [visitMessage, setVisitMessage] = useState("");
  const [sendingRequest, setSendingRequest] = useState(false);

  const filteredHomes = rentalHomes.filter((home) => {
    const matchesSearch =
      home.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      home.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      home.area.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCity =
      cityFilter === "all" || home.city.toLowerCase() === cityFilter.toLowerCase();

    const matchesType =
      typeFilter === "all" || home.type.toLowerCase() === typeFilter.toLowerCase();

    let matchesBudget = true;
    if (budgetFilter === "lt7000") matchesBudget = home.minRent < 7000;
    if (budgetFilter === "7to10") matchesBudget = home.minRent >= 7000 && home.minRent <= 10000;
    if (budgetFilter === "gt10000") matchesBudget = home.minRent > 10000;

    return matchesSearch && matchesCity && matchesType && matchesBudget;
  });

  const openVisitModal = (home: RentalHome) => {
    setSelectedHome(home);
    setVisitName(localStorage.getItem("name") || "");
    setVisitDate("");
    setVisitTime("");
    setVisitMessage("");
  };

  const closeVisitModal = () => {
    setSelectedHome(null);
    setSendingRequest(false);
  };

  const handleVisitRequest = () => {
    if (!selectedHome || !visitName || !visitDate || !visitTime) {
      alert("Please fill your name, date and time for the visit.");
      return;
    }

    setSendingRequest(true);

    // Demo only – just show alert
    setTimeout(() => {
      alert(
        `Visit request sent to ${selectedHome.landlordName} for ${visitDate} at ${visitTime}. (Demo only)`
      );
      setSendingRequest(false);
      closeVisitModal();
    }, 1200);
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = (phone: string) => {
    const message = encodeURIComponent(
      "Hello, I am interested in your rental home listed on TransEmpower Shelter+. Can we talk?"
    );
    window.open(`https://wa.me/91${phone}?text=${message}`, "_blank");
  };

  return (
    <div className="bg-muted/20 min-h-screen">
      <Navigation />

      {/* Top bar with Back */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
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
        <h1 className="text-5xl font-bold mb-4">Trans-Friendly Rental Homes</h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          Verified landlords, respectful neighbours, and safe rental spaces designed
          for transgender and gender-diverse individuals.
        </p>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Overview */}
        <Card className="p-10 bg-white border shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <div
              className={`p-4 rounded-xl text-white bg-gradient-to-r ${gradientColor}`}
            >
              <Home className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Homes That Respect Your Identity</h2>
              <p className="text-muted-foreground mt-1">
                Each listing is manually screened for trans-friendliness, basic safety,
                and landlord sensitivity to gender diversity.
              </p>
            </div>
          </div>

          {/* Feature row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="p-6 bg-purple-50 border-purple-200">
              <ShieldCheck className="w-6 h-6 text-purple-600 mb-3" />
              <h3 className="font-semibold text-lg">Verified Landlords</h3>
              <p className="text-sm text-gray-700">
                Community-endorsed or NGO-partnered owners to reduce bias and harassment.
              </p>
            </Card>

            <Card className="p-6 bg-pink-50 border-pink-200">
              <BedDouble className="w-6 h-6 text-pink-600 mb-3" />
              <h3 className="font-semibold text-lg">Private & Shared Options</h3>
              <p className="text-sm text-gray-700">
                1RK, 1BHK, 2BHK rooms and shared homes based on your comfort and budget.
              </p>
            </Card>

            <Card className="p-6 bg-blue-50 border-blue-200">
              <Wallet className="w-6 h-6 text-blue-600 mb-3" />
              <h3 className="font-semibold text-lg">Transparent Pricing</h3>
              <p className="text-sm text-gray-700">
                Clear rent ranges, no hidden charges added from the platform side.
              </p>
            </Card>

            <Card className="p-6 bg-green-50 border-green-200">
              <Users className="w-6 h-6 text-green-600 mb-3" />
              <h3 className="font-semibold text-lg">Inclusive Neighbours</h3>
              <p className="text-sm text-gray-700">
                Properties where transgender tenants are welcomed—not tolerated.
              </p>
            </Card>
          </div>
        </Card>

        {/* Search + Filters */}
        <section className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3 bg-white border rounded-xl px-4 py-3 shadow-sm w-full md:w-1/2">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by area, city, or property name..."
                className="w-full text-sm outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-3">
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
                <option value="Private Apartment">Private Apartments</option>
                <option value="Shared Home">Shared Homes</option>
                <option value="Studio">Studios</option>
              </select>

              <select
                className="border rounded-lg bg-white px-3 py-2 text-xs"
                value={budgetFilter}
                onChange={(e) => setBudgetFilter(e.target.value)}
              >
                <option value="all">Any Budget</option>
                <option value="lt7000">Below ₹7,000</option>
                <option value="7to10">₹7,000 – ₹10,000</option>
                <option value="gt10000">Above ₹10,000</option>
              </select>
            </div>
          </div>
        </section>

        {/* Property Listings */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Available Rental Homes</h2>

          {filteredHomes.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm">
              No rental homes match your filters right now.
            </p>
          ) : (
            <div className="space-y-6">
              {filteredHomes.map((home) => (
                <Card
                  key={home.id}
                  className="p-6 bg-white border shadow-sm hover:shadow-lg transition"
                >
                  {/* Top row: Title + tags */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <div>
                      <h3 className="text-2xl font-bold flex items-center gap-2">
                        {home.name}
                        {home.verified && (
                          <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <ShieldCheck className="w-3 h-3 inline mr-1" />
                            Verified
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {home.type} • {home.bhk} • {home.furnished}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-sm">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span>
                          {home.area}, {home.city} • {home.distance}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Landmark: {home.landmark}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-semibold text-emerald-700">
                        {home.rentRange}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Gender Preference: <b>{home.genderPreference}</b>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Available from: <b>{home.availabilityFrom}</b>
                      </p>
                      <div className="flex items-center justify-end gap-1 text-yellow-500 mt-2 text-sm">
                        <Star className="w-4 h-4" />
                        <span>{home.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Amenities & Rules */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <BedDouble className="w-4 h-4 text-purple-600" />
                        <h4 className="text-sm font-semibold">Key Amenities</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {home.amenities.map((a, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <DoorOpen className="w-4 h-4 text-indigo-600" />
                        <h4 className="text-sm font-semibold">House Rules</h4>
                      </div>
                      <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
                        {home.rules.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Landlord & Actions */}
                  <div className="mt-5 border-t pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="text-sm">
                      <p className="font-semibold flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-600" />
                        Landlord / Host: {home.landlordName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Type: {home.landlordType}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-sm">
                        <Phone className="w-4 h-4 text-green-600" />
                        <span>{home.phone}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 text-xs"
                        onClick={() => handleCall(home.phone)}
                      >
                        <Phone className="w-4 h-4" />
                        Call Owner
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 text-xs"
                        onClick={() => handleWhatsApp(home.whatsapp)}
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </Button>

                      <Button
                        size="sm"
                        className={`flex items-center gap-2 text-xs bg-gradient-to-r ${gradientColor} text-white`}
                        onClick={() => openVisitModal(home)}
                      >
                        <CalendarClock className="w-4 h-4" />
                        Request Visit
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Info / Disclaimer */}
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-700 rounded text-sm flex gap-3">
          <Info className="w-5 h-5 text-yellow-700 mt-0.5" />
          <p className="text-gray-800">
            <b>Note:</b> Rental homes listed are based on community and NGO inputs.
            Always verify documents (rental agreement, ID proof) and visit the
            property in person before making any payments.
          </p>
        </div>
      </div>

      {/* Visit Request Modal */}
      {selectedHome && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full mx-4 shadow-xl p-6 relative">
            <button
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground text-sm"
              onClick={closeVisitModal}
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-1">Request a Property Visit</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Your visit request will be shared with the landlord for confirmation
              (demo only — backend integration can be added later).
            </p>

            <Card className="p-3 bg-purple-50 border-purple-200 mb-4">
              <p className="text-sm font-semibold">{selectedHome.name}</p>
              <p className="text-xs text-muted-foreground">
                {selectedHome.area}, {selectedHome.city} • {selectedHome.rentRange}
              </p>
            </Card>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold">Your Name</label>
                <input
                  type="text"
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-white"
                  value={visitName}
                  onChange={(e) => setVisitName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-white"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold">Preferred Time</label>
                  <input
                    type="time"
                    className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-white"
                    value={visitTime}
                    onChange={(e) => setVisitTime(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold">Message (Optional)</label>
                <textarea
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-xs bg-white"
                  rows={3}
                  placeholder="Share any specific needs (ground floor, nearby bus stop, privacy, etc.)"
                  value={visitMessage}
                  onChange={(e) => setVisitMessage(e.target.value)}
                />
              </div>

              <Button
                className={`w-full bg-gradient-to-r ${gradientColor} text-white py-2 text-sm mt-2`}
                disabled={sendingRequest}
                onClick={handleVisitRequest}
              >
                {sendingRequest ? "Sending Request..." : "Submit Visit Request"}
              </Button>

              <p className="text-[10px] text-muted-foreground mt-2">
                Your contact details are only shared with this property’s landlord.
                Always avoid sending advance payments without proper agreement.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalHomes;
