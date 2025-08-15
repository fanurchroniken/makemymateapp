-- Quiz Questions Database Setup
-- This file creates the necessary tables and sample data for dynamic quiz questions
-- SAFE VERSION: Drops existing objects before creating new ones

-- Drop existing objects in correct order (due to dependencies)
DROP TRIGGER IF EXISTS update_quiz_questions_updated_at ON quiz_questions;
DROP FUNCTION IF EXISTS update_updated_at_column();
DROP FUNCTION IF EXISTS get_quiz_questions(VARCHAR(2));
DROP TABLE IF EXISTS character_responses CASCADE;
DROP TABLE IF EXISTS analytics CASCADE;
DROP TABLE IF EXISTS quiz_questions CASCADE;

-- Create quiz_questions table
CREATE TABLE quiz_questions (
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
CREATE TABLE character_responses (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  question_id INTEGER NOT NULL,
  response TEXT NOT NULL,
  language_code VARCHAR(2) DEFAULT 'de',
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (question_id) REFERENCES quiz_questions(id) ON DELETE CASCADE
);

-- Create analytics table for tracking user interactions
CREATE TABLE analytics (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(100) NOT NULL,
  session_id VARCHAR(255) NOT NULL,
  language_code VARCHAR(2) DEFAULT 'de',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for efficient querying
CREATE INDEX idx_quiz_questions_language_active 
ON quiz_questions(language_code, is_active, order_index);

-- Create index for character_responses
CREATE INDEX idx_character_responses_session 
ON character_responses(session_id, created_at);

-- Create index for analytics
CREATE INDEX idx_analytics_session_event 
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

-- Insert new German questions (Emotionally Intense Romantasy)
INSERT INTO quiz_questions (question_text, options, section, order_index, language_code) VALUES
-- 💔 Emotional Depth & Intensity (section 1)
('Welchen geheimen Schmerz trägt er unter der Oberfläche?', 
 '["🕯️ Ein verlorener Bruder, den er nicht retten konnte", "🥀 Ein Verrat, der sein Herz zu Stein werden ließ", "🔥 Eine gewalttätige Vergangenheit, die er hinter Charme verbirgt", "🌑 Eine Liebe, die er begrub, aber nie losließ"]', 
 'character', 1, 'de'),

('Wie zeigt er Verletzlichkeit?', 
 '["🧨 Explosive Wut, die den Schmerz maskiert", "🫥 Kalte Stille, die danach schreit, gebrochen zu werden", "🫀 Ein seltener, zitternder Moment der Offenheit", "🫶 Akte rücksichtsloser Hingabe"]', 
 'character', 2, 'de'),

('Wofür würde er die Welt niederbrennen?', 
 '["🛡️ Um dich zu beschützen", "🧬 Um seine Vergangenheit umzuschreiben", "💰 Um Macht zu erlangen", "💔 Um jemanden zu rächen, den er liebte"]', 
 'character', 3, 'de'),

('Wie reagiert er, wenn er eifersüchtig ist?', 
 '["🔥 Glüht mit stiller Besitzergreifung", "💣 Konfrontiert mit gefährlicher Intensität", "🧊 Zieht sich zurück und bestraft mit Schweigen", "🎭 Spielt es cool, aber plant im Schatten"]', 
 'character', 4, 'de'),

('Wie ist seine Liebessprache, wenn er endlich deiner ist?', 
 '["💋 Prellende Küsse und geflüsterte Drohungen", "🗣️ Ehrliche Worte, die tief schneiden", "🛏️ Berührungen, die an Besessenheit grenzen", "🐺 Wilde Loyalität, auch wenn es wehtut"]', 
 'character', 5, 'de'),

-- 👀 Optics & Aesthetic (section 2)
('Was fällt dir als erstes an ihm auf?', 
 '["👁️ Augen wie ein Sturm, der gleich losbricht", "💪 Tätowierte Unterarme und ein schiefes Grinsen", "🕴️ Die Art, wie er sich bewegt—als gehöre ihm die Nacht", "🩸 Eine Narbe, die nach deiner Berührung schreit"]', 
 'appearance', 6, 'de'),

('Hat er Narben oder Tattoos?', 
 '["🐍 Eine Schlange, die sich um seine Rippen windet", "🕯️ Ein Gedenk-Tattoo für jemanden, den er verlor", "🗡️ Narben von Kämpfen, über die er nie spricht", "❌ Keine—sein Körper ist eine leere Leinwand"]', 
 'appearance', 7, 'de'),

('Wie ist sein Haar?', 
 '["🌑 Dunkel und zerzaust, immer etwas wild", "❄️ Platin und scharf wie eine Klinge", "🔥 Kastanienbraune Locken, die Geheimnisse verbergen", "🧼 Glatt rasiert mit einem Hauch von Bedrohung"]', 
 'appearance', 8, 'de'),

('Was für einen Körper hat er?', 
 '["🐺 Schlank und tödlich wie ein Raubtier", "🧱 Breit und grüblerisch, gebaut für Schutz", "🫦 Täuschend weich, bis er gegen dich gedrückt wird", "🕊️ Schlank und elegant, aber tödlich"]', 
 'appearance', 9, 'de'),

('Wie ist sein Markenzeichen?', 
 '["🧥 Lederjacke und Zigarette", "🕴️ Maßanzug mit Blut an den Manschetten", "🌙 Barfuß im Mondlicht, in Mysterium gehüllt", "🧢 Kapuze und Schatten—er beobachtet immer"]', 
 'appearance', 10, 'de'),

-- 🚩 Red Flags You'll Ignore Anyway (section 3)
('Welche Regel bricht er immer?', 
 '["🚫 Sagt nie die ganze Wahrheit", "🔐 Bewahrt Geheimnisse, die dich zerstören könnten", "🧨 Verletzt andere, um dich zu schützen", "🕳️ Verschwindet, wenn du ihn am meisten brauchst"]', 
 'redflags', 11, 'de'),

('Lügt er—und warum?', 
 '["🛡️ Um dich vor der Wahrheit zu schützen", "🧠 Um Ergebnisse zu manipulieren", "🫣 Um seine Scham zu verbergen", "🧊 Er lügt nicht—er lässt nur Dinge weg"]', 
 'redflags', 12, 'de'),

('Was ist das Schlimmste, das er für die Liebe getan hat?', 
 '["🩸 Jemanden getötet", "🕳️ Einen Freund verraten", "🧬 Sich selbst verändert", "🧨 Alles niedergebrannt"]', 
 'redflags', 13, 'de'),

('Wie geht er mit Konflikten um?', 
 '["🧠 Manipuliert, bis du an dir selbst zweifelst", "🥊 Nutzt Gewalt, wenn er in die Enge getrieben wird", "🛏️ Verführt, um abzulenken", "🧊 Schaltet ab und geht weg"]', 
 'redflags', 14, 'de'),

('Welche Warnung würde deine beste Freundin dir geben?', 
 '["🚨 \"Er ist toxisch, Schatz.\"", "🧨 \"Er wird dich ruinieren.\"", "🕳️ \"Du wirst nie genug für ihn sein.\"", "🫦 \"Du wirst ihn mehr lieben als dich selbst.\""]', 
 'redflags', 15, 'de');

-- Insert English questions
INSERT INTO quiz_questions (question_text, options, section, order_index, language_code) VALUES
-- 💔 Emotional Depth & Intensity (section 1)
('What secret pain does he carry beneath the surface?', 
 '["🕯️ A lost sibling he couldn''t save", "🥀 A betrayal that turned his heart to stone", "🔥 A violent past he hides behind charm", "🌑 A love he buried but never let go"]', 
 'character', 1, 'en'),

('How does he show vulnerability?', 
 '["🧨 Explosive anger that masks the ache", "🫥 Cold silence that begs to be broken", "🫀 A rare, trembling confession", "🫶 Acts of reckless devotion"]', 
 'character', 2, 'en'),

('What would he burn the world for?', 
 '["🛡️ To protect you", "🧬 To rewrite his past", "💰 To claim power", "💔 To avenge someone he loved"]', 
 'character', 3, 'en'),

('How does he react when jealous?', 
 '["🔥 Smolders with quiet possessiveness", "💣 Confronts with dangerous intensity", "🧊 Withdraws and punishes with silence", "🎭 Plays it cool but plots in shadows"]', 
 'character', 4, 'en'),

('What''s his love language when he''s finally yours?', 
 '["💋 Bruising kisses and whispered threats", "🗣️ Honest words that cut deep", "🛏️ Touch that borders on obsession", "🐺 Fierce loyalty, even when it hurts"]', 
 'character', 5, 'en'),

-- 👀 Optics & Aesthetic (section 2)
('What''s the first thing you notice about him?', 
 '["👁️ Eyes like a storm about to break", "💪 Inked forearms and a crooked grin", "🕴️ The way he moves—like he owns the night", "🩸 A scar that begs for your touch"]', 
 'appearance', 6, 'en'),

('Does he have any marks or tattoos?', 
 '["🐍 A serpent coiled around his ribs", "🕯️ A memorial tattoo for someone he lost", "🗡️ Scars from battles he never talks about", "❌ None—his body is a blank canvas"]', 
 'appearance', 7, 'en'),

('What''s his hair like?', 
 '["🌑 Dark and tousled, always a little wild", "❄️ Platinum and sharp, like a blade", "🔥 Auburn curls that hide secrets", "🧼 Clean-shaven with a hint of menace"]', 
 'appearance', 8, 'en'),

('What kind of body does he have?', 
 '["🐺 Lean and lethal, like a predator", "🧱 Broad and brooding, built for protection", "🫦 Deceptively soft until he''s pressed against you", "🕊️ Slender and elegant, but deadly"]', 
 'appearance', 9, 'en'),

('What''s his signature look?', 
 '["🧥 Leather jacket and cigarette", "🕴️ Tailored suit with blood on the cuffs", "🌙 Barefoot in moonlight, wrapped in mystery", "🧢 Hoodie and shadows—he''s always watching"]', 
 'appearance', 10, 'en'),

-- 🚩 Red Flags You'll Ignore Anyway (section 3)
('What rule does he always break?', 
 '["🚫 Never tells the full truth", "🔐 Keeps secrets that could destroy you", "🧨 Hurts others to protect you", "🕳️ Disappears when you need him most"]', 
 'redflags', 11, 'en'),

('Does he lie—and why?', 
 '["🛡️ To protect you from the truth", "🧠 To manipulate outcomes", "🫣 To hide his shame", "🧊 He doesn''t lie—he just omits"]', 
 'redflags', 12, 'en'),

('What''s the worst thing he''s done for love?', 
 '["🩸 Killed someone", "🕳️ Betrayed a friend", "🧬 Changed who he was", "🧨 Burned everything down"]', 
 'redflags', 13, 'en'),

('How does he handle conflict?', 
 '["🧠 Manipulates until you doubt yourself", "🥊 Uses violence when pushed", "🛏️ Seduces to distract", "🧊 Shuts down and walks away"]', 
 'redflags', 14, 'en'),

('What warning would your best friend give you?', 
 '["🚨 \"He''s toxic, babe.\"", "🧨 \"He''ll ruin you.\"", "🕳️ \"You''ll never be enough for him.\"", "🫦 \"You''ll love him more than yourself.\""]', 
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
