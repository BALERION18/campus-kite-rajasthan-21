-- Create jobs table for job postings
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  company_name TEXT NOT NULL,
  location TEXT NOT NULL,
  job_type TEXT NOT NULL DEFAULT 'full-time',
  salary_range TEXT,
  requirements TEXT[],
  skills_required TEXT[],
  experience_level TEXT,
  posted_by UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  application_deadline TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create applications table 
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  applicant_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  cover_letter TEXT,
  resume_url TEXT,
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create interview_schedules table
CREATE TABLE public.interview_schedules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  interview_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  interview_type TEXT NOT NULL DEFAULT 'video',
  interviewer_id UUID NOT NULL,
  meeting_link TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_schedules ENABLE ROW LEVEL SECURITY;

-- Jobs policies
CREATE POLICY "Jobs are viewable by everyone" 
ON public.jobs FOR SELECT USING (true);

CREATE POLICY "Recruiters can create jobs" 
ON public.jobs FOR INSERT 
WITH CHECK (auth.uid() = posted_by);

CREATE POLICY "Recruiters can update their own jobs" 
ON public.jobs FOR UPDATE 
USING (auth.uid() = posted_by);

CREATE POLICY "Recruiters can delete their own jobs" 
ON public.jobs FOR DELETE 
USING (auth.uid() = posted_by);

-- Applications policies
CREATE POLICY "Users can view their own applications" 
ON public.applications FOR SELECT 
USING (auth.uid() = applicant_id);

CREATE POLICY "Recruiters can view applications for their jobs"
ON public.applications FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.jobs 
  WHERE jobs.id = applications.job_id 
  AND jobs.posted_by = auth.uid()
));

CREATE POLICY "Users can create applications" 
ON public.applications FOR INSERT 
WITH CHECK (auth.uid() = applicant_id);

CREATE POLICY "Users can update their own applications" 
ON public.applications FOR UPDATE 
USING (auth.uid() = applicant_id);

-- Interview schedules policies
CREATE POLICY "Users can view their interview schedules"
ON public.interview_schedules FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.applications 
  WHERE applications.id = interview_schedules.application_id 
  AND applications.applicant_id = auth.uid()
) OR auth.uid() = interviewer_id);

CREATE POLICY "Interviewers can create schedules" 
ON public.interview_schedules FOR INSERT 
WITH CHECK (auth.uid() = interviewer_id);

CREATE POLICY "Interviewers can update schedules" 
ON public.interview_schedules FOR UPDATE 
USING (auth.uid() = interviewer_id);

-- Create triggers for updated_at
CREATE TRIGGER update_jobs_updated_at
BEFORE UPDATE ON public.jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
BEFORE UPDATE ON public.applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_interview_schedules_updated_at
BEFORE UPDATE ON public.interview_schedules
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();