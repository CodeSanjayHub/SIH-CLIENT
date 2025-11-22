import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Bike,
  ShoppingBag,
  Truck,
  CheckCircle,
  Phone,
  MapPin,
  Star,
  Search,
  Filter,
  Upload,
  X,
} from "lucide-react";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// ---------------- Types ----------------
interface GigWorker {
  id: number;
  name: string;
  platform: string;
  gigType: "Food Delivery" | "Ecommerce Delivery" | "Task-Based Gig";
  experience: string;
  rating: number;
  phone: string;
  location: string;
  vehicle: string;
  about: string;
}

interface Application {
  id: number;
  workerId: number;
  workerName: string;
  gigType: string;
  status: "Pending" | "Shortlisted" | "Rejected";
}

interface Review {
  workerId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

// ---------------- Static Data ----------------
const gradientColor = "from-teal-500 to-teal-400";

const gigWorkers: GigWorker[] = [
  {
    id: 1,
    name: "Sanjay Kumar",
    platform: "Zomato",
    gigType: "Food Delivery",
    experience: "2+ years",
    rating: 4.7,
    phone: "+91 98765 33221",
    location: "Chennai",
    vehicle: "Bike",
    about:
      "Experienced delivery partner familiar with busy city routes. Known for punctuality and positive customer reviews.",
  },
  {
    id: 2,
    name: "Rekha Delivery Partner",
    platform: "Amazon Flex",
    gigType: "Ecommerce Delivery",
    experience: "3+ years",
    rating: 4.8,
    phone: "+91 90001 12881",
    location: "Bengaluru",
    vehicle: "Scooter",
    about:
      "Specialized in ecommerce parcel delivery. Efficient and reliable with excellent customer handling.",
  },
  {
    id: 3,
    name: "AjayTask Pro",
    platform: "Urban Company",
    gigType: "Task-Based Gig",
    experience: "1.5+ years",
    rating: 4.6,
    phone: "+91 91234 77112",
    location: "Hyderabad",
    vehicle: "None required",
    about:
      "Provides home assistance, shifting help, cleaning support, and small task services with professionalism.",
  },
];

// ---------------- Component ----------------
const FreelancingGig = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [gigFilter, setGigFilter] =
    useState<"all" | GigWorker["gigType"]>("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("0");

  // application state
  const [applications, setApplications] = useState<Application[]>([]);

  // modal state
  const [selectedWorker, setSelectedWorker] = useState<GigWorker | null>(null);
  const [resumeFile, setResumeFile] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  // reviews
  const [reviews, setReviews] = useState<Review[]>([
    {
      workerId: 1,
      userName: "Aisha",
      rating: 5,
      comment: "Fast delivery and polite behavior!",
      date: "2025-11-17",
    },
    {
      workerId: 3,
      userName: "Rahul",
      rating: 4,
      comment: "Very helpful for our shifting work.",
      date: "2025-11-18",
    },
  ]);

  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");

  const openWorkerProfile = (w: GigWorker) => {
    setSelectedWorker(w);
    setResumeFile(null);
  };

  const closeWorkerProfile = () => {
    setSelectedWorker(null);
  };

  const submitApplication = () => {
    if (!selectedWorker) return;

    setLoading(true);

    setTimeout(() => {
      const newApp: Application = {
        id: applications.length + 1,
        workerId: selectedWorker.id,
        workerName: selectedWorker.name,
        gigType: selectedWorker.gigType,
        status: "Pending",
      };

      setApplications((prev) => [...prev, newApp]);
      setLoading(false);
      alert("Application submitted! (Demo)");
    }, 800);
  };

  const getReviews = (id: number) =>
    reviews.filter((r) => r.workerId === id);

  const addReview = () => {
    if (!selectedWorker || !newReviewComment.trim()) return;

    setReviews((prev) => [
      ...prev,
      {
        workerId: selectedWorker.id,
        userName: "User",
        rating: newReviewRating,
        comment: newReviewComment,
        date: new Date().toISOString().slice(0, 10),
      },
    ]);

    setNewReviewComment("");
    setNewReviewRating(5);
  };

  // ------------ Filter Logic ------------
  const filteredWorkers = useMemo(() => {
    return gigWorkers.filter((w) => {
      const matchesSearch =
        w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGig =
        gigFilter === "all" || w.gigType === gigFilter;

      const matchesLocation =
        locationFilter === "all" ||
        w.location.toLowerCase() === locationFilter.toLowerCase();

      const matchesRating =
        parseFloat(ratingFilter) === 0 ||
        w.rating >= parseFloat(ratingFilter);

      return matchesSearch && matchesGig && matchesLocation && matchesRating;
    });
  }, [searchTerm, gigFilter, locationFilter, ratingFilter]);

  return (
    <div className="bg-muted/20 min-h-screen">
      <Navigation />

      {/* Back */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            className="flex items-center text-primary hover:underline"
            onClick={() => navigate("/services")}
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
        <h1 className="text-5xl font-bold mb-4">Freelancing & Gig Jobs</h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          Earn income through delivery, task gigs, ecommerce delivery, and flexible part-time opportunities.
        </p>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Overview */}
        <Card className="p-10 bg-white shadow-xl border">
          <div className="flex items-center gap-4 mb-10">
            <div className={`p-4 rounded-xl bg-gradient-to-r ${gradientColor} text-white`}>
              <Truck className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-3xl font-bold">Flexible Earning Paths</h2>
              <p className="text-muted-foreground mt-1">
                Choose work that matches your schedule – food delivery,
                ecommerce parcels, home tasks, and more.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 bg-teal-50 border-teal-200">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Bike className="w-5 h-5 text-teal-600" /> Food Delivery
              </h3>
              <p className="text-sm mt-2">Partner with Swiggy / Zomato and earn daily payouts.</p>
            </Card>

            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-600" /> Ecommerce Delivery
              </h3>
              <p className="text-sm mt-2">Amazon / Flipkart flexible parcel delivery.</p>
            </Card>

            <Card className="p-6 bg-emerald-50 border-emerald-200">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" /> Task-Based Gigs
              </h3>
              <p className="text-sm mt-2">Home help, packing, cleaning, and small tasks.</p>
            </Card>
          </div>
        </Card>

        {/* Filters */}
        <section className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="flex items-center gap-2 w-full md:w-1/2">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search name, gig type, city, platform..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border px-4 py-3 rounded-lg bg-white text-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <Filter className="w-4 h-4 text-muted-foreground" />

              <select
                className="border px-3 py-2 rounded-lg bg-white text-xs"
                value={gigFilter}
                onChange={(e) =>
                  setGigFilter(e.target.value as typeof gigFilter)
                }
              >
                <option value="all">All Gigs</option>
                <option value="Food Delivery">Food Delivery</option>
                <option value="Ecommerce Delivery">Ecommerce Delivery</option>
                <option value="Task-Based Gig">Task-Based Gigs</option>
              </select>

              <select
                className="border px-3 py-2 rounded-lg bg-white text-xs"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="all">All Cities</option>
                <option value="Chennai">Chennai</option>
                <option value="Benguru">Bengaluru</option>
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

          <h2 className="text-3xl font-bold text-center mt-10">
            Available Gig Workers
          </h2>

          {filteredWorkers.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm">
              No matching gig workers found.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredWorkers.map((w) => (
                <Card
                  key={w.id}
                  className="p-6 shadow-sm bg-white border hover:shadow-md transition cursor-pointer"
                  onClick={() => openWorkerProfile(w)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xl font-bold">{w.name}</h3>
                    <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full">
                      {w.gigType}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground mb-2">
                    {w.platform} · {w.experience}
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

                  <Button
                    className={`mt-4 w-full bg-gradient-to-r ${gradientColor} text-white py-2 text-sm`}
                  >
                    View Profile & Apply
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* My Applications */}
        {applications.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">My Applications (Demo)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {applications.map((app) => (
                <Card key={app.id} className="p-4 border bg-white text-sm">
                  <p className="font-semibold">{app.workerName}</p>
                  <p className="text-xs text-muted-foreground">{app.gigType}</p>
                  <p className="mt-1">
                    Status:{" "}
                    <span className="font-semibold text-blue-600">
                      {app.status}
                    </span>
                  </p>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Disclaimer */}
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-600 rounded text-sm">
          ⚠️ <b>Note:</b> This is a demo version. In real integration, your application
          will be sent to company partners or gig platforms.
        </div>
      </div>

      {/* Modal */}
      {selectedWorker && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-3xl w-full mx-4 p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4"
              onClick={closeWorkerProfile}
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <h2 className="text-2xl font-bold mb-2">{selectedWorker.name}</h2>
            <p className="text-sm text-muted-foreground">
              {selectedWorker.gigType} · {selectedWorker.platform}
            </p>

            {/* Meta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" /> {selectedWorker.location}
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-600" /> {selectedWorker.phone}
              </div>

              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-600" />{" "}
                {selectedWorker.rating.toFixed(1)} / 5
              </div>

              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600" /> Vehicle:{" "}
                {selectedWorker.vehicle || "No vehicle"}
              </div>
            </div>

            {/* About */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold">About</h3>
              <p className="text-sm mt-1">{selectedWorker.about}</p>
            </div>

            {/* Upload resume */}
            <div className="mt-6">
              <label className="text-xs font-semibold">Upload Resume (Optional)</label>
              <div className="border rounded-lg p-3 flex items-center gap-2 mt-1">
                <Upload className="w-5 h-5 text-primary" />
                <input
                  type="file"
                  onChange={(e) => setResumeFile(e.target.files)}
                  className="text-xs"
                />
              </div>
            </div>

            <Button
              className={`w-full mt-6 bg-gradient-to-r ${gradientColor} text-white py-2`}
              disabled={loading}
              onClick={submitApplication}
            >
              {loading ? "Submitting..." : "Apply Now"}
            </Button>

            {/* Reviews */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-2">Reviews</h3>

              <div className="max-h-32 overflow-y-auto border rounded-lg p-2 bg-muted/40">
                {getReviews(selectedWorker.id).map((r, idx) => (
                  <div key={idx} className="bg-white p-2 rounded-lg shadow-sm mb-2 text-xs">
                    <p className="font-semibold">{r.userName}</p>
                    <p className="text-yellow-600 flex items-center gap-1">
                      <Star className="w-3 h-3" /> {r.rating}
                    </p>
                    <p className="mt-1">{r.comment}</p>
                    <p className="text-[10px] text-gray-500 mt-1">{r.date}</p>
                  </div>
                ))}
              </div>

              {/* Add review */}
              <div className="mt-3 space-y-2">
                <select
                  className="w-full border px-2 py-2 text-xs rounded-lg bg-white"
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                >
                  <option value={5}>5 ★ Excellent</option>
                  <option value={4}>4 ★ Good</option>
                  <option value={3}>3 ★ Average</option>
                  <option value={2}>2 ★ Poor</option>
                  <option value={1}>1 ★ Very Poor</option>
                </select>

                <textarea
                  className="w-full border px-3 py-2 rounded-lg text-xs"
                  rows={3}
                  placeholder="Write your feedback..."
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                ></textarea>

                <Button variant="outline" size="sm" onClick={addReview}>
                  Submit Review
                </Button>
              </div>
            </div>

            <p className="text-[10px] text-muted-foreground mt-4">
              This is a demo version. Reviews are stored only locally.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreelancingGig;
