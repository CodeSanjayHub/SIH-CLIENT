import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { modules, moduleColors } from './ServicesData';

const ServiceDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  let service: any = null;
  let color = 'from-gray-500 to-gray-400';

  Object.keys(modules).forEach((moduleKey) => {
    modules[moduleKey].forEach((s) => {
      if (s.title.toLowerCase().replace(/\s+/g, '-') === slug) {
        service = s;
        color = moduleColors[moduleKey];
      }
    });
  });

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
        <Button onClick={() => navigate('/services')}>Back to Services</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="py-16 bg-muted/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-8">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-[var(--shadow-card)] bg-gradient-to-r ${color}`}>
              {service.icon}
            </div>
          </div>

          <h1 className="text-4xl font-bold text-center mb-4">{service.title}</h1>
          <p className="text-center text-muted-foreground mb-8 text-lg">
            {`This service is specifically designed to support transgender individuals in accessing ${service.title.toLowerCase()}.`}
          </p>

          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Service Details</h2>
            <p className="mb-6">{service.description}</p>

            <p className="mb-6 text-justify text-gray-700">
              {`This service ensures safe, inclusive, and accessible resources for transgender individuals. It addresses barriers, improves awareness, and empowers users to make informed decisions for their health, safety, career, and education.`}
            </p>

            <h3 className="text-xl font-semibold mb-2">Key Features</h3>
            <div className="space-y-2">
              {service.features.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Button className={`bg-gradient-to-r ${color} text-white`} onClick={() => alert('Contact form will open')}>
              Contact
            </Button>
            <Button className={`bg-gradient-to-r ${color} text-white`} onClick={() => alert('Redirect to application page')}>
              Apply Now
            </Button>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" onClick={() => navigate('/services')}>
              Back to Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetails;
