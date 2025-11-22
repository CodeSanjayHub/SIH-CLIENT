import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Laptop,
  BookOpen,
  User,
  Calendar,
  Clock,
  Award,
  Layers,
  Search,
  Filter,
  Upload,
  CheckCircle,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

const gradientColor = "from-blue-500 to-green-400"; // Unique EduGo blend

// -------------------- Types ------------------------
interface Course {
  id: number;
  title: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string; // "4 weeks"
  mode: "Self-paced" | "Live" | "Hybrid";
  instructor: string;
  provider: string;
  skills: string[];
  description: string;
}

interface Enrollment {
  id: number;
  courseId: number;
  courseTitle: string;
  status: "Pending" | "Enrolled";
  appliedOn: string;
}

// -------------------- Course Data ------------------------
const COURSES: Course[] = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    category: "Coding",
    level: "Beginner",
    duration: "8 weeks",
    mode: "Self-paced",
    instructor: "Rahul Srinivas",
    provider: "Code Academy India",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    description:
      "Learn modern full-stack development and build real-world web applications from scratch.",
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    category: "Design",
    level: "Intermediate",
    duration: "6 weeks",
    mode: "Live",
    instructor: "Ananya Sharma",
    provider: "DesignLab",
    skills: ["Figma", "Wireframing", "User Research", "Prototyping"],
    description:
      "A structured design bootcamp focusing on user experience, wireframes, and visual design.",
  },
  {
    id: 3,
    title: "Digital Marketing & Branding",
    category: "Marketing",
    level: "Beginner",
    duration: "4 weeks",
    mode: "Hybrid",
    instructor: "Suresh Kumar",
    provider: "MarketingPro",
    skills: ["SEO", "Branding", "Social Media Ads", "Email Marketing"],
    description:
      "Perfect for beginners — learn branding, SEO, and how to run ads professionally.",
  },
  {
    id: 4,
    title: "Professional Communication Skills",
    category: "Professional Skills",
    level: "Beginner",
    duration: "3 weeks",
    mode: "Live",
    instructor: "Disha Rao",
    provider: "SkillBridge",
    skills: ["English fluency", "Interview skills", "Public speaking"],
    description:
      "Boost confidence with communication, job interview prep, and professional etiquette.",
  },
];

// -----------------------------------------------------------
const LearnInWeb = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [documents, setDocuments] = useState<FileList | null>(null);

  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);

  // -------- Filters --------
  const filteredCourses = useMemo(() => {
    return COURSES.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.provider.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || c.category === categoryFilter;

      const matchesLevel =
        levelFilter === "all" || c.level === levelFilter;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchTerm, categoryFilter, levelFilter]);

  const openCourse = (course: Course) => {
    setSelectedCourse(course);
    setDocuments(null);
  };

  const closeCourse = () => {
    setSelectedCourse(null);
  };

  const handleEnroll = () => {
    if (!selectedCourse) return;

    setLoading(true);
    setTimeout(() => {
      const newEnroll: Enrollment = {
        id: enrollments.length + 1,
        courseId: selectedCourse.id,
        courseTitle: selectedCourse.title,
        appliedOn: new Date().toISOString().slice(0, 10),
        status: "Enrolled",
      };

      setEnrollments((prev) => [...prev, newEnroll]);
      setLoading(false);
      alert("Enrolled successfully! (Demo)");
      closeCourse();
    }, 800);
  };

  return (
    <div className="bg-muted/20 min-h-screen">
      <Navigation />

      {/* Back button */}
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
        className={`py-16 bg-gradient-to-r ${gradientColor} text-white text-center`}
      >
        <h1 className="text-5xl font-bold mb-3">Learn In Web</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Online courses for skill development — coding, design, marketing,
          communication, and more.
        </p>
      </section>

      {/* Main */}
      <div className="max-w-6xl mx-auto px-6 py-14 space-y-16">

        {/* Search & Filters */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            {/* Search */}
            <div className="flex items-center gap-2 w-full md:w-1/2">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search course, instructor, or provider..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg bg-white text-sm"
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
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="Coding">Coding</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Professional Skills">Professional Skills</option>
              </select>

              <select
                className="border px-3 py-2 rounded-lg bg-white text-xs"
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
        </section>

        {/* Layout: list + helper */}
        <section className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-10 items-start">

          {/* Course List */}
          <div className="space-y-6">
            {filteredCourses.map((c) => (
              <Card
                key={c.id}
                className="p-6 bg-white hover:shadow-md transition cursor-pointer"
                onClick={() => openCourse(c)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      {c.title}
                      <span className="text-[10px] px-2 py-1 rounded-full bg-blue-100 text-blue-600">
                        {c.level}
                      </span>
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {c.provider} · Instructor: {c.instructor}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Layers className="w-3 h-3" /> {c.category}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm flex items-center gap-1 justify-end">
                      <Clock className="w-4 h-4 text-green-600" /> {c.duration}
                    </p>
                    <p className="text-xs flex items-center gap-1 justify-end mt-1 text-purple-600">
                      <Calendar className="w-3 h-3" /> {c.mode}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-[10px]">
                  {c.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <Button
                  className={`mt-4 text-xs bg-gradient-to-r ${gradientColor} text-white`}
                >
                  View Course Details
                </Button>
              </Card>
            ))}
          </div>

          {/* Helper Panel */}
          <div className="space-y-6">

            <Card className="p-5 bg-white shadow-sm">
              <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                How It Works (Demo)
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Browse courses and open details</li>
                <li>• Upload documents (optional)</li>
                <li>• Enroll in a course (demo only)</li>
              </ul>
            </Card>

            <Card className="p-5 bg-green-50 border border-green-200">
              <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-green-700" />
                Skills You Can Learn
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Programming & Web Development</li>
                <li>• Graphic & UI/UX Design</li>
                <li>• Branding & Digital Marketing</li>
                <li>• Communication & Professional Skills</li>
              </ul>
            </Card>

            {enrollments.length > 0 && (
              <Card className="p-5 bg-white border shadow-sm">
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-600" />
                  My Enrollments (Demo)
                </h3>
                {enrollments.map((e) => (
                  <div
                    key={e.id}
                    className="border rounded-lg px-3 py-2 bg-gray-50 mb-2 text-xs"
                  >
                    <p className="font-semibold">{e.courseTitle}</p>
                    <p className="text-[10px]">Applied on: {e.appliedOn}</p>
                    <p className="text-[10px] text-blue-600">Status: {e.status}</p>
                  </div>
                ))}
              </Card>
            )}
          </div>
        </section>
      </div>

      {/* Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-2xl p-6 mx-4 shadow-xl max-h-[90vh] overflow-y-auto relative">

            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={closeCourse}
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-10 bg-gradient-to-r ${gradientColor} text-white rounded-lg flex items-center justify-center`}
              >
                <Laptop className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{selectedCourse.title}</h2>
                <p className="text-xs text-muted-foreground">
                  {selectedCourse.provider} · Instructor: {selectedCourse.instructor}
                </p>
              </div>
            </div>

            {/* Course Info */}
            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                Category: {selectedCourse.category}
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-green-600" />
                Level: {selectedCourse.level}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600" />
                Duration: {selectedCourse.duration}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-600" />
                Mode: {selectedCourse.mode}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-700 mb-3">
              {selectedCourse.description}
            </p>

            {/* Skills */}
            <h3 className="text-sm font-semibold mb-2">Skills Covered</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCourse.skills.map((s) => (
                <span
                  key={s}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-[10px] rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Upload */}
            <div>
              <label className="text-xs font-semibold">
                Upload Learning Intent (optional)
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
            </div>

            {/* Enroll */}
            <Button
              className={`w-full mt-5 bg-gradient-to-r ${gradientColor} text-white`}
              disabled={loading}
              onClick={handleEnroll}
            >
              {loading ? "Enrolling..." : "Enroll Now (Demo)"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnInWeb;
