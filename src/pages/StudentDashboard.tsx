import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Navigation from '@/components/Layout/Navigation';
import Footer from '@/components/Layout/Footer';
import { 
  User, 
  FileText, 
  Search, 
  Briefcase, 
  Calendar, 
  Award, 
  TrendingUp,
  MapPin,
  Clock,
  Building2,
  Star,
  ArrowRight,
  Edit,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import studentDashboardBg from '@/assets/student-dashboard-bg.jpg';

const StudentDashboard = () => {
  const { toast } = useToast();

  const recommendations = [
    {
      id: 1,
      title: "Software Developer Intern",
      company: "TCS Jaipur",
      location: "Jaipur, Rajasthan",
      type: "Internship",
      duration: "6 months",
      stipend: "₹15,000/month",
      skills: ["React", "Node.js", "MongoDB"],
      match: 92,
      deadline: "2024-02-15"
    },
    {
      id: 2,
      title: "Data Analyst",
      company: "Infosys Udaipur",
      location: "Udaipur, Rajasthan",  
      type: "Full-time",
      duration: "Permanent",
      stipend: "₹4.5 LPA",
      skills: ["Python", "SQL", "Tableau"],
      match: 88,
      deadline: "2024-02-20"
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Rajasthan IT Ltd",
      location: "Jodhpur, Rajasthan",
      type: "Internship",
      duration: "4 months", 
      stipend: "₹12,000/month",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      match: 85,
      deadline: "2024-02-10"
    }
  ];

  const applications = [
    {
      id: 1,
      position: "Frontend Developer",
      company: "Tech Mahindra",
      appliedDate: "2024-01-15",
      status: "Interview Scheduled",
      statusColor: "bg-warning",
      nextStep: "Technical Round - Jan 25, 2024"
    },
    {
      id: 2,
      position: "Marketing Intern",
      company: "HDFC Bank",
      appliedDate: "2024-01-12",
      status: "Under Review",
      statusColor: "bg-primary",
      nextStep: "Waiting for HR response"
    },
    {
      id: 3,
      position: "Content Writer",
      company: "Byju's Jaipur",
      appliedDate: "2024-01-08",
      status: "Offer Received",
      statusColor: "bg-success",
      nextStep: "Accept/Reject by Jan 30"
    }
  ];

  const handleApply = (jobId: number) => {
    toast({
      title: "Application Submitted",
      description: "Your application has been sent successfully!",
    });
  };

  return (
    <div 
      className="min-h-screen bg-background bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${studentDashboardBg})` }}
    >
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]"></div>
      <div className="relative z-10">
        <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="animate-slide-up">
            <h1 className="text-3xl font-bold text-foreground mb-2">Student Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your placement progress.</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link to="/student-profile">
              <Button variant="outline" className="flex items-center space-x-2">
                <Edit className="h-4 w-4" />
                <span>Edit Profile</span>
              </Button>
            </Link>
            <Link to="/my-applications">
              <Button className="gradient-primary flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>My Applications</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Profile Completion */}
          <div className="lg:col-span-1">
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Profile Status</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Completion</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span>Basic Info ✓</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span>Resume ✓</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-warning rounded-full" />
                    <span>Skills Assessment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-muted rounded-full" />
                    <span>Portfolio</span>
                  </div>
                </div>
                <Link to="/student-profile">
                  <Button size="sm" className="w-full">
                    Complete Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="glass-card mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Applications</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Interviews</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Offers</span>
                  <span className="font-medium">1</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Recommended Opportunities */}
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Search className="h-5 w-5 text-primary" />
                    <CardTitle>Recommended Opportunities</CardTitle>
                  </div>
                  <Link to="/browse-jobs">
                    <Button variant="outline" size="sm">
                      View All
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <CardDescription>
                  AI-powered job matches based on your profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-smooth">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{job.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center space-x-1">
                              <Building2 className="h-4 w-4" />
                              <span>{job.company}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-1">
                            <Star className="h-4 w-4 text-warning fill-warning" />
                            <span className="text-sm font-medium">{job.match}% match</span>
                          </div>
                          <Badge variant={job.type === 'Internship' ? 'secondary' : 'default'}>
                            {job.type}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-muted-foreground">Duration:</span>
                          <p className="font-medium">{job.duration}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Stipend:</span>
                          <p className="font-medium">{job.stipend}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Deadline:</span>
                          <p className="font-medium">{job.deadline}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {job.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <Button 
                          size="sm" 
                          className="ml-4"
                          onClick={() => handleApply(job.id)}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* My Applications */}
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-5 w-5 text-secondary" />
                    <CardTitle>Recent Applications</CardTitle>
                  </div>
                  <Link to="/my-applications">
                    <Button variant="outline" size="sm">
                      View All
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-smooth">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${app.statusColor}`} />
                        <div>
                          <h4 className="font-medium">{app.position}</h4>
                          <p className="text-sm text-muted-foreground">{app.company}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={app.statusColor}>{app.status}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{app.nextStep}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

        <Footer />
      </div>
    </div>
  );
};

export default StudentDashboard;