-- Fix the generate_share_id function to resolve column reference ambiguity
CREATE OR REPLACE FUNCTION generate_share_id()
RETURNS VARCHAR(50) AS $$
DECLARE
  v_share_id VARCHAR(50);
  counter INTEGER := 0;
BEGIN
  LOOP
    -- Generate 8-character alphanumeric ID
    v_share_id := lower(substring(md5(random()::text || clock_timestamp()::text) from 1 for 8));
    
    -- Check if it already exists (use table alias to avoid ambiguity)
    IF NOT EXISTS (SELECT 1 FROM public.generated_characters gc WHERE gc.share_id = v_share_id) THEN
      RETURN v_share_id;
    END IF;
    
    counter := counter + 1;
    -- Prevent infinite loop
    IF counter > 100 THEN
      RAISE EXCEPTION 'Could not generate unique share_id after 100 attempts';
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;
