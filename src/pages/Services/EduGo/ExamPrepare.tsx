import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BookOpen,
  Landmark,
  Target,
  ClipboardList,
  FileText,
  Clock,
  TrendingUp,
  Bell,
  Calculator,
  Brain,
  ShieldCheck,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const gradientColor = "from-green-600 to-emerald-400";

const ExamPrepare = () => {
  const navigate = useNavigate();

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
        <h1 className="text-5xl font-bold mb-3">Exam Prepare Hub</h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          Central hub for government, bank, and competitive exam preparation –
          with curated material for transgender and gender-diverse learners.
        </p>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Overview */}
        <Card className="p-10 shadow-xl bg-white border">
          <div className="flex items-center gap-4 mb-10">
            <div
              className={`p-4 rounded-xl text-white bg-gradient-to-r ${gradientColor}`}
            >
              <BookOpen className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-3xl font-bold">One Place for All Exam Prep</h2>
              <p className="text-muted-foreground mt-1">
                Plan your studies for SSC, Banking, TNPSC, UPSC, Railways, and
                more – with focused material, mock tests, and previous year
                questions.
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 bg-green-50 border-green-200">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-green-700" />
                Govt & Bank Exams
              </h3>
              <p className="text-sm text-gray-700">
                Structured sections for SSC, Banking, TNPSC, UPSC, and other
                competitive exams.
              </p>
            </Card>

            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-blue-700" />
                Smart Study Plan
              </h3>
              <p className="text-sm text-gray-700">
                Topic-wise approach with syllabus mapping and suggested order of
                preparation.
              </p>
            </Card>

            <Card className="p-6 bg-emerald-50 border-emerald-200">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                Inclusive & Safe
              </h3>
              <p className="text-sm text-gray-700">
                Focus on safe, stigma-free learning space for transgender
                aspirants.
              </p>
            </Card>
          </div>
        </Card>

        {/* EXAM CATEGORIES */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Exam Categories</h2>
          <p className="text-sm text-muted-foreground">
            Choose the exam you are targeting – we’ll show syllabus focus and
            useful resources (demo view).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-5 bg-white border hover:shadow-md transition">
              <h3 className="font-bold text-lg flex items-center gap-2 mb-1">
                <Landmark className="w-5 h-5 text-green-700" />
                SSC / Central Exams
              </h3>
              <p className="text-xs text-muted-foreground mb-2">
                CHSL · CGL · MTS
              </p>
              <p className="text-sm text-gray-700 mb-3">
                Focus: Aptitude, Reasoning, English, and General Awareness.
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-xs">
                  View Syllabus
                </Button>
                <Button
                  size="sm"
                  className="text-xs bg-gradient-to-r from-green-600 to-emerald-400 text-white"
                >
                  Download Guide
                </Button>
              </div>
            </Card>

            <Card className="p-5 bg-white border hover:shadow-md transition">
              <h3 className="font-bold text-lg flex items-center gap-2 mb-1">
                <Calculator className="w-5 h-5 text-blue-700" />
                Banking & Insurance
              </h3>
              <p className="text-xs text-muted-foreground mb-2">
                IBPS · SBI · RBI
              </p>
              <p className="text-sm text-gray-700 mb-3">
                Focus: Quantitative Aptitude, Reasoning, English, Banking
                Awareness.
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-xs">
                  View Syllabus
                </Button>
                <Button
                  size="sm"
                  className="text-xs bg-gradient-to-r from-green-600 to-emerald-400 text-white"
                >
                  Strategy PDF
                </Button>
              </div>
            </Card>

            <Card className="p-5 bg-white border hover:shadow-md transition">
              <h3 className="font-bold text-lg flex items-center gap-2 mb-1">
                <Target className="w-5 h-5 text-emerald-700" />
                TNPSC / State Exams
              </h3>
              <p className="text-xs text-muted-foreground mb-2">
                Group I · Group II · VAO
              </p>
              <p className="text-sm text-gray-700 mb-3">
                Focus: State syllabus, GS, Current Affairs, and Tamil/Regional.
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-xs">
                  View Syllabus
                </Button>
                <Button
                  size="sm"
                  className="text-xs bg-gradient-to-r from-green-600 to-emerald-400 text-white"
                >
                  Previous Papers
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* SYLLABUS & STUDY BLOCKS */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Core Subjects & Study Packs</h2>
          <p className="text-sm text-muted-foreground">
            These sections are common for most exams. Start here and then adapt
            to your target exam.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white border">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-green-700" />
                Quantitative Aptitude
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Topics: Percentages, Profit & Loss, Simple & Compound Interest,
                Time & Work, Speed & Distance, Data Interpretation.
              </p>
              <ul className="text-xs text-gray-700 list-disc list-inside mb-3">
                <li>Formula sheet PDF</li>
                <li>Chapter-wise question sets</li>
                <li>Mixed difficulty practice</li>
              </ul>
              <Button
                size="sm"
                className="text-xs bg-gradient-to-r from-green-600 to-emerald-400 text-white flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Aptitude Pack
              </Button>
            </Card>

            <Card className="p-6 bg-white border">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-700" />
                Reasoning Ability
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Topics: Puzzles, Seating arrangement, Syllogism, Blood
                relations, Coding–Decoding, Direction sense.
              </p>
              <ul className="text-xs text-gray-700 list-disc list-inside mb-3">
                <li>Topic-wise PDF notes</li>
                <li>Practice puzzles with solutions</li>
                <li>High-level questions for mains</li>
              </ul>
              <Button
                size="sm"
                className="text-xs bg-gradient-to-r from-green-600 to-emerald-400 text-white flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Reasoning Pack
              </Button>
            </Card>

            <Card className="p-6 bg-white border">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-700" />
                English / Language
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Topics: Grammar basics, Comprehension, Cloze test, Error
                spotting, Vocabulary (idioms, phrases, synonyms).
              </p>
              <ul className="text-xs text-gray-700 list-disc list-inside mb-3">
                <li>Daily editorial reading plan</li>
                <li>Practice sets with explanations</li>
                <li>Vocabulary flashcards</li>
              </ul>
              <Button
                size="sm"
                className="text-xs bg-gradient-to-r from-green-600 to-emerald-400 text-white flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download English Pack
              </Button>
            </Card>

            <Card className="p-6 bg-white border">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-700" />
                General Awareness & Current Affairs
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Topics: Economy, Polity, Science, Geography, National/International
                news, Important days.
              </p>
              <ul className="text-xs text-gray-700 list-disc list-inside mb-3">
                <li>Monthly CA PDF (demo placeholder)</li>
                <li>Static GK one-liners</li>
                <li>Exam-focused revision notes</li>
              </ul>
              <Button
                size="sm"
                className="text-xs bg-gradient-to-r from-green-600 to-emerald-400 text-white flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download GA Pack
              </Button>
            </Card>
          </div>
        </section>

        {/* MOCK TEST CENTRE */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Mock Test Centre (Demo)</h2>
          <p className="text-sm text-muted-foreground">
            Practice in exam-like environment. In real integration, these would
            open full test pages with timers and question panels.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white border flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg mb-1">Full-Length Mock Test</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  100 Questions · 60 Minutes
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  Mix of Aptitude, Reasoning, English, and GA – exam pattern
                  simulation.
                </p>
              </div>
              <Button className="bg-gradient-to-r from-green-600 to-emerald-400 text-white text-sm mt-2">
                Start Full Mock (Demo)
              </Button>
            </Card>

            <Card className="p-6 bg-white border flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg mb-1">Sectional Test Pack</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  25 Questions · 20 Minutes / section
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  Practice one section at a time: Aptitude, Reasoning, English,
                  or GA.
                </p>
              </div>
              <Button className="bg-gradient-to-r from-green-600 to-emerald-400 text-white text-sm mt-2">
                Start Sectional Test (Demo)
              </Button>
            </Card>
          </div>
        </section>

        {/* PREVIOUS YEAR PAPERS & CUTOFFS */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Previous Year Papers & Cut-Offs</h2>
          <p className="text-sm text-muted-foreground">
            Analyzing old papers & cut-offs helps you understand real exam
            difficulty and safe score.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-5 bg-white border">
              <h3 className="font-bold text-lg mb-1">
                SSC CGL – Previous Year Paper (2023)
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Includes question paper + answer key (demo placeholder).
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Cut-off reference: General, OBC, SC/ST categories.
              </p>
              <Button
                size="sm"
                className="text-xs bg-gradient-to-r from-green-600 to-emerald-400 text-white flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Paper (Demo)
              </Button>
            </Card>

            <Card className="p-5 bg-white border">
              <h3 className="font-bold text-lg mb-1">
                IBPS PO – Mains Paper Overview
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Pattern, difficulty level, and memory-based questions summary.
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Includes safe attempt analysis & expected cut-off (demo text).
              </p>
              <Button
                size="sm"
                className="text-xs bg-gradient-to-r from-green-600 to-emerald-400 text-white flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> View Analysis (Demo)
              </Button>
            </Card>
          </div>
        </section>

        {/* ALERTS & SUPPORT */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Updates & Support</h2>

          <Card className="p-5 bg-emerald-50 border-l-4 border-emerald-600 flex gap-3 items-start">
            <Bell className="w-6 h-6 text-emerald-700 mt-1" />
            <div className="text-sm">
              <p className="font-semibold mb-1">Exam Notifications (Demo)</p>
              <p>
                This section can later be connected to real APIs or admin panel
                where new notifications about exam dates and applications can be
                added.
              </p>
            </div>
          </Card>

          <Card className="p-5 bg-blue-50 border-l-4 border-blue-600 flex gap-3 items-start">
            <ShieldCheck className="w-6 h-6 text-blue-700 mt-1" />
            <div className="text-sm">
              <p className="font-semibold mb-1">
                Safe & Inclusive Learning Environment
              </p>
              <p>
                If you face discrimination during coaching or exam guidance,
                you can connect with Legal Support and Safety modules from the
                main Services page.
              </p>
            </div>
          </Card>
        </section>

        {/* Disclaimer */}
        <div className="p-4 bg-gray-100 border-l-4 border-gray-500 rounded text-sm">
          ⚠️ <b>Disclaimer:</b> This Exam Prepare Hub is a demo facilitation
          space. Official exam patterns, eligibility, and notifications should
          always be confirmed from the respective government or exam authority
          websites.
        </div>
      </div>
    </div>
  );
};

export default ExamPrepare;
