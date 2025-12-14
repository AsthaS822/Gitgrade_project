# 🚀 Quick Start Guide - GitGrade

## ✅ Security Check - API Keys

**GOOD NEWS**: Your API keys are safe! They are:
- ✅ Only used via `process.env` (server-side only)
- ✅ Stored in `.env.local` (gitignored)
- ✅ Never exposed in source code
- ✅ Never sent to the browser

## 📦 Step 1: Install Dependencies

Open terminal in the project folder and run:

```bash
npm install
```

This will install:
- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Axios
- And other dependencies

**Time**: ~2-3 minutes

## 🔐 Step 2: Set Up Environment Variables

1. **Create `.env.local` file** in the root directory (same folder as `package.json`)

2. **Add your API keys** (use the ones provided to you):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   GITHUB_TOKEN=your_github_token_here
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```
   
   **⚠️ Get your actual keys from the project owner or your secure storage!**

3. **Save the file**

**⚠️ IMPORTANT**: 
- The `.env.local` file is already in `.gitignore`
- It will NOT be committed to Git
- Never share this file or commit it

## 🧪 Step 3: Test Locally

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser**:
   Go to: http://localhost:3000

3. **Test the application**:
   - You should see the GitGrade homepage
   - Try analyzing a repository:
     - Example: `https://github.com/vercel/next.js`
     - Or: `https://github.com/facebook/react`
     - Or any public GitHub repository

4. **What to expect**:
   - ✅ Beautiful UI loads with glowing effects
   - ✅ Enter a GitHub URL
   - ✅ Click "Analyze Repository"
   - ✅ See loading animation
   - ✅ Get results with score, summary, and roadmap

## ✅ How to Verify It's Working

### Check 1: Server Starts
```bash
npm run dev
```
Should show:
```
✓ Ready in 2.5s
○ Local: http://localhost:3000
```

### Check 2: Browser Opens
- Page loads without errors
- UI displays correctly
- No console errors (check F12 → Console)

### Check 3: API Works
1. Enter a GitHub URL
2. Click "Analyze Repository"
3. Should see:
   - Loading spinner
   - Results appear after 5-10 seconds
   - Score, summary, and roadmap displayed

### Check 4: Check Terminal
- No error messages
- API calls logged (if any)

## 🐛 Troubleshooting

### Problem: "Module not found"
**Solution**: 
```bash
rm -rf node_modules
npm install
```

### Problem: "Port 3000 already in use"
**Solution**: 
```bash
# Windows PowerShell
$env:PORT=3001; npm run dev

# Or use a different port
npm run dev -- -p 3001
```

### Problem: "Environment variables not working"
**Solution**:
1. Make sure file is named exactly `.env.local` (not `.env` or `.env.local.txt`)
2. Restart the dev server after changing env variables
3. Check file is in root directory (same as `package.json`)

### Problem: "Failed to analyze repository"
**Solution**:
- Check GitHub token is correct
- Verify repository URL is valid and public
- Check internet connection
- Check terminal for error messages

### Problem: "Rate limit exceeded"
**Solution**:
- Wait a few minutes
- GitHub API has rate limits
- With token: 5000 requests/hour
- Without token: 60 requests/hour

## 🚀 Step 4: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Easiest)

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

4. **Configure**:
   - Framework: Next.js (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)

5. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add each variable:
     - `NEXT_PUBLIC_SUPABASE_URL` = (your value)
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (your value)
     - `GITHUB_TOKEN` = (your value)
     - `OPENROUTER_API_KEY` = (your value)
   - Make sure to select "Production", "Preview", and "Development"

6. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app will be live!

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Add Environment Variables**:
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   vercel env add GITHUB_TOKEN
   vercel env add OPENROUTER_API_KEY
   ```

5. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

## 📋 Checklist Before Submission

- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` created with API keys
- [ ] App runs locally (`npm run dev`)
- [ ] Can analyze a test repository
- [ ] No errors in browser console
- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Environment variables added in Vercel
- [ ] Live site works correctly
- [ ] Screen recording ready (showing end-to-end)

## 🎯 Quick Test Commands

```bash
# Install
npm install

# Run locally
npm run dev

# Build for production
npm run build

# Check for errors
npm run lint
```

## 📞 Need Help?

1. Check terminal for error messages
2. Check browser console (F12)
3. Verify environment variables are set
4. Make sure repository is public
5. Check internet connection

---

**Remember**: Your `.env.local` file is safe and will never be committed to Git! ✅

