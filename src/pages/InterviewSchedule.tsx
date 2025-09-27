import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Layout/Navigation';
import Footer from '@/components/Layout/Footer';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft,
  Calendar,
  Clock,
  Video,
  MapPin,
  Plus,
  Edit,
  Trash2,
  Users
} from 'lucide-react';

interface InterviewScheduleItem {
  id: string;
  interview_date: string;
  duration_minutes: number;
  interview_type: string;
  location?: string;
  meeting_url?: string;
  notes?: string;
  status: string;
  applications: {
    id: string;
    jobs: {
      title: string;
    };
  };
}

const InterviewSchedule = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState<InterviewScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [applications, setApplications] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    application_id: '',
    interview_date: '',
    interview_time: '',
    duration_minutes: '60',
    interview_type: 'technical',
    location: '',
    meeting_url: '',
    notes: ''
  });

  useEffect(() => {
    fetchInterviews();
    fetchApplications();
  }, [profile]);

  const fetchInterviews = async () => {
    try {
      if (!profile) return;

      const { data, error } = await supabase
        .from('interview_schedules')
        .select(`
          *,
          applications (
            id,
            jobs (
              title
            )
          )
        `)
        .eq('interviewer_id', profile.id)
        .order('interview_date', { ascending: true });

      if (error) throw error;

      setInterviews(data || []);
    } catch (error) {
      console.error('Error fetching interviews:', error);
      toast({
        title: "Error",
        description: "Failed to load interview schedules. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      if (!profile) return;

      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          jobs (
            title
          )
        `)
        .eq('status', 'shortlisted');

      if (error) throw error;

      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleScheduleInterview = async () => {
    try {
      if (!formData.application_id || !formData.interview_date || !formData.interview_time) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        return;
      }

      const interviewDateTime = new Date(`${formData.interview_date}T${formData.interview_time}`);

      const { error } = await supabase
        .from('interview_schedules')
        .insert({
          application_id: formData.application_id,
          interviewer_id: profile?.id,
          interview_date: interviewDateTime.toISOString(),
          duration_minutes: parseInt(formData.duration_minutes),
          interview_type: formData.interview_type,
          location: formData.location,
          meeting_url: formData.meeting_url,
          notes: formData.notes
        });

      if (error) throw error;

      // Update application status
      await supabase
        .from('applications')
        .update({ status: 'interview_scheduled' })
        .eq('id', formData.application_id);

      toast({
        title: "Interview Scheduled",
        description: "The interview has been successfully scheduled.",
      });

      setShowForm(false);
      setFormData({
        application_id: '',
        interview_date: '',
        interview_time: '',
        duration_minutes: '60',
        interview_type: 'technical',
        location: '',
        meeting_url: '',
        notes: ''
      });
      fetchInterviews();
    } catch (error) {
      console.error('Error scheduling interview:', error);
      toast({
        title: "Error",
        description: "Failed to schedule interview. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-primary';
      case 'completed':
        return 'bg-success';
      case 'cancelled':
        return 'bg-destructive';
      case 'rescheduled':
        return 'bg-warning';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/placement-dashboard')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="animate-slide-up">
              <h1 className="text-3xl font-bold text-foreground mb-2">Interview Schedule</h1>
              <p className="text-muted-foreground">
                Manage and schedule student interviews
              </p>
            </div>
          </div>
          <Button 
            onClick={() => setShowForm(true)}
            className="gradient-primary text-primary-foreground"
          >
            <Plus className="h-4 w-4 mr-2" />
            Schedule Interview
          </Button>
        </div>

        {/* Schedule Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Schedule New Interview</CardTitle>
                <CardDescription>
                  Schedule an interview for a shortlisted candidate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="application">Select Application</Label>
                  <Select 
                    value={formData.application_id} 
                    onValueChange={(value) => setFormData({...formData, application_id: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a candidate" />
                    </SelectTrigger>
                    <SelectContent>
                      {applications.map((app) => (
                        <SelectItem key={app.id} value={app.id}>
                          Application for {app.jobs.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Interview Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.interview_date}
                      onChange={(e) => setFormData({...formData, interview_date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Interview Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.interview_time}
                      onChange={(e) => setFormData({...formData, interview_time: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Select 
                      value={formData.duration_minutes} 
                      onValueChange={(value) => setFormData({...formData, duration_minutes: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="type">Interview Type</Label>
                    <Select 
                      value={formData.interview_type} 
                      onValueChange={(value) => setFormData({...formData, interview_type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="hr">HR Round</SelectItem>
                        <SelectItem value="behavioral">Behavioral</SelectItem>
                        <SelectItem value="final">Final Round</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="meeting_url">Meeting URL (for virtual interviews)</Label>
                  <Input
                    id="meeting_url"
                    value={formData.meeting_url}
                    onChange={(e) => setFormData({...formData, meeting_url: e.target.value})}
                    placeholder="https://meet.google.com/xyz-abc-def"
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location (for in-person interviews)</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Conference Room A, 3rd Floor"
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Any special instructions or notes for the interview..."
                    rows={3}
                  />
                </div>

                <div className="flex items-center justify-end space-x-4 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleScheduleInterview}
                    className="gradient-primary"
                  >
                    Schedule Interview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Interviews List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading interview schedules...</p>
          </div>
        ) : interviews.length === 0 ? (
          <Card className="glass-card">
            <CardContent className="p-12 text-center">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Interviews Scheduled</h3>
              <p className="text-muted-foreground mb-6">
                Schedule interviews for shortlisted candidates to get started.
              </p>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Schedule First Interview
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {interviews.map((interview) => (
              <Card key={interview.id} className="glass-card hover:shadow-lg transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          Interview Scheduled
                        </h3>
                        <p className="text-muted-foreground">
                          {interview.applications.jobs.title}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(interview.interview_date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{new Date(interview.interview_date).toLocaleTimeString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span>{interview.duration_minutes} minutes</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(interview.status)}>
                        {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1 capitalize">
                        {interview.interview_type} Interview
                      </p>
                    </div>
                  </div>
                  
                  {(interview.meeting_url || interview.location) && (
                    <div className="flex items-center space-x-4 text-sm mb-4">
                      {interview.meeting_url && (
                        <div className="flex items-center space-x-1 text-primary">
                          <Video className="h-4 w-4" />
                          <a 
                            href={interview.meeting_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            Join Meeting
                          </a>
                        </div>
                      )}
                      {interview.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{interview.location}</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Job: {interview.applications.jobs.title}
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users className="h-4 w-4 mr-2" />
                        Add Feedback
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default InterviewSchedule;