# 🗄️ Supabase Database Setup Instructions

## 📋 What This Script Creates

### **Tables:**
1. **`questions`** - Character creation questions with categories
2. **`character_responses`** - User responses during quiz
3. **`generated_characters`** - Final character data and images
4. **`aesthetic_styles`** - Different visual styles for generation

### **Sample Data:**
- **12 romantic questions** across 4 categories (personality, appearance, setting, relationship)
- **5 aesthetic styles** (Royal Romance, Mystic Realms, Gothic Majesty, etc.)
- **1 sample character** for testing

### **Security & Performance:**
- Row Level Security (RLS) policies
- Database indexes for fast queries
- Helper functions for common operations

## 🚀 How to Run the Script

### **Step 1: Open Supabase SQL Editor**
1. Go to your Supabase project dashboard
2. Click **"SQL Editor"** in the left sidebar
3. Click **"New query"**

### **Step 2: Copy and Paste**
1. Open `makemymate-app/supabase-setup.sql`
2. Copy the entire content
3. Paste it into the SQL Editor

### **Step 3: Execute**
1. Click the **"Run"** button (or press Ctrl+Enter)
2. Wait for the script to complete (should take 10-30 seconds)

### **Step 4: Verify Success**
You should see a result like:
```
info                    | count
---------------------- | -----
Questions count:        | 12
Aesthetic styles count: | 5
Sample character count: | 1
```

## 🔍 What You'll Get

### **Questions Categories:**
- **Personality** (3 questions) - Character traits and behavior
- **Appearance** (3 questions) - Physical characteristics
- **Setting** (3 questions) - Fantasy world and environment
- **Relationship** (3 questions) - Love dynamics and conflict

### **Aesthetic Styles:**
- **Royal Romance** - Golden, regal settings
- **Mystic Realms** - Magical forests and ethereal beauty
- **Gothic Majesty** - Dark castles and dramatic shadows
- **Modern Supernatural** - Contemporary with supernatural elements
- **Ancient Mythology** - Gods and epic proportions

## 🧪 Testing Your Setup

### **Check Tables Exist:**
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('questions', 'character_responses', 'generated_characters', 'aesthetic_styles');
```

### **Check Sample Data:**
```sql
-- View questions
SELECT * FROM questions ORDER BY question_order;

-- View aesthetic styles
SELECT * FROM aesthetic_styles;

-- View sample character
SELECT * FROM generated_characters;
```

## 🎯 Next Steps

After running this script:
1. **Test the connection** from your Next.js app
2. **Build the character creation wizard**
3. **Add question management for admins**
4. **Implement character generation**

## 🆘 Troubleshooting

### **If you get errors:**
- Make sure you're in the correct Supabase project
- Check that your account has admin privileges
- Try running the script in smaller chunks if needed

### **If tables already exist:**
- The script uses `CREATE TABLE IF NOT EXISTS` so it's safe to run multiple times
- It will only create tables that don't already exist

---

**Ready to run?** Copy the SQL script and execute it in your Supabase SQL Editor! 🚀
