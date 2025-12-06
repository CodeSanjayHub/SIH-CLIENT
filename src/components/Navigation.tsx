import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Heart, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const token = localStorage.getItem("token"); // check if logged in

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/documents', label: 'Documents' },
    { path: '/contact', label: 'Contact' },
    { path: '/profile', label: 'Profile' },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-[var(--shadow-soft)]">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl shadow-[var(--shadow-soft)] group-hover:shadow-[var(--shadow-card)] transition">
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

          {/* Desktop Menu */}
          <div className="flex items-center space-x-6">
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

            {/* Auth Buttons (Desktop) */}
            <div className="hidden md:flex items-center space-x-3">
              {!token ? (
                // Show only LOGIN
                <Link to="/login">
                  <Button variant="outline" className="focus-ring">
                    Login
                  </Button>
                </Link>
              ) : (
                // Show LOGOUT
                <Button variant="outline" className="focus-ring" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition focus-ring"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border mt-4 pt-4 pb-6 animate-fade-in">
            <div className="flex flex-col space-y-3">

              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-center font-medium transition",
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  {item.label}
                </Link>
              ))}

              {/* Auth Buttons (Mobile) */}
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">

                {/* Only Login when NOT logged in */}
                {!token && (
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full focus-ring">
                      Login
                    </Button>
                  </Link>
                )}

                {/* Logout when logged in */}
                {token && (
                  <Button
                    variant="outline"
                    className="w-full focus-ring"
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                  >
                    Logout
                  </Button>
                )}
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
