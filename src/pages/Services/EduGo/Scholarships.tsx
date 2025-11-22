import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  GraduationCap,
  BookOpen,
  Banknote,
  Calendar,
  Award,
  School,
  Building2,
  Search,
  Filter,
  Upload,
  CheckCircle,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

const gradientColor = "from-green-500 to-green-400"; // EduGo color

interface Scholarship {
  id: number;
  name: string;
  type: "Merit-based" | "Need-based" | "Government" | "Skill-based";
  level: "School" | "College" | "Skill Training";
  amount: string; // "₹50,000 / year"
  deadline: string; // e.g. "30 Mar 2025"
  provider: string;
  location: string;
  highlights: string[];
}

interface Application {
  id: number;
  scholarshipId: number;
  scholarshipName: string;
  status: "Pending" | "Under Review" | "Approved" | "Rejected";
  appliedOn: string;
}

// ----- Static Data -----
const SCHOLARSHIPS: Scholarship[] = [
  {
    id: 1,
    name: "TransEdu Merit Scholarship",
    type: "Merit-based",
    level: "College",
    amount: "₹50,000 / year",
    deadline: "31 Mar 2025",
    provider: "State Social Justice Dept.",
    location: "Tamil Nadu",
    highlights: [
      "For undergraduate & postgraduate courses",
      "Requires minimum 60% in last exam",
      "Open only for registered transgender students",
    ],
  },
  {
    id: 2,
    name: "Community Need-Based Support",
    type: "Need-based",
    level: "School",
    amount: "₹25,000 / year",
    deadline: "15 Apr 2025",
    provider: "Local NGO & CSR Partners",
    location: "Multi-state",
    highlights: [
      "Covers school fees, uniforms, books",
      "Priority for low-income trans families",
      "Simple income certificate required",
    ],
  },
  {
    id: 3,
    name: "SkillUp Training Grant",
    type: "Skill-based",
    level: "Skill Training",
    amount: "₹30,000 (one-time)",
    deadline: "30 Jun 2025",
    provider: "Skill India Mission",
    location: "Pan India",
    highlights: [
      "Covers course fee for tech, design, beauty & culinary",
      "Open to school dropouts also",
      "Includes stipend in some centers",
    ],
  },
  {
    id: 4,
    name: "National Trans Higher Education Scheme",
    type: "Government",
    level: "College",
    amount: "₹75,000 / year",
    deadline: "Rolling (Check portal)",
    provider: "Ministry of Social Justice & Empowerment",
    location: "Pan India",
    highlights: [
      "For degree & professional courses (engineering, medicine, law)",
      "Hostel / mess fee support in some cases",
      "Requires Transgender ID / certificate",
    ],
  },
];

const Scholarships = () => {
  const navigate = useNavigate();

  // filters
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [levelFilter, setLevelFilter] = useState<string>("all");

  // applications
  const [applications, setApplications] = useState<Application[]>([]);

  // modal
  const [selectedScholarship, setSelectedScholarship] =
    useState<Scholarship | null>(null);
  const [documents, setDocuments] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const filteredScholarships = useMemo(() => {
    return SCHOLARSHIPS.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        typeFilter === "all" || s.type === typeFilter;

      const matchesLevel =
        levelFilter === "all" || s.level === levelFilter;

      return matchesSearch && matchesType && matchesLevel;
    });
  }, [searchTerm, typeFilter, levelFilter]);

  const openScholarship = (s: Scholarship) => {
    setSelectedScholarship(s);
    setDocuments(null);
  };

  const closeScholarship = () => {
    setSelectedScholarship(null);
    setDocuments(null);
  };

  const handleApply = () => {
    if (!selectedScholarship) return;

    setLoading(true);

    setTimeout(() => {
      const newApp: Application = {
        id: applications.length + 1,
        scholarshipId: selectedScholarship.id,
        scholarshipName: selectedScholarship.name,
        status: "Pending",
        appliedOn: new Date().toISOString().slice(0, 10),
      };
      setApplications((prev) => [...prev, newApp]);
      setLoading(false);
      alert("Application submitted (demo). You can track it below.");
    }, 800);
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
        className={`py-16 md:py-20 bg-gradient-to-r ${gradientColor} text-white`}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 flex items-center gap-3">
              <GraduationCap className="w-10 h-10" />
              Scholarships
            </h1>
            <p className="max-w-2xl text-base md:text-lg opacity-90">
              Financial support for transgender students and learners –
              covering school, college, and skill-based courses.
            </p>
          </div>

          <Card className="bg-white/10 border-white/30 text-sm p-4 md:p-5 min-w-[220px]">
            <p className="font-semibold text-sm mb-2 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Snapshot (Demo Data)
            </p>
            <ul className="space-y-1 text-xs md:text-sm">
              <li>• {SCHOLARSHIPS.length} active scholarships</li>
              <li>• Government + NGO + Skill training schemes</li>
              <li>• Info-only demo – no real submission</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-14 space-y-14">

        {/* Search + Filters */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            {/* Search */}
            <div className="flex items-center gap-2 w-full md:w-1/2">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, provider or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border px-4 py-2.5 rounded-lg bg-white text-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Filter className="w-4 h-4" />
                Filters:
              </div>

              <select
                className="border px-3 py-2 rounded-lg bg-white text-xs"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="Merit-based">Merit-based</option>
                <option value="Need-based">Need-based</option>
                <option value="Government">Government</option>
                <option value="Skill-based">Skill-based</option>
              </select>

              <select
                className="border px-3 py-2 rounded-lg bg-white text-xs"
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="School">School</option>
                <option value="College">College</option>
                <option value="Skill Training">Skill Training</option>
              </select>
            </div>
          </div>
        </section>

        {/* Layout: left = list, right = helper panel */}
        <section className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-10 items-start">

          {/* Scholarship List */}
          <div className="space-y-5">
            {filteredScholarships.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No scholarships match the selected filters.
              </p>
            ) : (
              filteredScholarships.map((s) => (
                <Card
                  key={s.id}
                  className="p-5 md:p-6 bg-white border hover:shadow-md transition cursor-pointer"
                  onClick={() => openScholarship(s)}
                >
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                        {s.name}
                        {s.type === "Government" && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                            Govt. Scheme
                          </span>
                        )}
                        {s.type === "Merit-based" && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                            Merit
                          </span>
                        )}
                        {s.type === "Need-based" && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                            Need-based
                          </span>
                        )}
                        {s.type === "Skill-based" && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                            Skill
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {s.provider}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                        <School className="w-3 h-3" />
                        Level: {s.level} · {s.location}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-semibold flex items-center gap-1 justify-end">
                        <Banknote className="w-4 h-4 text-emerald-600" />
                        {s.amount}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1 justify-end">
                        <Calendar className="w-3 h-3" />
                        Deadline: {s.deadline}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
                    {s.highlights.slice(0, 3).map((h, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-1.5 text-[11px] text-gray-700"
                      >
                        <CheckCircle className="w-3 h-3 text-emerald-500 mt-[2px]" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3 justify-between items-center">
                    <div className="flex flex-wrap gap-2 text-[10px]">
                      <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                        {s.type}
                      </span>
                      <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                        {s.level}
                      </span>
                    </div>

                    <Button
                      className={`text-xs px-4 py-1.5 bg-gradient-to-r ${gradientColor} text-white`}
                    >
                      View Details & Apply
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Helper Panel */}
          <div className="space-y-5">
            <Card className="p-5 bg-white border shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-lg">How to Apply (Demo)</h3>
              </div>
              <ol className="list-decimal list-inside text-sm space-y-1 text-gray-700">
                <li>Click on a scholarship card.</li>
                <li>Read eligibility and coverage.</li>
                <li>Upload basic documents (demo only).</li>
                <li>Click “Apply Now” to record application.</li>
              </ol>
              <p className="text-[11px] text-muted-foreground mt-3">
                This is a sample workflow. In a real system, data would be sent
                to government / NGO portals or admin panel.
              </p>
            </Card>

            <Card className="p-5 bg-green-50 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <Award className="w-5 h-5 text-green-700" />
                <h3 className="font-semibold text-lg">Document Checklist</h3>
              </div>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• ID proof (Aadhaar / Trans ID)</li>
                <li>• Latest mark sheet</li>
                <li>• Income certificate (for need-based)</li>
                <li>• Bonafide / admission letter (for college)</li>
              </ul>
            </Card>

            {applications.length > 0 && (
              <Card className="p-5 bg-white border shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-blue-600" />
                  <h3 className="font-semibold text-sm">My Applications (Demo)</h3>
                </div>
                <div className="space-y-2 text-xs">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="border rounded-lg px-3 py-2 bg-slate-50"
                    >
                      <p className="font-semibold text-[11px]">
                        {app.scholarshipName}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Applied on: {app.appliedOn}
                      </p>
                      <p className="mt-1 text-[10px]">
                        Status:{" "}
                        <span className="font-semibold text-blue-600">
                          {app.status}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </section>

        {/* Small Note */}
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-600 rounded text-xs">
          ⚠️ <b>Note:</b> This Scholarships page is a demo flow. For actual
          scholarship applications, users must be redirected to official portals
          or verified NGO forms.
        </div>
      </div>

      {/* Modal: Scholarship Details */}
      {selectedScholarship && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 p-6 shadow-xl max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeScholarship}
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-r ${gradientColor} flex items-center justify-center text-white`}
              >
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  {selectedScholarship.name}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {selectedScholarship.provider} · {selectedScholarship.location}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div className="flex items-center gap-2">
                <Banknote className="w-4 h-4 text-emerald-600" />
                Amount: {selectedScholarship.amount}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                Deadline: {selectedScholarship.deadline}
              </div>
              <div className="flex items-center gap-2">
                <School className="w-4 h-4 text-purple-600" />
                Level: {selectedScholarship.level}
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-orange-600" />
                Type: {selectedScholarship.type}
              </div>
            </div>

            <h3 className="text-sm font-semibold mb-2">Key Highlights</h3>
            <ul className="list-disc list-inside text-xs space-y-1 mb-4">
              {selectedScholarship.highlights.map((h, idx) => (
                <li key={idx}>{h}</li>
              ))}
            </ul>

            <div className="mt-4">
              <label className="text-xs font-semibold">
                Upload Supporting Documents (Demo)
              </label>
              <div className="mt-1 flex items-center gap-3 border rounded-lg px-3 py-2 bg-muted/40">
                <Upload className="w-5 h-5 text-primary" />
                <input
                  type="file"
                  multiple
                  onChange={(e) => setDocuments(e.target.files)}
                  className="text-[11px]"
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">
                Example: ID proof, mark sheet, income certificate (not actually uploaded in demo).
              </p>
            </div>

            <Button
              className={`w-full mt-5 bg-gradient-to-r ${gradientColor} text-white text-sm py-2`}
              disabled={loading}
              onClick={handleApply}
            >
              {loading ? "Submitting..." : "Apply Now (Demo)"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scholarships;
