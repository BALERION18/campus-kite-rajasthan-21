import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Layout/Navigation';
import Footer from '@/components/Layout/Footer';
import { 
  Award, 
  Download, 
  Search, 
  Calendar,
  FileText,
  CheckCircle,
  User,
  Building2,
  Filter,
  Eye,
  Share,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import rajasthanLogo from '@/assets/rajasthan-logo.png';

const Certificates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const { toast } = useToast();

  const certificates = [
    {
      id: 1,
      studentName: "Priya Sharma",
      internshipTitle: "Web Development Internship",
      company: "TCS Jaipur",
      mentor: "Dr. R.K. Sharma",
      duration: "6 months",
      startDate: "2023-07-01",
      completionDate: "2024-01-15",
      grade: "A+",
      certificateId: "RAJ-2024-WD-001",
      status: "Generated",
      issueDate: "2024-01-20",
      skills: ["React", "Node.js", "Database Design"]
    },
    {
      id: 2,
      studentName: "Rahul Gupta", 
      internshipTitle: "Data Analysis Training",
      company: "Infosys Udaipur",
      mentor: "Prof. S.K. Verma",
      duration: "4 months",
      startDate: "2023-08-01",
      completionDate: "2024-01-10",
      grade: "A",
      certificateId: "RAJ-2024-DA-002",
      status: "Generated",
      issueDate: "2024-01-19",
      skills: ["Python", "SQL", "Data Visualization"]
    },
    {
      id: 3,
      studentName: "Anita Verma",
      internshipTitle: "Digital Marketing Program",
      company: "HDFC Bank Jodhpur", 
      mentor: "Ms. P. Agarwal",
      duration: "3 months",
      startDate: "2023-09-01",
      completionDate: "2024-01-05",
      grade: "A+",
      certificateId: "RAJ-2024-DM-003",
      status: "Pending Review",
      issueDate: "",
      skills: ["SEO", "Social Media", "Analytics"]
    },
    {
      id: 4,
      studentName: "Vikash Kumar",
      internshipTitle: "Software Testing Certification",
      company: "Wipro Kota",
      mentor: "Mr. A.K. Singh",
      duration: "5 months",
      startDate: "2023-06-01", 
      completionDate: "2024-01-08",
      grade: "A",
      certificateId: "RAJ-2024-ST-004",
      status: "Generated",
      issueDate: "2024-01-18",
      skills: ["Manual Testing", "Automation", "QA"]
    }
  ];

  const handleGenerateCertificate = (certId: number) => {
    toast({
      title: "Certificate Generated",
      description: "Internship completion certificate has been created successfully.",
    });
  };

  const handleDownloadCertificate = (certId: number) => {
    toast({
      title: "Certificate Downloaded",
      description: "PDF certificate has been downloaded to your device.",
    });
  };

  const handleViewCertificate = (certId: number) => {
    toast({
      title: "Certificate Preview",
      description: "Opening certificate preview in new window.",
    });
  };

  const CertificatePreview = ({ certificate }: { certificate: any }) => (
    <div className="bg-white border-2 border-primary p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <img src={rajasthanLogo} alt="Rajasthan Logo" className="h-16 w-16" />
          <div>
            <h1 className="text-2xl font-bold text-primary">Government of Rajasthan</h1>
            <p className="text-sm text-muted-foreground">Campus Placement & Internship Portal</p>
          </div>
        </div>
        <div className="border-t-2 border-secondary w-32 mx-auto"></div>
      </div>

      {/* Certificate Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Certificate of Completion</h2>
        <p className="text-lg text-muted-foreground">Internship Training Program</p>
      </div>

      {/* Content */}
      <div className="text-center space-y-4 mb-8">
        <p className="text-lg">This is to certify that</p>
        <h3 className="text-2xl font-bold text-primary border-b-2 border-secondary inline-block px-4 py-2">
          {certificate.studentName}
        </h3>
        <p className="text-lg">
          has successfully completed the <strong>{certificate.internshipTitle}</strong>
        </p>
        <p className="text-lg">
          at <strong>{certificate.company}</strong>
        </p>
        <p className="text-base text-muted-foreground">
          Duration: {certificate.duration} ({certificate.startDate} to {certificate.completionDate})
        </p>
        <p className="text-base text-muted-foreground">
          Under the guidance of <strong>{certificate.mentor}</strong>
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <Badge className="bg-success text-success-foreground">Grade: {certificate.grade}</Badge>
          <Badge variant="outline">ID: {certificate.certificateId}</Badge>
        </div>
      </div>

      {/* Skills */}
      <div className="text-center mb-8">
        <p className="text-sm text-muted-foreground mb-2">Skills Acquired:</p>
        <div className="flex justify-center flex-wrap gap-2">
          {certificate.skills.map((skill: string) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-end mt-12 text-sm">
        <div className="text-center">
          <div className="border-t border-muted w-32 mb-2"></div>
          <p className="font-medium">Placement Officer</p>
          <p className="text-muted-foreground">Government of Rajasthan</p>
        </div>
        <div className="text-center">
          <div className="border-t border-muted w-32 mb-2"></div>
          <p className="font-medium">Director</p>
          <p className="text-muted-foreground">Technical Education</p>
        </div>
      </div>
      
      <div className="text-center mt-6 text-xs text-muted-foreground">
        <p>Certificate ID: {certificate.certificateId} | Issue Date: {certificate.issueDate || 'Pending'}</p>
        <p>Verify at: placement.rajasthan.gov.in/verify</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="animate-slide-up">
            <h1 className="text-3xl font-bold text-foreground mb-2">Certificate Management</h1>
            <p className="text-muted-foreground">
              Generate, manage, and track internship completion certificates.
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Advanced Filter</span>
            </Button>
            <Button className="gradient-secondary flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Bulk Download</span>
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="glass-card mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by student name, company, or certificate ID..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="generated">Generated</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Certificates</p>
                  <p className="text-2xl font-bold text-primary">156</p>
                </div>
                <Award className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Generated</p>
                  <p className="text-2xl font-bold text-success">142</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-2xl font-bold text-warning">12</p>
                </div>
                <Calendar className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold text-secondary">28</p>
                </div>
                <FileText className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certificates List */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle>Internship Certificates</CardTitle>
                </div>
                <CardDescription>
                  Manage and generate completion certificates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="border rounded-lg p-4 hover:shadow-md transition-smooth">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{cert.studentName}</h3>
                          <p className="text-muted-foreground">{cert.internshipTitle}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center space-x-1">
                              <Building2 className="h-4 w-4" />
                              <span>{cert.company}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{cert.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge 
                            className={
                              cert.status === 'Generated' ? 'bg-success' :
                              cert.status === 'Pending Review' ? 'bg-warning' : 'bg-secondary'
                            }
                          >
                            {cert.status}
                          </Badge>
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="h-4 w-4 text-warning fill-warning" />
                            <span className="text-sm">{cert.grade}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-muted-foreground">Mentor:</span>
                          <p className="font-medium">{cert.mentor}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Certificate ID:</span>
                          <p className="font-medium font-mono text-xs">{cert.certificateId}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {cert.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewCertificate(cert.id)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          {cert.status === 'Generated' ? (
                            <Button 
                              size="sm"
                              onClick={() => handleDownloadCertificate(cert.id)}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          ) : (
                            <Button 
                              size="sm"
                              onClick={() => handleGenerateCertificate(cert.id)}
                            >
                              <Award className="h-4 w-4 mr-1" />
                              Generate
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Certificate Preview */}
          <div>
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-secondary" />
                  <CardTitle>Certificate Preview</CardTitle>
                </div>
                <CardDescription>
                  Sample certificate format
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="transform scale-50 origin-top">
                  <CertificatePreview certificate={certificates[0]} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Certificates;