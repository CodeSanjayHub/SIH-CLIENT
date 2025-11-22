import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  ArrowLeft,
  Phone,
  MapPin,
  Star,
  Upload,
  Search,
  Filter,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { moduleColors } from "../ServicesData";
import { useNavigate } from "react-router-dom";

// Types
interface Counselor {
  id: number;
  name: string;
  speciality: string;
  experience: string; // "8+ years"
  rating: number;
  phone: string;
  location: string;
  mode: "Online" | "In-person" | "Hybrid";
  tags: string[];
}

interface Review {
  counselorId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

const HealWell = () => {
  const navigate = useNavigate();
  const gradientColor = moduleColors["health"];

  // Booking state (inside modal)
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(
    null
  );
  const [sessionDate, setSessionDate] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [documents, setDocuments] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  // Filters & search
  const [searchTerm, setSearchTerm] = useState("");
  const [specialityFilter, setSpecialityFilter] = useState("all");
  const [modeFilter, setModeFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("0");

  // Modal UI
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Mock counselor data
  const counselorList: Counselor[] = [
    {
      id: 1,
      name: "Dr. Anjali Rao",
      speciality: "Clinical Psychologist – Gender Dysphoria & Trauma",
      experience: "8+ years",
      rating: 4.9,
      phone: "98765 43210",
      location: "Chennai · Online",
      mode: "Hybrid",
      tags: ["Trauma", "Gender Dysphoria", "Depression"],
    },
    {
      id: 2,
      name: "Dr. Naveen Kumar",
      speciality: "Trauma & Post-Surgery Adjustment Specialist",
      experience: "10+ years",
      rating: 4.8,
      phone: "98888 77665",
      location: "Bengaluru · In-clinic",
      mode: "In-person",
      tags: ["Post-surgery", "Family Counselling"],
    },
    {
      id: 3,
      name: "Priya Sharma",
      speciality: "LGBTQIA+ Affirmative Therapist",
      experience: "6+ years",
      rating: 4.7,
      phone: "91234 56789",
      location: "Delhi · Online",
      mode: "Online",
      tags: ["LGBTQIA+", "Anxiety", "Relationship"],
    },
    {
      id: 4,
      name: "Rahul Mehta",
      speciality: "Post-Surgery Emotional Support & Peer Healing",
      experience: "5+ years",
      rating: 4.6,
      phone: "90123 45678",
      location: "Mumbai · Hybrid",
      mode: "Hybrid",
      tags: ["Post-surgery", "Body Image"],
    },
  ];

  // Reviews
  const [reviews, setReviews] = useState<Review[]>([
    {
      counselorId: 1,
      userName: "Aisha",
      rating: 5,
      comment: "She listened without judgement and helped me process dysphoria.",
      date: "2025-11-10",
    },
    {
      counselorId: 3,
      userName: "Karan",
      rating: 4,
      comment: "Very understanding about identity & family pressure.",
      date: "2025-11-12",
    },
  ]);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");

  // ---- FILTERED LIST ----
  const filteredCounselors = useMemo(() => {
    return counselorList.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpeciality =
        specialityFilter === "all" ||
        c.speciality.toLowerCase().includes(specialityFilter.toLowerCase()) ||
        c.tags.some((t) =>
          t.toLowerCase().includes(specialityFilter.toLowerCase())
        );

      const matchesMode =
        modeFilter === "all" || c.mode.toLowerCase() === modeFilter.toLowerCase();

      const matchesRating =
        parseFloat(ratingFilter) === 0 ||
        c.rating >= parseFloat(ratingFilter);

      return matchesSearch && matchesSpeciality && matchesMode && matchesRating;
    });
  }, [counselorList, searchTerm, specialityFilter, modeFilter, ratingFilter]);

  // ---- MODAL HANDLERS ----
  const openCounselorProfile = (c: Counselor) => {
    setSelectedCounselor(c);
    setSessionDate("");
    setSessionTime("");
    setDocuments(null);
    setIsProfileOpen(true);
  };

  const closeCounselorProfile = () => {
    setIsProfileOpen(false);
    setSelectedCounselor(null);
    setSessionDate("");
    setSessionTime("");
    setDocuments(null);
  };

  // ---- BOOKING ----
  const handleBooking = async () => {
    if (!selectedCounselor || !sessionDate || !sessionTime) {
      alert("Please choose date & time to book.");
      return;
    }

    setLoading(true);

    const form = new FormData();
    form.append("userId", localStorage.getItem("userId") || "demo-user");
    form.append("counselor", selectedCounselor.name);
    form.append("date", sessionDate);
    form.append("time", sessionTime);

    if (documents) {
      for (let file of documents) {
        form.append("documents", file);
      }
    }

    try {
      await fetch("http://localhost:5000/healwell/book-session", {
        method: "POST",
        body: form,
      });

      alert("Your counselling session request has been submitted!");
      closeCounselorProfile();
    } catch (err) {
      alert("Something went wrong while booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---- REVIEWS ----
  const getCounselorReviews = (id: number) =>
    reviews.filter((r) => r.counselorId === id);

  const handleAddReview = () => {
    if (!selectedCounselor || !newReviewComment.trim()) {
      alert("Please write a review before submitting.");
      return;
    }

    const newReview: Review = {
      counselorId: selectedCounselor.id,
      userName: localStorage.getItem("name") || "Anonymous user",
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      date: new Date().toISOString().slice(0, 10),
    };

    setReviews((prev) => [...prev, newReview]);
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
        <h1 className="text-5xl font-bold mb-4">HealWell Care Center</h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          Emotional, mental, and post-surgical wellness support designed for
          transgender and gender-diverse individuals.
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
              <Heart className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-3xl font-bold">Mental & Emotional Wellness</h2>
              <p className="text-muted-foreground mt-1">
                Professional counselling, emotional healing, and post-surgery support
                tailored for the transgender community.
              </p>
            </div>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 bg-red-50 border-red-200">
              <h3 className="text-lg font-bold mb-3">Mental Health Therapy</h3>
              <p className="text-sm text-gray-700">
                Work with licensed psychologists trained in gender dysphoria, anxiety,
                depression, and trauma in LGBTQIA+ lives.
              </p>
            </Card>

            <Card className="p-6 bg-purple-50 border-purple-200">
              <h3 className="text-lg font-bold mb-3">Post-Surgery Counselling</h3>
              <p className="text-sm text-gray-700">
                Emotional support after gender-affirming surgeries: recovery stress,
                body image, relationship changes, and family acceptance.
              </p>
            </Card>

            <Card className="p-6 bg-green-50 border-green-200">
              <h3 className="text-lg font-bold mb-3">Peer Support Circles</h3>
              <p className="text-sm text-gray-700">
                Join moderated peer spaces and online circles to share experiences and
                grow with others from the community.
              </p>
            </Card>
          </div>
        </Card>

        {/* Filters + Counselor Directory */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="flex items-center gap-2 w-full md:w-1/2">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search counselor, speciality or city..."
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
                value={specialityFilter}
                onChange={(e) => setSpecialityFilter(e.target.value)}
              >
                <option value="all">All Specialities</option>
                <option value="trauma">Trauma & PTSD</option>
                <option value="post-surgery">Post-surgery support</option>
                <option value="lgbtq">LGBTQIA+ therapy</option>
                <option value="anxiety">Anxiety & depression</option>
              </select>

              <select
                className="border px-3 py-2 rounded-lg bg-white text-xs"
                value={modeFilter}
                onChange={(e) => setModeFilter(e.target.value)}
              >
                <option value="all">Online & In-person</option>
                <option value="Online">Online only</option>
                <option value="In-person">In-person only</option>
                <option value="Hybrid">Hybrid</option>
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
            Verified Counselors & Therapists
          </h2>

          {filteredCounselors.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm">
              No counselors match the selected filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredCounselors.map((c) => (
                <Card
                  key={c.id}
                  className="p-6 shadow-sm border bg-white hover:shadow-md transition cursor-pointer"
                  onClick={() => openCounselorProfile(c)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{c.name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-700">
                      Verified
                    </span>
                  </div>
                  <p className="text-sm mt-1">{c.speciality}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Experience: {c.experience}
                  </p>

                  <div className="flex items-center gap-2 mt-3 text-yellow-600">
                    <Star className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {c.rating.toFixed(1)} / 5
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span className="text-sm">{c.location}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{c.phone}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-[10px] px-2 py-1 rounded-full bg-indigo-50 text-indigo-700">
                      {c.mode}
                    </span>
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-1 rounded-full bg-blue-50 text-blue-700"
                      >
                        {tag}
                      </span>
                    ))}
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

        {/* Nearby Mental Health Centers */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Nearby Mental Health Centers</h2>
          <p className="text-sm text-muted-foreground">
            These are sample centers that can be replaced with real data or integrated
            with Google Maps APIs in future.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-5 bg-white border">
              <h3 className="text-lg font-bold">Institute of Mental Health, Chennai</h3>
              <p className="text-sm mt-1 text-gray-700">
                Government facility providing psychiatric and counselling services, with
                increasing sensitization for LGBTQIA+ groups.
              </p>
            </Card>

            <Card className="p-5 bg-white border">
              <h3 className="text-lg font-bold">NIMHANS, Bengaluru</h3>
              <p className="text-sm mt-1 text-gray-700">
                National mental health institute offering specialized clinics, research,
                and counselling services.
              </p>
            </Card>

            <Card className="p-5 bg-white border">
              <h3 className="text-lg font-bold">District Counselling Center</h3>
              <p className="text-sm mt-1 text-gray-700">
                Local government counselling center available in many districts — can
                be linked with NGOs for trans-inclusive services.
              </p>
            </Card>

            <Card className="p-5 bg-white border">
              <h3 className="text-lg font-bold">Community LGBTQ+ Support NGO</h3>
              <p className="text-sm mt-1 text-gray-700">
                Partner NGOs often provide free or low-cost counselling sessions and
                peer support for transgender persons.
              </p>
            </Card>
          </div>
        </section>

        {/* Emergency Helpline */}
        <div className="flex items-start gap-4 p-6 border-l-4 border-red-600 bg-red-50 rounded-xl">
          <Phone className="w-6 h-6 text-red-600" />
          <p className="text-gray-700 text-sm">
            For urgent help, call the 24×7 National Mental Health Helpline:
            <b> 1800-599-0019</b>. If you feel unsafe or in crisis, please contact
            local emergency services immediately.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-600 rounded text-sm">
          ⚠️ <b>Disclaimer:</b> HealWell is a facilitation platform that helps connect
          transgender individuals with mental health professionals and support services.
          It does not replace emergency or hospital-based care. For medical emergencies,
          always contact nearby hospitals or local authorities.
        </div>
      </div>

      {/* Counselor Profile Modal */}
      {isProfileOpen && selectedCounselor && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 shadow-xl p-6 relative">
            <button
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
              onClick={closeCounselorProfile}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${gradientColor} text-white`}
              >
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{selectedCounselor.name}</h2>
                <p className="text-sm">{selectedCounselor.speciality}</p>
                <p className="text-xs text-muted-foreground">
                  Experience: {selectedCounselor.experience} · Mode:{" "}
                  {selectedCounselor.mode}
                </p>
              </div>
            </div>

            {/* Rating + Contact */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-1 text-yellow-600 text-sm">
                <Star className="w-4 h-4" />
                <span>{selectedCounselor.rating.toFixed(1)} / 5</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>{selectedCounselor.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-green-600" />
                <span>{selectedCounselor.phone}</span>
              </div>
            </div>

            {/* Split layout: Booking + Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Booking form */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Book Session</h3>

                <div>
                  <label className="text-xs font-semibold">Select Date</label>
                  <input
                    type="date"
                    className="w-full border px-3 py-2 rounded-lg bg-white text-sm"
                    value={sessionDate}
                    onChange={(e) => setSessionDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold">Select Time</label>
                  <input
                    type="time"
                    className="w-full border px-3 py-2 rounded-lg bg-white text-sm"
                    value={sessionTime}
                    onChange={(e) => setSessionTime(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold">
                    Upload History / Reports (Optional)
                  </label>
                  <div className="flex items-center gap-3 border rounded-lg p-2 bg-muted/40">
                    <Upload className="w-5 h-5 text-primary" />
                    <input
                      type="file"
                      multiple
                      onChange={(e) => setDocuments(e.target.files)}
                      className="text-xs"
                    />
                  </div>
                </div>

                <Button
                  className={`w-full bg-gradient-to-r ${gradientColor} text-white py-2 text-sm`}
                  disabled={loading}
                  onClick={handleBooking}
                >
                  {loading ? "Booking..." : "Confirm Session Request"}
                </Button>
              </div>

              {/* Reviews */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Ratings & Reviews</h3>

                <div className="max-h-40 overflow-y-auto border rounded-lg p-2 bg-muted/40 space-y-2">
                  {getCounselorReviews(selectedCounselor.id).length === 0 ? (
                    <p className="text-xs text-muted-foreground">
                      No reviews yet. Be the first to share your experience.
                    </p>
                  ) : (
                    getCounselorReviews(selectedCounselor.id).map(
                      (rev, idx) => (
                        <div
                          key={idx}
                          className="bg-white rounded-lg p-2 shadow-sm"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-semibold">
                              {rev.userName}
                            </span>
                            <span className="text-xs text-yellow-600 flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              {rev.rating.toFixed(1)}
                            </span>
                          </div>
                          <p className="text-xs mt-1">{rev.comment}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">
                            {rev.date}
                          </p>
                        </div>
                      )
                    )
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold">
                    Add Your Review
                  </label>
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

            {/* Modal footer note */}
            <p className="text-[10px] text-muted-foreground mt-4">
              HealWell collects feedback to help the transgender community find
              safe, respectful, and affirming mental health professionals.
              Reviews are moderated to prevent abuse or harassment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealWell;
