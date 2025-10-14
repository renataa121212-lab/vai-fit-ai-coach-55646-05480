-- Criar tabela para armazenar escaneamentos corporais
CREATE TABLE IF NOT EXISTS public.body_scans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  weight NUMERIC NOT NULL,
  height NUMERIC NOT NULL,
  body_fat_percentage NUMERIC,
  lean_mass NUMERIC,
  waist_measurement NUMERIC,
  hip_measurement NUMERIC,
  calf_measurement NUMERIC,
  chest_measurement NUMERIC,
  arm_measurement NUMERIC,
  video_url TEXT,
  notes TEXT
);

-- Enable RLS
ALTER TABLE public.body_scans ENABLE ROW LEVEL SECURITY;

-- Policies para body_scans
CREATE POLICY "Users can view their own body scans" 
ON public.body_scans 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own body scans" 
ON public.body_scans 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own body scans" 
ON public.body_scans 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own body scans" 
ON public.body_scans 
FOR DELETE 
USING (auth.uid() = user_id);

-- Criar índice para consultas mais rápidas
CREATE INDEX IF NOT EXISTS body_scans_user_id_idx ON public.body_scans(user_id);
CREATE INDEX IF NOT EXISTS body_scans_created_at_idx ON public.body_scans(created_at DESC);