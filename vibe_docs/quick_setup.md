# 🚀 Quick Setup Reference

## 📋 Environment Variables Checklist

### ✅ Required for Development
- [ ] **Supabase Project**: Create at [supabase.com](https://supabase.com)
- [ ] **Azure Logic App**: Create at [portal.azure.com](https://portal.azure.com)
- [ ] **Replicate Account**: Sign up at [replicate.com](https://replicate.com)

### 🔑 API Keys Needed
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - From Supabase project settings
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - From Supabase project settings
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - From Supabase project settings
- [ ] `LOGIC_APPS_ENDPOINT_URL` - From Azure Logic App HTTP trigger
- [ ] `REPLICATE_API_TOKEN` - From Replicate account settings

### 🔒 Security Setup
- [ ] Generate JWT secret: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
- [ ] Add to `JWT_SECRET` in `.env.local`

## 🏃‍♀️ Quick Start Commands

```bash
# 1. Start development server
npm run dev

# 2. Check if server is running
netstat -an | findstr :3000

# 3. Visit the app
# http://localhost:3000
```

## 📁 Important Files

- **`.env.local`** - Your actual environment variables (never commit)
- **`env.example`** - Template with placeholders
- **`vibe_docs/environment_setup.md`** - Detailed setup instructions

## 🆘 Common Issues

### Server Not Available
```bash
# Kill all Node processes
taskkill /f /im node.exe

# Restart server
cd makemymate-app
npm run dev
```

### Environment Variables Not Loading
1. Restart development server after adding variables
2. Check file is named `.env.local` (not `.env.local.txt`)
3. Verify no spaces around `=` in variable definitions

### Supabase Connection Issues
1. Check project URL format: `https://project-id.supabase.co`
2. Verify API keys are correct
3. Ensure project is active in Supabase dashboard

## 📞 Next Steps

1. **Set up Supabase project** and get real credentials
2. **Configure Azure Logic Apps** workflow
3. **Get Replicate API token**
4. **Test all integrations**
5. **Build character creation wizard**

---

**Need help?** Check `vibe_docs/environment_setup.md` for detailed instructions.
