import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { 
  User, 
  Settings, 
  Shield, 
  Bell, 
  Heart,
  CheckCircle,
  Clock,
  AlertCircle,
  Edit,
  Save,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Award,
  Briefcase
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [userProfile, setUserProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+91 98765 43210',
    address: 'Mumbai, Maharashtra',
    dateOfBirth: '1995-06-15',
    transgenderId: 'TG2024001234',
    aadhaarNumber: '1234 5678 9012',
    registrationDate: '2024-01-15',
    verificationStatus: 'verified'
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    smsAlerts: false,
    serviceUpdates: true,
    policyChanges: true
  });

  const services = [
    {
      name: 'Healthcare Insurance',
      status: 'active',
      date: '2024-01-20',
      description: 'Surgery insurance coverage approved'
    },
    {
      name: 'Career Mentorship',
      status: 'pending',
      date: '2024-01-25',
      description: 'Application under review'
    },
    {
      name: 'Legal Aid Consultation',
      status: 'completed',
      date: '2024-01-10',
      description: 'Consultation completed successfully'
    }
  ];

  const achievements = [
    { name: 'Profile Verified', icon: <Shield className="w-5 h-5" />, date: '2024-01-15' },
    { name: 'First Service Applied', icon: <Heart className="w-5 h-5" />, date: '2024-01-20' },
    { name: 'Document Uploaded', icon: <FileText className="w-5 h-5" />, date: '2024-01-15' },
    { name: 'Community Member', icon: <Award className="w-5 h-5" />, date: '2024-01-15' }
  ];

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationUpdate = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Preferences Updated",
        description: "Your notification preferences have been saved.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-warning" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-primary" />;
      default:
        return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'completed':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-secondary/20 to-primary-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-[var(--shadow-empowerment)]">
                <User className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gradient-empowerment mb-4">
              Welcome back, {userProfile.name}!
            </h1>
            <div className="flex justify-center items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-success/10 border border-success/20 rounded-full">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="text-success font-medium">Profile Verified</span>
              </div>
              <div className="text-muted-foreground">
                Member since {new Date(userProfile.registrationDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4" />
              <span>Services</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>Achievements</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-8">
            <Card className="empowerment-card p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Personal Information</h2>
                <Button
                  onClick={() => editing ? handleProfileUpdate() : setEditing(true)}
                  disabled={loading}
                  className={editing ? "btn-accent" : "btn-primary"}
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  ) : editing ? (
                    <Save className="w-4 h-4 mr-2" />
                  ) : (
                    <Edit className="w-4 h-4 mr-2" />
                  )}
                  {editing ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                  <Input
                    id="name"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!editing}
                    className="form-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      value={userProfile.email}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!editing}
                      className="form-input pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={userProfile.phone}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!editing}
                      className="form-input pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="address"
                      value={userProfile.address}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, address: e.target.value }))}
                      disabled={!editing}
                      className="form-input pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-sm font-medium">Date of Birth</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={userProfile.dateOfBirth}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                      disabled={!editing}
                      className="form-input pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transgenderId" className="text-sm font-medium">Transgender ID</Label>
                  <Input
                    id="transgenderId"
                    value={userProfile.transgenderId}
                    disabled
                    className="form-input bg-muted"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-8">
            <Card className="empowerment-card p-8">
              <h2 className="text-2xl font-bold mb-8">Applied Services</h2>
              
              <div className="space-y-4">
                {services.map((service, index) => (
                  <Card key={index} className="p-6 border hover:shadow-[var(--shadow-card)] transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-light to-secondary rounded-xl flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{service.name}</h3>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">Applied on {service.date}</p>
                        </div>
                      </div>
                      
                      <div className={`px-3 py-1 rounded-full border text-xs font-medium flex items-center space-x-1 ${getStatusColor(service.status)}`}>
                        {getStatusIcon(service.status)}
                        <span className="capitalize">{service.status}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-8">
            <Card className="empowerment-card p-8">
              <h2 className="text-2xl font-bold mb-8">Your Achievements</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="p-6 border bg-gradient-to-r from-primary-light/10 to-secondary/10">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center text-white">
                        {achievement.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{achievement.name}</h3>
                        <p className="text-sm text-muted-foreground">Earned on {achievement.date}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-8">
            <Card className="empowerment-card p-8">
              <h2 className="text-2xl font-bold mb-8">Notification Preferences</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Email Updates</h4>
                      <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                    </div>
                  </div>
                  <Button
                    variant={notifications.emailUpdates ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNotifications(prev => ({ ...prev, emailUpdates: !prev.emailUpdates }))}
                  >
                    {notifications.emailUpdates ? 'On' : 'Off'}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-medium">SMS Alerts</h4>
                      <p className="text-sm text-muted-foreground">Receive urgent notifications via SMS</p>
                    </div>
                  </div>
                  <Button
                    variant={notifications.smsAlerts ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNotifications(prev => ({ ...prev, smsAlerts: !prev.smsAlerts }))}
                  >
                    {notifications.smsAlerts ? 'On' : 'Off'}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Service Updates</h4>
                      <p className="text-sm text-muted-foreground">Updates about your applied services</p>
                    </div>
                  </div>
                  <Button
                    variant={notifications.serviceUpdates ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNotifications(prev => ({ ...prev, serviceUpdates: !prev.serviceUpdates }))}
                  >
                    {notifications.serviceUpdates ? 'On' : 'Off'}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Policy Changes</h4>
                      <p className="text-sm text-muted-foreground">Important policy and law updates</p>
                    </div>
                  </div>
                  <Button
                    variant={notifications.policyChanges ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNotifications(prev => ({ ...prev, policyChanges: !prev.policyChanges }))}
                  >
                    {notifications.policyChanges ? 'On' : 'Off'}
                  </Button>
                </div>

                <Button
                  onClick={handleNotificationUpdate}
                  disabled={loading}
                  className="btn-trust w-full"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    'Save Preferences'
                  )}
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;