# Shareable URLs Setup Guide

## 🚀 Quick Setup

### 1. Run Database Updates
Execute the SQL script in your Supabase SQL Editor:
```sql
-- Copy and paste the entire content from: supabase-shareable-urls.sql
```

### 2. Add Environment Variables
Add this to your `.env.local` file:
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Note:** The service role key is already configured in your `src/lib/supabase.ts` file, so no additional setup is needed.

## 📊 Features Added

### Database Enhancements:
- ✅ `share_id` column added to `generated_characters`
- ✅ Unique 8-character alphanumeric IDs
- ✅ View count tracking
- ✅ Share count tracking  
- ✅ Like count tracking
- ✅ Public access policies

### Frontend Features:
- ✅ Character share page: `/character/[shareId]`
- ✅ View analytics display
- ✅ Share functionality with native API
- ✅ Like system with localStorage
- ✅ Beautiful character display
- ✅ Mobile-responsive design

### API Integration:
- ✅ Characters stored with share IDs
- ✅ Share URLs generated automatically
- ✅ View tracking on page load
- ✅ Share count incrementing

## 🔗 URL Structure

```
https://your-domain.com/character/{shareId}
Example: https://makemymate.com/character/a1b2c3d4
```

## 📈 Viral Features

### Analytics Tracking:
- **Views**: Counted when someone visits the character page
- **Shares**: Counted when someone shares the character
- **Likes**: Counted when someone likes the character

### Social Sharing:
- **Native Share API**: Uses device's native sharing
- **Clipboard Fallback**: Copies share text to clipboard
- **Hashtags**: Includes relevant hashtags for discoverability

### User Engagement:
- **Like System**: Users can like characters (stored in localStorage)
- **Create New**: Direct link to take the quiz
- **Back to Home**: Easy navigation

## 🧪 Testing

### Test Character Generation:
1. Take the quiz
2. Check if character is stored in database
3. Verify share URL is generated

### Test Share Page:
1. Copy share URL from generated character
2. Open in new tab/incognito
3. Verify character loads correctly
4. Test share and like buttons

### Test Analytics:
1. Visit character page multiple times
2. Check if view count increases
3. Share character and check share count
4. Like character and check like count

## 🔧 Troubleshooting

### Common Issues:

**"Function not found" errors:**
- Make sure you ran the SQL script completely
- Check that all functions were created successfully

**"Service role key" errors:**
- Check that the service role key in `src/lib/supabase.ts` is correct
- Verify the key has proper permissions in Supabase dashboard

**"Share URL not generated":**
- Check that `NEXT_PUBLIC_APP_URL` is set correctly
- Verify the database insert was successful

**"Character not found":**
- Check that the share_id exists in the database
- Verify RLS policies allow public read access
