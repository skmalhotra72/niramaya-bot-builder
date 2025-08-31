import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navigation } from "./Navigation";
import { MobileNavigation } from "./MobileNavigation";
import { Phone, MessageCircle } from "lucide-react";

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
              <span>24×7 Helpdesk: 9555009009 | 9958824555</span>
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
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-medical">
              <div className="text-brand-saffron font-bold text-xl">न</div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-brand-teal">NirAmaya</span>
              <span className="text-xs text-muted-foreground">PATHLABS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <Navigation className="hidden md:flex" />

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Chatbot Trigger */}
            <Button
              variant="ghost"
              size="sm"
              className="text-brand-teal hover:text-brand-teal-light hidden sm:flex"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Ask Nira
            </Button>
            
            {/* CTA Button */}
            <Button 
              asChild
              className="bg-medical-accent hover:bg-medical-accent/90 text-medical-accent-foreground font-medium"
            >
              <Link to="/book-now">Book Home Collection</Link>
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