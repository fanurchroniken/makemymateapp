# Quiz Questions Database Setup

This document explains how to set up the dynamic quiz questions system in your Supabase database.

## Overview

The quiz questions are now stored in the database instead of being hardcoded in the application. This allows you to:
- Add, edit, or remove questions without deploying code
- Manage questions through the Supabase dashboard
- Support multiple languages dynamically
- Track question performance and analytics

## Database Structure

### Table: `quiz_questions`

| Column | Type | Description |
|--------|------|-------------|
| `id` | SERIAL PRIMARY KEY | Unique identifier |
| `question_text` | TEXT | The question text |
| `options` | JSONB | Array of answer options |
| `section` | VARCHAR(50) | Question section ('character', 'appearance', 'redflags') |
| `order_index` | INTEGER | Display order |
| `language_code` | VARCHAR(2) | Language code ('de', 'en') |
| `is_active` | BOOLEAN | Whether question is active |
| `created_at` | TIMESTAMP | Creation timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |

### Table: `character_responses`

| Column | Type | Description |
|--------|------|-------------|
| `id` | SERIAL PRIMARY KEY | Unique identifier |
| `session_id` | VARCHAR(255) | Quiz session identifier |
| `question_id` | INTEGER | Reference to quiz_questions.id |
| `response` | TEXT | User's answer |
| `language_code` | VARCHAR(2) | Language code ('de', 'en') |
| `created_at` | TIMESTAMP | Creation timestamp |

### Table: `analytics`

| Column | Type | Description |
|--------|------|-------------|
| `id` | SERIAL PRIMARY KEY | Unique identifier |
| `event_type` | VARCHAR(100) | Type of event (quiz_started, quiz_completed, etc.) |
| `session_id` | VARCHAR(255) | Session identifier |
| `language_code` | VARCHAR(2) | Language code ('de', 'en') |
| `metadata` | JSONB | Additional event data |
| `created_at` | TIMESTAMP | Creation timestamp |

### Function: `get_quiz_questions(p_language_code)`

Returns questions for a specific language, ordered by `order_index`.

## Setup Instructions

### 1. Run the SQL Setup Script

1. Open your Supabase dashboard
2. Go to the SQL Editor
3. Copy and paste the contents of `quiz-questions-setup.sql`
4. Execute the script

### 2. Verify Setup

After running the script, you should have:
- A `quiz_questions` table with 30 questions (15 German + 15 English)
- A `character_responses` table for storing quiz answers
- An `analytics` table for tracking user interactions
- A `get_quiz_questions` function
- Proper permissions set up

### 3. Test the Setup

The application will automatically:
1. Try to fetch questions from the database
2. Fall back to hardcoded questions if the database fails
3. Log the results to the console

## Managing Questions

### Adding New Questions

```sql
INSERT INTO quiz_questions (question_text, options, section, order_index, language_code) VALUES
('Your new question here?', 
 '["Option A", "Option B", "Option C", "Option D"]', 
 'character', 16, 'de');
```

### Editing Existing Questions

```sql
UPDATE quiz_questions 
SET question_text = 'Updated question text',
    options = '["New Option A", "New Option B", "New Option C", "New Option D"]'
WHERE id = 1;
```

### Deactivating Questions

```sql
UPDATE quiz_questions 
SET is_active = false 
WHERE id = 1;
```

### Reordering Questions

```sql
UPDATE quiz_questions 
SET order_index = 5 
WHERE id = 1;
```

## Best Practices

### 1. Question Management
- Always test new questions before making them active
- Use the `is_active` flag to temporarily disable questions
- Keep `order_index` values sequential (1, 2, 3, etc.)

### 2. Language Support
- Always add questions in both German and English
- Use the same `order_index` for corresponding questions in different languages
- Keep question IDs consistent across languages when possible

### 3. Data Integrity
- Don't delete questions that have been answered by users
- Use `is_active = false` instead of deletion
- Maintain referential integrity with existing quiz responses

### 4. Performance
- The `order_index` column is indexed for efficient sorting
- Questions are cached by the application for better performance
- Consider pagination if you have many questions

## Troubleshooting

### Questions Not Loading
1. Check the browser console for errors
2. Verify the `get_quiz_questions` function exists
3. Ensure proper permissions are set
4. Check that questions have `is_active = true`

### Quiz Response Saving Errors
1. Check that the `character_responses` table exists
2. Verify foreign key constraints (question_id references quiz_questions.id)
3. Ensure proper permissions are set for INSERT operations
4. Check browser console for detailed error messages
5. Verify that the question_id being saved exists in the quiz_questions table

### Language Issues
1. Verify `language_code` values are correct ('de', 'en')
2. Check that questions exist for the current language
3. Ensure fallback questions are available

### Performance Issues
1. Check the database query performance
2. Consider adding additional indexes if needed
3. Monitor the application logs for slow queries

## Migration from Hardcoded Questions

The application automatically falls back to hardcoded questions if the database is unavailable. This ensures:
- No disruption during the migration
- Graceful degradation if database issues occur
- Easy rollback if needed

## Next Steps

1. **Monitor Performance**: Watch for any performance issues with the new database queries
2. **Add Analytics**: Consider adding question-level analytics to track which questions perform best
3. **A/B Testing**: Use the `is_active` flag to test different question variations
4. **Content Management**: Consider building a simple admin interface for managing questions

## Support

If you encounter issues:
1. Check the application logs for error messages
2. Verify the database setup using the SQL queries above
3. Test the `get_quiz_questions` function directly in Supabase
4. Ensure all environment variables are properly configured
