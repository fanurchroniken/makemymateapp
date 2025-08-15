-- Quiz Questions Database Setup
-- This file creates the necessary tables and sample data for dynamic quiz questions

-- Create quiz_questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id SERIAL PRIMARY KEY,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL, -- Array of answer options
  section VARCHAR(50) NOT NULL, -- 'character', 'appearance', 'redflags'
  order_index INTEGER NOT NULL,
  language_code VARCHAR(2) DEFAULT 'de',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create character_responses table for storing quiz answers
CREATE TABLE IF NOT EXISTS character_responses (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  question_id INTEGER NOT NULL,
  response TEXT NOT NULL,
  language_code VARCHAR(2) DEFAULT 'de',
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (question_id) REFERENCES quiz_questions(id) ON DELETE CASCADE
);

-- Create analytics table for tracking user interactions
CREATE TABLE IF NOT EXISTS analytics (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(100) NOT NULL,
  session_id VARCHAR(255) NOT NULL,
  language_code VARCHAR(2) DEFAULT 'de',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for efficient querying
CREATE INDEX IF NOT EXISTS idx_quiz_questions_language_active 
ON quiz_questions(language_code, is_active, order_index);

-- Create index for character_responses
CREATE INDEX IF NOT EXISTS idx_character_responses_session 
ON character_responses(session_id, created_at);

-- Create index for analytics
CREATE INDEX IF NOT EXISTS idx_analytics_session_event 
ON analytics(session_id, event_type, created_at);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_quiz_questions_updated_at 
    BEFORE UPDATE ON quiz_questions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample German questions (matching current quiz-questions.ts)
INSERT INTO quiz_questions (question_text, options, section, order_index, language_code) VALUES
-- Character & Tropes Section
('Welche Art von Beziehung zieht dich am meisten an?', 
 '["Eine leidenschaftliche, stürmische Liebe", "Eine sanfte, romantische Verbindung", "Eine verbotene, gefährliche Affäre", "Eine gleichberechtigte Partnerschaft"]', 
 'character', 1, 'de'),

('Wie reagierst du auf Dominanz in einer Beziehung?', 
 '["Ich finde es aufregend und anziehend", "Ich bevorzuge Gleichberechtigung", "Ich mag sanfte Führung", "Ich bin unentschlossen"]', 
 'character', 2, 'de'),

('Welche Eigenschaft ist dir bei einem Partner am wichtigsten?', 
 '["Loyalität und Treue", "Leidenschaft und Intensität", "Intelligenz und Witz", "Güte und Mitgefühl"]', 
 'character', 3, 'de'),

('Wie wichtig ist dir Kommunikation in einer Beziehung?', 
 '["Sehr wichtig - ich brauche tiefe Gespräche", "Wichtig, aber Taten sprechen lauter", "Ich bevorzuge non-verbale Kommunikation", "Ich bin flexibel"]', 
 'character', 4, 'de'),

('Welche Art von Konflikt löst du am liebsten?', 
 '["Leidenschaftliche Diskussionen", "Ruhige, sachliche Gespräche", "Durch körperliche Nähe", "Indem ich Zeit für mich nehme"]', 
 'character', 5, 'de'),

-- Appearance & Vibe Section
('Welche Art von Aussehen zieht dich am meisten an?', 
 '["Dunkel und mysteriös", "Hell und strahlend", "Natürlich und ungekünstelt", "Elegant und kultiviert"]', 
 'appearance', 6, 'de'),

('Welche Augenfarbe findest du am anziehendsten?', 
 '["Dunkle, intensive Augen", "Helle, klare Augen", "Mehrfarbige oder ungewöhnliche Augen", "Ich habe keine Präferenz"]', 
 'appearance', 7, 'de'),

('Welche Art von Kleidung bevorzugst du bei einem Partner?', 
 '["Elegante, formelle Kleidung", "Bequeme, lässige Kleidung", "Mysteriöse, dunkle Kleidung", "Farbenfrohe, auffällige Kleidung"]', 
 'appearance', 8, 'de'),

('Welche Art von Aura zieht dich an?', 
 '["Mysteriös und geheimnisvoll", "Warm und einladend", "Stark und beschützend", "Spielerisch und verspielt"]', 
 'appearance', 9, 'de'),

('Welche Art von Stimme findest du am anziehendsten?', 
 '["Tief und rauchig", "Sanft und melodisch", "Klar und selbstbewusst", "Spielerisch und verspielt"]', 
 'appearance', 10, 'de'),

-- Red Flags & Moral Dilemmas Section
('Wie gehst du mit Eifersucht um?', 
 '["Ich finde es aufregend und anziehend", "Ich kommuniziere offen darüber", "Ich versuche es zu vermeiden", "Ich bin unentschlossen"]', 
 'redflags', 11, 'de'),

('Welche Art von Geheimnissen findest du akzeptabel?', 
 '["Kleine Überraschungen sind okay", "Offenheit ist mir wichtig", "Geheimnisse machen es spannend", "Es hängt von der Situation ab"]', 
 'redflags', 12, 'de'),

('Wie wichtig ist dir Treue in einer Beziehung?', 
 '["Absolut wichtig - keine Kompromisse", "Wichtig, aber ich bin flexibel", "Ich bevorzuge offene Beziehungen", "Ich bin unentschlossen"]', 
 'redflags', 13, 'de'),

('Wie reagierst du auf Kontrolle in einer Beziehung?', 
 '["Ich finde es beschützend", "Ich bevorzuge Unabhängigkeit", "Ich bin flexibel", "Es hängt von der Situation ab"]', 
 'redflags', 14, 'de'),

('Welche Art von Vergangenheit ist für dich akzeptabel?', 
 '["Eine mysteriöse, dunkle Vergangenheit", "Eine offene, ehrliche Vergangenheit", "Eine abenteuerliche Vergangenheit", "Ich urteile nicht über die Vergangenheit"]', 
 'redflags', 15, 'de');

-- Insert English questions
INSERT INTO quiz_questions (question_text, options, section, order_index, language_code) VALUES
-- Character & Tropes Section
('What type of relationship attracts you most?', 
 '["A passionate, stormy love", "A gentle, romantic connection", "A forbidden, dangerous affair", "An equal partnership"]', 
 'character', 1, 'en'),

('How do you react to dominance in a relationship?', 
 '["I find it exciting and attractive", "I prefer equality", "I like gentle leadership", "I am undecided"]', 
 'character', 2, 'en'),

('Which quality is most important to you in a partner?', 
 '["Loyalty and faithfulness", "Passion and intensity", "Intelligence and wit", "Kindness and compassion"]', 
 'character', 3, 'en'),

('How important is communication in a relationship to you?', 
 '["Very important - I need deep conversations", "Important, but actions speak louder", "I prefer non-verbal communication", "I am flexible"]', 
 'character', 4, 'en'),

('What type of conflict do you prefer to resolve?', 
 '["Passionate discussions", "Calm, rational conversations", "Through physical closeness", "By taking time for myself"]', 
 'character', 5, 'en'),

-- Appearance & Vibe Section
('What type of appearance attracts you most?', 
 '["Dark and mysterious", "Bright and radiant", "Natural and unpretentious", "Elegant and cultured"]', 
 'appearance', 6, 'en'),

('Which eye color do you find most attractive?', 
 '["Dark, intense eyes", "Light, clear eyes", "Multi-colored or unusual eyes", "I have no preference"]', 
 'appearance', 7, 'en'),

('What type of clothing do you prefer on a partner?', 
 '["Elegant, formal clothing", "Comfortable, casual clothing", "Mysterious, dark clothing", "Colorful, eye-catching clothing"]', 
 'appearance', 8, 'en'),

('What type of aura attracts you?', 
 '["Mysterious and enigmatic", "Warm and inviting", "Strong and protective", "Playful and fun"]', 
 'appearance', 9, 'en'),

('What type of voice do you find most attractive?', 
 '["Deep and smoky", "Soft and melodic", "Clear and confident", "Playful and fun"]', 
 'appearance', 10, 'en'),

-- Red Flags & Moral Dilemmas Section
('How do you deal with jealousy?', 
 '["I find it exciting and attractive", "I communicate openly about it", "I try to avoid it", "I am undecided"]', 
 'redflags', 11, 'en'),

('What type of secrets do you find acceptable?', 
 '["Small surprises are okay", "Honesty is important to me", "Secrets make it exciting", "It depends on the situation"]', 
 'redflags', 12, 'en'),

('How important is faithfulness in a relationship to you?', 
 '["Absolutely important - no compromises", "Important, but I am flexible", "I prefer open relationships", "I am undecided"]', 
 'redflags', 13, 'en'),

('How do you react to control in a relationship?', 
 '["I find it protective", "I prefer independence", "I am flexible", "It depends on the situation"]', 
 'redflags', 14, 'en'),

('What type of past is acceptable to you?', 
  '["A mysterious, dark past", "An open, honest past", "An adventurous past", "I don''t judge the past"]', 
  'redflags', 15, 'en');

-- Create a function to get questions by language
CREATE OR REPLACE FUNCTION get_quiz_questions(p_language_code VARCHAR(2))
RETURNS TABLE (
  id INTEGER,
  question_text TEXT,
  options JSONB,
  section VARCHAR(50),
  order_index INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    qq.id,
    qq.question_text,
    qq.options,
    qq.section,
    qq.order_index
  FROM quiz_questions qq
  WHERE qq.language_code = p_language_code
    AND qq.is_active = true
  ORDER BY qq.order_index ASC;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT SELECT ON quiz_questions TO anon;
GRANT SELECT ON quiz_questions TO authenticated;
GRANT EXECUTE ON FUNCTION get_quiz_questions(VARCHAR(2)) TO anon;
GRANT EXECUTE ON FUNCTION get_quiz_questions(VARCHAR(2)) TO authenticated;

-- Grant permissions for character_responses table
GRANT SELECT, INSERT ON character_responses TO anon;
GRANT SELECT, INSERT ON character_responses TO authenticated;

-- Grant permissions for analytics table
GRANT SELECT, INSERT ON analytics TO anon;
GRANT SELECT, INSERT ON analytics TO authenticated;
