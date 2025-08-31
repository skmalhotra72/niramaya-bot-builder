import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Shield, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-brand-teal text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/67f2308d-34e9-4e1b-897e-2ff9d5f5e3e3.png" 
                alt="NirAmaya Pathlabs" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-brand-teal-lighter text-sm leading-relaxed">
              NABL-accredited diagnostic laboratory committed to quality healthcare with 360° transparency and patient care.
            </p>
            <div className="text-xs text-brand-teal-lighter">
              <em>"सर्वे सन्तु निरामयः" - May all be free from illness</em>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-brand-teal-lighter">
              <li><Link to="/tests" className="hover:text-white transition-colors">Tests & Prices</Link></li>
              <li><Link to="/packages" className="hover:text-white transition-colors">Health Packages</Link></li>
              <li><Link to="/download-reports" className="hover:text-white transition-colors">Download Reports</Link></li>
              <li><Link to="/quality" className="hover:text-white transition-colors">Quality & Transparency</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-brand-teal-lighter">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-white">24×7 Helpdesk</div>
                  <div>9555009009</div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:helpline@niramayapathlabs.com" className="hover:text-white transition-colors">
                  helpline@niramayapathlabs.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div>Delhi NCR, Gurgaon</div>
                  <div>Noida, Faridabad</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Services & Credentials */}
          <div>
            <h4 className="font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm text-brand-teal-lighter mb-4">
              <li className="flex items-center gap-2">
                <Shield className="h-3 w-3" />
                NABL Accredited
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                Fast TAT Reports
              </li>
              <li>Free Home Collection above ₹600</li>
              <li>Smart Digital Reports</li>
              <li>Corporate Wellness Programs</li>
              <li>API Integration Ready</li>
            </ul>
            
            {/* Trust Badges */}
            <div className="space-y-2">
              <div className="text-xs font-medium">Certifications</div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-brand-saffron text-brand-teal text-xs px-2 py-1 rounded">NABL</span>
                <span className="bg-white/10 text-xs px-2 py-1 rounded">ICMR</span>
                <span className="bg-white/10 text-xs px-2 py-1 rounded">ISO 15189</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-brand-teal-light">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-brand-teal-lighter">
              © 2024 NirAmaya Pathlabs. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-brand-teal-lighter">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/quality-policy" className="hover:text-white transition-colors">Quality Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;