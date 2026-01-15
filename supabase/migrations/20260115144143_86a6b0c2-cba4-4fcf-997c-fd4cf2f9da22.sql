-- Create enum for issue status
CREATE TYPE public.issue_status AS ENUM ('reported', 'actioned', 'resolved');

-- Create enum for issue domain
CREATE TYPE public.issue_domain AS ENUM ('air', 'water', 'waste');

-- Create enum for risk level
CREATE TYPE public.risk_level AS ENUM ('low', 'medium', 'high');

-- Create issues table
CREATE TABLE public.issues (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  domain issue_domain NOT NULL,
  status issue_status NOT NULL DEFAULT 'reported',
  location_name TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  photo_url TEXT,
  
  -- Resource Impact View fields
  drinking_water_risk risk_level DEFAULT 'low',
  irrigation_impact risk_level DEFAULT 'low',
  soil_health_risk risk_level DEFAULT 'low',
  crop_stress_level risk_level DEFAULT 'low',
  seasonal_relevance TEXT DEFAULT 'All Seasons',
  
  -- Relationships
  reported_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  actioned_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  resolved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  actioned_at TIMESTAMP WITH TIME ZONE,
  resolved_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;

-- Everyone can view all issues (public transparency)
CREATE POLICY "Anyone can view issues"
ON public.issues
FOR SELECT
USING (true);

-- Authenticated users can report issues
CREATE POLICY "Authenticated users can report issues"
ON public.issues
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = reported_by);

-- Action partners and authorities can update issues
CREATE POLICY "Action partners and authorities can update issues"
ON public.issues
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
    AND role IN ('action_partner', 'authority')
  )
);

-- Create trigger for updated_at
CREATE TRIGGER update_issues_updated_at
BEFORE UPDATE ON public.issues
FOR EACH ROW
EXECUTE FUNCTION public.handle_profile_update();

-- Create index for common queries
CREATE INDEX idx_issues_domain ON public.issues(domain);
CREATE INDEX idx_issues_status ON public.issues(status);
CREATE INDEX idx_issues_created_at ON public.issues(created_at DESC);