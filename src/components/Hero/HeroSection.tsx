import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Users, Building2, Award, TrendingUp } from 'lucide-react';
import rajasthanCampusPlacements from '@/assets/rajasthan-campus-placements.jpg';
import analyticsPlacementDashboard from '@/assets/analytics-placement-dashboard.jpg';

const HeroSection = () => {
  const stats = [
    { icon: Users, label: 'Active Students', value: '25,000+', color: 'text-primary' },
    { icon: Building2, label: 'Partner Companies', value: '500+', color: 'text-secondary' },
    { icon: Award, label: 'Placements This Year', value: '8,500+', color: 'text-success' },
    { icon: TrendingUp, label: 'Success Rate', value: '92%', color: 'text-primary' },
  ];

  return (
    <div className="relative">
      {/* Hero Background */}
      <div 
        className="relative h-[600px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${rajasthanCampusPlacements})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-primary/40 to-secondary/50" />
        
        {/* Hero Content */}
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              Campus Placement & 
              <span className="text-secondary-light"> Internship Portal</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 leading-relaxed">
              A Unified Platform for Internships, Training, and Campus Placements across Rajasthan
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/login">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto gradient-secondary text-secondary-foreground font-semibold px-8 py-4 text-lg hover:scale-105 transition-bounce shadow-button-custom"
                >
                  Get Started - Login
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto border-2 border-white/80 text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-primary font-semibold px-8 py-4 text-lg transition-bounce hover:border-white hover:shadow-button-custom"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span>Trusted by Rajasthan Government</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                <span>ISO 27001 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-background py-8">
        <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="glass-card p-6 text-center hover:scale-105 transition-bounce">
                <Icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            );
          })}
        </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-background">
        <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Streamlined Career Development Platform
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Connect students, mentors, placement officers, and recruiters in one comprehensive platform. 
              Built specifically for Rajasthan's educational institutions.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-foreground">AI-powered job matching system</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <span className="text-foreground">Real-time application tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span className="text-foreground">Automated certificate generation</span>
              </div>
            </div>
            <Link to="/contact">
              <Button className="gradient-primary text-primary-foreground font-semibold px-6 py-3 hover:scale-105 transition-bounce shadow-button-custom">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="relative">
            <img 
              src={analyticsPlacementDashboard} 
              alt="Analytics Dashboard showing placement records and statistics with pie charts" 
              className="w-full h-auto rounded-2xl shadow-card-custom animate-float"
            />
            </div>
          </div>
        </div>
        </div>
      </div>
  );
};

export default HeroSection;