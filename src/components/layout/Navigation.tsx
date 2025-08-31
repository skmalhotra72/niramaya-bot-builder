import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavigationProps {
  className?: string;
}

const Navigation = ({ className }: NavigationProps) => {
  const location = useLocation();
  
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/tests", label: "Tests & Prices" },
    { href: "/packages", label: "Health Packages" },
  ];
  
  return (
    <nav className={cn("flex items-center space-x-6", className)}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-brand-teal",
              isActive 
                ? "text-brand-teal border-b-2 border-brand-teal pb-1" 
                : "text-muted-foreground"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export { Navigation };