import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Users, Stethoscope, Heart, Siren,Briefcase, GraduationCap, Shield, Phone, AlertTriangle, Scale, FileText, Home } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* ---------------------------------------------------
   🔥  SERVICES DATA MOVED HERE (STATIC)
-----------------------------------------------------*/

export const modules: any = {
  health: [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Insurance Hub",
      description: "Provides comprehensive gender-affirming surgery insurance coverage including pre-authorization, claims assistance, and coverage verification.",
      features: ["Pre-authorization support", "Claims processing", "Provider network", "Coverage verification"]
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "HealWell",
      description: "Post-surgery counseling, mental health support, and rehabilitation guidance.",
      features: ["Licensed therapists", "Support groups", "Recovery planning", "24/7 helpline"]
    },
    {
      icon: <Stethoscope className="w-6 h-6" />,
      title: "CareConnect+",
      description: "Directory of verified trans-friendly doctors, clinics, and healthcare providers.",
      features: ["Verified providers", "Reviews & ratings", "Appointment booking", "Specialist referrals"]
    }
  ],

  safety: [
    {
      icon: <Siren className="w-6 h-6 text-white" />,
      title: "SOS & Safety",
      slug: "sos",
      description: "Immediate emergency shelters and NGO contacts for safety and protection.",
      features: ["24/7 emergency line", "Safe shelter network", "Crisis intervention", "Temporary housing"]
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Violence Reporting Tool",
      description: "Secure platform to report harassment, discrimination, or violence.",
      features: ["Anonymous reporting", "Legal guidance", "Evidence collection", "Advocacy support"]
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Legal Support Directory",
      description: "Access to low-cost and free lawyers specializing in LGBTQ+ rights.",
      features: ["Pro bono lawyers", "Legal consultations", "Document assistance", "Court representation"]
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Policy Updates",
      description: "Real-time updates on laws, government schemes, and policy changes affecting transgender rights.",
      features: ["Real-time updates", "Policy analysis", "Rights information", "Advocacy alerts"]
    }
  ],

  career: [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Career Path",
      description: "Job listings and career guidance tailored for literate transgender individuals.",
      features: ["Qualification-based jobs", "Resume & interview prep", "Networking events", "Skill building"]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Skill Hunt",
      description: "Skill-based job opportunities like tailoring, cooking, beauty services.",
      features: ["Tailoring", "Culinary services", "Beauty services", "Community-based support"]
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Freelancing & Gig",
      description: "Partnerships with delivery and e-commerce platforms for gig work.",
      features: ["Food delivery", "E-commerce delivery", "Task-based gigs", "Flexible timings"]
    }
  ],

  edugo: [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Scholarships",
      description: "Financial aid for education and skill courses.",
      features: ["Merit scholarships", "Need-based aid", "Grants", "Skill training funds"]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Learn in Web",
      description: "Online courses for skill development.",
      features: ["Coding", "Design", "Marketing", "Professional skills"]
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Exam Prepare",
      description: "Study material and mock tests.",
      features: ["Study material", "Mock tests", "Exam strategies", "Coaching support"]
    },
    {
      icon: <Stethoscope className="w-6 h-6" />,
      title: "PridePath",
      description: "Mentorship from transgender community members.",
      features: ["1-on-1 mentorship", "Career counseling", "Skill guidance", "Networking opportunities"]
    }
  ],

  shelter: [
    {
      icon: <Home className="w-6 h-6" />,
      title: "Hostels",
      description: "Trans-friendly hostels for safe living.",
      features: ["Men hostels", "Women hostels", "Shared rooms", "Secure facilities"]
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Rental Homes",
      description: "Verified landlords offering safe rental spaces.",
      features: ["Private apartments", "Shared homes", "Verified landlords", "Inclusive environment"]
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Hotels",
      description: "Trans-friendly hotels for short stays.",
      features: ["Budget hotels", "Premium hotels", "Verified listings", "Safe environment"]
    }
  ]
};

export const moduleColors: any = {
  health: 'from-blue-500 to-blue-400',
  safety: 'from-red-500 to-red-400',
  career: 'from-teal-500 to-teal-400',
  edugo: 'from-green-500 to-green-400',
  shelter: 'from-purple-500 to-purple-400'
};

export const moduleNames: any = {
  health: 'Health',
  safety: 'Safety',
  career: 'Career Path',
  edugo: 'EduGo',
  shelter: 'Shelter+'
};

/* ---------------------------------------------------
   END OF STATIC DATA
-----------------------------------------------------*/

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState('all');
  const navigate = useNavigate();

  const ServiceCard = ({ service, color }: { service: any; color: string }) => (
    <Card
      className="service-card group h-full cursor-pointer flex flex-col justify-between p-6"

      onClick={() => {
        if (service.slug) {
          navigate(`/services/${service.slug}`);
          return;
        }
        navigate(`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`);
      }}
    >
      <div className="mb-4">
        <div className="flex items-start space-x-4 mb-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-[var(--shadow-soft)] bg-gradient-to-r ${color} text-white`}
          >
            {service.icon}
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-muted-foreground text-sm">{service.description}</p>
          </div>
        </div>

        <div className="space-y-2">
          {service.features.map((feature: string, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
              <span className="text-sm text-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <Button className={`w-full focus-ring group bg-gradient-to-r ${color} text-white mt-4`}>
        Learn More
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </Card>
  );

  const displayedModules = Object.keys(modules).filter((key) => {
    if (selectedModule !== 'all' && selectedModule !== key) return false;
    return moduleNames[key].toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="py-20 bg-gradient-to-r from-primary-light to-secondary text-center">
        <h1 className="text-5xl font-bold text-gradient-empowerment mb-6">Our Services</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Comprehensive support across healthcare, safety, career, education, and shelter.
        </p>
      </section>

      {/* Search */}
      <section className="py-8 bg-muted/20 text-center">
        <input
          type="text"
          placeholder="Search modules e.g., Health, Safety"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-6 text-sm"
        />

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <Button size="sm" variant={selectedModule === 'all' ? 'default' : 'outline'} onClick={() => setSelectedModule('all')}>
            All
          </Button>

          {Object.keys(modules).map((key) => (
            <Button
              key={key}
              size="sm"
              variant={selectedModule === key ? 'default' : 'outline'}
              onClick={() => setSelectedModule(key)}
            >
              {moduleNames[key]}
            </Button>
          ))}
        </div>
      </section>

      {/* Module Cards */}
      {displayedModules.length === 0 ? (
        <div className="text-center py-20 text-xl font-semibold text-muted-foreground">No module found</div>
      ) : (
        displayedModules.map((key) => (
          <section key={key} className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              <div className="text-center mb-20">
                <div className="flex justify-center mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-[var(--shadow-card)] bg-gradient-to-r ${moduleColors[key]}`}
                  >
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>

                <h2 className="text-4xl font-bold mb-6">{moduleNames[key]} Module</h2>

                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {`Explore the services available in ${moduleNames[key]}. All offerings are designed to support transgender individuals in a safe, professional, and inclusive environment.`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {modules[key].map((service: any, index: number) => (
                  <ServiceCard key={index} service={service} color={moduleColors[key]} />
                ))}
              </div>

            </div>
          </section>
        ))
      )}
    </div>
  );
};

export default Services;
