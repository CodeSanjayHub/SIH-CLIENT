import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Smartphone, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { dummyTransgenderData, dummyAadhaarData } from '@/data/identityData';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // form state
  const [identity, setIdentity] = useState('');
  const [identityError, setIdentityError] = useState('');
  const [matchedRecord, setMatchedRecord] = useState<null | { name: string; dob: string; email: string; phone: string }>(null);

  // OTP state
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // resend timer (seconds)
  const [resendCountdown, setResendCountdown] = useState(0);
  const countdownRef = useRef<number | null>(null);

  useEffect(() => {
    if (resendCountdown > 0) {
      countdownRef.current = window.setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    } else {
      if (countdownRef.current) {
        clearTimeout(countdownRef.current);
        countdownRef.current = null;
      }
    }
    return () => {
      if (countdownRef.current) {
        clearTimeout(countdownRef.current);
        countdownRef.current = null;
      }
    };
  }, [resendCountdown]);

  // ----------------- identity input handler -----------------
  const handleIdentityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    let value = raw.toUpperCase();

    // reset match & errors while typing
    setMatchedRecord(null);
    setIdentityError('');

    // TG path
    if (value.startsWith('TG')) {
      // allow only TG and digits, max 8 chars (TG + 6 digits)
      value = value.replace(/[^TG0-9]/g, '');
      if (value.length > 8) value = value.slice(0, 8);

      // format validation (partial allowed while typing)
      if (!/^TG\d{0,6}$/.test(value)) {
        setIdentityError('Enter a valid Transgender ID (e.g., TG123456).');
      } else {
        setIdentityError('');
      }
    }
    // Aadhaar path if starts with digit
    else if (/^\d/.test(value)) {
      value = value.replace(/\D/g, '');
      if (value.length > 12) value = value.slice(0, 12);

      if (!/^\d{0,12}$/.test(value)) {
        setIdentityError('Enter a valid 12-digit Aadhaar number.');
      } else {
        setIdentityError('');
      }
    } else {
      // neither TG nor digit: allow typing but show generic message only if non-empty
      if (value.trim() !== '') {
        setIdentityError('Enter a valid Transgender ID (e.g., TG123456) or Aadhaar number.');
      } else {
        setIdentityError('');
      }
    }

    setIdentity(value);

    // after normalization, check for exact match only when format is fully valid:
    // TG -> length 8 (TG + 6 digits), Aadhaar -> 12 digits
    if (/^TG\d{6}$/.test(value)) {
      if (dummyTransgenderData[value]) {
        setMatchedRecord(dummyTransgenderData[value]);
        setIdentityError('');
      } else {
        setMatchedRecord(null);
        setIdentityError('Transgender ID not found.');
      }
    } else if (/^\d{12}$/.test(value)) {
      if (dummyAadhaarData[value]) {
        setMatchedRecord(dummyAadhaarData[value]);
        setIdentityError('');
      } else {
        setMatchedRecord(null);
        setIdentityError('Aadhaar number not found.');
      }
    } else {
      // not a complete valid format yet
      setMatchedRecord(null);
    }

    // reset OTP-related state if user changes identity
    setOtpSent(false);
    setOtpValue('');
    setGeneratedOtp(null);
    setResendCountdown(0);
  };

  // ----------------- send OTP (frontend-only simulate) -----------------
  const sendOtp = async () => {
    // ensure matchedRecord exists and no identityError
    if (!identity.trim() || identityError || !matchedRecord) {
      setIdentityError(prev => prev || 'Enter a valid and registered ID to receive OTP.');
      return;
    }

    setSending(true);
    try {
      // simulate API call / SMS gateway
      await new Promise(resolve => setTimeout(resolve, 900));

      // generate 6-digit OTP (frontend only)
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);
      setOtpSent(true);
      setResendCountdown(30); // 30s cooldown

      // (For development) you can log OTP in console — remove in production
      // console.log('DEBUG OTP:', otp);

      toast({
        title: 'OTP Sent Successfully',
        description: `OTP sent to the registered mobile number.`,
        variant: 'default',
      });
    } catch (err) {
      toast({
        title: 'Failed to send OTP',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

  // ----------------- resend OTP -----------------
  const resendOtp = async () => {
    if (resendCountdown > 0) return;
    setGeneratedOtp(null);
    setOtpValue('');
    await sendOtp();
  };

  // ----------------- verify OTP -----------------
  const verifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!otpValue.trim()) {
      toast({
        title: 'OTP Required',
        description: 'Please enter the 6-digit OTP sent to your phone.',
        variant: 'destructive',
      });
      return;
    }

    if (!/^\d{6}$/.test(otpValue)) {
      toast({
        title: 'Invalid OTP',
        description: 'Enter a valid 6-digit OTP.',
        variant: 'destructive',
      });
      return;
    }

    setVerifying(true);
    try {
      // simulate verify latency
      await new Promise(resolve => setTimeout(resolve, 900));

      // compare with generated OTP (frontend only)
      if (generatedOtp && otpValue === generatedOtp) {
        toast({
          title: 'Login Successful',
          description: 'Welcome back! Redirecting to dashboard...',
          variant: 'default',
        });

        // clear local OTP state
        setOtpSent(false);
        setOtpValue('');
        setGeneratedOtp(null);

        // navigate to dashboard (adjust route as needed)
        setTimeout(() => navigate('/dashboard'), 700);
      } else {
        toast({
          title: 'Invalid OTP',
          description: 'The OTP you entered is incorrect. Please try again.',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Verification Failed',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/20 to-secondary/20">
      <Navigation />

      <div className="py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="empowerment-card p-8">

            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-trust to-primary rounded-2xl flex items-center justify-center shadow-[var(--shadow-trust)]">
                  <KeyIconPlaceholder />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gradient-primary mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Enter your Transgender ID or Aadhaar to continue</p>
            </div>

            {/* Single-input OTP form */}
            <form onSubmit={verifyOtp} className="space-y-6">

              {/* Identity input */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Transgender ID / Aadhaar Number</Label>
                <Input
                  type="text"
                  value={identity}
                  onChange={handleIdentityChange}
                  className={`form-input ${identityError ? 'border-destructive' : ''}`}
                  placeholder="Enter Transgender ID (TG123456) or Aadhaar (12 digits)"
                  maxLength={16}
                />

                {/* identity error */}
                {identityError && (
                  <div className="flex items-center space-x-2 text-destructive text-sm mt-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{identityError}</span>
                  </div>
                )}

                {/* matched info (small helper) */}
                {matchedRecord && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    Registered to <strong>{matchedRecord.name}</strong> • {maskPhone(matchedRecord.phone)}
                  </div>
                )}
              </div>

              {/* Send OTP button (enabled only when identity valid & matched) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    onClick={sendOtp}
                    disabled={!matchedRecord || sending || otpSent}
                    className="btn-primary w-full"
                  >
                    {sending ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : otpSent ? (
                      <span>OTP Sent</span>
                    ) : (
                      <span>Send OTP</span>
                    )}
                  </Button>
                </div>
              </div>

              {/* OTP input (visible after send) */}
              {otpSent && (
                <div className="space-y-2 animate-fade-in">
                  <Label className="text-sm font-medium">Enter OTP</Label>
                  <Input
                    type="text"
                    value={otpValue}
                    onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="form-input"
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                  />

                  <div className="flex items-center justify-between text-sm">
                    <div className="text-muted-foreground">Didn't receive OTP?</div>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={resendOtp}
                        disabled={resendCountdown > 0}
                        className={`text-primary hover:underline font-medium ${resendCountdown > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {resendCountdown > 0 ? `Resend in ${resendCountdown}s` : 'Resend OTP'}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={verifying}
                    className="btn-primary w-full text-lg py-3 focus-ring"
                  >
                    {verifying ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Verifying...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>Verify & Login</span>
                      </div>
                    )}
                  </Button>
                </div>
              )}

            </form>

            {/* Register Link */}
            <div className="text-center mt-8 pt-6 border-t border-border">
              <p className="text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Register here
                </Link>
              </p>
            </div>
          </Card>

          {/* Help Section */}
          <div className="mt-6 p-4 bg-accent-light/20 border border-accent-light rounded-xl">
            <div className="text-center">
              <h4 className="font-medium text-accent mb-2">Need Help?</h4>
              <p className="text-sm text-muted-foreground mb-3">
                If you're having trouble logging in, our support team is here to help.
              </p>
              <Link to="/contact">
                <Button variant="outline" className="text-accent border-accent hover:bg-accent-light/10">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- small helpers ---------- */

// placeholder for KeyRound icon area in header so design stays consistent
function KeyIconPlaceholder() {
  return <Smartphone className="w-8 h-8 text-white" />; // you can replace with KeyRound if you prefer
}

// mask phone like 98******10
function maskPhone(phone?: string) {
  if (!phone) return '';
  const s = phone.replace(/\D/g, '');
  if (s.length < 4) return s;
  return `${s.slice(0, 2)}******${s.slice(-2)}`;
}

export default Login;
