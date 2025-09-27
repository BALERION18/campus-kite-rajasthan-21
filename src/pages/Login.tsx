import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { GraduationCap, Users, UserCheck, Building2, ArrowRight, Eye, EyeOff, Mail, Lock, User, LogIn, UserPlus } from 'lucide-react';
import rajasthanLoginBg from '@/assets/rajasthan-login-bg.jpg';
const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [selectedRole, setSelectedRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const {
    signIn,
    signUp,
    user
  } = useAuth();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/student-dashboard');
    }
  }, [user, navigate]);
  const roles = [{
    id: 'student',
    label: 'Student',
    icon: GraduationCap,
    description: 'Access placement opportunities and track applications',
    redirect: '/student-dashboard'
  }, {
    id: 'placement_officer',
    label: 'Placement Officer',
    icon: Users,
    description: 'Manage placements, post jobs, and generate reports',
    redirect: '/placement-dashboard'
  }, {
    id: 'mentor',
    label: 'Mentor',
    icon: UserCheck,
    description: 'Guide students and schedule mentorship sessions',
    redirect: '/mentor-dashboard'
  }, {
    id: 'recruiter',
    label: 'Recruiter',
    icon: Building2,
    description: 'Find talent and manage recruitment process',
    redirect: '/recruiter-dashboard'
  }];
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password.",
        variant: "destructive"
      });
      return;
    }
    setLoading(true);
    const {
      error
    } = await signIn(formData.email, formData.password);
    if (error) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    } else {
      const roleData = roles.find(role => role.id === selectedRole);
      navigate(roleData?.redirect || '/student-dashboard');
    }
    setLoading(false);
  };
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.fullName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }
    setLoading(true);
    const {
      error
    } = await signUp(formData.email, formData.password, formData.fullName, selectedRole);
    if (error) {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Account Created",
        description: "Please check your email to verify your account."
      });
      setActiveTab('login');
    }
    setLoading(false);
  };
  return <div className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat relative" style={{
    backgroundImage: `url(${rajasthanLoginBg})`
  }}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-secondary/30" />
      <Card className="relative w-full max-w-2xl bg-white/95 backdrop-blur-lg border border-white/20 shadow-2xl z-10">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl font-bold text-primary mb-2">
            Campus Placement Portal
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Government of Rajasthan - Unified Platform for Career Development
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="flex items-center space-x-2">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </TabsTrigger>
              <TabsTrigger value="signup" className="flex items-center space-x-2">
                <UserPlus className="h-4 w-4" />
                <span>Sign Up</span>
              </TabsTrigger>
            </TabsList>

            {/* Role Selection */}
            <div className="mb-6 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
              <Label className="text-foreground font-semibold mb-3 block bg-amber-300 py-[3px] my-0 rounded-full px-[10px]">
                Select your role:
              </Label>
              <RadioGroup value={selectedRole} onValueChange={setSelectedRole} className="grid grid-cols-2 gap-3">
                {roles.map(role => {
                const Icon = role.icon;
                return <div key={role.id} className="relative">
                      <RadioGroupItem value={role.id} id={role.id} className="peer sr-only" />
                      <Label htmlFor={role.id} className={`flex flex-col items-center p-3 rounded-lg border-2 cursor-pointer transition-all backdrop-blur-sm hover:border-primary/60 hover:bg-white/20 dark:hover:bg-white/10 ${selectedRole === role.id ? 'border-primary bg-white/30 dark:bg-white/20 shadow-lg text-primary backdrop-blur-md' : 'border-white/30 dark:border-white/40 bg-white/10 dark:bg-white/5 text-foreground hover:text-primary'}`}>
                        <Icon className={`h-6 w-6 mb-2 ${selectedRole === role.id ? 'text-primary' : 'text-foreground'}`} />
                        <span className="font-medium text-sm text-center text-slate-950">
                          {role.label}
                        </span>
                      </Label>
                    </div>;
              })}
              </RadioGroup>
            </div>

            <TabsContent value="login">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email" className="text-foreground mx-0 py-0 bg-amber-300 rounded-full px-[10px]">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input id="login-email" type="email" className="pl-10 bg-white/20 backdrop-blur-sm border-white/30" placeholder="your.email@college.edu" value={formData.email} onChange={e => setFormData({
                      ...formData,
                      email: e.target.value
                    })} />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="login-password" className="text-foreground bg-amber-300 rounded-full px-[10px]">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input id="login-password" type={showPassword ? "text" : "password"} className="pl-10 pr-10 bg-white/20 backdrop-blur-sm border-white/30" placeholder="••••••••" value={formData.password} onChange={e => setFormData({
                      ...formData,
                      password: e.target.value
                    })} />
                      <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" disabled={loading || !selectedRole} className="w-full gradient-primary text-primary-foreground hover:opacity-90 font-semibold py-3 backdrop-blur-sm">
                    {loading ? "Signing In..." : "Sign In"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="signup">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <Label htmlFor="signup-name" className="text-foreground">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input id="signup-name" className="pl-10 bg-white/20 backdrop-blur-sm border-white/30" placeholder="Enter your full name" value={formData.fullName} onChange={e => setFormData({
                      ...formData,
                      fullName: e.target.value
                    })} />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-email" className="text-foreground">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input id="signup-email" type="email" className="pl-10 bg-white/20 backdrop-blur-sm border-white/30" placeholder="your.email@college.edu" value={formData.email} onChange={e => setFormData({
                      ...formData,
                      email: e.target.value
                    })} />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-password" className="text-foreground">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input id="signup-password" type={showPassword ? "text" : "password"} className="pl-10 pr-10 bg-white/20 backdrop-blur-sm border-white/30" placeholder="••••••••" value={formData.password} onChange={e => setFormData({
                      ...formData,
                      password: e.target.value
                    })} />
                      <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirm-password" className="text-foreground">Confirm Password</Label>
                    <Input id="confirm-password" type="password" className="bg-white/20 backdrop-blur-sm border-white/30" placeholder="••••••••" value={formData.confirmPassword} onChange={e => setFormData({
                    ...formData,
                    confirmPassword: e.target.value
                  })} />
                  </div>

                  <Button type="submit" disabled={loading || !selectedRole} className="w-full gradient-primary text-primary-foreground hover:opacity-90 font-semibold py-3 backdrop-blur-sm">
                    {loading ? "Creating Account..." : "Create Account"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>

          <Alert className="mt-4 bg-white/10 backdrop-blur-md border-white/20 shadow-lg">
            <AlertDescription className="text-foreground">
              <strong>Demo Mode:</strong> Use any email and password to explore the platform features.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>;
};
export default Login;