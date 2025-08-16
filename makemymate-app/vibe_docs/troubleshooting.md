# Troubleshooting Guide

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

### [Clipboard API Error - Cannot read properties of undefined (reading 'writeText')]
**Date:** 2025-01-27
**Error Message:**
```
TypeError: Cannot read properties of undefined (reading 'writeText')
```

**Context:** User reported sharing functionality not working on the website
**Root Cause:** The clipboard API (`navigator.clipboard`) was undefined or not available, likely due to the site not being served over HTTPS or browser compatibility issues
**Solution:**
1. Added proper clipboard API fallback in `src/components/layout/TopNav.tsx`
2. Implemented multiple fallback methods:
   - Modern clipboard API: `navigator.clipboard.writeText()`
   - Legacy fallback: `document.execCommand('copy')` with temporary textarea
   - Manual fallback: Show share text in alert for manual copying
3. Added comprehensive error handling with user-friendly fallbacks

**Prevention:** Always check for API availability before using modern browser APIs, especially clipboard functionality
**Related Files:** `src/components/layout/TopNav.tsx`

---

### [Character Profile Layout Inconsistency - German vs English]
**Date:** 2025-01-27
**Error Message:** Character profile pages showing different layouts in German vs English versions

**Context:** User reported that character profile pages had different layouts between languages, with missing top navigation bar in English
**Root Cause:** The character profile page had both TopNav component and a separate header section with "Back to Home" button, causing layout inconsistencies
**Solution:**
1. Removed duplicate header section from `src/app/character/[shareId]/page.tsx`
2. Kept only the TopNav component for consistent navigation
3. Moved stats section to right-aligned position for cleaner layout
4. Ensured consistent layout across all language versions

**Prevention:** Avoid duplicate navigation elements and ensure consistent component usage across language versions
**Related Files:** `src/app/character/[shareId]/page.tsx`

---

### [Quiz Mobile UX Issue - Categories Taking Too Much Space]
**Date:** 2025-01-27
**Error Message:** Quiz categories pushing content down on mobile, requiring scrolling for every question

**Context:** User reported that quiz categories were taking up too much screen space on mobile devices, making the actual quiz questions not immediately visible
**Root Cause:** Quiz categories and progress bar were always visible, taking up significant vertical space on mobile screens
**Solution:**
1. Added `hidden md:grid` classes to quiz categories section in `src/components/quiz/QuizContainer.tsx`
2. Wrapped ProgressBar component in `hidden md:block` div to hide on mobile
3. This ensures quiz questions are immediately visible on mobile without scrolling

**Prevention:** Always consider mobile-first design and test responsive layouts across different screen sizes
**Related Files:** `src/components/quiz/QuizContainer.tsx`

---

### [Quiz Translation Issue - "Question X of Y" Not Translated]
**Date:** 2025-01-27
**Error Message:** "Question X of 15" text remaining in English even when German language is selected

**Context:** User reported that the quiz progress text was not being translated to German
**Root Cause:** The "Question X of Y" text was hardcoded in English in the QuestionCard component
**Solution:**
1. Added translation keys to both English and German language files:
   - English: `"questionProgress": "Question {current} of {total}"`
   - German: `"questionProgress": "Frage {current} von {total}"`
2. Updated `src/components/quiz/QuestionCard.tsx` to use translated text with dynamic replacement
3. Used `t('quiz.questionProgress').replace('{current}', questionNumber.toString()).replace('{total}', totalQuestions.toString())`

**Prevention:** Always use translation keys for user-facing text, never hardcode text in components
**Related Files:** 
- `src/components/quiz/QuestionCard.tsx`
- `src/messages/en.json`
- `src/messages/de.json`

---

### [Quiz Translation Issue - "Back to Home" Button Showing Translation Key]
**Date:** 2025-01-27
**Error Message:** "Back to Home" button showing "quiz.backToHome" instead of translated text

**Context:** User reported that the "Back to Home" button in the quiz was showing the translation key instead of the actual translated text
**Root Cause:** The quiz was using `t('quiz.backToHome')` but the translation key was actually `character.backToHome` in the language files
**Solution:**
1. Updated all instances of `t('quiz.backToHome')` to `t('character.backToHome')` in:
   - `src/app/quiz/page.tsx` (2 instances)
   - `src/app/bookmate-waitlist/page.tsx` (1 instance)
2. This matches the actual translation key structure in the language files

**Prevention:** Always verify that translation keys match exactly between component usage and language file definitions
**Related Files:** 
- `src/app/quiz/page.tsx`
- `src/app/bookmate-waitlist/page.tsx`
