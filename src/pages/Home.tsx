import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Users, 
  Shield, 
  Stethoscope, 
  Briefcase, 
  Scale,
  ArrowRight,
  CheckCircle,
  Star,
  Phone
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Stethoscope className="w-8 h-8 text-primary" />,
      title: "Healthcare Support",
      description: "Access to trans-friendly healthcare providers, insurance coverage, and post-surgery counseling services."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-accent" />,
      title: "Economic Empowerment",
      description: "Job opportunities, career mentorship, scholarships, and financial aid programs for transgender individuals."
    },
    {
      icon: <Scale className="w-8 h-8 text-trust" />,
      title: "Legal & Safety",
      description: "Legal aid, emergency shelters, violence reporting tools, and policy updates to protect your rights."
    }
  ];

  const benefits = [
    "Comprehensive healthcare directory",
    "Verified job opportunities",
    "24/7 emergency support",
    "Legal consultation access",
    "Community mentorship programs",
    "Educational scholarships"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light/20 to-secondary/20"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                TransEmpower
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-8 animate-slide-up">
              Equal Opportunities & Empowered Lives
            </p>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in">
              Comprehensive support platform providing healthcare, employment opportunities, 
              legal aid, and empowerment resources for transgender individuals. 
              Building a more inclusive and supportive community together.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-bounce-in">
              <Link to="/register">
                <Button className="bg-gradient-to-r from-accent to-accent-light text-white hover:shadow-lg text-lg px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 group">
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" className="text-lg px-8 py-4 rounded-xl border-2 hover:bg-muted transition-all duration-300">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div> 
        </div>

        {/* Featured Stats */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center bg-card/90 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-2">Healthcare</div>
              <p className="text-sm text-muted-foreground">Insurance, counseling & trans-friendly doctors</p>
            </Card>
            <Card className="p-6 text-center bg-card/90 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-2xl font-bold bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent mb-2">Employment</div>
              <p className="text-sm text-muted-foreground">Job listings, mentorship & scholarships</p>
            </Card>
            <Card className="p-6 text-center bg-card/90 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-2xl font-bold bg-gradient-to-r from-trust to-primary bg-clip-text text-transparent mb-2">Legal Aid</div>
              <p className="text-sm text-muted-foreground">Support, shelters & policy updates</p>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              TransEmpower is dedicated to creating equal opportunities and empowered lives for transgender individuals. 
              We provide comprehensive support through healthcare, employment, legal aid, and community resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 text-center border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-light to-secondary rounded-2xl flex items-center justify-center shadow-md">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Why Choose <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">TransEmpower</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We understand the unique challenges faced by transgender individuals and provide 
                comprehensive, confidential, and culturally competent support services.
              </p>
              
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link to="/services">
                <Button className="bg-gradient-to-r from-trust to-primary text-white text-lg px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  Explore All Services
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <Card className="p-8 shadow-xl bg-gradient-to-br from-primary-light/20 to-secondary/20 border-0">
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center shadow-lg">
                      <Heart className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Community First</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Built by and for the transgender community, ensuring authentic support and understanding.
                  </p>
                  <div className="flex justify-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-warning fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Trusted by thousands of community members</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Support Banner */}
      <section className="py-8 bg-gradient-to-r from-destructive/10 to-warning/10 border-y border-destructive/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-destructive mb-4">Need Immediate Help?</h3>
            <p className="text-foreground mb-6">24/7 Crisis Support Available</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-destructive hover:bg-destructive/90 text-white px-8 py-3">
                <Phone className="w-4 h-4 mr-2" />
                Call Helpline: +91 1800-123-4567
              </Button>
              <Link to="/contact">
                <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10 px-8 py-3">
                  Get Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of community members who have found support, opportunities, and empowerment through TransEmpower.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Create Your Account
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4 rounded-xl border-2 transition-all duration-300">
                Get Support
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">TransEmpower</span>
                  <p className="text-sm text-muted-foreground">Equal Opportunities & Empowered Lives</p>
                </div>
              </Link>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                Empowering transgender individuals through comprehensive support, resources, and community connection.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
                <li><Link to="/documents" className="hover:text-primary transition-colors">Documents</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link to="/profile" className="hover:text-primary transition-colors">Profile</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Accessibility</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 mt-8 text-center text-muted-foreground">
            <p>&copy; 2024 TransEmpower. All rights reserved. Building a more inclusive future together.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;