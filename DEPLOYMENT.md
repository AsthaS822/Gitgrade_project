# Deployment Guide - GitGrade

## Quick Deploy to Vercel

### Step 1: Prepare Your Repository
1. Make sure all your code is committed and pushed to GitHub
2. Ensure your `.gitignore` includes `.env.local` (already done)

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Add Environment Variables**
   Click "Environment Variables" and add your actual keys:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   GITHUB_TOKEN=your_github_token_here
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```
   
   **⚠️ SECURITY**: These are stored securely in Vercel and never exposed in your code.

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)
   - Your app will be live at `https://your-project.vercel.app`

#### Option B: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   vercel env add GITHUB_TOKEN
   vercel env add OPENROUTER_API_KEY
   ```

5. **Redeploy with Environment Variables**
   ```bash
   vercel --prod
   ```

### Step 3: Verify Deployment

1. Visit your deployed URL
2. Test with a sample repository:
   - Try: `https://github.com/vercel/next.js`
   - Or any public GitHub repository

### Troubleshooting

**Build Fails:**
- Check that all dependencies are in `package.json`
- Ensure Node.js version is 18+ (Vercel auto-detects)
- Check build logs in Vercel dashboard

**API Errors:**
- Verify all environment variables are set correctly
- Check that GitHub token has proper permissions
- Ensure OpenRouter API key is valid

**Rate Limiting:**
- GitHub API has rate limits (60 requests/hour without token, 5000/hour with token)
- If you hit limits, wait or use a token with higher limits

### Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Optional | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Optional | Supabase anonymous key |
| `GITHUB_TOKEN` | **Required** | GitHub personal access token |
| `OPENROUTER_API_KEY` | Optional | OpenRouter API key (falls back to basic analysis) |

### Post-Deployment

1. **Custom Domain** (Optional)
   - Go to Project Settings → Domains
   - Add your custom domain

2. **Analytics** (Optional)
   - Enable Vercel Analytics in project settings

3. **Monitoring**
   - Check Vercel dashboard for deployment status
   - Monitor API usage and errors

---

