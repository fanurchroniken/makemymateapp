-- Fix field length constraints that are too restrictive for AI-generated content
ALTER TABLE public.generated_characters 
ALTER COLUMN aesthetic_style TYPE VARCHAR(200);

-- Also increase other potentially restrictive fields
ALTER TABLE public.generated_characters 
ALTER COLUMN character_name TYPE VARCHAR(200);

-- Check current field lengths
SELECT 
  column_name, 
  data_type, 
  character_maximum_length
FROM information_schema.columns 
WHERE table_name = 'generated_characters' 
  AND table_schema = 'public'
ORDER BY ordinal_position;
