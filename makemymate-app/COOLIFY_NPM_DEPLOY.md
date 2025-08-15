# 🚀 Simple Coolify NPM Deployment Guide

## ✅ Much Simpler Approach!
Instead of Docker, we'll use Coolify's built-in Node.js support with npm build.

## 🔧 Step 1: Push to GitHub

```bash
# If not already done, initialize git and push
git init
git add .
git commit -m "Ready for Coolify npm deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/makemymate.git
git push -u origin main
```

## 🌐 Step 2: Connect to Coolify

### 2.1 Create New Application
1. **Go to your Coolify dashboard**
2. **Click "New Application"**
3. **Select "Application"**
4. **Choose "GitHub" as source**

### 2.2 Repository Configuration
```
Repository: YOUR_USERNAME/makemymate
Branch: main
Build Pack: Node.js (not Dockerfile!)
```

### 2.3 Build Settings
```
Build Command: npm run build
Start Command: npm start
Port: 3000
Node Version: 18 (or latest LTS)
```

### 2.4 Environment Variables
Add these in Coolify dashboard:

#### Required Variables:
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Azure Logic Apps
LOGIC_APPS_ENDPOINT_URL=https://prod-123.westeurope.logic.azure.com:443/workflows/your-workflow-id/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=your-signature-here

# Replicate
REPLICATE_API_TOKEN=r8_your-replicate-token-here

# Application Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production

# Security
JWT_SECRET=your-super-secure-jwt-secret-here

# Database
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-ID].supabase.co:5432/postgres

# Storage
SUPABASE_STORAGE_BUCKET=character-images

# Social Media
NEXT_PUBLIC_SITE_NAME=Make My Mate
NEXT_PUBLIC_SITE_DESCRIPTION=Create your perfect fantasy romance character
```

### 2.5 Domain Setup
1. **Add your domain** (e.g., `makemymate.com`)
2. **Configure SSL certificate**
3. **Set up any redirects**

## 🔄 Step 3: Deploy

1. **Click "Deploy"**
2. **Monitor build logs**
3. **Wait for completion**

## 🛠️ Step 4: Database Setup

Run these SQL scripts in your Supabase project:

1. **Basic Setup**: `supabase-setup-improved.sql`
2. **Quiz Questions**: `quiz-questions-setup.sql`
3. **Waitlist**: `bookmate-waitlist-setup.sql`
4. **Shareable URLs**: `supabase-shareable-urls.sql`

## ✅ Step 5: Test

Check these endpoints:
- ✅ `https://your-domain.com` - Main app
- ✅ `https://your-domain.com/api/generate-character` - API
- ✅ `https://your-domain.com/api/waitlist` - Waitlist API

## 🎉 Done!

Your Make My Mate app is now live on Coolify!

## 🚨 Quick Troubleshooting

### Build Issues:
```bash
# Test locally first
npm run build
npm start
```

### Environment Variables:
- Check Coolify logs for missing variables
- Verify all required variables are set

### Database Issues:
- Test Supabase connection
- Verify RLS policies are configured

## 💡 Why This Approach is Better:

1. **Simpler** - No Docker complexity
2. **Faster builds** - Coolify handles Node.js natively
3. **Easier debugging** - Standard npm logs
4. **Automatic optimization** - Coolify optimizes Node.js apps
5. **Better caching** - Coolify caches node_modules efficiently
