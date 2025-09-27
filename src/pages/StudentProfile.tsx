import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Navigation from '@/components/Layout/Navigation';
import Footer from '@/components/Layout/Footer';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Upload, 
  Link as LinkIcon, 
  Save, 
  CheckCircle, 
  Plus, 
  X,
  FileText,
  Award,
  ArrowLeft
} from 'lucide-react';

const StudentProfile = () => {
  const { profile, updateProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [profileData, setProfileData] = useState({
    full_name: '',
    bio: ''
  });

  useEffect(() => {
    if (profile) {
      setProfileData({
        full_name: profile.full_name || '',
        bio: profile.bio || ''
      });
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const calculateProfileCompletion = () => {
    const fields = [
      profileData.full_name,
      profileData.bio
    ];
    const completedFields = fields.filter(field => field?.trim()).length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updates = {
        ...profileData
      };

      const { error } = await updateProfile(updates);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update profile. Please try again.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const profileCompletion = calculateProfileCompletion();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/student-dashboard')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="animate-slide-up">
            <h1 className="text-3xl font-bold text-foreground mb-2">Complete Your Profile</h1>
            <p className="text-muted-foreground">
              A complete profile increases your chances of getting hired
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Profile Completion Sidebar */}
          <div>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-primary" />
                  <span>Profile Completion</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {profileCompletion}%
                  </div>
                  <Progress value={profileCompletion} className="mb-4" />
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className={`h-4 w-4 ${profileData.full_name ? 'text-success' : 'text-muted-foreground'}`} />
                    <span>Basic Information</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className={`h-4 w-4 ${profileData.bio ? 'text-success' : 'text-muted-foreground'}`} />
                    <span>Bio</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Basic Information */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Tell us about yourself and your academic background
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    id="full_name"
                    value={profileData.full_name}
                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Tell us about yourself, your interests, and career goals..."
                    rows={3}
                  />
                </div>

              </CardContent>
            </Card>


            {/* Save Button */}
            <div className="flex justify-end">
              <Button 
                onClick={handleSave} 
                disabled={loading}
                className="gradient-primary text-primary-foreground px-8 py-3"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : 'Save Profile'}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentProfile;