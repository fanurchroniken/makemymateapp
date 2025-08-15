-- Test if the functions exist
SELECT 
  routine_name,
  routine_type
FROM information_schema.routines 
WHERE routine_schema = 'public' 
  AND routine_name IN (
    'generate_share_id',
    'insert_character_with_share_id',
    'get_character_by_share_id',
    'increment_character_view',
    'increment_character_share',
    'increment_character_like'
  );

-- Test if the share_id column exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'generated_characters' 
  AND column_name = 'share_id';

-- Check if there are any characters in the database
SELECT COUNT(*) as total_characters FROM generated_characters;

-- Check if any characters have share_ids
SELECT COUNT(*) as characters_with_share_id 
FROM generated_characters 
WHERE share_id IS NOT NULL;
