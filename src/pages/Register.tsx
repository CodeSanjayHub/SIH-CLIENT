import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { dummyTransgenderData, dummyAadhaarData } from '@/data/identityData';

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    identityNumber: "",
    name: "",
    dob: "",
    email: "",
    phone: "",
    agreeToTerms: false
  });

  const [identityError, setIdentityError] = useState("");

  // ===========================
  // Identity Input Validation
  // ===========================
  const handleIdentityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase();
    let error = "";

    // 1. TG ID validation
    if (value.startsWith("TG")) {
      value = value.replace(/[^TG0-9]/g, "");
      if (value.length > 8) value = value.slice(0, 8);
      if (!/^TG\d{0,6}$/.test(value)) {
        error = "Enter a valid Transgender ID (e.g., TG123456).";
      }
    }

    // 2. Aadhaar validation
    else if (/^\d/.test(value)) {
      value = value.replace(/\D/g, "");
      if (value.length > 12) value = value.slice(0, 12);
      if (!/^\d{0,12}$/.test(value)) {
        error = "Enter a valid 12-digit Aadhaar number.";
      }
    }

    setFormData(prev => ({ ...prev, identityNumber: value }));

    // ===========================
    // Auto-Fill using Dummy Data
    // ===========================
    if (dummyTransgenderData[value]) {
      const d = dummyTransgenderData[value];
      setIdentityError("");
      setFormData(prev => ({
        ...prev,
        name: d.name,
        dob: d.dob,
        email: d.email,
        phone: d.phone
      }));
      return;
    }

    if (dummyAadhaarData[value]) {
      const d = dummyAadhaarData[value];
      setIdentityError("");
      setFormData(prev => ({
        ...prev,
        name: d.name,
        dob: d.dob,
        email: d.email,
        phone: d.phone
      }));
      return;
    }

    // Valid format but NOT found
    if (value.startsWith("TG") && value.length === 8) {
      error = "Transgender ID not found. Please check and try again.";
    }
    if (/^\d{12}$/.test(value)) {
      error = "Aadhaar number not found. Please verify and try again.";
    }

    setIdentityError(error);

    // Reset auto-filled data
    setFormData(prev => ({
      ...prev,
      name: "",
      dob: "",
      email: "",
      phone: ""
    }));
  };

  // ===========================
  // Submit → Call Backend API
  // ===========================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.identityNumber.trim()) {
      return toast({
        title: "Identity Required",
        description: "Please enter your Transgender ID or Aadhaar number.",
        variant: "destructive",
      });
    }

    if (identityError || !formData.name) {
      return toast({
        title: "Invalid Identity",
        description: "Please enter a valid and registered ID.",
        variant: "destructive",
      });
    }

    if (!formData.agreeToTerms) {
      return toast({
        title: "Terms Not Accepted",
        description: "Please accept the Terms & Conditions.",
        variant: "destructive",
      });
    }

    setLoading(true);

    try {
     const response = await fetch("http://localhost:5000/api/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    identityNumber: formData.identityNumber,
    name: formData.name,
    dob: formData.dob,
    email: formData.email,
    phone: formData.phone
  })
});


      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Registration Failed",
          description: data.message || "Unable to register.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      toast({
        title: "Registration Successful!",
        description: "Your details have been saved.",
      });

      // Reset form
      setFormData({
        identityNumber: "",
        name: "",
        dob: "",
        email: "",
        phone: "",
        agreeToTerms: false
      });

      setIdentityError("");
      setLoading(false);

      navigate("/login");

    } catch (err) {
      toast({
        title: "Server Error",
        description: "Unable to connect to server. Try again later.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  // ===========================
  // UI (unchanged)
  // ===========================
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/20 to-secondary/20">
      <Navigation />

      <div className="py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="empowerment-card p-8">

            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center shadow-[var(--shadow-card)]">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gradient-empowerment mb-2">Join TransEmpower</h1>
              <p className="text-muted-foreground">Create your account to access all services</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Identity Input */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Transgender ID / Aadhaar Number *
                </Label>
                <Input
                  type="text"
                  value={formData.identityNumber}
                  onChange={handleIdentityInput}
                  className="form-input"
                  placeholder="Enter Transgender ID or Aadhaar Number"
                />
                {identityError && (
                  <div className="flex items-center space-x-2 text-destructive text-sm mt-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{identityError}</span>
                  </div>
                )}
              </div>

              {/* Auto-Fill Fields */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Full Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="form-input"
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Date of Birth</Label>
                <Input
                  value={formData.dob}
                  onChange={(e) => setFormData(prev => ({ ...prev, dob: e.target.value }))}
                  className="form-input"
                  placeholder="Enter your date of birth"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Email Address</Label>
                <Input
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="form-input"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Phone Number</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="form-input"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Terms */}
              <div className="space-y-2">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      setFormData(prev => ({ ...prev, agreeToTerms: !!checked }))
                    }
                    className="mt-1"
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                    I confirm that the details provided are accurate and I accept the Terms & Conditions.
                  </Label>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="btn-accent w-full text-lg py-3 focus-ring"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Create Account</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-6 pt-6 border-t border-border">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>

          </Card>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-trust-light/20 border border-trust-light rounded-xl">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-trust flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-trust mb-1">Your Privacy Matters</h4>
                <p className="text-sm text-muted-foreground">
                  All personal information is encrypted and stored securely. We never share your data with third parties.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
