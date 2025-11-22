import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Heart,
  Shield,
  AlertCircle,
  CheckCircle,
  Users,
  HelpCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    urgent: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "24/7 Helpline",
      info: "+91 1800-123-4567",
      description: "Free helpline available 24/7 for emergency support"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      info: "support@transempower.org",
      description: "We respond to emails within 24 hours"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Office Address",
      info: "123 Support Street, Mumbai 400001",
      description: "Visit us during business hours for in-person support"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      info: "Mon-Fri: 9AM-6PM",
      description: "Weekend support available via helpline"
    }
  ];

  const supportServices = [
    {
      icon: <Shield className="w-8 h-8 text-trust" />,
      title: "Crisis Support",
      description: "Immediate help for emergency situations and safety concerns"
    },
    {
      icon: <Heart className="w-8 h-8 text-accent" />,
      title: "Counseling Services",
      description: "Professional counseling and emotional support services"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Community Support",
      description: "Connect with support groups and community resources"
    },
    {
      icon: <HelpCircle className="w-8 h-8 text-secondary-accent" />,
      title: "General Inquiries",
      description: "Questions about services, applications, and account support"
    }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Check all required fields and try again.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours. For urgent matters, please call our helpline.",
        variant: "default",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        urgent: false
      });
      
    } catch (error) {
      toast({
        title: "Failed to Send Message",
        description: "Something went wrong. Please try again or contact us via phone.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-accent-light/20 to-primary-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gradient-empowerment mb-6">Get Support</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're here to help you navigate your journey. Reach out for support, ask questions, or get assistance with our services.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Emergency Banner */}
        <div className="mb-12 p-6 bg-gradient-to-r from-destructive/10 to-warning/10 border border-destructive/20 rounded-xl">
          <div className="flex items-start space-x-4">
            <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-destructive mb-2">Need Immediate Help?</h3>
              <p className="text-foreground mb-4">
                If you're in crisis or need emergency support, please don't wait for email responses. 
                Call our 24/7 helpline or contact emergency services.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-destructive hover:bg-destructive/90 text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Helpline: +91 1800-123-4567
                </Button>
                <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                  Emergency Services: 112
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="empowerment-card p-8">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center shadow-[var(--shadow-card)]">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`form-input ${errors.name ? 'border-destructive' : ''}`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <div className="flex items-center space-x-2 text-destructive text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input ${errors.email ? 'border-destructive' : ''}`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <div className="flex items-center space-x-2 text-destructive text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number (Optional)
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`form-input ${errors.subject ? 'border-destructive' : ''}`}
                    placeholder="What can we help you with?"
                  />
                  {errors.subject && (
                    <div className="flex items-center space-x-2 text-destructive text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.subject}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={`form-input resize-none ${errors.message ? 'border-destructive' : ''}`}
                    placeholder="Please describe your question or concern in detail..."
                  />
                  {errors.message && (
                    <div className="flex items-center space-x-2 text-destructive text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.message}</span>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="btn-accent w-full text-lg py-3 focus-ring"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending Message...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </div>
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="empowerment-card p-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-light to-secondary rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                      <p className="text-primary font-medium mb-1">{info.info}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="empowerment-card p-8">
              <h2 className="text-2xl font-bold mb-6">Support Services</h2>
              <div className="space-y-6">
                {supportServices.map((service, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-muted to-muted/50 rounded-xl flex items-center justify-center flex-shrink-0">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{service.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Tips */}
            <Card className="p-6 bg-gradient-to-r from-success/10 to-trust/10 border-success/20">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-success mb-2">Quick Tips for Faster Support</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Be specific about your issue or question</li>
                    <li>• Include relevant account or application details</li>
                    <li>• For urgent matters, always call our helpline</li>
                    <li>• Check your email regularly for our response</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;