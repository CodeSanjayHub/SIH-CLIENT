import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Stethoscope,
  ArrowLeft,
  MapPin,
  Phone,
  Star,
  Upload,
  Search,
  Filter,
  X,
  User,
  CalendarClock,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { moduleColors } from "../ServicesData";
import { useNavigate } from "react-router-dom";

// Types
interface Doctor {
  id: number;
  name: string;
  speciality: string;
  experience: string;
  rating: number;
  phone: string;
  address: string;
  location: string;
  categories: string[]; // e.g. ["Endocrinologist", "Surgeon"]
}

interface Review {
  doctorId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface Appointment {
  id: number;
  doctorName: string;
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Completed" | "Rejected";
}

const CareConnect = () => {
  const navigate = useNavigate();
  const gradientColor = moduleColors["health"];

  // Booking state
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [documents, setDocuments] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  // Filters & search
  const [searchTerm, setSearchTerm] = useState("");
  const [specialityFilter, setSpecialityFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("0");

  // Modal UI
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Reviews
  const [reviews, setReviews] = useState<Review[]>([
    {
      doctorId: 1,
      userName: "Aisha",
      rating: 5,
      comment: "Doctor was very respectful and explained HRT clearly.",
      date: "2025-11-10",
    },
    {
      doctorId: 2,
      userName: "Karthik",
      rating: 4,
      comment: "Great surgeon, staff were also very kind.",
      date: "2025-11-12",
    },
  ]);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");

  // Appointments (user view)
  const [myAppointments, setMyAppointments] = useState<Appointment[]>([
    {
      id: 1,
      doctorName: "Dr. Riya Mishra",
      date: "2025-11-25",
      time: "10:30",
      status: "Confirmed",
    },
    {
      id: 2,
      doctorName: "Dr. M. Prakash",
      date: "2025-11-28",
      time: "16:00",
      status: "Pending",
    },
  ]);

  // Admin appointments (demo)
  const [adminAppointments, setAdminAppointments] = useState<Appointment[]>([
    {
      id: 101,
      doctorName: "Dr. Riya Mishra",
      date: "2025-11-26",
      time: "11:00",
      status: "Pending",
    },
    {
      id: 102,
      doctorName: "Dr. Shruti Menon",
      date: "2025-11-27",
      time: "15:30",
      status: "Pending",
    },
  ]);

  // You can later replace this with real backend fetch
  useEffect(() => {
    // Example: fetch my appointments from backend
    // (for now we use mock data above)
    // const userId = localStorage.getItem("userId") || "demo-user";
    // fetch(`http://localhost:5000/careconnect/my-appointments?userId=${userId}`)
    //   .then(res => res.json())
    //   .then(data => setMyAppointments(data))
    //   .catch(() => {});
  }, []);

  const doctorList: Doctor[] = [
    {
      id: 1,
      name: "Dr. Riya Mishra",
      speciality: "Endocrinologist (HRT Specialist)",
      experience: "12 years",
      rating: 4.9,
      phone: "9876543210",
      address: "Apollo Hospital, Greams Road",
      location: "Chennai",
      categories: ["Endocrinologist"],
    },
    {
      id: 2,
      name: "Dr. Arvind Raj",
      speciality: "Gender Affirming Surgeon",
      experience: "15 years",
      rating: 4.8,
      phone: "9898989898",
      address: "Fortis, Cunningham Road",
      location: "Bengaluru",
      categories: ["Surgeon"],
    },
    {
      id: 3,
      name: "Dr. Shruti Menon",
      speciality: "LGBTQ+ Friendly General Physician",
      experience: "7 years",
      rating: 4.7,
      phone: "9123456789",
      address: "Aster Hospital, Marine Drive",
      location: "Kochi",
      categories: ["Physician"],
    },
    {
      id: 4,
      name: "Dr. M. Prakash",
      speciality: "Psychiatrist & Trans Health Counselor",
      experience: "11 years",
      rating: 4.9,
      phone: "9988776655",
      address: "Government Hospital, Coimbatore",
      location: "Coimbatore",
      categories: ["Psychiatrist"],
    },
  ];

  // Derived filters
  const filteredDoctors = useMemo(() => {
    return doctorList.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpeciality =
        specialityFilter === "all" ||
        doc.categories.includes(specialityFilter);

      const matchesLocation =
        locationFilter === "all" ||
        doc.location.toLowerCase() === locationFilter.toLowerCase();

      const matchesRating =
        parseFloat(ratingFilter) === 0 ||
        doc.rating >= parseFloat(ratingFilter);

      return matchesSearch && matchesSpeciality && matchesLocation && matchesRating;
    });
  }, [doctorList, searchTerm, specialityFilter, locationFilter, ratingFilter]);

  const openDoctorProfile = (doc: Doctor) => {
    setSelectedDoctor(doc);
    setIsProfileOpen(true);
  };

  const closeDoctorProfile = () => {
    setIsProfileOpen(false);
    setSelectedDoctor(null);
    setAppointmentDate("");
    setAppointmentTime("");
    setDocuments(null);
  };

  const handleBooking = async () => {
    if (!selectedDoctor || !appointmentDate || !appointmentTime) {
      alert("Please select doctor, date and time");
      return;
    }

    setLoading(true);

    const form = new FormData();
    form.append("userId", localStorage.getItem("userId") || "demo-user");
    form.append("doctorId", String(selectedDoctor.id));
    form.append("doctorName", selectedDoctor.name);
    form.append("date", appointmentDate);
    form.append("time", appointmentTime);

    if (documents) {
      for (let file of documents) form.append("documents", file);
    }

    try {
      await fetch("http://localhost:5000/careconnect/book-appointment", {
        method: "POST",
        body: form,
      });

      alert("Appointment booked successfully!");

      // update local "my appointments"
      setMyAppointments((prev) => [
        ...prev,
        {
          id: prev.length + 100,
          doctorName: selectedDoctor.name,
          date: appointmentDate,
          time: appointmentTime,
          status: "Pending",
        },
      ]);
      closeDoctorProfile();
    } catch (err) {
      alert("Error while booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = () => {
    if (!selectedDoctor || !newReviewComment.trim()) {
      alert("Please enter review text");
      return;
    }

    const newReview: Review = {
      doctorId: selectedDoctor.id,
      userName: localStorage.getItem("name") || "Anonymous user",
      rating: newReviewRating,
      comment: newReviewComment,
      date: new Date().toISOString().slice(0, 10),
    };

    setReviews((prev) => [...prev, newReview]);
    setNewReviewComment("");
    setNewReviewRating(5);
  };

  const getDoctorReviews = (doctorId: number) =>
    reviews.filter((r) => r.doctorId === doctorId);

  const handleAdminStatusChange = (id: number, status: Appointment["status"]) => {
    setAdminAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status } : appt
      )
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
        <h1 className="text-5xl font-bold mb-4">CareConnect+</h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          Verified transgender-friendly doctors, clinics, and hospitals – with appointment booking, reviews, and tracking.
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
              <Stethoscope className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                Trans-Friendly Healthcare Network
              </h2>
              <p className="text-muted-foreground mt-1">
                Respectful, inclusive, and medically sound care for transgender individuals.
              </p>
            </div>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="text-lg font-bold mb-3">Verified Doctors</h3>
              <p className="text-sm text-gray-700">
                Endocrinologists, surgeons, psychiatrists, and general physicians trained in trans healthcare.
              </p>
            </Card>

            <Card className="p-6 bg-purple-50 border-purple-200">
              <h3 className="text-lg font-bold mb-3">Easy Appointments</h3>
              <p className="text-sm text-gray-700">
                Book online, upload reports, and track confirmation status from one place.
              </p>
            </Card>

            <Card className="p-6 bg-green-50 border-green-200">
              <h3 className="text-lg font-bold mb-3">Feedback & Safety</h3>
              <p className="text-sm text-gray-700">
                Ratings and reviews from the community help identify safe and supportive providers.
              </p>
            </Card>
          </div>
        </Card>

        {/* Filters + Doctor Directory */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="flex items-center gap-2 w-full md:w-1/2">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search doctor, speciality or city..."
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
                <option value="Endocrinologist">Endocrinologists</option>
                <option value="Surgeon">Surgeons</option>
                <option value="Psychiatrist">Psychiatrists</option>
                <option value="Physician">General Physicians</option>
              </select>

              <select
                className="border px-3 py-2 rounded-lg bg-white text-xs"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="all">All Locations</option>
                <option value="Chennai">Chennai</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Kochi">Kochi</option>
                <option value="Coimbatore">Coimbatore</option>
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
            Verified Doctors & Clinics
          </h2>

          {filteredDoctors.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm">
              No doctors match the selected filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredDoctors.map((d) => (
                <Card
                  key={d.id}
                  className="p-6 shadow-sm border bg-white hover:shadow-md transition cursor-pointer"
                  onClick={() => openDoctorProfile(d)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{d.name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                      Verified
                    </span>
                  </div>
                  <p className="text-sm mt-1">{d.speciality}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Experience: {d.experience}
                  </p>

                  <div className="flex items-center gap-2 mt-3 text-yellow-600">
                    <Star className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {d.rating.toFixed(1)} / 5
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span className="text-sm">{d.address}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{d.phone}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {d.categories.map((cat) => (
                      <span
                        key={cat}
                        className="text-[10px] px-2 py-1 rounded-full bg-blue-50 text-blue-700"
                      >
                        {cat}
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

        {/* Nearby Hospitals (static list – can be replaced with real map later) */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Nearby Trans-Friendly Hospitals</h2>
          <p className="text-sm text-muted-foreground">
            This can later be integrated with Google Maps API. For now, we list a few example hospitals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-5 bg-white border">
              <h3 className="text-lg font-bold">Apollo Hospitals, Chennai</h3>
              <p className="text-sm mt-1 text-gray-700">
                Greams Road, Chennai – Endocrinology & Surgery support.
              </p>
            </Card>
            <Card className="p-5 bg-white border">
              <h3 className="text-lg font-bold">Fortis Hospital, Bengaluru</h3>
              <p className="text-sm mt-1 text-gray-700">
                Cunningham Road, Bengaluru – Gender affirming care.
              </p>
            </Card>
            <Card className="p-5 bg-white border">
              <h3 className="text-lg font-bold">Aster Medcity, Kochi</h3>
              <p className="text-sm mt-1 text-gray-700">
                Varapuzha, Kochi – Hormone therapy & counselling support.
              </p>
            </Card>
            <Card className="p-5 bg-white border">
              <h3 className="text-lg font-bold">Govt. Medical College, Coimbatore</h3>
              <p className="text-sm mt-1 text-gray-700">
                Govt setup with mental health & psychiatry department.
              </p>
            </Card>
          </div>
        </section>

    
    

        {/* Disclaimer */}
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-600 rounded text-sm">
          ⚠️ <b>Disclaimer:</b> CareConnect+ is a facilitation platform that connects users
          with transgender-friendly healthcare providers. It does not replace emergency
          medical services. For urgent issues, contact hospital emergency or national
          helplines (108 / 112).
        </div>
      </div>

      {/* Doctor Profile Modal */}
      {isProfileOpen && selectedDoctor && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 shadow-xl p-6 relative">
            <button
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
              onClick={closeDoctorProfile}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${gradientColor} text-white`}
              >
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{selectedDoctor.name}</h2>
                <p className="text-sm">{selectedDoctor.speciality}</p>
                <p className="text-xs text-muted-foreground">
                  {selectedDoctor.experience}
                </p>
              </div>
            </div>

            {/* Rating + Address */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-1 text-yellow-600 text-sm">
                <Star className="w-4 h-4" />
                <span>{selectedDoctor.rating.toFixed(1)} / 5</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>{selectedDoctor.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-green-600" />
                <span>{selectedDoctor.phone}</span>
              </div>
            </div>

            {/* Split layout: Booking + Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Booking form */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Book Appointment</h3>

                <div>
                  <label className="text-xs font-semibold">Date</label>
                  <input
                    type="date"
                    className="w-full border px-3 py-2 rounded-lg bg-white text-sm"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold">Time</label>
                  <input
                    type="time"
                    className="w-full border px-3 py-2 rounded-lg bg-white text-sm"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold">
                    Upload Reports (Optional)
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
                  {loading ? "Booking..." : "Confirm Appointment"}
                </Button>
              </div>

              {/* Reviews */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Ratings & Reviews</h3>

                <div className="max-h-40 overflow-y-auto border rounded-lg p-2 bg-muted/40 space-y-2">
                  {getDoctorReviews(selectedDoctor.id).length === 0 ? (
                    <p className="text-xs text-muted-foreground">
                      No reviews yet. Be the first to share your experience.
                    </p>
                  ) : (
                    getDoctorReviews(selectedDoctor.id).map((rev, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-2 shadow-sm">
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
                    ))
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold">
                    Add Your Review
                  </label>
                  <select
                    className="w-full border px-3 py-2 rounded-lg bg-white text-xs"
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
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
              CareConnect+ collects feedback to help the transgender community find
              safe and respectful doctors. Reviews are moderated for abuse.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareConnect;
