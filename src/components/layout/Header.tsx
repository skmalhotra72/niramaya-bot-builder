import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navigation } from "./Navigation";
import { MobileNavigation } from "./MobileNavigation";
import { Phone } from "lucide-react";

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Contact Bar */}
      <div className="bg-brand-teal text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>24×7 Helpdesk: 9555009009</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>NABL Accredited | Smart Reports | Free Home Collection above ₹600</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/67f2308d-34e9-4e1b-897e-2ff9d5f5e3e3.png" 
              alt="NirAmaya Pathlabs" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <Navigation className="hidden md:flex" />

          {/* Action Buttons */}
          <div className="flex items-center gap-2">            
            {/* CTA Button */}
            <Button 
              asChild
              className="bg-medical-accent hover:bg-medical-accent/90 text-medical-accent-foreground font-medium"
            >
              <Link to="/book-now">Serving 3000+ pincodes</Link>
            </Button>

            {/* Mobile Menu */}
            <MobileNavigation className="md:hidden" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;