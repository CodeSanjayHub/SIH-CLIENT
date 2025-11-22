import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Heart, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/documents', label: 'Documents' },
    { path: '/contact', label: 'Contact' },
    { path: '/profile', label: 'Profile' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-[var(--shadow-soft)]">
      {/* Removed max-w-7xl + mx-auto */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left Side - Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl shadow-[var(--shadow-soft)] group-hover:shadow-[var(--shadow-card)] transition-[var(--transition-smooth)]">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gradient-primary">TransEmpower</span>
                <span className="text-xs text-muted-foreground hidden sm:block">
                  Equal Opportunities & Empowered Lives
                </span>
              </div>
            </Link>
          </div>

          {/* Right Side - Nav + Auth + Mobile Menu */}
          <div className="flex items-center space-x-6">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "nav-link font-medium",
                    isActive(item.path) && "text-primary after:scale-x-100"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/login">
                <Button variant="outline" className="focus-ring">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="btn-primary focus-ring">
                  Register
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-[var(--transition-smooth)] focus-ring"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border mt-4 pt-4 pb-6 animate-fade-in">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-center font-medium transition-[var(--transition-smooth)]",
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  {item.label}
                </Link>
              ))}

              {/* Auth Buttons - Mobile */}
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full focus-ring">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button className="btn-primary w-full focus-ring">
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Trust Badge */}
      <div className="hidden lg:block absolute top-20 right-8">
        <div className="trust-badge flex items-center space-x-2">
          <Shield className="w-4 h-4" />
          <span>Secure & Confidential</span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
