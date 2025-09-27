import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Layout/Navigation';
import Footer from '@/components/Layout/Footer';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  HelpCircle,
  MessageSquare,
  User,
  Send,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({
        name: '',
        email: '',
        category: '',
        subject: '',
        message: ''
      });
      setLoading(false);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      details: ["+91-141-2234567", "+91-141-2234568"],
      hours: "Mon-Fri: 9:00 AM - 6:00 PM"
    },
    {
      icon: Mail,
      title: "Email Support", 
      details: ["placement@rajasthan.gov.in", "support@rajasthan.gov.in"],
      hours: "24/7 Response within 24 hours"
    },
    {
      icon: MapPin,
      title: "Office Address",
      details: ["Secretariat, Jaipur", "Rajasthan - 302005", "India"],
      hours: "Mon-Fri: 10:00 AM - 5:00 PM"
    }
  ];

  const faqs = [
    {
      question: "How do students register on the portal?",
      answer: "Students can register by clicking 'Login as Student' and then 'Register here'. They need to provide their college email ID and basic information."
    },
    {
      question: "How can companies post job opportunities?",
      answer: "Companies can register through the 'Recruiter Login' section and post opportunities after verification by our placement cell."
    },
    {
      question: "What documents are required for profile completion?",
      answer: "Students need to upload their resume, academic transcripts, and complete skills assessment for profile completion."
    },
    {
      question: "How are interview schedules communicated?",
      answer: "Interview schedules are sent via email and SMS. Students can also check their dashboard for updates."
    },
    {
      question: "Can students apply to multiple opportunities?",
      answer: "Yes, students can apply to multiple opportunities based on their eligibility and interests."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl font-bold text-foreground mb-4">Contact & Support</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get help with campus placement portal or reach out to our support team
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <Card key={index} className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{contact.title}</h3>
                        {contact.details.map((detail, idx) => (
                          <p key={idx} className="text-muted-foreground mb-1">{detail}</p>
                        ))}
                        <p className="text-sm text-primary font-medium mt-2">{contact.hours}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                </div>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your full name"
                          className="pl-10"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your.email@example.com"
                          className="pl-10"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => setFormData({...formData, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student Support</SelectItem>
                        <SelectItem value="placement">Placement Office</SelectItem>
                        <SelectItem value="mentor">Mentor Assistance</SelectItem>
                        <SelectItem value="recruiter">Recruiter Support</SelectItem>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Brief description of your inquiry"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Please provide detailed information about your inquiry..."
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gradient-primary text-primary-foreground font-semibold py-6 text-lg hover:scale-105 transition-bounce shadow-button-custom"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <HelpCircle className="h-6 w-6 text-secondary" />
              <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
            </div>
            <CardDescription>
              Quick answers to common questions about the placement portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-smooth">
                  <h3 className="font-semibold text-lg mb-2 flex items-start">
                    <CheckCircle className="h-5 w-5 text-success mr-2 mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground ml-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="glass-card mt-8 border-warning">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-warning mb-1">Emergency Support</h3>
                <p className="text-muted-foreground mb-2">
                  For urgent technical issues or placement emergencies, contact our 24/7 helpline:
                </p>
                <p className="font-semibold text-foreground">+91-141-HELP-NOW (4357-669)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;