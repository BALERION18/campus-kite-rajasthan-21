import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, GraduationCap, Users, UserCheck, Building2, LayoutDashboard, Phone, LogOut } from 'lucide-react';
import interntrackLogo from '@/assets/interntrack-logo.png';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/hooks/useAuth';
const Navigation = () => {
  const location = useLocation();
  const {
    user,
    signOut
  } = useAuth();
  const navItems = [{
    name: 'Home',
    href: '/',
    icon: Home
  }, {
    name: 'Dashboard',
    href: '/analytics',
    icon: LayoutDashboard
  }, {
    name: 'Contact',
    href: '/contact',
    icon: Phone
  }, {
    name: 'Login',
    href: '/login',
    icon: GraduationCap
  }];
  const isActive = (path: string) => location.pathname === path;
  return <header className="glass-header sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 transition-smooth hover:scale-105">
            <img src={interntrackLogo} alt="InternTrack" className="h-12 w-12 object-contain" />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-foreground">
                InternTrack
              </h1>
              
            </div>
          </Link>

          {/* Navigation Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map(item => {
            const Icon = item.icon;
            return <Link key={item.name} to={item.href} className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth ${isActive(item.href) ? 'bg-primary text-primary-foreground shadow-button-custom' : 'text-foreground hover:bg-glass hover:text-primary'}`}>
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.name}</span>
                </Link>;
          })}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            {user && <Button variant="ghost" size="sm" onClick={signOut} className="flex items-center space-x-2 text-foreground hover:text-primary">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>}

            {/* Mobile Menu Button */}
            <Button variant="ghost" className="lg:hidden" size="sm">
              <Home className="h-5 w-5" />
            </Button>
          </div>
        </nav>
      </div>
    </header>;
};
export default Navigation;