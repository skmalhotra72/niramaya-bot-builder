import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Users, 
  Clock, 
  Beaker, 
  Star, 
  CheckCircle, 
  ShoppingCart,
  Heart,
  Building,
  UserCheck,
  Calendar
} from "lucide-react";
import { packagesData, Package } from "@/data/testsData";
import { formatCurrency, calculatePricing } from "@/utils/pricingLogic";
import { useToast } from "@/hooks/use-toast";

const Packages = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const { toast } = useToast();

  const categories = ["All", ...Array.from(new Set(packagesData.map(pkg => pkg.category)))];
  const genders = ["All", "Male", "Female", "Both"];

  const filteredPackages = useMemo(() => {
    return packagesData.filter(pkg => {
      const matchesCategory = selectedCategory === "All" || pkg.category === selectedCategory;
      const matchesGender = selectedGender === "All" || 
                           selectedGender === "Both" || 
                           pkg.gender === "both" ||
                           pkg.gender?.toLowerCase() === selectedGender.toLowerCase();
      return matchesCategory && matchesGender;
    });
  }, [selectedCategory, selectedGender]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Basic': return UserCheck;
      case 'Comprehensive': return Star;
      case 'Women\'s Health': return Heart;
      case 'Cardiac': return Heart;
      case 'Corporate': return Building;
      default: return CheckCircle;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Basic': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Comprehensive': return 'bg-green-50 text-green-600 border-green-200';
      case 'Women\'s Health': return 'bg-pink-50 text-pink-600 border-pink-200';
      case 'Cardiac': return 'bg-red-50 text-red-600 border-red-200';
      case 'Corporate': return 'bg-purple-50 text-purple-600 border-purple-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const handleBookPackage = (pkg: Package) => {
    toast({
      title: "Package Selected",
      description: `${pkg.name} has been added to your cart.`,
    });
    
    // TODO: Add to cart logic and redirect to booking
    window.location.href = `/book-now?package=${pkg.code}`;
  };

  const calculatePackagePrice = (pkg: Package) => {
    const result = calculatePricing([{
      code: pkg.code,
      name: pkg.name,
      mrp: pkg.mrp,
      maxDiscount: pkg.maxDiscount
    }], 'standard');
    
    return result.lineItems[0];
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-medical text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Health Packages
            </h1>
            <p className="text-xl text-brand-teal-lighter mb-6">
              Comprehensive health checkups designed for your specific needs
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge className="bg-brand-saffron text-brand-teal">Up to 40% Discount</Badge>
              <Badge className="bg-white/10 text-white">Free Home Collection</Badge>
              <Badge className="bg-white/10 text-white">Fast TAT</Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Category Filter */}
              <div>
                <h3 className="font-medium mb-3">Filter by Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className={`cursor-pointer ${
                        selectedCategory === category 
                          ? "bg-brand-teal text-white" 
                          : "hover:bg-brand-teal hover:text-white"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Gender Filter */}
              <div>
                <h3 className="font-medium mb-3">Suitable For</h3>
                <div className="flex flex-wrap gap-2">
                  {genders.map(gender => (
                    <Badge
                      key={gender}
                      variant={selectedGender === gender ? "default" : "outline"}
                      className={`cursor-pointer ${
                        selectedGender === gender 
                          ? "bg-brand-teal text-white" 
                          : "hover:bg-brand-teal hover:text-white"
                      }`}
                      onClick={() => setSelectedGender(gender)}
                    >
                      {gender}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map(pkg => {
            const CategoryIcon = getCategoryIcon(pkg.category);
            const pricing = calculatePackagePrice(pkg);
            
            return (
              <Card key={pkg.code} className="h-full flex flex-col hover:shadow-medical transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-lg border ${getCategoryColor(pkg.category)}`}>
                      <CategoryIcon className="h-6 w-6" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {pkg.code}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl mb-2">{pkg.name}</CardTitle>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {pkg.description}
                  </p>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  {/* Package Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Beaker className="h-4 w-4 text-muted-foreground" />
                      <span>{pkg.sampleTypes.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{pkg.tat}</span>
                    </div>
                    {pkg.ageGroup && (
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{pkg.ageGroup}</span>
                      </div>
                    )}
                    {pkg.gender && pkg.gender !== 'both' && (
                      <div className="flex items-center gap-2 text-sm">
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                        <span className="capitalize">{pkg.gender} specific</span>
                      </div>
                    )}
                  </div>

                  {/* Best For */}
                  <div className="mb-4">
                    <h4 className="font-medium text-sm mb-2">Best For:</h4>
                    <div className="flex flex-wrap gap-1">
                      {pkg.bestFor.slice(0, 2).map((item, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                      {pkg.bestFor.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{pkg.bestFor.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Inclusions Accordion */}
                  <Accordion type="single" collapsible className="mb-6">
                    <AccordionItem value="inclusions" className="border-none">
                      <AccordionTrigger className="py-2 text-sm font-medium">
                        View Inclusions ({pkg.inclusions.length} tests)
                      </AccordionTrigger>
                      <AccordionContent className="pt-2">
                        <ul className="space-y-1">
                          {pkg.inclusions.map((test, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-success mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{test}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Pricing */}
                  <div className="mt-auto">
                    <div className="text-center mb-4 p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <span className="text-lg text-muted-foreground line-through">
                          {formatCurrency(pkg.mrp)}
                        </span>
                        <Badge className="bg-success/10 text-success text-xs">
                          {Math.round(((pkg.mrp - pricing.finalPrice) / pkg.mrp) * 100)}% OFF
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-brand-teal">
                        {formatCurrency(pricing.finalPrice)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        + Home collection charges (if applicable)
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        onClick={() => handleBookPackage(pkg)}
                        className="w-full bg-brand-saffron hover:bg-brand-gold text-brand-teal font-medium"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Book This Package
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredPackages.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No packages found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters to see more packages
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Packages;