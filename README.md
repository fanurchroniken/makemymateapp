# Make My Mate

A web application that allows female romantasy readers to create images of their imagined book boyfriends based on character and optics questions. The app has viral potential with shareable character cards optimized for social media.

## 🚀 Quick Start

### Option 1: Using the batch file (Windows)
```bash
# Double-click this file or run from command line:
start-dev.bat
```

### Option 2: Using the PowerShell script
```powershell
# Run this command from the root directory:
.\start-dev.ps1
```

### Option 3: Manual start
```bash
# Navigate to the app directory
cd makemymate-app

# Start the development server
npm run dev
```

## 🌐 Access the App

Once the server is running, visit: **http://localhost:3000**

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 + Tailwind CSS + TypeScript
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **AI Integration**: Azure Logic Apps → Replicate (Flux model)
- **Hosting**: Hostinger (EU server)

## 📁 Project Structure

```
makemymate-app/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utilities and configurations
│   └── types/               # TypeScript type definitions
├── public/                  # Static assets
└── vibe_docs/              # Project documentation
```

## 🔧 Development

The development server will automatically reload when you make changes to the code.

## 📝 Environment Variables

Copy `makemymate-app/env.example` to `makemymate-app/.env.local` and fill in your credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Azure Logic Apps
LOGIC_APPS_ENDPOINT_URL=your_logic_apps_url_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## 🎨 Features

- **Dark Glam Aesthetic**: Purple gradients, sparkle effects, glass morphism
- **Responsive Design**: Mobile-first approach for social media sharing
- **Character Creation Wizard**: Multi-step quiz for character generation
- **AI Image Generation**: Powered by Replicate Flux model
- **Social Media Sharing**: Optimized for viral content

---

**Note**: Always run the development server from the `makemymate-app` directory or use the provided scripts.
