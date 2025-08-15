# Environment Setup Guide

## Overview
This guide will help you set up all the necessary environment variables for the Make My Mate application.

## Quick Start
1. Copy `env.example` to `.env.local`
2. Follow the sections below to get your actual values
3. Replace the placeholders in `.env.local`

## 🔧 Environment Variables Setup

### 1. Supabase Configuration

#### Step 1: Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Choose a region (preferably EU for GDPR compliance)
4. Wait for the project to be created

#### Step 2: Get API Keys
1. Go to your project dashboard
2. Navigate to **Settings** → **API**
3. Copy the following values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

#### Step 3: Set up Database Schema
```sql
-- Run this in Supabase SQL Editor
-- Create tables for questions and responses
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  question_text TEXT NOT NULL,
  options JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE character_responses (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  question_id INTEGER REFERENCES questions(id),
  response TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE generated_characters (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  character_data JSONB NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Azure Logic Apps Configuration

#### Step 1: Create Logic App
1. Go to [Azure Portal](https://portal.azure.com)
2. Create a new Logic App
3. Choose your subscription and resource group
4. Select a region (preferably West Europe)

#### Step 2: Create HTTP Trigger
1. In your Logic App, click **+ Add trigger**
2. Search for "HTTP" and select **When a HTTP request is received**
3. Configure the trigger:
   ```json
   {
     "type": "object",
     "properties": {
       "prompt": {
         "type": "string"
       },
       "model": {
         "type": "string"
       },
       "style": {
         "type": "string"
       }
     }
   }
   ```

#### Step 3: Add Replicate Action
1. Click **+ New step**
2. Search for "HTTP" and select **HTTP**
3. Configure the action:
   - **Method**: POST
   - **URI**: `https://api.replicate.com/v1/predictions`
   - **Headers**:
     ```
     Authorization: Token r8_your-replicate-token
     Content-Type: application/json
     ```
   - **Body**:
     ```json
     {
       "version": "flux-1.0",
       "input": {
         "prompt": "@{triggerBody()?['prompt']}",
         "negative_prompt": "nsfw, nude, naked, sexual content",
         "width": 1024,
         "height": 1024,
         "num_inference_steps": 20,
         "guidance_scale": 7.5
       }
     }
     ```

#### Step 4: Add Response Action
1. Click **+ New step**
2. Search for "Response" and select **Response**
3. Configure the response:
   ```json
   {
     "statusCode": 200,
     "headers": {
       "Content-Type": "application/json"
     },
     "body": {
       "imageUrl": "@{body('HTTP')?['output']?[0]}",
       "description": "@{triggerBody()?['prompt']}",
       "title": "Your Fantasy Character",
       "quote": "Generated with love and magic"
     }
   }
   ```

#### Step 5: Get the Webhook URL
1. Save your Logic App
2. Copy the HTTP trigger URL → `LOGIC_APPS_ENDPOINT_URL`

### 3. Replicate Configuration

#### Step 1: Create Account
1. Go to [https://replicate.com](https://replicate.com)
2. Sign up for an account
3. Add payment method (required for API access)

#### Step 2: Get API Token
1. Go to [https://replicate.com/account/api-tokens](https://replicate.com/account/api-tokens)
2. Create a new API token
3. Copy the token → `REPLICATE_API_TOKEN`

### 4. Security Configuration

#### Generate JWT Secret
```bash
# Run this command to generate a secure JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Copy the output → `JWT_SECRET`

### 5. Storage Configuration

#### Create Supabase Storage Bucket
1. In Supabase dashboard, go to **Storage**
2. Create a new bucket called `character-images`
3. Set it to public (for image sharing)
4. Configure RLS policies if needed

## 🚀 Environment File Structure

Your `.env.local` should look like this:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://abc123.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Azure Logic Apps
LOGIC_APPS_ENDPOINT_URL=https://prod-123.westeurope.logic.azure.com:443/workflows/abc123/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=abc123

# Replicate
REPLICATE_API_TOKEN=r8_abc123def456

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
JWT_SECRET=your-generated-secret-here
SUPABASE_STORAGE_BUCKET=character-images
```

## 🔒 Security Notes

1. **Never commit `.env.local` to git**
2. **Use different keys for development/staging/production**
3. **Rotate API keys regularly**
4. **Use environment-specific Supabase projects**

## 🧪 Testing Your Setup

After setting up all environment variables:

1. Restart your development server
2. Check the browser console for any errors
3. Test Supabase connection in the browser
4. Verify Logic Apps endpoint is accessible

## 📋 Next Steps

Once environment variables are configured:
1. Set up database tables in Supabase
2. Test the Logic Apps workflow
3. Implement character creation wizard
4. Add image generation functionality

## 🆘 Troubleshooting

### Common Issues:
- **Supabase connection errors**: Check URL and API keys
- **Logic Apps 401 errors**: Verify the webhook URL is correct
- **Replicate rate limits**: Check your account status and billing
- **CORS errors**: Ensure Supabase RLS policies are configured correctly

