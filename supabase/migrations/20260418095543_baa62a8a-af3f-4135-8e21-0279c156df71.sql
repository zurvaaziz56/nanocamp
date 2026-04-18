CREATE TABLE public.founding_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.founding_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a founding signup"
  ON public.founding_signups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE INDEX idx_founding_signups_email ON public.founding_signups(email);