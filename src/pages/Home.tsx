import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Shield, 
  Clock, 
  Home as HomeIcon, 
  Building, 
  FileText,
  Microscope,
  HeartPulse,
  Users,
  CheckCircle,
  Phone,
  MessageCircle,
  Star
} from "lucide-react";

const Home = () => {
  const quickServices = [
    {
      title: "Tests & Prices",
      description: "Browse our comprehensive test catalog with transparent pricing",
      icon: Microscope,
      href: "/tests",
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Health Packages",
      description: "Curated health checkup packages for every need",
      icon: HeartPulse,
      href: "/packages",
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Home Collection",
      description: "Safe, convenient sample collection at your doorstep",
      icon: HomeIcon,
      href: "/home-collection",
      color: "bg-orange-50 text-orange-600"
    },
    {
      title: "Corporate Services",
      description: "Wellness programs and health camps for organizations",
      icon: Building,
      href: "/corporate",
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "Download Reports",
      description: "Access your digital reports instantly and securely",
      icon: FileText,
      href: "/download-reports",
      color: "bg-red-50 text-red-600"
    }
  ];

  const trustFactors = [
    { icon: Shield, text: "NABL Accredited Lab" },
    { icon: Clock, text: "Fastest TAT Reports" },
    { icon: Users, text: "11+ years of Excellence" },
    { icon: CheckCircle, text: "360° Quality Assurance" }
  ];

  const stats = [
    { value: "20,00,000+", label: "Tests Completed" },
    { value: "99.8%", label: "Accuracy Rate" },
    { value: "24×7", label: "Support Available" },
    { value: "1000+", label: "Test Parameters" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-medical text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Headline */}
            <div className="mb-6">
              <Badge className="bg-brand-saffron text-brand-teal mb-4 px-4 py-2 text-sm font-medium">
                NABL Accredited • Trusted by Thousands
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Quality Healthcare
                <br />
                <span className="text-brand-saffron">Made Simple</span>
              </h1>
              <p className="text-xl md:text-2xl text-brand-teal-lighter mb-4 leading-relaxed">
                Transparent diagnostics with 360° quality assurance
              </p>
              <div className="text-sm text-brand-teal-lighter italic">
                "सर्वे सन्तु निरामयः" - <em>May all be free from illness</em>
              </div>
            </div>

            {/* Main CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                asChild
                size="lg" 
                className="bg-brand-saffron hover:bg-brand-gold text-brand-teal font-semibold px-8 py-4 text-lg shadow-accent"
              >
                <Link to="/book-now">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Home Collection
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-brand-teal px-8 py-4 text-lg"
              >
                <Link to="/packages">
                  View Health Packages
                </Link>
              </Button>
            </div>

            {/* Trust Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {trustFactors.map((factor, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <factor.icon className="h-6 w-6 text-brand-saffron" />
                  <span className="text-sm text-brand-teal-lighter">{factor.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive diagnostic solutions designed for your health and peace of mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {quickServices.map((service, index) => (
              <Link key={index} to={service.href}>
                <Card className="h-full hover:shadow-medical transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-brand-teal">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${service.color}`}>
                        <service.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2 text-foreground">{service.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            
            {/* Special CTA Card */}
            <Card className="border-2 border-brand-saffron bg-gradient-accent text-white">
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">Need Help?</h3>
                <p className="text-sm mb-4 opacity-90">Our experts are available 24×7 to assist you</p>
                <Button 
                  asChild
                  variant="secondary" 
                  size="sm"
                  className="bg-white text-brand-teal hover:bg-white/90"
                >
                  <a href="tel:9555009009">
                    <Phone className="mr-2 h-4 w-4" />
                    Call 9555009009
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-teal mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Home Collection Feature */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-success/10 text-success mb-4">Safe & Convenient</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Free Home Sample Collection
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Professional phlebotomists visit your home with complete safety protocols. 
                No more waiting in queues or clinic visits.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span className="text-foreground">FREE collection above ₹600 (after discount)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span className="text-foreground">Trained phlebotomists with full PPE</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span className="text-foreground">Pre-barcoded sealed sample kits</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span className="text-foreground">Cold-chain logistics to lab</span>
                </div>
              </div>

              <Button 
                asChild
                size="lg" 
                className="bg-brand-teal hover:bg-brand-teal-light shadow-medical"
              >
                <Link to="/home-collection">
                  Learn More About Safety
                </Link>
              </Button>
            </div>

            <div className="bg-gradient-medical rounded-2xl p-8 text-white">
              <div className="text-center">
                <HomeIcon className="h-16 w-16 mx-auto mb-4 text-brand-saffron" />
                <h3 className="text-2xl font-bold mb-4">Book Your Collection</h3>
                <p className="text-brand-teal-lighter mb-6">
                  Select your tests, choose your time slot, and we'll be there!
                </p>
                
                <div className="bg-white/10 rounded-lg p-4 mb-6">
                  <div className="text-sm text-brand-teal-lighter">Available in</div>
                  <div className="font-semibold">Delhi NCR • Gurgaon • Noida • Faridabad</div>
                </div>

                <Button 
                  asChild
                  className="bg-brand-saffron hover:bg-brand-gold text-brand-teal font-semibold w-full"
                >
                  <Link to="/book-now">
                    Schedule Collection
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality & Transparency */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Badge className="bg-brand-teal/10 text-brand-teal mb-4">Quality First</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              360° Quality Assurance & Transparency
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Every test goes through our rigorous quality checks. We provide complete transparency 
              in our processes, from sample collection to report delivery.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white"
              >
                <Link to="/quality">
                  View Quality Policy
                </Link>
              </Button>
              <Button 
                asChild
                size="lg"
                className="bg-brand-teal hover:bg-brand-teal-light"
              >
                <Link to="/download-reports">
                  Access Your Reports
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;