import React from 'react';
import Navigation from '@/components/Layout/Navigation';
import Footer from '@/components/Layout/Footer';
import HeroSection from '@/components/Hero/HeroSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-smooth">
      <Navigation />
      <main>
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
