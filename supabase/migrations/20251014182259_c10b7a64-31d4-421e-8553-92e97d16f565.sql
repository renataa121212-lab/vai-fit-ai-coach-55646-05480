-- Enable RLS for body_scans table if not already done
ALTER TABLE body_scans ENABLE ROW LEVEL SECURITY;

-- Ensure the correct policies are in place
DROP POLICY IF EXISTS "Users can view their own body scans" ON body_scans;
DROP POLICY IF EXISTS "Users can create their own body scans" ON body_scans;
DROP POLICY IF EXISTS "Users can update their own body scans" ON body_scans;
DROP POLICY IF EXISTS "Users can delete their own body scans" ON body_scans;

CREATE POLICY "Users can view their own body scans"
ON body_scans FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own body scans"
ON body_scans FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own body scans"
ON body_scans FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own body scans"
ON body_scans FOR DELETE
USING (auth.uid() = user_id);