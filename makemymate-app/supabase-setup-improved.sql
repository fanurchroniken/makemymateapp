-- =============================================================================
-- MAKE MY MATE - IMPROVED SUPABASE DATABASE SETUP
-- =============================================================================
-- Run this script in Supabase SQL Editor to set up your database

-- =============================================================================
-- LANGUAGES TABLE
-- =============================================================================
-- Supports multiple languages for internationalization

CREATE TABLE IF NOT EXISTS languages (
  id SERIAL PRIMARY KEY,
  code VARCHAR(5) NOT NULL UNIQUE, -- 'en', 'de'
  name VARCHAR(50) NOT NULL, -- 'English', 'Deutsch'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================================================
-- QUESTIONS TABLE (Base structure)
-- =============================================================================
-- Stores question metadata without language-specific content

CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  category VARCHAR(50) NOT NULL, -- 'personality', 'emotions', etc.
  question_type VARCHAR(20) NOT NULL, -- 'multiple-choice', 'slider'
  question_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =============================================================================
-- QUESTION_TRANSLATIONS TABLE
-- =============================================================================
-- Stores language-specific question content

CREATE TABLE IF NOT EXISTS question_translations (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  language_code VARCHAR(5) REFERENCES languages(code),
  question_text TEXT NOT NULL,
  options JSONB, -- For multiple choice questions
  min_label VARCHAR(100), -- For slider questions
  max_label VARCHAR(100), -- For slider questions
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(question_id, language_code)
);

-- =============================================================================
-- CHARACTER_TRAITS TABLE
-- =============================================================================
-- Maps question answers to character traits for generation

CREATE TABLE IF NOT EXISTS character_traits (
  id SERIAL PRIMARY KEY,
  trait_name VARCHAR(100) NOT NULL, -- 'dominance', 'mystery', 'passion'
  trait_category VARCHAR(50) NOT NULL, -- 'personality', 'appearance', 'background'
  description TEXT,
  prompt_keywords TEXT[], -- Keywords for AI generation
  created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================================================
-- ANSWER_TRAIT_MAPPINGS TABLE
-- =============================================================================
-- Maps specific answers to character traits with weights

CREATE TABLE IF NOT EXISTS answer_trait_mappings (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  answer_value TEXT NOT NULL, -- The actual answer given
  trait_id INTEGER REFERENCES character_traits(id) ON DELETE CASCADE,
  weight DECIMAL(3,2) DEFAULT 1.0, -- How strongly this answer affects the trait
  created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================================================
-- CHARACTER_RESPONSES TABLE
-- =============================================================================
-- Stores user responses to questions during character creation

CREATE TABLE IF NOT EXISTS character_responses (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  response TEXT NOT NULL,
  language_code VARCHAR(5) DEFAULT 'en',
  created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================================================
-- GENERATED_CHARACTERS TABLE
-- =============================================================================
-- Stores the final generated character data and images

CREATE TABLE IF NOT EXISTS generated_characters (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  character_name VARCHAR(100),
  character_description TEXT,
  character_traits JSONB NOT NULL, -- Calculated trait scores
  personality_profile JSONB, -- Detailed personality breakdown
  appearance_description TEXT,
  background_story TEXT,
  image_url TEXT,
  image_prompt TEXT,
  aesthetic_style VARCHAR(50),
  is_public BOOLEAN DEFAULT true,
  share_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  language_code VARCHAR(5) DEFAULT 'en',
  created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================================================
-- AESTHETIC_STYLES TABLE
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
-- SOCIAL_INTERACTIONS TABLE
-- =============================================================================
-- Tracks social engagement for viral features

CREATE TABLE IF NOT EXISTS social_interactions (
  id SERIAL PRIMARY KEY,
  character_id INTEGER REFERENCES generated_characters(id) ON DELETE CASCADE,
  interaction_type VARCHAR(20) NOT NULL, -- 'view', 'like', 'share', 'comment'
  session_id VARCHAR(255), -- Anonymous user tracking
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================================================
-- ANALYTICS TABLE
-- =============================================================================
-- Tracks overall app usage and viral metrics

CREATE TABLE IF NOT EXISTS analytics (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL, -- 'quiz_started', 'quiz_completed', 'character_generated'
  session_id VARCHAR(255),
  language_code VARCHAR(5),
  metadata JSONB, -- Additional event data
  created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================================================
-- SAMPLE DATA INSERTION
-- =============================================================================

-- Insert supported languages
INSERT INTO languages (code, name) VALUES
('en', 'English'),
('de', 'Deutsch');

-- Insert base questions (12 questions total)
INSERT INTO questions (category, question_type, question_order) VALUES
-- Character & Tropes (4 questions)
('personality', 'multiple-choice', 1),
('emotions', 'multiple-choice', 2),
('tropes', 'slider', 3),
('magic', 'multiple-choice', 4),

-- Appearance & Vibe (4 questions)
('aesthetic', 'multiple-choice', 5),
('preferences', 'slider', 6),
('attraction', 'multiple-choice', 7),
('style', 'multiple-choice', 8),

-- Red Flags & Moral Dilemmas (4 questions)
('boundaries', 'multiple-choice', 9),
('emotional', 'multiple-choice', 10),
('self-awareness', 'multiple-choice', 11),
('moral', 'multiple-choice', 12);

-- Insert English question translations
INSERT INTO question_translations (question_id, language_code, question_text, options, min_label, max_label) VALUES
-- Character & Tropes
(1, 'en', 'When your love interest finally breaks their cold exterior, what do you want them to say?', 
 '["I''ve been watching you for months", "I can''t fight this anymore", "You''re the only one who sees me", "I''ll destroy anyone who touches you", "I''ve never felt this way before"]', NULL, NULL),

(2, 'en', 'What''s your ultimate romantic fantasy scenario?', 
 '["They rescue you from danger and claim you", "You discover their dark secret and they beg you to stay", "They''re forced to choose between duty and love", "You''re the only one who can heal their broken soul", "They''re willing to burn the world for you"]', NULL, NULL),

(3, 'en', 'How important is the "Enemies to Lovers" trope to you?', 
 NULL, 'Boring', 'My life elixir'),

(4, 'en', 'What type of magical bond would you want with your partner?', 
 '["Soulmates who can feel each other''s emotions", "A curse that binds you together forever", "A magical contract that can''t be broken", "Fated mates who are drawn to each other", "A bond that grows stronger with passion"]', NULL, NULL),

-- Appearance & Vibe
(5, 'en', 'What physical feature makes you absolutely weak?', 
 '["Piercing eyes that see through your soul", "Scars that tell stories of battles fought", "Hands that could both protect and destroy", "A voice that commands attention", "The way they move with predatory grace"]', NULL, NULL),

(6, 'en', 'How much does physical attraction matter in your ideal relationship?', 
 NULL, 'Not at all', 'Everything'),

(7, 'en', 'What''s your biggest turn-on in a potential partner?', 
 '["They''re dangerous but gentle with you", "They have a mysterious, troubled past", "They''re powerful but vulnerable around you", "They''re willing to fight for what they want", "They have a dark side only you can tame"]', NULL, NULL),

(8, 'en', 'How should your ideal partner dress?', 
 '["Like a dark prince from a forbidden realm", "Like a warrior who''s seen too much", "Like someone who doesn''t belong in this world", "Like they could kill you with their bare hands", "Like they''re hiding something dangerous"]', NULL, NULL),

-- Red Flags & Moral Dilemmas
(9, 'en', 'Which "red flag" would you actually find attractive?', 
 '["They have a mysterious past they won''t discuss", "They''re possessive and protective to the extreme", "They have a dark side they try to hide", "They''re willing to break rules for you", "They have enemies who want them dead"]', NULL, NULL),

(10, 'en', 'How do you want your partner to handle their emotional walls?', 
 '["You want to be the one to break them down", "You find their emotional distance sexy", "You want them to be vulnerable only with you", "You''re drawn to their tortured soul", "You want to heal their broken heart"]', NULL, NULL),

(11, 'en', 'What''s your biggest weakness when it comes to love?', 
 '["You fall for the ones who need saving", "You''re drawn to dangerous, mysterious types", "You ignore warning signs when you''re attracted", "You want to be the only one who understands them", "You''re willing to risk everything for passion"]', NULL, NULL),

(12, 'en', 'What would you do if your love interest had to make a dark pact to save you?', 
 '["You''d make your own pact to protect them", "You''d try to find another way together", "You''d accept their sacrifice and love them anyway", "You''d fight to break the pact yourself", "You''d embrace the darkness with them"]', NULL, NULL);

-- Insert German question translations
INSERT INTO question_translations (question_id, language_code, question_text, options, min_label, max_label) VALUES
-- Character & Tropes
(1, 'de', 'Wenn dein Schwarm endlich seine kalte Fassade durchbricht, was soll er sagen?', 
 '["Ich beobachte dich seit Monaten", "Ich kann nicht mehr dagegen ankämpfen", "Du bist die Einzige, die mich sieht", "Ich werde jeden zerstören, der dich anfasst", "So habe ich mich noch nie gefühlt"]', NULL, NULL),

(2, 'de', 'Was ist dein ultimatives romantisches Fantasieszenario?', 
 '["Sie retten dich aus der Gefahr und beanspruchen dich", "Du entdeckst ihr dunkles Geheimnis und sie flehen dich an zu bleiben", "Sie müssen zwischen Pflicht und Liebe wählen", "Du bist die Einzige, die ihre gebrochene Seele heilen kann", "Sie sind bereit, die Welt für dich zu verbrennen"]', NULL, NULL),

(3, 'de', 'Wie wichtig ist dir das "Feinde zu Liebhabern" Trope?', 
 NULL, 'Langweilig', 'Mein Lebenselixier'),

(4, 'de', 'Welche Art magische Bindung möchtest du mit deinem Partner?', 
 '["Seelenverwandte, die die Gefühle des anderen spüren", "Ein Fluch, der euch für immer bindet", "Ein magischer Vertrag, der nicht gebrochen werden kann", "Schicksalsgefährten, die sich zueinander hingezogen fühlen", "Eine Bindung, die mit Leidenschaft stärker wird"]', NULL, NULL),

-- Appearance & Vibe
(5, 'de', 'Welches körperliche Merkmal macht dich absolut schwach?', 
 '["Durchdringende Augen, die deine Seele durchschauen", "Narben, die Geschichten von Kämpfen erzählen", "Hände, die sowohl schützen als auch zerstören können", "Eine Stimme, die Aufmerksamkeit befiehlt", "Die Art, wie sie sich mit räuberischer Anmut bewegen"]', NULL, NULL),

(6, 'de', 'Wie wichtig ist körperliche Anziehung in deiner idealen Beziehung?', 
 NULL, 'Überhaupt nicht', 'Alles'),

(7, 'de', 'Was ist dein größter Turn-on bei einem potenziellen Partner?', 
 '["Sie sind gefährlich, aber sanft zu dir", "Sie haben eine mysteriöse, problematische Vergangenheit", "Sie sind mächtig, aber verletzlich um dich herum", "Sie sind bereit, für das zu kämpfen, was sie wollen", "Sie haben eine dunkle Seite, die nur du zähmen kannst"]', NULL, NULL),

(8, 'de', 'Wie sollte dein idealer Partner sich kleiden?', 
 '["Wie ein dunkler Prinz aus einem verbotenen Reich", "Wie ein Krieger, der zu viel gesehen hat", "Wie jemand, der nicht in diese Welt gehört", "Wie jemand, der dich mit bloßen Händen töten könnte", "Wie jemand, der etwas Gefährliches verbirgt"]', NULL, NULL),

-- Red Flags & Moral Dilemmas
(9, 'de', 'Welche "rote Flagge" würdest du tatsächlich attraktiv finden?', 
 '["Sie haben eine mysteriöse Vergangenheit, über die sie nicht sprechen", "Sie sind besitzergreifend und schützend bis zum Extrem", "Sie haben eine dunkle Seite, die sie zu verbergen versuchen", "Sie sind bereit, Regeln für dich zu brechen", "Sie haben Feinde, die sie tot sehen wollen"]', NULL, NULL),

(10, 'de', 'Wie soll dein Partner mit ihren emotionalen Mauern umgehen?', 
 '["Du willst diejenige sein, die sie einreißt", "Du findest ihre emotionale Distanz sexy", "Du willst, dass sie nur mit dir verletzlich sind", "Du fühlst dich zu ihrer gequälten Seele hingezogen", "Du willst ihr gebrochenes Herz heilen"]', NULL, NULL),

(11, 'de', 'Was ist deine größte Schwäche, wenn es um Liebe geht?', 
 '["Du verliebst dich in die, die gerettet werden müssen", "Du fühlst dich zu gefährlichen, mysteriösen Typen hingezogen", "Du ignorierst Warnsignale, wenn du angezogen bist", "Du willst die Einzige sein, die sie versteht", "Du bist bereit, alles für Leidenschaft zu riskieren"]', NULL, NULL),

(12, 'de', 'Was würdest du tun, wenn dein Schwarm einen dunklen Pakt eingehen müsste, um dich zu retten?', 
 '["Du würdest deinen eigenen Pakt eingehen, um sie zu schützen", "Du würdest versuchen, einen anderen Weg zusammen zu finden", "Du würdest ihr Opfer akzeptieren und sie trotzdem lieben", "Du würdest kämpfen, um den Pakt selbst zu brechen", "Du würdest die Dunkelheit mit ihnen umarmen"]', NULL, NULL);

-- Insert character traits
INSERT INTO character_traits (trait_name, trait_category, description, prompt_keywords) VALUES
-- Personality traits
('dominance', 'personality', 'Strong, commanding presence', ARRAY['dominant', 'commanding', 'authoritative', 'alpha']),
('mystery', 'personality', 'Enigmatic and secretive', ARRAY['mysterious', 'enigmatic', 'secretive', 'brooding']),
('passion', 'personality', 'Intense and emotional', ARRAY['passionate', 'intense', 'emotional', 'fiery']),
('protection', 'personality', 'Protective and caring', ARRAY['protective', 'caring', 'guardian', 'shield']),

-- Appearance traits
('dark_aesthetic', 'appearance', 'Dark and mysterious appearance', ARRAY['dark', 'gothic', 'mysterious', 'brooding']),
('elegance', 'appearance', 'Refined and sophisticated', ARRAY['elegant', 'sophisticated', 'refined', 'noble']),
('danger', 'appearance', 'Dangerous and intimidating', ARRAY['dangerous', 'intimidating', 'threatening', 'scary']),
('ethereal', 'appearance', 'Otherworldly and beautiful', ARRAY['ethereal', 'otherworldly', 'beautiful', 'angelic']),

-- Background traits
('tragic_past', 'background', 'Dark and troubled history', ARRAY['tragic', 'troubled', 'dark past', 'trauma']),
('noble_heritage', 'background', 'Royal or noble lineage', ARRAY['noble', 'royal', 'aristocratic', 'lineage']),
('outcast', 'background', 'Rejected by society', ARRAY['outcast', 'rejected', 'exiled', 'loner']),
('warrior', 'background', 'Battle-hardened fighter', ARRAY['warrior', 'fighter', 'battle-hardened', 'soldier']);

-- Insert aesthetic styles
INSERT INTO aesthetic_styles (name, description, prompt_template) VALUES
('Royal Romance', 'Majestic courts and noble passion with golden accents and regal settings', 
 'A handsome male character in royal attire, {appearance}, {personality}, standing in a grand palace with golden light, romantic fantasy art style, detailed, high quality'),

('Mystic Realms', 'Enchanted forests and magical encounters with ethereal beauty', 
 'A mysterious male character with {appearance}, {personality}, in a magical forest with glowing elements, fantasy art style, mystical atmosphere, detailed, high quality'),

('Gothic Majesty', 'Dark castles and forbidden love with dramatic shadows', 
 'A brooding male character with {appearance}, {personality}, in a dark castle setting with dramatic lighting, gothic fantasy art style, mysterious atmosphere, detailed, high quality');

-- =============================================================================
-- INDEXES FOR PERFORMANCE
-- =============================================================================

-- Question indexes
CREATE INDEX IF NOT EXISTS idx_questions_order ON questions(question_order, is_active);
CREATE INDEX IF NOT EXISTS idx_question_translations_lang ON question_translations(language_code);

-- Response indexes
CREATE INDEX IF NOT EXISTS idx_character_responses_session ON character_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_character_responses_question ON character_responses(question_id);

-- Character indexes
CREATE INDEX IF NOT EXISTS idx_generated_characters_public ON generated_characters(is_public, created_at);
CREATE INDEX IF NOT EXISTS idx_generated_characters_lang ON generated_characters(language_code);

-- Social indexes
CREATE INDEX IF NOT EXISTS idx_social_interactions_character ON social_interactions(character_id);
CREATE INDEX IF NOT EXISTS idx_social_interactions_type ON social_interactions(interaction_type);

-- Analytics indexes
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics(created_at);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active questions and translations
CREATE POLICY "Allow public read questions" ON questions FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read translations" ON question_translations FOR SELECT USING (true);

-- Allow public read access to aesthetic styles
CREATE POLICY "Allow public read styles" ON aesthetic_styles FOR SELECT USING (is_active = true);

-- Allow public insert access to responses and characters
CREATE POLICY "Allow public insert responses" ON character_responses FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert characters" ON generated_characters FOR INSERT WITH CHECK (true);

-- Allow public read access to public characters
CREATE POLICY "Allow public read characters" ON generated_characters FOR SELECT USING (is_public = true);

-- Allow public insert access to social interactions
CREATE POLICY "Allow public insert interactions" ON social_interactions FOR INSERT WITH CHECK (true);

-- Allow public insert access to analytics
CREATE POLICY "Allow public insert analytics" ON analytics FOR INSERT WITH CHECK (true);

-- =============================================================================
-- HELPER FUNCTIONS
-- =============================================================================

-- Function to get questions by language
CREATE OR REPLACE FUNCTION get_questions_by_language(lang_code VARCHAR(5))
RETURNS TABLE (
  id INTEGER,
  category VARCHAR(50),
  question_type VARCHAR(20),
  question_order INTEGER,
  question_text TEXT,
  options JSONB,
  min_label VARCHAR(100),
  max_label VARCHAR(100)
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    q.id,
    q.category,
    q.question_type,
    q.question_order,
    qt.question_text,
    qt.options,
    qt.min_label,
    qt.max_label
  FROM questions q
  JOIN question_translations qt ON q.id = qt.question_id
  WHERE q.is_active = true 
    AND qt.language_code = lang_code
  ORDER BY q.question_order;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate character traits from responses
CREATE OR REPLACE FUNCTION calculate_character_traits(session_id_param VARCHAR(255))
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT jsonb_object_agg(t.trait_name, COALESCE(SUM(atm.weight), 0))
  INTO result
  FROM character_traits t
  LEFT JOIN answer_trait_mappings atm ON t.id = atm.trait_id
  LEFT JOIN character_responses cr ON atm.question_id = cr.question_id 
    AND atm.answer_value = cr.response
  WHERE cr.session_id = session_id_param
  GROUP BY t.id, t.trait_name;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to get character by session
CREATE OR REPLACE FUNCTION get_character_by_session(session_id_param VARCHAR(255))
RETURNS TABLE (
  id INTEGER,
  character_name VARCHAR(100),
  character_description TEXT,
  character_traits JSONB,
  personality_profile JSONB,
  appearance_description TEXT,
  background_story TEXT,
  image_url TEXT,
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
    gc.character_name,
    gc.character_description,
    gc.character_traits,
    gc.personality_profile,
    gc.appearance_description,
    gc.background_story,
    gc.image_url,
    gc.aesthetic_style,
    gc.is_public,
    gc.share_count,
    gc.like_count,
    gc.view_count,
    gc.language_code,
    gc.created_at
  FROM generated_characters gc
  WHERE gc.session_id = session_id_param
  ORDER BY gc.created_at DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- SAMPLE DATA VERIFICATION
-- =============================================================================

-- Verify the setup
SELECT 'Languages count:', COUNT(*) FROM languages
UNION ALL
SELECT 'Questions count:', COUNT(*) FROM questions
UNION ALL
SELECT 'English translations count:', COUNT(*) FROM question_translations WHERE language_code = 'en'
UNION ALL
SELECT 'German translations count:', COUNT(*) FROM question_translations WHERE language_code = 'de'
UNION ALL
SELECT 'Character traits count:', COUNT(*) FROM character_traits
UNION ALL
SELECT 'Aesthetic styles count:', COUNT(*) FROM aesthetic_styles;
