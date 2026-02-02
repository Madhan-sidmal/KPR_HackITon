-- Create donations table for tracking community contributions
CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_id UUID REFERENCES auth.users(id),
  donor_name TEXT NOT NULL DEFAULT 'Anonymous Supporter',
  amount NUMERIC NOT NULL CHECK (amount > 0),
  domain public.issue_domain NOT NULL,
  project_name TEXT NOT NULL,
  location_name TEXT NOT NULL,
  message TEXT,
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create milestones table for tracking environmental achievements
CREATE TABLE public.milestones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  domain public.issue_domain NOT NULL,
  location_name TEXT NOT NULL,
  metric_value NUMERIC,
  metric_unit TEXT,
  achieved_by UUID REFERENCES auth.users(id),
  achieved_by_name TEXT,
  achieved_by_type public.app_role,
  icon_type TEXT NOT NULL DEFAULT 'trophy',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;

-- RLS policies for donations: Anyone can view, authenticated users can donate
CREATE POLICY "Anyone can view donations" 
  ON public.donations 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can create donations" 
  ON public.donations 
  FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

-- RLS policies for milestones: Anyone can view, action_partner/authority can create
CREATE POLICY "Anyone can view milestones" 
  ON public.milestones 
  FOR SELECT 
  USING (true);

CREATE POLICY "Action partners and authorities can create milestones" 
  ON public.milestones 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.user_id = auth.uid() 
      AND user_roles.role IN ('action_partner', 'authority', 'ngo', 'government')
    )
  );

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.donations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.milestones;
ALTER PUBLICATION supabase_realtime ADD TABLE public.issues;