# Bookmate Waitlist Setup Guide

## Prerequisites

1. **Supabase Project**: Make sure you have a Supabase project set up
2. **Environment Variables**: Ensure your `.env.local` file has the required variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

## Step 1: Create the Database Table

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Navigate to your project
3. Go to **SQL Editor**
4. Copy and paste the contents of `bookmate-waitlist-setup.sql`
5. Click **Run** to execute the script

## Step 2: Verify the Setup

After running the SQL script, you should see:
- A new table called `bookmate_waitlist`
- Sample data with 5 test entries
- Statistics showing the counts

## Step 3: Test the Waitlist

1. Start your development server: `npm run dev`
2. Navigate to `/bookmate-waitlist`
3. The statistics should load dynamically from the database
4. Try submitting the form with test data

## Troubleshooting

### Form Not Working
- Check browser console for errors
- Verify the API endpoint `/api/waitlist` is accessible
- Ensure the database table exists

### Statistics Not Loading
- Check if the `bookmate_waitlist` table exists in Supabase
- Verify your environment variables are correct
- Check browser console for API errors

### Database Errors
- Make sure you have the `SUPABASE_SERVICE_ROLE_KEY` in your `.env.local`
- Verify the table was created successfully
- Check Supabase logs for any permission issues

## API Endpoints

- `GET /api/waitlist` - Returns waitlist statistics
- `POST /api/waitlist` - Submits a new waitlist entry

## Database Schema

```sql
bookmate_waitlist (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('reader', 'author')),
  consent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)
```

## Sample Data

The setup script includes 5 sample entries:
- 3 readers
- 2 authors

You can modify or remove these in the SQL script as needed.
