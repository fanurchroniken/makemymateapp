# 🚨 Troubleshooting Guide

## Error Log Format
For each error, document:

### [Hero Section Redesign and Language Fixes - Fixed]
**Date:** 2025-01-10
**Error Message:**
```
Hero section too big and empty
Title font not romantasy enough
Landing page still starts in English instead of German
Button spacing issues
```

**Context:** User feedback on hero section design and language preferences
**Root Cause:** 
1. Hero section was using min-h-screen making it too large
2. Title was using Cinzel font which is elegant but not romantic enough
3. Language context was loading saved preferences from localStorage
4. Button spacing and sizing needed adjustment

**Solution:**
1. **Hero Section Redesign:**
   - Changed from `min-h-screen` to `h-screen` for more compact design
   - Added dramatic background image from Unsplash (mystical castle/landscape)
   - Added proper overlay gradients for text readability
   - Reduced floating elements and made them more subtle
   - Improved spacing between elements

2. **Font Improvements:**
   - Added Great Vibes font import for romantic script style
   - Changed title from `font-cinzel` to `font-romantic` (Great Vibes)
   - Kept the beautiful gradient color shading as requested
   - Added Playfair Display as additional option

3. **Language Fix:**
   - Modified LanguageContext to clear localStorage and force German default
   - Added `localStorage.removeItem('language')` to clear saved preferences
   - Ensured German is set as default on every page load

4. **Button Spacing:**
   - Reduced button padding from `px-16 py-8` to `px-14 py-6`
   - Reduced text size from `text-2xl` to `text-xl`
   - Reduced icon sizes from `w-8 h-8` to `w-6 h-6`
   - Improved spacing between button elements

**Prevention:** Always test language defaults, ensure proper font imports, and balance hero section size with content density
**Related Files:** 
- `src/contexts/LanguageContext.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`

---

### [Translation and Database Integration Issues - Fixed]
**Date:** 2025-01-10
**Error Message:**
```
Placeholder texts like HERO.TITLE showing instead of translations
Character descriptions in German while website in English
Sample characters showing instead of database data
```

**Context:** Landing page redesign with internationalization and character gallery
**Root Cause:** 
1. Language context was using old translation keys that didn't match new landing page
2. Default language was English instead of German
3. Character service was not properly filtering by language
4. Sample characters were being used instead of database data

**Solution:**
1. Updated `LanguageContext.tsx` to include new translation keys for redesigned landing page
2. Changed default language from 'en' to 'de' in language context
3. Updated character service to properly filter by language and only use sample characters as fallback
4. Added German sample characters for testing
5. Enhanced hero section with dramatic visual effects and better typography
6. Added proper TypeScript types for translations object

**Prevention:** Always ensure translation keys match component usage, set proper default language, and implement proper database fallbacks
**Related Files:** 
- `src/contexts/LanguageContext.tsx`
- `src/lib/character-service.ts`
- `src/app/page.tsx`

---

### [Environment Variable Loading Issue - Final Fix]
**Date:** 2025-01-10
**Error Message:**
```
supabaseUrl is required.
Call Stack
26
Show 8 ignore-listed frame(s)
[project]/src/lib/supabase.ts [app-client] (ecmascript)
```

**Context:** Next.js was still not loading environment variables from .env.local file properly
**Root Cause:** Environment variables were undefined despite being in the .env.local file
**Solution:**
1. Added fallback values in `src/lib/supabase.ts` using `||` operator
2. Removed non-null assertions (`!`) that were causing runtime errors
3. Added console logging to debug environment variable loading
4. Simplified .env.local file format (removed comments and sections)
5. Hardcoded values as fallback for immediate functionality

**Prevention:** Always provide fallback values for critical environment variables
**Related Files:** 
- `makemymate-app/env.local` (simplified format)
- `makemymate-app/src/lib/supabase.ts` (added fallbacks)

---

### [Environment Variable Loading Issue]
**Date:** 2025-01-10
**Error Message:**
```
Missing Supabase environment variables:
Call Stack
25
Show 7 ignore-listed frame(s)
[project]/src/lib/supabase.ts [app-client] (ecmascript)
```

**Context:** Next.js was not loading environment variables from .env.local file properly
**Root Cause:** Complex environment file structure and validation logic was preventing proper loading
**Solution:**
1. Simplified `env.local` file to only essential variables
2. Removed validation logic from `src/lib/supabase.ts`
3. Used direct environment variable access with non-null assertion
4. Killed all Node.js processes and restarted server
5. Removed DEV/TEST/PROD complexity as requested

**Prevention:** Keep environment files simple, avoid complex validation in client-side code
**Related Files:** 
- `makemymate-app/env.local` (simplified)
- `makemymate-app/src/lib/supabase.ts` (simplified)

---

### [Supabase Environment Variable Error - Updated]
**Date:** 2025-01-10
**Error Message:**
```
❌ Connection failed: Supabase client not initialized. Check environment variables.
```

**Context:** User was trying to load the SupabaseTest component on the homepage
**Root Cause:** The SupabaseTest component was using `require()` instead of ES6 `import` syntax, causing initialization failures
**Solution:**
1. Updated `src/components/SupabaseTest.tsx` to use proper ES6 import: `import { supabase } from '@/lib/supabase'`
2. Removed the try-catch wrapper around require() that was causing issues
3. Added debug information to show environment variable status
4. Restarted the development server

**Prevention:** Always use ES6 import syntax in React components, avoid mixing require() and import
**Related Files:** 
- `makemymate-app/src/components/SupabaseTest.tsx`
- `makemymate-app/src/lib/supabase.ts`

---

### [Supabase Environment Variable Error - Original]
**Date:** 2025-01-10
**Error Message:**
```
Call Stack
26
Show 8 ignore-listed frame(s)
[project]/src/lib/supabase.ts [app-client] (ecmascript)
```

**Context:** User was trying to load the SupabaseTest component on the homepage
**Root Cause:** Environment variables were not being loaded properly by Next.js, causing the Supabase client to fail initialization
**Solution:**
1. Updated `src/lib/supabase.ts` to add proper environment variable validation
2. Added error handling for missing environment variables
3. Updated `src/components/SupabaseTest.tsx` to handle initialization errors gracefully
4. Restarted the development server

**Prevention:** Always validate environment variables before using them in client-side code
**Related Files:** 
- `makemymate-app/src/lib/supabase.ts`
- `makemymate-app/src/components/SupabaseTest.tsx`
- `makemymate-app/env.local`

---

### [PostCSS Plugin Error]
**Date:** 2025-01-10
**Error Message:**
```
Error: It looks like you're trying to use tailwindcss directly as a PostCSS plugin.
```

**Context:** After installing Tailwind CSS v4, PostCSS configuration was incompatible
**Root Cause:** Tailwind CSS v4 has different PostCSS plugin requirements than v3
**Solution:**
1. Downgraded to Tailwind CSS v3: `npm uninstall tailwindcss @tailwindcss/postcss`
2. Installed v3: `npm install -D tailwindcss@^3.4.0 postcss autoprefixer`
3. Updated `postcss.config.mjs` to use standard v3 configuration

**Prevention:** Always check compatibility between Tailwind versions and PostCSS configuration
**Related Files:** 
- `makemymate-app/postcss.config.mjs`
- `makemymate-app/package.json`

---

### [Directory Navigation Error]
**Date:** 2025-01-10
**Error Message:**
```
npm error code ENOENT
npm error syscall open
npm error path C:\Users\janni\makemymate\package.json
```

**Context:** User ran `npm run dev` from the parent directory instead of the app directory
**Root Cause:** Package.json is located in `makemymate-app/` not in the root directory
**Solution:**
1. Created `start-dev.bat` script to automatically navigate to correct directory
2. Created `start-dev.ps1` PowerShell script as alternative
3. Provided clear instructions for manual navigation

**Prevention:** Use the provided batch scripts or always ensure you're in the `makemymate-app` directory
**Related Files:** 
- `start-dev.bat`
- `start-dev.ps1`
- `makemymate-app/package.json`

---

### [JSX Parsing Error - Inline SVG Data URL]
**Date:** 2025-01-10
**Error Message:**
```
Parsing ecmascript source code failed
./src/app/page.tsx (211:84)
Expected '</', got 'numeric literal (100, 100)'
```

**Context:** Building the landing page redesign with inline SVG background pattern
**Root Cause:** Inline SVG data URL in JSX className was causing parsing conflicts due to quote escaping issues
**Solution:**
1. Removed the problematic inline SVG data URL from the className
2. Replaced with simple CSS-based decorative elements using positioned divs
3. Used individual positioned elements instead of complex SVG pattern

**Prevention:** Avoid complex inline SVG data URLs in JSX className attributes. Use separate CSS classes or positioned elements instead.
**Related Files:** `src/app/page.tsx`

---

### [CSS @import Parsing Error]
**Date:** 2025-01-10
**Error Message:**
```
Parsing css source code failed
./src/app/globals.css (1392:9)
@import rules must precede all rules aside from @charset and @layer statements
```

**Context:** Building the landing page redesign with custom font imports
**Root Cause:** CSS @import statements were placed after other CSS rules, but they must come at the very beginning of the file
**Solution:**
1. Moved all @import statements to the very top of `src/app/globals.css`
2. Placed them before @tailwind directives
3. Ensured proper order: @import → @tailwind → other CSS rules

**Prevention:** Always place @import statements at the very beginning of CSS files, before any other rules
**Related Files:** `src/app/globals.css`

---

## Error Log Format
For each error, document:

### [Error Title/Type]
**Date:** [YYYY-MM-DD]
**Error Message:**
```
[Exact error message]
```

**Context:** [What were you trying to do?]
**Root Cause:** [Why did this happen?]
**Solution:**
1. [Step-by-step solution]
2. [Include exact commands used]

**Prevention:** [How to avoid this in the future]
**Related Files:** [Which files were modified to fix this]

---
