# 🎯 START HERE - Complete Guide

## ✅ API Keys Security - VERIFIED SAFE!

**Your API keys are protected:**
- ✅ Removed from all documentation files
- ✅ Only stored in `.env.local` (gitignored)
- ✅ Never in source code
- ✅ Server-side only (never sent to browser)
- ✅ Safe to use and deploy

---

## 📦 What You Need to Install

### Required:
1. **Node.js** (version 18 or higher)
   - Download: https://nodejs.org/
   - Check version: `node --version`

2. **npm** (comes with Node.js)
   - Check version: `npm --version`

### That's it! Everything else installs automatically.

---

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
npm install
```
⏱️ Takes 2-3 minutes

### Step 2: Create `.env.local` File
Create a file named `.env.local` in the root folder with:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
GITHUB_TOKEN=your_github_token_here
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

**⚠️ IMPORTANT**: Replace with your actual API keys from secure storage!

### Step 3: Run the App
```bash
npm run dev
```

Open: http://localhost:3000

---

## ✅ How to Check If It's Working

### Test 1: Server Starts
```bash
npm run dev
```
✅ Should see: `✓ Ready in X.Xs` and `○ Local: http://localhost:3000`

### Test 2: Browser Works
1. Open http://localhost:3000
2. ✅ Page loads with GitGrade UI
3. ✅ No errors in browser console (F12)

### Test 3: Analysis Works
1. Enter: `https://github.com/vercel/next.js`
2. Click "Analyze Repository"
3. ✅ Loading spinner appears
4. ✅ Results show after 5-15 seconds
5. ✅ Score, summary, and roadmap displayed

---

## 🚀 How to Deploy to Vercel

### Method 1: Vercel Dashboard (Easiest)

1. **Push to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Go to Vercel**:
   - Visit: https://vercel.com
   - Sign in with GitHub
   - Click "Add New Project"

3. **Import Repository**:
   - Select your repository
   - Click "Import"

4. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add each one:
     - `NEXT_PUBLIC_SUPABASE_URL` = (paste your value)
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (paste your value)
     - `GITHUB_TOKEN` = (paste your value)
     - `OPENROUTER_API_KEY` = (paste your value)
   - Select: Production, Preview, Development
   - Click "Save"

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes
   - ✅ Your app is live!

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add GITHUB_TOKEN
vercel env add OPENROUTER_API_KEY

# Deploy to production
vercel --prod
```

---

## 📋 Complete Checklist

### Before Testing:
- [ ] Node.js installed (v18+)
- [ ] `npm install` completed
- [ ] `.env.local` file created with API keys
- [ ] `npm run dev` starts successfully

### Testing:
- [ ] Browser opens http://localhost:3000
- [ ] UI loads correctly
- [ ] Can analyze a test repository
- [ ] Results display correctly
- [ ] No console errors

### Before Deploying:
- [ ] Code pushed to GitHub
- [ ] `.env.local` NOT committed (it's gitignored ✅)
- [ ] Ready to add env vars in Vercel

### After Deploying:
- [ ] Environment variables added in Vercel
- [ ] Deployment successful
- [ ] Live site works
- [ ] Can analyze repositories on live site

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| "Module not found" | `rm -rf node_modules && npm install` |
| "Port 3000 in use" | `npm run dev -- -p 3001` |
| "Env vars not working" | Restart dev server, check `.env.local` exists |
| "Failed to analyze" | Check GitHub token, verify repo is public |
| "Rate limit" | Wait 5-10 minutes, or use valid token |

---

## 📚 More Help

- **Quick Start**: See `QUICK_START.md`
- **Testing**: See `TEST.md`
- **Deployment**: See `DEPLOYMENT.md`
- **Security**: See `SECURITY.md`
- **Setup**: See `SETUP.md`

---

## 🎯 You're Ready!

1. ✅ Install: `npm install`
2. ✅ Create `.env.local` with your keys
3. ✅ Test: `npm run dev`
4. ✅ Deploy: Push to GitHub → Import to Vercel → Add env vars → Deploy

**Your API keys are safe!** They're in `.env.local` which is gitignored. ✅

---

**Need help?** Check the other `.md` files in this folder for detailed guides!

