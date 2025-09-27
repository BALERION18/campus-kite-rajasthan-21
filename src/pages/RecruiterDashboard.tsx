import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Navigation from '@/components/Layout/Navigation';
import Footer from '@/components/Layout/Footer';
import { 
  Building2, 
  Search, 
  Filter,
  Users,
  Mail,
  Calendar,
  Star,
  MapPin,
  GraduationCap,
  Award,
  Send,
  Eye,
  Download,
  UserPlus,
  Briefcase
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import recruiterDashboardBg from '@/assets/recruiter-dashboard-bg.jpg';

const RecruiterDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [interviewForm, setInterviewForm] = useState({
    date: '',
    time: '',
    type: '',
    message: ''
  });
  const { toast } = useToast();

  const candidateProfiles = [
    {
      id: 1,
      name: "Priya Sharma",
      course: "B.Tech Computer Science",
      year: "Final Year",
      cgpa: "8.5",
      skills: ["React", "Node.js", "Python", "MongoDB"],
      location: "Jaipur, Rajasthan",
      experience: "6 months internship",
      projects: 4,
      rating: 4.8,
      availability: "Immediate",
      preferredRole: "Software Developer"
    },
    {
      id: 2,
      name: "Rahul Gupta",
      course: "B.Tech Electronics",
      year: "Final Year", 
      cgpa: "7.9",
      skills: ["VLSI", "Embedded Systems", "C++", "MATLAB"],
      location: "Udaipur, Rajasthan",
      experience: "1 year internship",
      projects: 3,
      rating: 4.5,
      availability: "2 months notice",
      preferredRole: "Hardware Engineer"
    },
    {
      id: 3,
      name: "Anita Verma",
      course: "MBA Marketing",
      year: "Final Year",
      cgpa: "8.2",
      skills: ["Digital Marketing", "Analytics", "Strategy", "Communication"],
      location: "Jodhpur, Rajasthan",
      experience: "8 months internship",
      projects: 5,
      rating: 4.7,
      availability: "Immediate",
      preferredRole: "Marketing Executive"
    },
    {
      id: 4,
      name: "Vikash Kumar",
      course: "B.Tech Information Technology",
      year: "Final Year",
      cgpa: "8.0",
      skills: ["Java", "Spring Boot", "AWS", "Docker"],
      location: "Kota, Rajasthan",
      experience: "1.5 years internship",
      projects: 6,
      rating: 4.6,
      availability: "1 month notice",
      preferredRole: "Backend Developer"
    }
  ];

  const myJobs = [
    {
      id: 1,
      title: "Software Developer",
      department: "Technology",
      applicants: 45,
      shortlisted: 12,
      interviewed: 8,
      selected: 3,
      status: "Active",
      deadline: "2024-02-15"
    },
    {
      id: 2,
      title: "Data Analyst",
      department: "Analytics",
      applicants: 32,
      shortlisted: 10,
      interviewed: 6,
      selected: 2,
      status: "Active", 
      deadline: "2024-02-20"
    },
    {
      id: 3,
      title: "Marketing Executive",
      department: "Marketing",
      applicants: 28,
      shortlisted: 15,
      interviewed: 10,
      selected: 5,
      status: "Closed",
      deadline: "2024-01-30"
    }
  ];

  const interviewRequests = [
    {
      id: 1,
      candidate: "Priya Sharma",
      position: "Software Developer",
      requestDate: "2024-01-22",
      proposedDate: "2024-01-28",
      status: "Pending"
    },
    {
      id: 2,
      candidate: "Vikash Kumar", 
      position: "Backend Developer",
      requestDate: "2024-01-21",
      proposedDate: "2024-01-27",
      status: "Confirmed"
    }
  ];

  const handleSendInterviewRequest = (candidateId: number) => {
    const candidate = candidateProfiles.find(c => c.id === candidateId);
    setSelectedCandidate(candidate);
    setShowInterviewModal(true);
  };

  const handleViewProfile = (candidateId: number) => {
    const candidate = candidateProfiles.find(c => c.id === candidateId);
    setSelectedCandidate(candidate);
    setShowProfileModal(true);
  };

  const handleSubmitInterviewRequest = () => {
    toast({
      title: "Interview Request Sent",
      description: `Interview request sent to ${selectedCandidate?.name}`,
    });
    setShowInterviewModal(false);
    setInterviewForm({ date: '', time: '', type: '', message: '' });
  };

  const handleExportCandidates = () => {
    // Create CSV content
    const csvContent = candidateProfiles.map(candidate => 
      `${candidate.name},${candidate.course},${candidate.cgpa},${candidate.location},${candidate.skills.join(';')},${candidate.experience}`
    ).join('\n');
    
    const csvHeader = 'Name,Course,CGPA,Location,Skills,Experience\n';
    const csvData = csvHeader + csvContent;
    
    // Create and download file
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'candidates.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Export Successful",
      description: "Candidate data has been exported to CSV file.",
    });
  };

  return (
    <div 
      className="min-h-screen bg-background bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${recruiterDashboardBg})` }}
    >
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]"></div>
      <div className="relative z-10">
        <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="animate-slide-up">
            <h1 className="text-3xl font-bold text-foreground mb-2">Recruiter Dashboard</h1>
            <p className="text-muted-foreground">Find and recruit top talent from Rajasthan's educational institutions.</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link to="/post-job">
              <Button variant="outline" className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4" />
                <span>Post New Job</span>
              </Button>
            </Link>
            <Button 
              onClick={handleExportCandidates}
              className="bg-warning text-warning-foreground flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export Candidates</span>
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
                  <p className="text-2xl font-bold text-warning">6</p>
                </div>
                <Briefcase className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Applications</p>
                  <p className="text-2xl font-bold text-primary">105</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Shortlisted</p>
                  <p className="text-2xl font-bold text-secondary">37</p>
                </div>
                <Award className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hired</p>
                  <p className="text-2xl font-bold text-success">10</p>
                </div>
                <UserPlus className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Candidate Search */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Search className="h-5 w-5 text-primary" />
                    <CardTitle>Search Candidates</CardTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All Departments" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="computer-science">Computer Science</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="mechanical">Mechanical</SelectItem>
                        <SelectItem value="mba">MBA</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      More Filters
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, skills, or course..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidateProfiles.map((candidate) => (
                    <div key={candidate.id} className="border rounded-lg p-4 hover:shadow-md transition-smooth">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-lg">{candidate.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <GraduationCap className="h-4 w-4" />
                                <span>{candidate.course}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{candidate.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            <Star className="h-4 w-4 text-warning fill-warning" />
                            <span className="text-sm font-medium">{candidate.rating}</span>
                          </div>
                          <Badge variant="outline">CGPA: {candidate.cgpa}</Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-muted-foreground">Experience:</span>
                          <p className="font-medium">{candidate.experience}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Projects:</span>
                          <p className="font-medium">{candidate.projects}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Preferred Role:</span>
                          <p className="font-medium">{candidate.preferredRole}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Availability:</span>
                          <p className="font-medium">{candidate.availability}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 4).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{candidate.skills.length - 4} more
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewProfile(candidate.id)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Profile
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleSendInterviewRequest(candidate.id)}
                          >
                            <Send className="h-4 w-4 mr-1" />
                            Interview Request
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Status & Interview Requests */}
          <div className="space-y-6">
            {/* My Jobs */}
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5 text-warning" />
                  <CardTitle>My Job Postings</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-3 hover:shadow-md transition-smooth">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{job.title}</h4>
                        <Badge variant={job.status === 'Active' ? 'default' : 'secondary'}>
                          {job.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-2">
                        <div>Applications: {job.applicants}</div>
                        <div>Shortlisted: {job.shortlisted}</div>
                        <div>Interviewed: {job.interviewed}</div>
                        <div>Selected: {job.selected}</div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Deadline: {job.deadline}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interview Requests */}
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-secondary" />
                  <CardTitle>Interview Requests</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {interviewRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-3 hover:shadow-md transition-smooth">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{request.candidate}</h4>
                        <Badge 
                          className={
                            request.status === 'Confirmed' ? 'bg-success' :
                            request.status === 'Pending' ? 'bg-warning' : 'bg-secondary'
                          }
                        >
                          {request.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Position: {request.position}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Proposed: {request.proposedDate}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/bulk-message">
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Bulk Message
                  </Button>
                </Link>
                <Link to="/analytics">
                  <Button variant="outline" className="w-full justify-start">
                    <Award className="h-4 w-4 mr-2" />
                    Recruitment Analytics
                  </Button>
                </Link>
                <Link to="/interview-schedule">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Interviews
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Profile View Modal */}
      {showProfileModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg">
                      {selectedCandidate.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedCandidate.name}</h2>
                    <p className="text-muted-foreground">{selectedCandidate.course}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Star className="h-4 w-4 text-warning fill-warning" />
                      <span className="text-sm font-medium">{selectedCandidate.rating}</span>
                      <Badge variant="outline">CGPA: {selectedCandidate.cgpa}</Badge>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowProfileModal(false)}
                >
                  ✕
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Personal Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span>{selectedCandidate.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Year:</span>
                        <span>{selectedCandidate.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Availability:</span>
                        <span>{selectedCandidate.availability}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Experience & Projects</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Experience:</span>
                        <span>{selectedCandidate.experience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Projects:</span>
                        <span>{selectedCandidate.projects}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Preferred Role:</span>
                        <span>{selectedCandidate.preferredRole}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.skills.map((skill: string) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
                <Button 
                  variant="outline"
                  onClick={() => setShowProfileModal(false)}
                >
                  Close
                </Button>
                <Button 
                  onClick={() => {
                    setShowProfileModal(false);
                    handleSendInterviewRequest(selectedCandidate.id);
                  }}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Interview Request
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interview Request Modal */}
      {showInterviewModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Send Interview Request</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowInterviewModal(false)}
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Sending interview request to: <strong>{selectedCandidate.name}</strong>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="interview-date">Interview Date</Label>
                    <Input
                      id="interview-date"
                      type="date"
                      value={interviewForm.date}
                      onChange={(e) => setInterviewForm({...interviewForm, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="interview-time">Time</Label>
                    <Input
                      id="interview-time"
                      type="time"
                      value={interviewForm.time}
                      onChange={(e) => setInterviewForm({...interviewForm, time: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="interview-type">Interview Type</Label>
                  <Select value={interviewForm.type} onValueChange={(value) => setInterviewForm({...interviewForm, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select interview type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Round</SelectItem>
                      <SelectItem value="hr">HR Round</SelectItem>
                      <SelectItem value="final">Final Round</SelectItem>
                      <SelectItem value="group">Group Discussion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="interview-message">Additional Message (Optional)</Label>
                  <Textarea
                    id="interview-message"
                    placeholder="Add any specific instructions or requirements..."
                    rows={3}
                    value={interviewForm.message}
                    onChange={(e) => setInterviewForm({...interviewForm, message: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <Button 
                  variant="outline"
                  onClick={() => setShowInterviewModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmitInterviewRequest}
                  disabled={!interviewForm.date || !interviewForm.time || !interviewForm.type}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Request
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      </div>
    </div>
  );
};

export default RecruiterDashboard;