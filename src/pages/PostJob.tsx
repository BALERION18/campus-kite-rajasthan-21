import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Layout/Navigation';
import Footer from '@/components/Layout/Footer';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { 
  ArrowLeft,
  Plus,
  X,
  Briefcase,
  Building2,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Calendar
} from 'lucide-react';

// Validation schema
const jobSchema = z.object({
  title: z.string().trim().min(1, "Job title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().trim().min(10, "Description must be at least 10 characters").max(5000, "Description must be less than 5000 characters"),
  company_name: z.string().trim().min(1, "Company name is required").max(100, "Company name must be less than 100 characters"),
  location: z.string().trim().min(1, "Location is required").max(100, "Location must be less than 100 characters"),
  job_type: z.enum(['full-time', 'part-time', 'internship', 'contract']),
  salary_range: z.string().trim().max(50, "Salary range must be less than 50 characters").optional(),
  experience_level: z.enum(['entry', 'mid', 'senior', 'any']),
  application_deadline: z.string().optional()
});

const PostJob = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [newRequirement, setNewRequirement] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company_name: '',
    location: '',
    job_type: '',
    salary_range: '',
    experience_level: '',
    application_deadline: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addRequirement = () => {
    if (newRequirement.trim() && !requirements.includes(newRequirement.trim())) {
      setRequirements([...requirements, newRequirement.trim()]);
      setNewRequirement('');
    }
  };

  const removeRequirement = (requirementToRemove: string) => {
    setRequirements(requirements.filter(req => req !== requirementToRemove));
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

  const validateForm = () => {
    try {
      jobSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to post a job.",
        variant: "destructive"
      });
      return;
    }

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const jobData = {
        ...formData,
        posted_by: user.id,
        requirements: requirements.length > 0 ? requirements : null,
        skills_required: skills.length > 0 ? skills : null,
        application_deadline: formData.application_deadline || null,
        salary_range: formData.salary_range || null
      };

      const { error } = await supabase
        .from('jobs')
        .insert([jobData]);

      if (error) throw error;

      toast({
        title: "Job Posted Successfully",
        description: "Your job posting is now live and candidates can apply.",
      });

      navigate('/recruiter-dashboard');
    } catch (error) {
      console.error('Error posting job:', error);
      toast({
        title: "Error",
        description: "Failed to post job. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/recruiter-dashboard')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="animate-slide-up">
            <h1 className="text-3xl font-bold text-foreground mb-2">Post New Job</h1>
            <p className="text-muted-foreground">
              Create a job posting to attract top talent
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <span>Job Details</span>
                </CardTitle>
                <CardDescription>
                  Provide the basic information about the job position
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="e.g., Software Developer, Data Analyst"
                      className={errors.title ? 'border-destructive' : ''}
                    />
                    {errors.title && <p className="text-sm text-destructive mt-1">{errors.title}</p>}
                  </div>
                  <div>
                    <Label htmlFor="company_name">Company Name *</Label>
                    <Input
                      id="company_name"
                      value={formData.company_name}
                      onChange={(e) => handleInputChange('company_name', e.target.value)}
                      placeholder="Your company name"
                      className={errors.company_name ? 'border-destructive' : ''}
                    />
                    {errors.company_name && <p className="text-sm text-destructive mt-1">{errors.company_name}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe the role, responsibilities, and what you're looking for..."
                    rows={6}
                    className={errors.description ? 'border-destructive' : ''}
                  />
                  {errors.description && <p className="text-sm text-destructive mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="e.g., Jaipur, Remote, Hybrid"
                      className={errors.location ? 'border-destructive' : ''}
                    />
                    {errors.location && <p className="text-sm text-destructive mt-1">{errors.location}</p>}
                  </div>
                  <div>
                    <Label htmlFor="job_type">Job Type *</Label>
                    <Select 
                      value={formData.job_type} 
                      onValueChange={(value) => handleInputChange('job_type', value)}
                    >
                      <SelectTrigger className={errors.job_type ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.job_type && <p className="text-sm text-destructive mt-1">{errors.job_type}</p>}
                  </div>
                  <div>
                    <Label htmlFor="experience_level">Experience Level *</Label>
                    <Select 
                      value={formData.experience_level} 
                      onValueChange={(value) => handleInputChange('experience_level', value)}
                    >
                      <SelectTrigger className={errors.experience_level ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level</SelectItem>
                        <SelectItem value="mid">Mid Level</SelectItem>
                        <SelectItem value="senior">Senior Level</SelectItem>
                        <SelectItem value="any">Any Level</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.experience_level && <p className="text-sm text-destructive mt-1">{errors.experience_level}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="salary_range">Salary Range</Label>
                    <Input
                      id="salary_range"
                      value={formData.salary_range}
                      onChange={(e) => handleInputChange('salary_range', e.target.value)}
                      placeholder="e.g., ₹5-8 LPA, ₹25,000/month"
                    />
                  </div>
                  <div>
                    <Label htmlFor="application_deadline">Application Deadline</Label>
                    <Input
                      id="application_deadline"
                      type="date"
                      value={formData.application_deadline}
                      onChange={(e) => handleInputChange('application_deadline', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Requirements</span>
                </CardTitle>
                <CardDescription>
                  Add specific requirements for this position
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    placeholder="Add a requirement (e.g., Bachelor's degree in Computer Science)"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                  />
                  <Button type="button" onClick={addRequirement}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {requirements.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {requirements.map((requirement, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                        <span>{requirement}</span>
                        <X 
                          className="h-3 w-3 cursor-pointer hover:text-destructive" 
                          onClick={() => removeRequirement(requirement)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Required Skills</CardTitle>
                <CardDescription>
                  Specify the technical and soft skills needed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill (e.g., React, Python, Communication)"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  />
                  <Button type="button" onClick={addSkill}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="flex items-center space-x-1">
                        <span>{skill}</span>
                        <X 
                          className="h-3 w-3 cursor-pointer hover:text-destructive" 
                          onClick={() => removeSkill(skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/recruiter-dashboard')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
                className="gradient-primary text-primary-foreground px-8"
              >
                {loading ? 'Posting...' : 'Post Job'}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PostJob;