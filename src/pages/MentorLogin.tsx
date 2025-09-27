import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navigation from '@/components/Layout/Navigation';
import Footer from '@/components/Layout/Footer';
import { UserCheck, Mail, Lock, ArrowRight, Eye, EyeOff, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MentorLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (formData.email && formData.password) {
        toast({
          title: "Login Successful",
          description: "Welcome to your mentor dashboard!",
        });
        navigate('/mentor-dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter valid credentials.",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 animate-slide-up">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCheck className="h-8 w-8 text-success-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Mentor Login</h1>
            <p className="text-muted-foreground">
              Guide students and manage mentorship programs
            </p>
          </div>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center space-x-2">
                <Award className="h-5 w-5 text-success" />
                <span>Mentor Portal</span>
              </CardTitle>
              <CardDescription className="text-center">
                Access your mentorship dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Mentor Email ID</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="mentor@company.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-success text-success-foreground font-semibold py-6 text-lg hover:scale-105 transition-bounce shadow-button-custom hover:bg-success/90"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Access Mentor Dashboard"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Alert>
                  <AlertDescription>
                    <strong>Demo Access:</strong> Use any email and password to explore the mentor features.
                  </AlertDescription>
                </Alert>
              </form>
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <p className="text-muted-foreground">
              Want to become a mentor?{' '}
              <Link to="/mentor-register" className="text-success hover:underline font-medium">
                Apply here
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MentorLogin;