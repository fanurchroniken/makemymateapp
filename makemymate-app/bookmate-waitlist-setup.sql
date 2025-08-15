-- Bookmate Waitlist Database Setup
-- This file creates the necessary table for the Bookmate waitlist feature

-- Drop existing table if it exists
DROP TABLE IF EXISTS bookmate_waitlist CASCADE;

-- Create bookmate_waitlist table
CREATE TABLE bookmate_waitlist (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('reader', 'author')),
  consent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for efficient querying
CREATE INDEX idx_bookmate_waitlist_email ON bookmate_waitlist(email);
CREATE INDEX idx_bookmate_waitlist_role ON bookmate_waitlist(role);
CREATE INDEX idx_bookmate_waitlist_created_at ON bookmate_waitlist(created_at);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_bookmate_waitlist_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_bookmate_waitlist_updated_at
  BEFORE UPDATE ON bookmate_waitlist
  FOR EACH ROW EXECUTE FUNCTION update_bookmate_waitlist_updated_at();

-- Grant permissions
GRANT SELECT, INSERT, UPDATE ON bookmate_waitlist TO anon;
GRANT SELECT, INSERT, UPDATE ON bookmate_waitlist TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE bookmate_waitlist_id_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE bookmate_waitlist_id_seq TO authenticated;

-- Enable Row Level Security (RLS)
ALTER TABLE bookmate_waitlist ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Allow anyone to insert (for waitlist signups)
CREATE POLICY "Allow waitlist signups" ON bookmate_waitlist
  FOR INSERT WITH CHECK (true);

-- Allow reading own data (if authenticated)
CREATE POLICY "Allow reading own waitlist entry" ON bookmate_waitlist
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Allow admins to read all data (you can modify this based on your admin role)
CREATE POLICY "Allow admin access" ON bookmate_waitlist
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'admin@yourdomain.com' -- Replace with your admin email
    )
  );

-- Insert some sample data for testing (optional)
INSERT INTO bookmate_waitlist (first_name, last_name, email, role, consent) VALUES
('Emma', 'Thompson', 'emma.thompson@example.com', 'reader', true),
('Michael', 'Chen', 'michael.chen@example.com', 'author', true),
('Sarah', 'Williams', 'sarah.williams@example.com', 'reader', true),
('David', 'Rodriguez', 'david.rodriguez@example.com', 'author', true),
('Lisa', 'Anderson', 'lisa.anderson@example.com', 'reader', true);

-- Create a function to get waitlist statistics
CREATE OR REPLACE FUNCTION get_bookmate_waitlist_stats()
RETURNS TABLE (
  readers_count BIGINT,
  authors_count BIGINT,
  total_count BIGINT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (SELECT COUNT(*) FROM bookmate_waitlist WHERE role = 'reader') as readers_count,
    (SELECT COUNT(*) FROM bookmate_waitlist WHERE role = 'author') as authors_count,
    (SELECT COUNT(*) FROM bookmate_waitlist) as total_count;
END;
$$;

-- Grant execute permission for the function
GRANT EXECUTE ON FUNCTION get_bookmate_waitlist_stats() TO anon;
GRANT EXECUTE ON FUNCTION get_bookmate_waitlist_stats() TO authenticated;

-- Verify the setup
SELECT 'Bookmate waitlist table created successfully!' as status;
SELECT get_bookmate_waitlist_stats();
