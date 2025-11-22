import { Stethoscope, Heart, Users, Briefcase, GraduationCap, Shield, Phone, AlertTriangle, Scale, FileText, Home, Siren } from "lucide-react";

export const modules: any = {
  health: [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Insurance Hub",
      description:
        "Provides comprehensive gender-affirming surgery insurance coverage.",
      features: ["Pre-authorization", "Claims processing", "Coverage verification"],
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "HealWell",
      description: "Post-surgery counseling and health support.",
      features: ["Therapists", "Support groups", "Recovery help"],
    },
    {
      icon: <Stethoscope className="w-6 h-6" />,
      title: "CareConnect+",
      description: "Directory of trans-friendly healthcare providers.",
      features: ["Verified doctors", "Ratings", "Specialists"],
    },
  ],

  safety: [
    {
      icon: <Siren className="w-6 h-6" />,
      title: "SOS & Safety",
      slug: "sos",
      description:
        "Emergency alerts and safe shelter access for urgent situations.",
      features: ["Emergency alert", "Safe shelters", "Crisis support"],
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Violence Reporting Tool",
      description: "Report harassment or violence securely.",
      features: ["Anonymous", "Legal guidance", "Evidence upload"],
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Legal Support Directory",
      description: "Lawyers trained in LGBTQ+ rights.",
      features: ["Pro bono lawyers", "Consultations"],
    },
  ],

  career: [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Career Path",
      description: "Job listings based on qualification.",
      features: ["Resume help", "Job listings"],
    },
  ],

  edugo: [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Scholarships",
      description: "Financial aid for education and skill development.",
      features: ["Merit-based", "Needs-based"],
    },
  ],

  shelter: [
    {
      icon: <Home className="w-6 h-6" />,
      title: "Hostels",
      description: "Safe hostels for transgender individuals.",
      features: ["Verified", "Safe environment"],
    },
  ],
};

export const moduleColors: any = {
  health: "from-blue-500 to-blue-400",
  safety: "from-red-500 to-red-400",
  career: "from-teal-500 to-teal-400",
  edugo: "from-green-500 to-green-400",
  shelter: "from-purple-500 to-purple-400",
};

export const moduleNames: any = {
  health: "Health",
  safety: "Safety",
  career: "Career Path",
  edugo: "EduGo",
  shelter: "Shelter+",
  
};
