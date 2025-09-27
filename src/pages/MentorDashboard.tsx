import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Navigation from '@/components/Layout/Navigation';
import Footer from '@/components/Layout/Footer';
import { 
  UserCheck, 
  Calendar, 
  MessageSquare, 
  Star,
  Clock,
  CheckCircle,
  XCircle,
  Send,
  Users,
  Award,
  TrendingUp,
  FileText
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import mentorDashboardBg from '@/assets/mentor-dashboard-bg.jpg';

const MentorDashboard = () => {
  const [feedbackForm, setFeedbackForm] = useState({ studentId: '', feedback: '', rating: '' });
  const { toast } = useToast();

  const menteeRequests = [
    {
      id: 1,
      name: "Priya Sharma",
      course: "B.Tech CSE",
      year: "Final Year", 
      skills: ["React", "Node.js", "Python"],
      requestDate: "2024-01-20",
      status: "Pending",
      cgpa: "8.2"
    },
    {
      id: 2,
      name: "Rahul Gupta",
      course: "B.Tech ECE",
      year: "3rd Year",
      skills: ["VLSI", "Embedded Systems", "C++"],
      requestDate: "2024-01-19",
      status: "Pending",
      cgpa: "7.8"
    },
    {
      id: 3,
      name: "Anita Verma", 
      course: "MBA",
      year: "2nd Year",
      skills: ["Marketing", "Analytics", "Strategy"],
      requestDate: "2024-01-18",
      status: "Pending",
      cgpa: "8.5"
    }
  ];

  const currentMentees = [
    {
      id: 1,
      name: "Vikash Kumar",
      course: "B.Tech IT",
      progress: 75,
      nextSession: "2024-01-25",
      status: "On Track",
      applications: 5,
      interviews: 2
    },
    {
      id: 2,
      name: "Sneha Patel",
      course: "B.Tech Mechanical", 
      progress: 60,
      nextSession: "2024-01-26",
      status: "Needs Attention",
      applications: 3,
      interviews: 1
    },
    {
      id: 3,
      name: "Amit Singh",
      course: "MBA Finance",
      progress: 90,
      nextSession: "2024-01-27", 
      status: "Excellent",
      applications: 8,
      interviews: 4
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      student: "Vikash Kumar",
      date: "2024-01-25",
      time: "10:00 AM",
      type: "Career Guidance",
      duration: "1 hour"
    },
    {
      id: 2,
      student: "Sneha Patel", 
      date: "2024-01-26",
      time: "2:00 PM",
      type: "Interview Prep",
      duration: "45 mins"
    },
    {
      id: 3,
      student: "Amit Singh",
      date: "2024-01-27",
      time: "11:00 AM", 
      type: "Resume Review",
      duration: "30 mins"
    }
  ];

  const handleApproveRequest = (requestId: number) => {
    toast({
      title: "Request Approved",
      description: "Student has been added to your mentee list.",
    });
  };

  const handleRejectRequest = (requestId: number) => {
    toast({
      title: "Request Declined",
      description: "The mentorship request has been declined.",
      variant: "destructive",
    });
  };

  const handleSubmitFeedback = () => {
    toast({
      title: "Feedback Submitted",
      description: "Student's employability record has been updated.",
    });
    setFeedbackForm({ studentId: '', feedback: '', rating: '' });
  };

  return (
    <div 
      className="min-h-screen bg-background bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${mentorDashboardBg})` }}
    >
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]"></div>
      <div className="relative z-10">
        <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="animate-slide-up">
            <h1 className="text-3xl font-bold text-foreground mb-2">Mentor Dashboard</h1>
            <p className="text-muted-foreground">Guide students and track their career development progress.</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link to="/mentor-schedule">
              <Button variant="outline" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Schedule Session</span>
              </Button>
            </Link>
            <Button className="bg-success text-success-foreground flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Send Message</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Mentees</p>
                  <p className="text-2xl font-bold text-success">12</p>
                </div>
                <Users className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Sessions This Month</p>
                  <p className="text-2xl font-bold text-primary">28</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Placement Success</p>
                  <p className="text-2xl font-bold text-warning">85%</p>
                </div>
                <Award className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                  <p className="text-2xl font-bold text-secondary">4.8</p>
                </div>
                <Star className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Mentorship Requests */}
          <div>
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  <CardTitle>Mentorship Requests</CardTitle>
                </div>
                <CardDescription>
                  Students requesting mentorship guidance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {menteeRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-smooth">
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{request.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{request.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {request.course} • {request.year}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">CGPA:</span>
                          <span className="font-medium">{request.cgpa}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {request.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-success text-success-foreground hover:bg-success/90"
                          onClick={() => handleApproveRequest(request.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Accept
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleRejectRequest(request.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Current Mentees & Upcoming Sessions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Mentees */}
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-success" />
                  <CardTitle>Current Mentees</CardTitle>
                </div>
                <CardDescription>
                  Students under your mentorship
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentMentees.map((mentee) => (
                    <div key={mentee.id} className="border rounded-lg p-4 hover:shadow-md transition-smooth">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{mentee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{mentee.name}</h4>
                            <p className="text-sm text-muted-foreground">{mentee.course}</p>
                          </div>
                        </div>
                        <Badge 
                          className={
                            mentee.status === 'Excellent' ? 'bg-success' :
                            mentee.status === 'On Track' ? 'bg-primary' : 'bg-warning'
                          }
                        >
                          {mentee.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-muted-foreground">Progress:</span>
                          <p className="font-medium">{mentee.progress}%</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Applications:</span>
                          <p className="font-medium">{mentee.applications}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Interviews:</span>
                          <p className="font-medium">{mentee.interviews}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          Next Session: {mentee.nextSession}
                        </p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                          <Button size="sm">
                            <Calendar className="h-4 w-4 mr-1" />
                            Schedule
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Sessions */} 
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-warning" />
                  <CardTitle>Upcoming Sessions</CardTitle>
                </div>
                <CardDescription>
                  Scheduled mentorship sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="border rounded-lg p-4 hover:shadow-md transition-smooth">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{session.student}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{session.type}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{session.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{session.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{session.duration}</Badge>
                          <div className="flex space-x-2 mt-2">
                            <Button size="sm" variant="outline">Reschedule</Button>
                            <Button size="sm">Join</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Feedback Form */}
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-secondary" />
                  <CardTitle>Submit Student Feedback</CardTitle>
                </div>
                <CardDescription>
                  Update student employability records
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="feedback">Feedback & Assessment</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Enter detailed feedback about the student's performance, skills development, and readiness for placements..."
                    rows={4}
                    value={feedbackForm.feedback}
                    onChange={(e) => setFeedbackForm({...feedbackForm, feedback: e.target.value})}
                  />
                </div>
                <Button 
                  onClick={handleSubmitFeedback}
                  className="w-full gradient-secondary"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Feedback
                </Button>
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

export default MentorDashboard;