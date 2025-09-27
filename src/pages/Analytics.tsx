import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Navigation from '@/components/Layout/Navigation';
import Footer from '@/components/Layout/Footer';
import { 
  TrendingUp, 
  Users, 
  Building2, 
  Award,
  Calendar,
  FileText,
  Target,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import analyticsImageBg from '@/assets/analytics-dashboard-bg.jpg';

const Analytics = () => {
  const placementStats = [
    { department: "Computer Science", placed: 145, total: 160, rate: 91 },
    { department: "Electronics", placed: 89, total: 105, rate: 85 },
    { department: "Mechanical", placed: 76, total: 95, rate: 80 },
    { department: "Civil", placed: 65, total: 85, rate: 76 },
    { department: "MBA", placed: 45, total: 50, rate: 90 },
  ];

  const topRecruiters = [
    { name: "TCS", hires: 45, positions: ["Software Developer", "Analyst"] },
    { name: "Infosys", hires: 38, positions: ["System Engineer", "Consultant"] },
    { name: "HDFC Bank", hires: 22, positions: ["Banking Associate", "Manager"] },
    { name: "Tech Mahindra", hires: 18, positions: ["Technical Associate"] },
    { name: "Wipro", hires: 15, positions: ["Developer", "Support Engineer"] },
  ];

  const upcomingInterviews = [
    {
      date: "2024-01-25",
      company: "Microsoft",
      position: "Software Engineer",
      candidates: 12,
      type: "Technical Round"
    },
    {
      date: "2024-01-26", 
      company: "Google",
      position: "Product Manager",
      candidates: 8,
      type: "Final Round"
    },
    {
      date: "2024-01-27",
      company: "Amazon",
      position: "DevOps Engineer", 
      candidates: 15,
      type: "HR Round"
    }
  ];

  const recentCertificates = [
    { student: "Priya Sharma", internship: "Web Development", company: "TCS", date: "2024-01-20" },
    { student: "Rahul Gupta", internship: "Data Analysis", company: "Infosys", date: "2024-01-19" },
    { student: "Anita Verma", internship: "Digital Marketing", company: "HDFC", date: "2024-01-18" },
    { student: "Vikash Kumar", internship: "Software Testing", company: "Wipro", date: "2024-01-17" },
  ];

  return (
    <div 
      className="min-h-screen bg-background bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${analyticsImageBg})` }}
    >
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]"></div>
      <div className="relative z-10">
        <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time insights into campus placement activities and student progress.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-3xl font-bold text-primary">2,847</p>
                  <p className="text-xs text-success">+12% from last year</p>
                </div>
                <Users className="h-10 w-10 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Placed Students</p>
                  <p className="text-3xl font-bold text-success">2,145</p>
                  <p className="text-xs text-success">89% placement rate</p>
                </div>
                <Award className="h-10 w-10 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Partner Companies</p>
                  <p className="text-3xl font-bold text-secondary">156</p>
                  <p className="text-xs text-success">+23 new partners</p>
                </div>
                <Building2 className="h-10 w-10 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Package</p>
                  <p className="text-3xl font-bold text-warning">₹4.2 LPA</p>
                  <p className="text-xs text-success">+8% increase</p>
                </div>
                <TrendingUp className="h-10 w-10 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Department-wise Placement */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <CardTitle>Department-wise Placement Statistics</CardTitle>
                </div>
                <CardDescription>
                  Placement rates across different departments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {placementStats.map((dept, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{dept.department}</span>
                        <div className="text-right">
                          <span className="text-sm font-medium">{dept.placed}/{dept.total}</span>
                          <Badge className="ml-2" variant={dept.rate >= 85 ? 'default' : 'secondary'}>
                            {dept.rate}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={dept.rate} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Recruiters */}
          <div>
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-secondary" />
                  <CardTitle>Top Recruiters</CardTitle>
                </div>
                <CardDescription>
                  Companies with highest recruitment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topRecruiters.map((recruiter, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{recruiter.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {recruiter.positions.join(", ")}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-primary">{recruiter.hires}</span>
                        <p className="text-xs text-muted-foreground">hires</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upcoming Interviews */}
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-warning" />
                <CardTitle>Upcoming Interviews</CardTitle>
              </div>
              <CardDescription>
                Scheduled interview sessions for this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInterviews.map((interview, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-smooth">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{interview.company}</h4>
                        <p className="text-sm text-muted-foreground">{interview.position}</p>
                      </div>
                      <Badge variant="outline">{interview.type}</Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>Date: {interview.date}</span>
                      <span>{interview.candidates} candidates</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Certificates */}
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-success" />
                <CardTitle>Recent Certificates</CardTitle>
              </div>
              <CardDescription>
                Latest internship completion certificates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCertificates.map((cert, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-smooth">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{cert.student}</h4>
                        <p className="text-sm text-muted-foreground">
                          {cert.internship} at {cert.company}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{cert.date}</p>
                        <Badge className="bg-success text-success-foreground mt-1">
                          Certified
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

        <Footer />
      </div>
    </div>
  );
};

export default Analytics;