import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Briefcase,
  Users,
  MapPin,
  Phone,
  Star,
  Search,
  Filter,
  Upload,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// ---------- Types ----------
interface Worker {
  id: number;
  name: string;
  mainSkill: "Tailoring" | "Culinary" | "Beauty" | "Community Support";
  services: string[];
  experience: string; // "3+ years"
  rating: number;
  phone: string;
  location: string;
  languages: string[];
  about: string;
}

interface Review {
  workerId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface Booking {
  id: number;
  workerId: number;
  workerName: string;
  service: string;
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Completed";
}

// ---------- Static Data ----------
const gradientColor = "from-teal-500 to-teal-400";

const workers: Worker[] = [
  {
    id: 1,
    name: "Priya Tailor Studio",
    mainSkill: "Tailoring",
    services: ["Blouse stitching", "Salwar & Kurti", "Pant & Shirt", "Simple alterations"],
    experience: "5+ years",
    rating: 4.8,
    phone: "+91 98765 43210",
    location: "Chennai",
    languages: ["Tamil", "English"],
    about:
      "Priya runs a small tailoring studio and is known for neat fitting and comfortable designs, especially for trans women.",
  },
  {
    id: 2,
    name: "Ravi Home Kitchen",
    mainSkill: "Culinary",
    services: ["Tiffin service", "Event cooking (small functions)", "Homemade snacks"],
    experience: "4+ years",
    rating: 4.6,
    phone: "+91 91234 56789",
    location: "Bengaluru",
    languages: ["Kannada", "Hindi", "English"],
    about:
      "Ravi prepares homely vegetarian and non-vegetarian food, and also provides lunch boxes for working people.",
  },
  {
    id: 3,
    name: "Anu Beauty Care",
    mainSkill: "Beauty",
    services: ["Hair styling", "Basic makeup", "Threading & waxing", "Skincare guidance"],
    experience: "6+ years",
    rating: 4.9,
    phone: "+91 90000 11223",
    location: "Hyderabad",
    languages: ["Telugu", "Hindi", "English"],
    about:
      "Anu is a trained beautician who offers safe, non-judgmental services especially for transgender and gender-diverse clients.",
  },
  {
    id: 4,
    name: "Rainbow Community Support Group",
    mainSkill: "Community Support",
    services: ["Event volunteering", "Peer counseling", "Outreach support"],
    experience: "3+ years",
    rating: 4.7,
    phone: "+91 98888 77665",
    location: "Chennai",
    languages: ["Tamil", "English"],
    about:
      "A small collective of trans and queer folks offering community support and help for events, workshops and awareness programs.",
  },
];

// ---------- Component ----------
const SkillHunt = () => {
  const navigate = useNavigate();

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState<"all" | Worker["mainSkill"]>("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("0");

  // Modal + Booking state
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [selectedService, setSelectedService] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [extraNotes, setExtraNotes] = useState("");
  const [referenceFiles, setReferenceFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>([]);

  // Reviews
  const [reviews, setReviews] = useState<Review[]>([
    {
      workerId: 1,
      userName: "Aisha",
      rating: 5,
      comment: "Very kind and patient. Stitching was perfect and comfortable.",
      date: "2025-11-10",
    },
    {
      workerId: 3,
      userName: "Karan",
      rating: 4,
      comment: "Felt safe and respected. Makeup and hair were really good.",
      date: "2025-11-12",
    },
  ]);

  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");

  // ---------- Derived filtered list ----------
  const filteredWorkers = useMemo(() => {
    return workers.filter((w) => {
      const matchesSearch =
        w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.mainSkill.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSkill =
        skillFilter === "all" || w.mainSkill === skillFilter;

      const matchesLocation =
        locationFilter === "all" ||
        w.location.toLowerCase() === locationFilter.toLowerCase();

      const matchesRating =
        parseFloat(ratingFilter) === 0 || w.rating >= parseFloat(ratingFilter);

      return matchesSearch && matchesSkill && matchesLocation && matchesRating;
    });
  }, [searchTerm, skillFilter, locationFilter, ratingFilter]);

  // ---------- Booking handlers ----------
  const openWorkerProfile = (w: Worker) => {
    setSelectedWorker(w);
    setSelectedService("");
    setBookingDate("");
    setBookingTime("");
    setExtraNotes("");
    setReferenceFiles(null);
  };

  const closeWorkerProfile = () => {
    setSelectedWorker(null);
  };

  const handleBooking = () => {
    if (!selectedWorker) return;

    if (!selectedService || !bookingDate || !bookingTime) {
      alert("Please choose service, date and time before booking.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const newBooking: Booking = {
        id: bookings.length + 1,
        workerId: selectedWorker.id,
        workerName: selectedWorker.name,
        service: selectedService,
        date: bookingDate,
        time: bookingTime,
        status: "Pending",
      };

      setBookings((prev) => [...prev, newBooking]);
      setLoading(false);
      alert("Your booking request has been submitted! (demo)");
    }, 800);
  };

  // ---------- Reviews handlers ----------
  const getWorkerReviews = (id: number) =>
    reviews.filter((r) => r.workerId === id);

  const handleAddReview = () => {
    if (!selectedWorker || !newReviewComment.trim()) {
      alert("Please write a review before submitting.");
      return;
    }

    const newRev: Review = {
      workerId: selectedWorker.id,
      userName: localStorage.getItem("name") || "Anonymous user",
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      date: new Date().toISOString().slice(0, 10),
    };

    setReviews((prev) => [...prev, newRev]);
    setNewReviewComment("");
    setNewReviewRating(5);
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
        <h1 className="text-5xl font-bold mb-4">Skill Hunt</h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          Find skilled transgender individuals for tailoring, cooking, beauty
          services and community support – with clear details and easy booking.
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
              <Users className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-3xl font-bold">Skill-Based Opportunities</h2>
              <p className="text-muted-foreground mt-1">
                Connect directly with skilled community members and support
                dignified, skill-based employment instead of unsafe or exploitative
                work.
              </p>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 bg-teal-50 border-teal-200">
              <h3 className="text-lg font-bold mb-3">Tailoring & Fashion</h3>
              <p className="text-sm text-gray-700">
                Blouses, kurtis, alterations and trans-friendly fitting services.
              </p>
            </Card>

            <Card className="p-6 bg-sky-50 border-sky-200">
              <h3 className="text-lg font-bold mb-3">Home Food & Catering</h3>
              <p className="text-sm text-gray-700">
                Tiffin services, small event cooking and homely meals.
              </p>
            </Card>

            <Card className="p-6 bg-emerald-50 border-emerald-200">
              <h3 className="text-lg font-bold mb-3">Beauty & Community Care</h3>
              <p className="text-sm text-gray-700">
                Salon services, grooming, makeup and community event support.
              </p>
            </Card>
          </div>
        </Card>

        {/* Filters + Directory */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="flex items-center gap-2 w-full md:w-1/2">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search name, skill or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border px-4 py-3 rounded-lg bg-white text-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>

              <select
                className="border px-3 py-2 rounded-lg bg-white text-xs"
                value={skillFilter}
                onChange={(e) =>
                  setSkillFilter(e.target.value as typeof skillFilter)
                }
              >
                <option value="all">All Skills</option>
                <option value="Tailoring">Tailoring</option>
                <option value="Culinary">Culinary</option>
                <option value="Beauty">Beauty</option>
                <option value="Community Support">Community Support</option>
              </select>

              <select
                className="border px-3 py-2 rounded-lg bg-white text-xs"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="all">All Locations</option>
                <option value="Chennai">Chennai</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>

              <select
                className="border px-3 py-2 rounded-lg bg-white text-xs"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
              >
                <option value="0">Any Rating</option>
                <option value="4">4★ & above</option>
                <option value="4.5">4.5★ & above</option>
              </select>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mt-8">
            Community Skill Directory
          </h2>

          {filteredWorkers.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm">
              No profiles match the selected filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredWorkers.map((w) => (
                <Card
                  key={w.id}
                  className="p-6 shadow-sm border bg-white hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                  onClick={() => openWorkerProfile(w)}
                >
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-xl font-bold">{w.name}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                        {w.mainSkill}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground mb-2">
                      {w.experience} experience
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span className="text-sm">{w.location}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{w.phone}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-2 text-yellow-600">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {w.rating.toFixed(1)} / 5
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {w.services.map((s) => (
                        <span
                          key={s}
                          className="text-[10px] px-2 py-1 rounded-full bg-blue-50 text-blue-700"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button
                    className={`mt-4 w-full bg-gradient-to-r ${gradientColor} text-white py-2 text-sm`}
                  >
                    View Profile & Book
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Optional: Simple bookings list (for user) */}
        {bookings.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">My Bookings (Demo)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookings.map((b) => (
                <Card key={b.id} className="p-4 bg-white border text-sm">
                  <p className="font-semibold">{b.workerName}</p>
                  <p className="text-xs text-muted-foreground mb-1">
                    {b.service}
                  </p>
                  <p>
                    📅 {b.date} · 🕒 {b.time}
                  </p>
                  <p className="text-xs mt-1">
                    Status:{" "}
                    <span className="font-semibold text-amber-700">
                      {b.status}
                    </span>
                  </p>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Disclaimer */}
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-600 rounded text-sm">
          ⚠️ <b>Disclaimer:</b> Skill Hunt connects you with skilled community
          members for services. Always discuss pricing, safety and timings clearly
          on call/WhatsApp before confirming any work.
        </div>
      </div>

      {/* Worker Profile + Booking Modal */}
      {selectedWorker && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-3xl w-full mx-4 shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
              onClick={closeWorkerProfile}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${gradientColor} text-white`}
              >
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{selectedWorker.name}</h2>
                <p className="text-sm">
                  {selectedWorker.mainSkill} · {selectedWorker.experience}
                </p>
              </div>
            </div>

            {/* Meta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>{selectedWorker.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-600" />
                <span>{selectedWorker.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span>Languages: {selectedWorker.languages.join(", ")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-600" />
                <span>{selectedWorker.rating.toFixed(1)} / 5</span>
              </div>
            </div>

            {/* Split layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* LEFT: About + services + reviews */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">About</h3>
                  <p className="text-sm mt-1">{selectedWorker.about}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Services Offered</h3>
                  <ul className="list-disc ml-5 text-sm mt-1 space-y-1">
                    {selectedWorker.services.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>

                {/* Reviews */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Ratings & Reviews</h3>
                  <div className="max-h-32 overflow-y-auto border rounded-lg p-2 bg-muted/40 space-y-2">
                    {getWorkerReviews(selectedWorker.id).length === 0 ? (
                      <p className="text-xs text-muted-foreground">
                        No reviews yet. Be the first to share your experience.
                      </p>
                    ) : (
                      getWorkerReviews(selectedWorker.id).map((rev, idx) => (
                        <Card
                          key={idx}
                          className="bg-white rounded-lg p-2 shadow-sm text-xs"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">{rev.userName}</span>
                            <span className="text-yellow-600 flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              {rev.rating.toFixed(1)}
                            </span>
                          </div>
                          <p className="mt-1">{rev.comment}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">
                            {rev.date}
                          </p>
                        </Card>
                      ))
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold">Add Your Review</label>
                    <select
                      className="w-full border px-3 py-2 rounded-lg bg-white text-xs"
                      value={newReviewRating}
                      onChange={(e) =>
                        setNewReviewRating(Number(e.target.value))
                      }
                    >
                      <option value={5}>5 ★ - Excellent</option>
                      <option value={4}>4 ★ - Good</option>
                      <option value={3}>3 ★ - Average</option>
                      <option value={2}>2 ★ - Poor</option>
                      <option value={1}>1 ★ - Very Poor</option>
                    </select>
                    <textarea
                      className="w-full border px-3 py-2 rounded-lg bg-white text-xs"
                      rows={3}
                      placeholder="Share your experience (respectful feedback only)..."
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                      onClick={handleAddReview}
                    >
                      Submit Review
                    </Button>
                  </div>
                </div>
              </div>

              {/* RIGHT: Booking form */}
              <div className="space-y-3 border rounded-xl p-4 bg-muted/40">
                <h3 className="text-lg font-semibold mb-1">Book Service</h3>

                <div>
                  <label className="text-xs font-semibold">Select Service</label>
                  <select
                    className="w-full border px-3 py-2 rounded-lg bg-white text-sm mt-1"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                  >
                    <option value="">Choose a service</option>
                    {selectedWorker.services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full border px-3 py-2 rounded-lg bg-white text-sm mt-1"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold">Preferred Time</label>
                  <input
                    type="time"
                    className="w-full border px-3 py-2 rounded-lg bg-white text-sm mt-1"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold">
                    Extra Notes (Optional)
                  </label>
                  <textarea
                    className="w-full border px-3 py-2 rounded-lg bg-white text-xs mt-1"
                    rows={3}
                    placeholder="e.g. Body measurements, food type, event details..."
                    value={extraNotes}
                    onChange={(e) => setExtraNotes(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold">
                    Upload Reference Photos (Optional)
                  </label>
                  <div className="flex items-center gap-3 border rounded-lg p-2 bg-white mt-1">
                    <Upload className="w-5 h-5 text-primary" />
                    <input
                      type="file"
                      multiple
                      onChange={(e) => setReferenceFiles(e.target.files)}
                      className="text-xs"
                    />
                  </div>
                </div>

                <Button
                  className={`w-full bg-gradient-to-r ${gradientColor} text-white py-2 text-sm`}
                  disabled={loading}
                  onClick={handleBooking}
                >
                  {loading ? "Sending Request..." : "Confirm Booking Request"}
                </Button>

                <p className="text-[10px] text-muted-foreground mt-1">
                  This is a demo flow. In real integration, your request can be
                  sent to the worker via SMS / WhatsApp / dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillHunt;
