-- =============================================================================
-- MAKE MY MATE - SUPABASE DATABASE SETUP
-- =============================================================================
-- Run this script in Supabase SQL Editor to set up your database

-- =============================================================================
-- QUESTIONS TABLE
-- =============================================================================
-- Stores all character creation questions with categories and options

CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  question_text TEXT NOT NULL,
  options JSONB,
  question_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =============================================================================
-- CHARACTER RESPONSES TABLE
-- =============================================================================
-- Stores user responses to questions during character creation

CREATE TABLE IF NOT EXISTS character_responses (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  response TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================================================
-- GENERATED CHARACTERS TABLE
-- =============================================================================
-- Stores the final generated character data and images

CREATE TABLE IF NOT EXISTS generated_characters (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  character_data JSONB NOT NULL,
  image_url TEXT,
  prompt_used TEXT,
  aesthetic_style VARCHAR(50),
  is_public BOOLEAN DEFAULT true,
  share_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================================================
-- AESTHETIC STYLES TABLE
-- =============================================================================
-- Stores different aesthetic styles for character generation

CREATE TABLE IF NOT EXISTS aesthetic_styles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  prompt_template TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================================================
-- SAMPLE QUESTIONS DATA - SPICY & VIRAL VERSION
-- =============================================================================

INSERT INTO questions (category, question_text, options, question_order) VALUES
-- Character & Tropes (4 questions)
('personality', 'When your love interest finally breaks their cold exterior, what do you want them to say?', 
 '["I''ve been watching you for months", "I can''t fight this anymore", "You''re the only one who sees me", "I''ll destroy anyone who touches you", "I''ve never felt this way before"]', 1),

('emotions', 'What''s your ultimate romantic fantasy scenario?', 
 '["They rescue you from danger and claim you", "You discover their dark secret and they beg you to stay", "They''re forced to choose between duty and love", "You''re the only one who can heal their broken soul", "They''re willing to burn the world for you"]', 2),

('tropes', 'How important is the "Enemies to Lovers" trope to you?', 
 NULL, 3),

('magic', 'What type of magical bond would you want with your partner?', 
 '["Soulmates who can feel each other''s emotions", "A curse that binds you together forever", "A magical contract that can''t be broken", "Fated mates who are drawn to each other", "A bond that grows stronger with passion"]', 4),

-- Appearance & Vibe (4 questions)
('aesthetic', 'What physical feature makes you absolutely weak?', 
 '["Piercing eyes that see through your soul", "Scars that tell stories of battles fought", "Hands that could both protect and destroy", "A voice that commands attention", "The way they move with predatory grace"]', 5),

('preferences', 'How much does physical attraction matter in your ideal relationship?', 
 NULL, 6),

('attraction', 'What''s your biggest turn-on in a potential partner?', 
 '["They''re dangerous but gentle with you", "They have a mysterious, troubled past", "They''re powerful but vulnerable around you", "They''re willing to fight for what they want", "They have a dark side only you can tame"]', 7),

('style', 'How should your ideal partner dress?', 
 '["Like a dark prince from a forbidden realm", "Like a warrior who''s seen too much", "Like someone who doesn''t belong in this world", "Like they could kill you with their bare hands", "Like they''re hiding something dangerous"]', 8),

-- Red Flags & Moral Dilemmas (4 questions)
('boundaries', 'Which "red flag" would you actually find attractive?', 
 '["They have a mysterious past they won''t discuss", "They''re possessive and protective to the extreme", "They have a dark side they try to hide", "They''re willing to break rules for you", "They have enemies who want them dead"]', 9),

('emotional', 'How do you want your partner to handle their emotional walls?', 
 '["You want to be the one to break them down", "You find their emotional distance sexy", "You want them to be vulnerable only with you", "You''re drawn to their tortured soul", "You want to heal their broken heart"]', 10),

('self-awareness', 'What''s your biggest weakness when it comes to love?', 
 '["You fall for the ones who need saving", "You''re drawn to dangerous, mysterious types", "You ignore warning signs when you''re attracted", "You want to be the only one who understands them", "You''re willing to risk everything for passion"]', 11),

('moral', 'What would you do if your love interest had to make a dark pact to save you?', 
 '["You''d make your own pact to protect them", "You''d try to find another way together", "You''d accept their sacrifice and love them anyway", "You''d fight to break the pact yourself", "You''d embrace the darkness with them"]', 12);

-- =============================================================================
-- AESTHETIC STYLES DATA
-- =============================================================================

INSERT INTO aesthetic_styles (name, description, prompt_template) VALUES
('Royal Romance', 'Majestic courts and noble passion with golden accents and regal settings', 
 'A handsome male character in royal attire, {appearance}, {personality}, standing in a grand palace with golden light, romantic fantasy art style, detailed, high quality'),

('Mystic Realms', 'Enchanted forests and magical encounters with ethereal beauty', 
 'A mysterious male character with {appearance}, {personality}, in a magical forest with glowing elements, fantasy art style, mystical atmosphere, detailed, high quality'),

('Gothic Majesty', 'Dark castles and forbidden love with dramatic shadows', 
 'A brooding male character with {appearance}, {personality}, in a dark castle setting with dramatic lighting, gothic fantasy art style, mysterious atmosphere, detailed, high quality'),

('Modern Supernatural', 'Contemporary settings with supernatural elements', 
 'A charismatic male character with {appearance}, {personality}, in a modern urban setting with supernatural elements, contemporary fantasy art style, detailed, high quality'),

('Ancient Mythology', 'Gods and legends with epic proportions', 
 'A divine male character with {appearance}, {personality}, in an ancient mythological setting, epic fantasy art style, godlike presence, detailed, high quality');

-- =============================================================================
-- INDEXES FOR PERFORMANCE
-- =============================================================================

-- Index for session lookups
CREATE INDEX IF NOT EXISTS idx_character_responses_session_id ON character_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_generated_characters_session_id ON generated_characters(session_id);

-- Index for question ordering
CREATE INDEX IF NOT EXISTS idx_questions_order ON questions(question_order, is_active);

-- Index for public characters
CREATE INDEX IF NOT EXISTS idx_generated_characters_public ON generated_characters(is_public, created_at);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE aesthetic_styles ENABLE ROW LEVEL SECURITY;

-- Questions: Anyone can read active questions
CREATE POLICY "Questions are viewable by everyone" ON questions
  FOR SELECT USING (is_active = true);

-- Character responses: Anyone can insert, but only session owner can view
CREATE POLICY "Character responses are insertable by everyone" ON character_responses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Character responses are viewable by session owner" ON character_responses
  FOR SELECT USING (true); -- For now, allow all reads (we'll restrict by session later)

-- Generated characters: Anyone can insert, public characters are viewable by everyone
CREATE POLICY "Generated characters are insertable by everyone" ON generated_characters
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public generated characters are viewable by everyone" ON generated_characters
  FOR SELECT USING (is_public = true);

-- Aesthetic styles: Anyone can read active styles
CREATE POLICY "Aesthetic styles are viewable by everyone" ON aesthetic_styles
  FOR SELECT USING (is_active = true);

-- =============================================================================
-- FUNCTIONS FOR COMMON OPERATIONS
-- =============================================================================

-- Function to get questions by category
CREATE OR REPLACE FUNCTION get_questions_by_category(category_filter VARCHAR(50))
RETURNS TABLE (
  id INTEGER,
  category VARCHAR(50),
  question_text TEXT,
  options JSONB,
  question_order INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT q.id, q.category, q.question_text, q.options, q.question_order
  FROM questions q
  WHERE q.category = category_filter AND q.is_active = true
  ORDER BY q.question_order;
END;
$$ LANGUAGE plpgsql;

-- Function to get character data by session
CREATE OR REPLACE FUNCTION get_character_by_session(session_id_param VARCHAR(255))
RETURNS TABLE (
  character_data JSONB,
  image_url TEXT,
  aesthetic_style VARCHAR(50),
  created_at TIMESTAMP
) AS $$
BEGIN
  RETURN QUERY
  SELECT gc.character_data, gc.image_url, gc.aesthetic_style, gc.created_at
  FROM generated_characters gc
  WHERE gc.session_id = session_id_param
  ORDER BY gc.created_at DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- SAMPLE GENERATED CHARACTER (for testing)
-- =============================================================================

INSERT INTO generated_characters (session_id, character_data, aesthetic_style, prompt_used) VALUES
('test-session-123', 
 '{"name": "Prince Lucian", "personality": "Mysterious and brooding", "appearance": "Dark hair, piercing blue eyes", "setting": "Medieval kingdom", "relationship": "Enemies to lovers"}',
 'Royal Romance',
 'A handsome male character in royal attire, dark hair with piercing blue eyes, mysterious and brooding personality, standing in a grand palace with golden light, romantic fantasy art style, detailed, high quality');

-- =============================================================================
-- VERIFICATION QUERIES
-- =============================================================================

-- Check if tables were created successfully
SELECT 'Questions count:' as info, COUNT(*) as count FROM questions
UNION ALL
SELECT 'Aesthetic styles count:', COUNT(*) FROM aesthetic_styles
UNION ALL
SELECT 'Sample character count:', COUNT(*) FROM generated_characters;
