import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavigationProps {
  className?: string;
}

const MobileNavigation = ({ className }: MobileNavigationProps) => {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/tests", label: "Tests & Prices" },
    { href: "/packages", label: "Health Packages" },
    { href: "/about", label: "About Us" },
    { href: "/download-reports", label: "Download Reports" },
  ];
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className={cn("px-2", className)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle className="text-left">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/67f2308d-34e9-4e1b-897e-2ff9d5f5e3e3.png" 
                alt="NirAmaya Pathlabs" 
                className="h-12 w-auto"
              />
            </div>
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-8 flex flex-col space-y-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center py-2 text-base font-medium transition-colors hover:text-brand-teal",
                  isActive ? "text-brand-teal bg-accent" : "text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          
          {/* Mobile Actions */}
          <div className="pt-4 border-t space-y-3">            
            <Button 
              asChild
              className="w-full bg-medical-accent hover:bg-medical-accent/90 text-medical-accent-foreground"
              onClick={() => setOpen(false)}
            >
              <Link to="/book-now">Book Home Collection</Link>
            </Button>
            
            {/* Contact Info */}
            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <div>
                  <div className="font-medium text-foreground">24×7 Helpdesk</div>
                  <div>9555009009</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { MobileNavigation };