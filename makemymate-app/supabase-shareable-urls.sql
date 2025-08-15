-- Add share_id column to existing generated_characters table
ALTER TABLE public.generated_characters 
ADD COLUMN IF NOT EXISTS share_id VARCHAR(50) UNIQUE;

-- Create index for fast share_id lookups
CREATE INDEX IF NOT EXISTS idx_generated_characters_share_id 
ON public.generated_characters(share_id);

-- Create function to generate unique share_id
CREATE OR REPLACE FUNCTION generate_share_id()
RETURNS VARCHAR(50) AS $$
DECLARE
  share_id VARCHAR(50);
  counter INTEGER := 0;
BEGIN
  LOOP
    -- Generate 8-character alphanumeric ID
    share_id := lower(substring(md5(random()::text || clock_timestamp()::text) from 1 for 8));
    
    -- Check if it already exists
    IF NOT EXISTS (SELECT 1 FROM public.generated_characters WHERE share_id = share_id) THEN
      RETURN share_id;
    END IF;
    
    counter := counter + 1;
    -- Prevent infinite loop
    IF counter > 100 THEN
      RAISE EXCEPTION 'Could not generate unique share_id after 100 attempts';
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Create function to update existing characters with share_id
CREATE OR REPLACE FUNCTION update_existing_characters_with_share_id()
RETURNS VOID AS $$
DECLARE
  char_record RECORD;
BEGIN
  FOR char_record IN SELECT id FROM public.generated_characters WHERE share_id IS NULL
  LOOP
    UPDATE public.generated_characters 
    SET share_id = generate_share_id()
    WHERE id = char_record.id;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Create function to get character by share_id
CREATE OR REPLACE FUNCTION get_character_by_share_id(p_share_id VARCHAR(50))
RETURNS TABLE (
  id INTEGER,
  session_id VARCHAR(255),
  share_id VARCHAR(50),
  character_name VARCHAR(100),
  character_description TEXT,
  character_traits JSONB,
  personality_profile JSONB,
  appearance_description TEXT,
  background_story TEXT,
  image_url TEXT,
  image_prompt TEXT,
  aesthetic_style VARCHAR(50),
  is_public BOOLEAN,
  share_count INTEGER,
  like_count INTEGER,
  view_count INTEGER,
  language_code VARCHAR(5),
  created_at TIMESTAMP
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    gc.id,
    gc.session_id,
    gc.share_id,
    gc.character_name,
    gc.character_description,
    gc.character_traits,
    gc.personality_profile,
    gc.appearance_description,
    gc.background_story,
    gc.image_url,
    gc.image_prompt,
    gc.aesthetic_style,
    gc.is_public,
    gc.share_count,
    gc.like_count,
    gc.view_count,
    gc.language_code,
    gc.created_at
  FROM public.generated_characters gc
  WHERE gc.share_id = p_share_id AND gc.is_public = true;
END;
$$ LANGUAGE plpgsql;

-- Create function to increment view count
CREATE OR REPLACE FUNCTION increment_character_view(p_share_id VARCHAR(50))
RETURNS VOID AS $$
BEGIN
  UPDATE public.generated_characters 
  SET view_count = COALESCE(view_count, 0) + 1
  WHERE share_id = p_share_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to increment share count
CREATE OR REPLACE FUNCTION increment_character_share(p_share_id VARCHAR(50))
RETURNS VOID AS $$
BEGIN
  UPDATE public.generated_characters 
  SET share_count = COALESCE(share_count, 0) + 1
  WHERE share_id = p_share_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to increment like count
CREATE OR REPLACE FUNCTION increment_character_like(p_share_id VARCHAR(50))
RETURNS VOID AS $$
BEGIN
  UPDATE public.generated_characters 
  SET like_count = COALESCE(like_count, 0) + 1
  WHERE share_id = p_share_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to insert character with auto-generated share_id
CREATE OR REPLACE FUNCTION insert_character_with_share_id(
  p_session_id VARCHAR(255),
  p_character_name VARCHAR(100),
  p_character_description TEXT,
  p_character_traits JSONB,
  p_personality_profile JSONB,
  p_appearance_description TEXT,
  p_background_story TEXT,
  p_image_url TEXT,
  p_image_prompt TEXT,
  p_aesthetic_style VARCHAR(50),
  p_language_code VARCHAR(5)
)
RETURNS VARCHAR(50) AS $$
DECLARE
  v_share_id VARCHAR(50);
BEGIN
  -- Generate unique share_id
  v_share_id := generate_share_id();
  
  -- Insert character
  INSERT INTO public.generated_characters (
    session_id,
    share_id,
    character_name,
    character_description,
    character_traits,
    personality_profile,
    appearance_description,
    background_story,
    image_url,
    image_prompt,
    aesthetic_style,
    language_code,
    is_public,
    share_count,
    like_count,
    view_count
  ) VALUES (
    p_session_id,
    v_share_id,
    p_character_name,
    p_character_description,
    p_character_traits,
    p_personality_profile,
    p_appearance_description,
    p_background_story,
    p_image_url,
    p_image_prompt,
    p_aesthetic_style,
    p_language_code,
    true,
    0,
    0,
    0
  );
  
  RETURN v_share_id;
END;
$$ LANGUAGE plpgsql;

-- Enable RLS on generated_characters if not already enabled
ALTER TABLE public.generated_characters ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (for sharing)
DROP POLICY IF EXISTS "Public read access for shared characters" ON public.generated_characters;
CREATE POLICY "Public read access for shared characters" ON public.generated_characters
  FOR SELECT USING (is_public = true);

-- Create policy for inserting characters
DROP POLICY IF EXISTS "Allow character insertion" ON public.generated_characters;
CREATE POLICY "Allow character insertion" ON public.generated_characters
  FOR INSERT WITH CHECK (true);

-- Create policy for updating characters (for view/share/like counts)
DROP POLICY IF EXISTS "Allow character updates" ON public.generated_characters;
CREATE POLICY "Allow character updates" ON public.generated_characters
  FOR UPDATE USING (true);

-- Update existing characters with share_ids
SELECT update_existing_characters_with_share_id();
