# 🔧 Technical Details

_This document contains all technical decisions and implementation details._

## 💻 Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **UI Components**: Custom components + Lucide React icons
- **Forms**: React Hook Form + Zod validation

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Functions**: Supabase Edge Functions (Python)
- **API**: REST APIs via Next.js API routes

### AI Integration
- **Image Generation**: Azure Logic Apps
- **AI Model**: Replicate endpoint with Flux model
- **Prompt Engineering**: Custom prompts for character generation

### Infrastructure
- **Hosting**: Hostinger (EU server)
- **CDN**: Supabase CDN for images
- **Domain**: [To be determined]

## 🏗️ Architecture

### System Architecture

```
[User Browser] → [Next.js App (Hostinger)] → [Supabase Backend] → [Azure Logic Apps] → [Replicate/Flux]
                                    ↓
                              [Supabase Storage] ← [Generated Images]
```

### Data Flow
1. **User loads quiz UI** from Hostinger (EU server)
2. **Frontend sends quiz answers** to Supabase via HTTPS
3. **Supabase stores answers** + user ID (if logged in)
4. **Supabase triggers Logic Apps** with character prompt
5. **Logic Apps calls Replicate** with Flux model
6. **Generated image stored** in Supabase Storage
7. **Frontend displays result** card (image + quote + title)
8. **User shares OG-card** via social media

### API Design
- **REST APIs** exclusively
- **Next.js API routes** for backend logic
- **Supabase client** for database operations
- **HTTP POST** to Logic Apps for image generation

## 📁 Project Structure

### Directory Structure
```
makemymate-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Landing page
│   │   ├── quiz/
│   │   │   └── page.tsx             # Character creation wizard
│   │   ├── result/
│   │   │   └── [id]/
│   │   │       └── page.tsx         # Result and share page
│   │   ├── admin/
│   │   │   └── page.tsx             # Admin panel
│   │   └── api/
│   │       ├── generate-image/      # Logic Apps integration
│   │       └── questions/           # Question management
│   ├── components/
│   │   ├── ui/                      # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Input.tsx
│   │   ├── quiz/                    # Quiz components
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── QuizForm.tsx
│   │   ├── result/                  # Result components
│   │   │   ├── CharacterCard.tsx
│   │   │   ├── ShareButtons.tsx
│   │   │   └── SocialPreview.tsx
│   │   └── layout/                  # Layout components
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── Navigation.tsx
│   ├── lib/
│   │   ├── supabase.ts              # Supabase client
│   │   ├── logic-apps.ts            # Logic Apps integration
│   │   ├── questions.ts             # Question management
│   │   └── utils.ts                 # Utility functions
│   ├── types/
│   │   └── index.ts                 # TypeScript types
│   └── styles/
│       └── globals.css              # Global styles
├── public/
│   ├── images/                      # Static images
│   └── icons/                       # App icons
├── supabase/
│   ├── functions/                   # Edge functions
│   │   ├── generate-character/      # Character generation
│   │   └── admin-auth/              # Admin authentication
│   └── migrations/                  # Database migrations
├── .env.local                       # Development environment
├── .env.production                  # Production environment
└── package.json
```

### Key Modules

1. **Landing Page**: Hero section, features, call-to-action
2. **Character Creation Wizard**: 
   - Multi-step quiz with progress tracking
   - Question categories (personality, appearance, background)
   - HTTP POST request to Logic Apps URL
3. **Result and Share Page**: 
   - Generated character card display
   - Social media sharing buttons
   - OG-image for social preview
4. **Admin Backend**: 
   - Question management interface
   - User analytics dashboard
   - Content moderation tools

## 🔒 Security

### Authentication Method
- **End users**: No authentication required (anonymous)
- **Admin access**: Supabase Auth with role-based permissions
- **API security**: Rate limiting and input validation

### Authorization Strategy
- **Public access**: Quiz and result pages
- **Admin access**: Question management and analytics
- **Data permissions**: Handled in Supabase RLS policies

### Data Protection
- **GDPR compliance**: Supabase best practices
- **Data retention**: Configurable retention policies
- **Encryption**: At rest and in transit
- **No sensitive data**: Only quiz answers and generated images

## 🚀 Development Setup

### Prerequisites
- Node.js 18+ (LTS)
- npm or yarn
- Git
- Python 3.8+ (for Supabase functions)
- Code editor (VS Code recommended)

### Environment Variables
Required for DEV, TEST, and PROD environments:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Azure Logic Apps
LOGIC_APPS_ENDPOINT_URL=

# Replicate (if needed directly)
REPLICATE_API_TOKEN=

# App Configuration
NEXT_PUBLIC_APP_URL=
NODE_ENV=
```

### Database Schema
```sql
-- Questions table (admin-managed)
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  question_text TEXT NOT NULL,
  options JSONB,
  order_index INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Quiz responses table
CREATE TABLE quiz_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  answers JSONB NOT NULL,
  generated_image_url TEXT,
  character_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Admin users table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🎨 Design System

### Brand Guidelines
- **Name**: Make My Mate
- **Theme**: Dark Glam (deep violet, midnight blue, gold accents)
- **Typography**: Cinzel Display (headlines), Inter (body)
- **Visual tone**: Romantic, mysterious, elegant

### Component Library
- **Button variants**: Primary, secondary, ghost, outline
- **Card components**: Character cards, question cards, result cards
- **Form elements**: Inputs, selects, checkboxes, radio buttons
- **Layout components**: Header, footer, navigation, containers

## 📱 Social Media Integration

### Shareable Content
- **OG Images**: Dynamic character cards for social preview
- **Hashtag suggestions**: Romantasy-related hashtags
- **Platform optimization**: Instagram, TikTok, Twitter, Pinterest
- **One-click sharing**: Native share APIs

### Viral Features
- **Character collections**: Save and organize favorites
- **Community features**: Like, comment, share characters
- **Trending characters**: Popular character discovery
- **User-generated content**: Community character sharing

---

*This document should be updated as technical decisions are made and architecture evolves.*
