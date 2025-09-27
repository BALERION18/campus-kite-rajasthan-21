import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Government Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Government of Rajasthan</h3>
            <p className="text-sm text-primary-foreground/80">
              Campus Placement & Internship Portal - Empowering students across Rajasthan with career opportunities.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <Globe className="h-4 w-4" />
              <span>rajasthan.gov.in</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/student-login" className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                Student Portal
              </Link>
              <Link to="/placement-login" className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                Placement Cell
              </Link>
              <Link to="/mentor-login" className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                Mentor Dashboard
              </Link>
              <Link to="/recruiter-login" className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                Recruiter Portal
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <div className="space-y-2">
              <Link to="/analytics" className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                Analytics Dashboard
              </Link>
              <Link to="/certificates" className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                Certificate Portal
              </Link>
              <Link to="/contact" className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                Help & Support
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4" />
                <span>placement@rajasthan.gov.in</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4" />
                <span>+91-141-2234567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Jaipur, Rajasthan</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/80">
            © 2024 Government of Rajasthan. All rights reserved. | Developed for Campus Placement Portal
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;