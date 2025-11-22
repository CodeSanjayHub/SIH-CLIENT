import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Users, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 hero-gradient opacity-80"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            <span className="text-gradient-empowerment">TransEmpower</span>
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
              <Button className="btn-accent text-lg px-8 py-4 focus-ring group">
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" className="text-lg px-8 py-4 focus-ring border-2">
                Explore Services
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-muted-foreground animate-fade-in">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-trust" />
              <span className="text-sm font-medium">Secure & Confidential</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Community Driven</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Inclusive & Supportive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Stats */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="empowerment-card text-center bg-card/80 backdrop-blur-sm">
            <div className="text-2xl font-bold text-gradient-primary mb-2">Healthcare</div>
            <p className="text-sm text-muted-foreground">Insurance, counseling & trans-friendly doctors</p>
          </div>
          <div className="empowerment-card text-center bg-card/80 backdrop-blur-sm">
            <div className="text-2xl font-bold text-gradient-empowerment mb-2">Employment</div>
            <p className="text-sm text-muted-foreground">Job listings, mentorship & scholarships</p>
          </div>
          <div className="empowerment-card text-center bg-card/80 backdrop-blur-sm">
            <div className="text-2xl font-bold text-gradient-primary mb-2">Legal Aid</div>
            <p className="text-sm text-muted-foreground">Support, shelters & policy updates</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;