import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  ArrowLeft,
  MapPin,
  Search,
  Filter,
  X,
  GraduationCap,
  Building2,
  IndianRupee,
  Star,
  Upload,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// ----------------------------
// Types
// ----------------------------
interface Job {
  id: number;
  title: string;
  company: string;
  salary: string;
  location: string;
  jobType: "Full-time" | "Part-time" | "Flexible";
  qualification: string;
  rating: number;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

interface Application {
  jobId: number;
  name: string;
  experience: string;
  skills: string;
  resume: string;
  date: string;
}

// ----------------------------
// Static Job Data
// ----------------------------
const jobList: Job[] = [
  {
    id: 1,
    title: "Front Desk Executive",
    company: "Marriott Hotels",
    salary: "₹18,000 – ₹25,000 / month",
    location: "Chennai",
    jobType: "Full-time",
    qualification: "12th Pass",
    rating: 4.6,
    description:
      "Hospitality role focusing on guest support, front office and reception desk activities in a trans-inclusive hotel environment.",
    requirements: [
      "Good communication skills",
      "Basic English knowledge",
      "Friendly and professional behaviour",
      "No prior experience required – training provided",
    ],
    responsibilities: [
      "Greeting and assisting guests",
      "Handling bookings and enquiries",
      "Managing check-in / check-out",
      "Supporting front office operations",
    ],
  },
  {
    id: 2,
    title: "Delivery Partner",
    company: "Zomato / Swiggy",
    salary: "₹15,000 – ₹30,000 / month",
    location: "Hyderabad",
    jobType: "Flexible",
    qualification: "No Qualification Required",
    rating: 4.3,
    description:
      "Flexible delivery role suitable for individuals who prefer outdoor work and flexible timings.",
    requirements: [
      "Smartphone with internet",
      "Bike / bicycle (or walking delivery in some areas)",
      "Driving license (for bike delivery)",
      "No formal education required",
    ],
    responsibilities: [
      "Pickup and deliver food orders",
      "Follow routes and time schedule",
      "Maintain communication with customers",
    ],
  },
  {
    id: 3,
    title: "Beauty Assistant",
    company: "Naturals Salon",
    salary: "₹20,000 – ₹32,000 / month",
    location: "Bengaluru",
    jobType: "Full-time",
    qualification: "10th Pass",
    rating: 4.7,
    description:
      "Assist senior beauticians and stylists in a trans-friendly salon environment.",
    requirements: [
      "Interest in beauty, grooming and styling",
      "Basic training (can be provided on the job)",
      "Neat and hygienic appearance",
    ],
    responsibilities: [
      "Assist in basic beauty services",
      "Maintain salon cleanliness",
      "Support makeup and hair styling sessions",
    ],
  },
  {
    id: 4,
    title: "Office Assistant",
    company: "Infosys (Support Team)",
    salary: "₹22,000 – ₹28,000 / month",
    location: "Chennai",
    jobType: "Full-time",
    qualification: "Any Degree",
    rating: 4.8,
    description:
      "Office support role in a corporate environment with focus on documentation and coordination.",
    requirements: [
      "Any degree (UG / PG)",
      "Basic computer knowledge (MS Office / Email)",
      "Good communication and time management",
    ],
    responsibilities: [
      "Handling files and documentation",
      "Supporting admin and HR teams",
      "Basic data entry and record maintenance",
    ],
  },
  {
    id: 5,
    title: "Data Entry Operator (Remote)",
    company: "Inclusive Solutions Pvt Ltd",
    salary: "₹12,000 – ₹20,000 / month",
    location: "Work From Home",
    jobType: "Part-time",
    qualification: "12th Pass",
    rating: 4.5,
    description:
      "Remote data entry role suitable for candidates who prefer to work from home.",
    requirements: [
      "Laptop / Desktop with internet",
      "Typing speed 25–30 WPM",
      "Basic Excel / Google Sheets knowledge",
    ],
    responsibilities: [
      "Entering and updating records in spreadsheets",
      "Checking data accuracy",
      "Preparing simple reports",
    ],
  },
];

// Teal gradient to match Career module
const gradientColor = "from-teal-500 to-teal-400";

// ----------------------------
// Main Component
// ----------------------------
const CareerPath = () => {
  const navigate = useNavigate();

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  const [qualificationFilter, setQualificationFilter] = useState("all");

  // Modal & Apply state
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyName, setApplyName] = useState("");
  const [applyExperience, setApplyExperience] = useState("");
  const [applySkills, setApplySkills] = useState("");
  const [applyResume, setApplyResume] = useState<File | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);

  // ---------- Filtered job list ----------
  const filteredJobs = useMemo(() => {
    return jobList.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation =
        locationFilter === "all" ||
        job.location.toLowerCase() === locationFilter.toLowerCase();

      const matchesJobType =
        jobTypeFilter === "all" || job.jobType === jobTypeFilter;

      const matchesQualification =
        qualificationFilter === "all" ||
        job.qualification === qualificationFilter;

      return (
        matchesSearch && matchesLocation && matchesJobType && matchesQualification
      );
    });
  }, [searchTerm, locationFilter, jobTypeFilter, qualificationFilter]);

  // ---------- Submit application ----------
  const submitApplication = () => {
    if (!selectedJob) {
      return;
    }
    if (!applyName.trim()) {
      alert("Please enter your name before applying.");
      return;
    }

    const newApp: Application = {
      jobId: selectedJob.id,
      name: applyName.trim(),
      experience: applyExperience.trim(),
      skills: applySkills.trim(),
      resume: applyResume ? applyResume.name : "Not uploaded",
      date: new Date().toISOString().slice(0, 10),
    };

    setApplications((prev) => [...prev, newApp]);

    alert("Your application has been submitted (demo only).");

    // reset form
    setApplyName("");
    setApplyExperience("");
    setApplySkills("");
    setApplyResume(null);
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
        <h1 className="text-5xl font-bold mb-4">Career Path</h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          Discover trans-inclusive jobs, understand real requirements, and apply
          with confidence – all in one place.
        </p>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Overview section */}
        <Card className="p-10 shadow-xl bg-white border">
          <div className="flex items-center gap-4 mb-10">
            <div
              className={`p-4 rounded-xl text-white bg-gradient-to-r ${gradientColor}`}
            >
              <Briefcase className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Inclusive Career Opportunities</h2>
              <p className="text-muted-foreground mt-1">
                Jobs curated with realistic requirements, avoiding discrimination and
                supporting transgender and gender-diverse candidates.
              </p>
            </div>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 bg-teal-50 border-teal-200">
              <h3 className="text-lg font-bold mb-3">Real Requirements</h3>
              <p className="text-sm text-gray-700">
                Every job clearly lists education, skills, and documents needed – no
                confusing or fake promises.
              </p>
            </Card>
            <Card className="p-6 bg-sky-50 border-sky-200">
              <h3 className="text-lg font-bold mb-3">Trans-Inclusive Employers</h3>
              <p className="text-sm text-gray-700">
                Partner companies actively open to hiring transgender candidates in
                safe and respectful environments.
              </p>
            </Card>
            <Card className="p-6 bg-emerald-50 border-emerald-200">
              <h3 className="text-lg font-bold mb-3">Simple Apply Flow</h3>
              <p className="text-sm text-gray-700">
                View full details, and apply with basic information and an optional
                resume upload.
              </p>
            </Card>
          </div>
        </Card>

        {/* Search + Filters */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="flex items-center gap-2 w-full md:w-1/2">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search job title, company or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border px-4 py-3 rounded-lg bg-white text-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters</span>
              </div>

              <select
                className="border px-3 py-2 rounded-lg bg-white text-xs"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="all">All Locations</option>
                <option value="Chennai">Chennai</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Work From Home">Work From Home</option>
              </select>

              <select
                className="border px-3 py-2 rounded-lg bg-white text-xs"
                value={jobTypeFilter}
                onChange={(e) => setJobTypeFilter(e.target.value)}
              >
                <option value="all">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Flexible">Flexible</option>
              </select>

              <select
                className="border px-3 py-2 rounded-lg bg-white text-xs"
                value={qualificationFilter}
                onChange={(e) => setQualificationFilter(e.target.value)}
              >
                <option value="all">All Qualifications</option>
                <option value="No Qualification Required">
                  No Qualification Required
                </option>
                <option value="10th Pass">10th Pass</option>
                <option value="12th Pass">12th Pass</option>
                <option value="Any Degree">Any Degree</option>
              </select>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mt-8">
            Verified Job Opportunities
          </h2>

          {filteredJobs.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm">
              No jobs match the selected filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="p-6 bg-white border shadow-sm hover:shadow-md cursor-pointer transition flex flex-col justify-between"
                  onClick={() => setSelectedJob(job)}
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold">{job.title}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                        {job.jobType}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <Building2 className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">{job.company}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span className="text-sm">{job.location}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <IndianRupee className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{job.salary}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-3 text-yellow-600">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {job.rating.toFixed(1)} / 5
                      </span>
                    </div>
                  </div>

                  <Button
                    className={`mt-4 w-full bg-gradient-to-r ${gradientColor} text-white py-2 text-sm`}
                  >
                    View Details & Apply
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Disclaimer */}
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-600 rounded text-sm">
          ⚠️ <b>Disclaimer:</b> Career Path is a facilitation platform that connects
          users with potential employers. It does not guarantee job placement. Always
          verify offers and avoid sharing sensitive personal or financial information.
        </div>
      </div>

      {/* Job Details & Apply Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-3xl w-full mx-4 shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
              onClick={() => setSelectedJob(null)}
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
                <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {selectedJob.company}
                </p>
              </div>
            </div>

            {/* Job Meta (2-column on md) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>{selectedJob.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-green-600" />
                <span>{selectedJob.salary}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>{selectedJob.qualification}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-600" />
                <span>{selectedJob.rating.toFixed(1)} / 5</span>
              </div>
            </div>

            {/* Split layout: left details, right apply */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* LEFT: Job details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Job Description</h3>
                  <p className="text-sm mt-1">{selectedJob.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Requirements</h3>
                  <ul className="list-disc ml-5 text-sm mt-1 space-y-1">
                    {selectedJob.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Key Responsibilities</h3>
                  <ul className="list-disc ml-5 text-sm mt-1 space-y-1">
                    {selectedJob.responsibilities.map((res, idx) => (
                      <li key={idx}>{res}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* RIGHT: Apply Form */}
              <div className="space-y-3 border rounded-xl p-4 bg-muted/40">
                <h3 className="text-lg font-semibold mb-1">Apply Now</h3>

                <input
                  type="text"
                  placeholder="Your Name"
                  value={applyName}
                  onChange={(e) => setApplyName(e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg bg-white text-sm"
                />

                <input
                  type="text"
                  placeholder="Experience (optional, e.g. 1 year as delivery partner)"
                  value={applyExperience}
                  onChange={(e) => setApplyExperience(e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg bg-white text-sm"
                />

                <textarea
                  placeholder="Skills (e.g. communication, customer handling, typing...)"
                  value={applySkills}
                  onChange={(e) => setApplySkills(e.target.value)}
                  rows={3}
                  className="w-full border px-3 py-2 rounded-lg bg-white text-sm"
                />

                <div className="flex items-center gap-3 border rounded-lg p-2 bg-white">
                  <Upload className="w-5 h-5 text-primary" />
                  <input
                    type="file"
                    onChange={(e) =>
                      setApplyResume(e.target.files?.[0] || null)
                    }
                    className="text-xs"
                  />
                </div>

                <Button
                  className={`w-full bg-gradient-to-r ${gradientColor} text-white py-2 text-sm`}
                  onClick={submitApplication}
                >
                  Submit Application
                </Button>

                {/* Previous applications for this job */}
                {applications.filter((a) => a.jobId === selectedJob.id).length >
                  0 && (
                  <div className="mt-2">
                    <h4 className="text-xs font-semibold mb-1">
                      Your Submitted Applications (demo)
                    </h4>
                    <div className="max-h-24 overflow-y-auto space-y-2">
                      {applications
                        .filter((a) => a.jobId === selectedJob.id)
                        .map((app, idx) => (
                          <Card
                            key={idx}
                            className="p-2 bg-white border text-[11px]"
                          >
                            <p>
                              <b>Name:</b> {app.name}
                            </p>
                            <p>
                              <b>Date:</b> {app.date}
                            </p>
                            <p>
                              <b>Resume:</b> {app.resume}
                            </p>
                          </Card>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <p className="text-[10px] text-muted-foreground mt-4">
              This is a demo flow – applications can be wired to your backend
              (Node / MongoDB) later so admin or companies can review and respond.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerPath;
