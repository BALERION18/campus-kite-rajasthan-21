import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Layout/Navigation';
import Footer from '@/components/Layout/Footer';
import { 
  Users, 
  Plus, 
  FileText, 
  Search, 
  Filter,
  Download,
  Calendar,
  Building2,
  MapPin,
  Clock,
  TrendingUp,
  Eye,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import placementDashboardBg from '@/assets/placement-dashboard-bg.jpg';

const PlacementDashboard = () => {
  const [showJobForm, setShowJobForm] = useState(false);
  const { toast } = useToast();

  const opportunities = [
    {
      id: 1,
      title: "Software Developer",
      company: "TCS",
      location: "Jaipur",
      type: "Full-time",
      postedDate: "2024-01-20",
      applications: 45,
      status: "Active",
      deadline: "2024-02-15"
    },
    {
      id: 2,
      title: "Data Analyst Intern",
      company: "Infosys",
      location: "Udaipur", 
      type: "Internship",
      postedDate: "2024-01-18",
      applications: 32,
      status: "Active",
      deadline: "2024-02-10"
    },
    {
      id: 3,  
      title: "Marketing Executive",
      company: "HDFC Bank",
      location: "Jodhpur",
      type: "Full-time",
      postedDate: "2024-01-15",
      applications: 28,
      status: "Closed",
      deadline: "2024-01-30"
    }
  ];

  const recentApplications = [
    {
      id: 1,
      studentName: "Priya Sharma",
      position: "Software Developer",
      company: "TCS",
      appliedDate: "2024-01-21",
      status: "Pending Review",
      statusColor: "bg-warning"
    },
    {
      id: 2,
      studentName: "Rahul Gupta", 
      position: "Data Analyst Intern",
      company: "Infosys",
      appliedDate: "2024-01-21",
      status: "Shortlisted",
      statusColor: "bg-primary"
    },
    {
      id: 3,
      studentName: "Anita Verma",
      position: "Marketing Executive", 
      company: "HDFC Bank",
      appliedDate: "2024-01-20",
      status: "Interview",
      statusColor: "bg-success"
    }
  ];

  const handleJobPost = () => {
    toast({
      title: "Job Posted Successfully",
      description: "The opportunity has been added and is now live for students.",
    });
    setShowJobForm(false);
  };

  const exportReports = () => {
    toast({
      title: "Report Generated",
      description: "Analytics report has been downloaded successfully.",
    });
  };

  return (
    <div 
      className="min-h-screen bg-background bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${placementDashboardBg})` }}
    >
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]"></div>
      <div className="relative z-10">
        <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="animate-slide-up">
            <h1 className="text-3xl font-bold text-foreground mb-2">Placement Dashboard</h1>
            <p className="text-muted-foreground">Manage campus placement opportunities and student applications.</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              onClick={exportReports}
              className="flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export Reports</span>
            </Button>
            <Button 
              onClick={() => setShowJobForm(true)}
              className="gradient-secondary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Post New Opportunity</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Jobs</p>
                  <p className="text-2xl font-bold text-primary">24</p>
                </div>
                <Building2 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Applications</p>
                  <p className="text-2xl font-bold text-secondary">1,247</p>
                </div>
                <FileText className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Placements</p>
                  <p className="text-2xl font-bold text-success">356</p>
                </div>
                <UserCheck className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold text-warning">89%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Posted Opportunities */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <CardTitle>Posted Opportunities</CardTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {opportunities.map((job) => (
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
                          <Badge variant={job.status === 'Active' ? 'default' : 'secondary'}>
                            {job.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {job.applications} applications
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Posted: {job.postedDate}</span>
                          <span>Deadline: {job.deadline}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Link to={`/applications/${job.id}`}>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              View Applications
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Applications */}
          <div>
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-secondary" />
                  <CardTitle>Recent Applications</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((app) => (
                    <div key={app.id} className="border rounded-lg p-3 hover:shadow-md transition-smooth">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{app.studentName}</h4>
                        <Badge className={`${app.statusColor} text-xs`}>
                          {app.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {app.position} at {app.company}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Applied: {app.appliedDate}
                      </p>
                    </div>
                  ))}
                </div>
                <Link to="/all-applications">
                  <Button className="w-full mt-4" variant="outline">
                    View All Applications
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/analytics">
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </Link>
                <Link to="/scheduled-interviews">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Interview Schedule
                  </Button>
                </Link>
                <Link to="/certificates">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Certificates
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Job Posting Modal */}
        {showJobForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Post New Opportunity</CardTitle>
                <CardDescription>
                  Create a new internship or job posting for students
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Job Title</Label>
                    <Input id="title" placeholder="Software Developer" />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Company Name" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Job Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Jaipur, Rajasthan" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="skills">Required Skills</Label>
                  <Input id="skills" placeholder="React, Node.js, MongoDB" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stipend">Stipend/Salary</Label>
                    <Input id="stipend" placeholder="₹15,000/month" />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input id="duration" placeholder="6 months" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the role, responsibilities, and requirements..." 
                    rows={4}
                  />
                </div>

                <div className="flex items-center justify-end space-x-4 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowJobForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleJobPost} className="gradient-secondary">
                    Post Opportunity
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

        <Footer />
      </div>
    </div>
  );
};

export default PlacementDashboard;