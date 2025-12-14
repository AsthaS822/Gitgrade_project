# 🧪 Testing Guide

## Quick Test Steps

### 1. Verify Installation
```bash
npm install
```
✅ Should install all packages without errors

### 2. Check Environment Variables
Make sure `.env.local` exists with:
- ✅ NEXT_PUBLIC_SUPABASE_URL
- ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY  
- ✅ GITHUB_TOKEN
- ✅ OPENROUTER_API_KEY

### 3. Start Server
```bash
npm run dev
```
✅ Should show: "Ready in X.Xs" and "Local: http://localhost:3000"

### 4. Test in Browser
1. Open http://localhost:3000
2. ✅ Page loads with GitGrade UI
3. ✅ No console errors (F12 → Console)
4. ✅ Glowing effects visible on buttons

### 5. Test Analysis
Try these test repositories:

**Easy Test (Small repo)**:
```
https://github.com/octocat/Hello-World
```

**Medium Test (Popular repo)**:
```
https://github.com/vercel/next.js
```

**Your Own Repo**:
```
https://github.com/YOUR_USERNAME/YOUR_REPO
```

### Expected Results:
- ✅ Loading spinner appears
- ✅ Analysis completes in 5-15 seconds
- ✅ Score displayed (0-100)
- ✅ Level shown (Beginner/Intermediate/Advanced)
- ✅ Summary text appears
- ✅ Roadmap items listed
- ✅ Metrics breakdown visible

## Common Issues & Solutions

### Issue: "Cannot find module"
**Fix**: 
```bash
rm -rf node_modules .next
npm install
```

### Issue: "Port 3000 in use"
**Fix**: 
```bash
# Use different port
npm run dev -- -p 3001
```

### Issue: "Environment variables not found"
**Fix**:
1. Check `.env.local` file exists in root
2. Restart dev server
3. Verify no typos in variable names

### Issue: "Failed to fetch repository"
**Fix**:
- Verify GitHub token is valid
- Check repository is public
- Check internet connection
- Try a different repository

### Issue: "Rate limit exceeded"
**Fix**:
- Wait 5-10 minutes
- Use a valid GitHub token (increases limit)
- Try again later

## Verification Checklist

Before deploying, verify:
- [ ] Server starts without errors
- [ ] UI loads correctly
- [ ] Can analyze at least one repository
- [ ] Results display correctly
- [ ] No console errors
- [ ] No terminal errors
- [ ] Environment variables working
- [ ] API calls successful

## Test Commands

```bash
# Check if everything is installed
npm list --depth=0

# Build for production (test)
npm run build

# Run production build locally
npm start

# Check for TypeScript errors
npx tsc --noEmit
```

