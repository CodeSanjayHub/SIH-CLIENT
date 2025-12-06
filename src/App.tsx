// src/App.jsx (or App.tsx) — updated to use LocalAuthGuards
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import Home from "./pages/Home";
import Services from "./pages/Services/Services";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Documents from "./pages/Documents";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import InsuranceHub from "@/pages/Services/Health/InsuranceHub";
import HealWell from "./pages/Services/Health/HealWell";
import CareConnect from "@/pages/Services/Health/CareConnect";
import SOS from "@/pages/Services/Safety/SOS";
import ViolenceReport from "./pages/Services/Safety/ViolenceReport";
import LegalSupport from "@/pages/Services/Safety/LegalSupport";
import PolicyUpdates from "@/pages/Services/Safety/PolicyUpdates";
import CareerPath from "@/pages/Services/Career/CareerPath";
import SkillHunt from "@/pages/Services/Career/SkillHunt";
import FreelancingGig from "@/pages/Services/Career/FreelancingGig";
import Scholarships from "@/pages/Services/EduGo/Scholarships";
import LearnInWeb from "./pages/Services/EduGo/LearnInWeb";
import ExamPrepare from "./pages/Services/EduGo/ExamPrepare";
import PridePath from "./pages/Services/EduGo/PridePath";
import Hostels from "./pages/Services/Shelter/Hostels";
import RentalHomes from "@/pages/Services/Shelter/RentalHomes";
import Hotels from "@/pages/Services/Shelter/Hotels";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";

import { OnlyGuest, RequireAuth } from './components/LocalAuthGuards';

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />

      {/* Login - only for guests (not authenticated) */}
      <Route element={<OnlyGuest />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Register - only for authenticated users */}
      <Route path="/register" element={<Register />} />

      <Route path="/documents" element={<Documents />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />

      <Route path="/services/insurance-hub" element={<InsuranceHub />} />
      <Route path="/services/healwell" element={<HealWell />} />
      <Route path="/services/skill-hunt" element={<SkillHunt />} />
      <Route path="/services/freelancing-&-gig" element={<FreelancingGig />} />
      <Route path="/services/careconnect+" element={<CareConnect />} />
      <Route path="/services/scholarships" element={<Scholarships />} />
      <Route path="/services/learn-in-web" element={<LearnInWeb />} />
      <Route path="/services/sos" element={<SOS />} />
      <Route path="/services/violence-reporting-tool" element={<ViolenceReport />} />
      <Route path="/services/legal-support-directory" element={<LegalSupport />} />
      <Route path="/services/policy-updates" element={<PolicyUpdates />} />
      <Route path="/services/exam-prepare" element={<ExamPrepare />} />
      <Route path="/services/hostels" element={<Hostels />} />
      <Route path="/services/hotels" element={<Hotels />} />

      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="/services/rental-homes" element={<RentalHomes />} />
      <Route path="/services/pridepath" element={<PridePath />} />
      <Route path="/services/career-path" element={<CareerPath />} />
    </Routes>
  </BrowserRouter>
);

export default App;
