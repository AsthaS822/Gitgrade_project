# 🎯 VS Code Guide - Complete Setup from Start

## ✅ Is It Ready? YES!

Your project is **100% ready** for:
- ✅ Local testing
- ✅ Git upload
- ✅ Vercel deployment

---

## 🚀 Step-by-Step in VS Code

### Step 1: Open Project in VS Code

1. **Open VS Code**
2. **File → Open Folder**
3. **Select**: `C:\Users\Admin\Desktop\Hackathon_gitgrade`
4. ✅ Project opens with all files visible

### Step 2: Open Terminal in VS Code

**Method 1**: Press `` Ctrl + ` `` (backtick key)
**Method 2**: Terminal → New Terminal
**Method 3**: View → Terminal

✅ Terminal opens at bottom of VS Code

### Step 3: Install Dependencies

In the VS Code terminal, type:
```bash
npm install
```

**What happens:**
- Downloads all packages
- Creates `node_modules` folder
- Takes 2-3 minutes

**✅ Success looks like:**
```
added 500 packages in 2m
```

### Step 4: Create Environment File

**In VS Code:**

1. **Right-click** in the file explorer (left sidebar)
2. **New File**
3. **Name it exactly**: `.env.local`
4. **Paste this content**:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   GITHUB_TOKEN=your_github_token_here
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```
   
   **⚠️ Replace with your actual API keys from secure storage!**
5. **Save**: `Ctrl + S`

**⚠️ Important**: The file should appear in VS Code but might be grayed out (that's normal - it's gitignored)

### Step 5: Start the Development Server

In VS Code terminal, type:
```bash
npm run dev
```

**✅ Success looks like:**
```
▲ Next.js 14.0.0
- Local:        http://localhost:3000
✓ Ready in 2.5s
```

### Step 6: Open in Browser

1. **Click the link** in terminal: `http://localhost:3000`
2. **Or** manually open: http://localhost:3000
3. ✅ GitGrade homepage should load!

---

## ✅ How to Check If It's Working

### Check 1: Terminal Shows Success
```
✓ Ready in X.Xs
○ Local: http://localhost:3000
```
✅ **Working!**

### Check 2: Browser Opens
- Page loads with GitGrade UI
- Glowing buttons visible
- No blank page
✅ **Working!**

### Check 3: Test Analysis
1. In browser, enter: `https://github.com/vercel/next.js`
2. Click "Analyze Repository"
3. See loading spinner
4. Results appear after 5-15 seconds
✅ **Working!**

### Check 4: VS Code Terminal
- No red error messages
- Server still running
✅ **Working!**

### Check 5: Browser Console (Optional)
1. Press `F12` in browser
2. Click "Console" tab
3. Should see no red errors
✅ **Working!**

---

## 📤 How to Upload to Git

### Step 1: Initialize Git (if not done)

In VS Code terminal:
```bash
git init
```

### Step 2: Check What Will Be Uploaded

**Important**: Verify `.env.local` is NOT included!

In VS Code terminal:
```bash
git status
```

**✅ Good output:**
```
Untracked files:
  app/
  components/
  lib/
  package.json
  ...
```

**❌ Bad output (if you see `.env.local`):**
- Don't worry, it's gitignored, but double-check `.gitignore` includes it

### Step 3: Add Files

```bash
git add .
```

### Step 4: Commit

```bash
git commit -m "Initial commit - GitGrade project"
```

### Step 5: Create GitHub Repository

1. Go to: https://github.com/new
2. Create new repository
3. **Don't** initialize with README (you already have one)
4. Copy the repository URL

### Step 6: Connect and Push

In VS Code terminal:
```bash
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/yourusername/gitgrade.git
git push -u origin main
```

✅ **Code uploaded to GitHub!**

---

## 🚀 How to Deploy to Vercel

### Method 1: From VS Code (Easiest)

1. **Install Vercel Extension**:
   - Press `Ctrl + Shift + X` (Extensions)
   - Search: "Vercel"
   - Install "Vercel" by Vercel

2. **Deploy**:
   - Press `Ctrl + Shift + P`
   - Type: "Vercel: Deploy"
   - Select your project
   - Follow prompts

3. **Add Environment Variables**:
   - In Vercel dashboard
   - Project Settings → Environment Variables
   - Add all 4 variables from `.env.local`

### Method 2: From Vercel Website

1. **Go to**: https://vercel.com
2. **Sign in** with GitHub
3. **Import Project** → Select your repository
4. **Add Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GITHUB_TOKEN`
   - `OPENROUTER_API_KEY`
5. **Deploy** → Wait 2-3 minutes
6. ✅ **Live!**

---

## 🐛 Troubleshooting in VS Code

### Problem: Terminal shows errors
**Solution**: 
- Check Node.js is installed: `node --version`
- Should show v18 or higher
- If not, install from: https://nodejs.org/

### Problem: "npm: command not found"
**Solution**:
- Node.js not installed or not in PATH
- Reinstall Node.js
- Restart VS Code

### Problem: Port 3000 already in use
**Solution**:
```bash
# Stop current server (Ctrl + C)
# Use different port
npm run dev -- -p 3001
```

### Problem: Can't see `.env.local` in VS Code
**Solution**:
- It's hidden by default (gitignored)
- Press `Ctrl + Shift + P`
- Type: "Files: Toggle Excluded Files"
- Or manually open: File → Open File → `.env.local`

### Problem: "Module not found"
**Solution**:
```bash
# In VS Code terminal
rm -rf node_modules
npm install
```

### Problem: Changes not showing in browser
**Solution**:
- Save file: `Ctrl + S`
- Browser auto-refreshes (Hot Reload)
- If not, refresh manually: `F5`

---

## 📋 Quick VS Code Commands

| Action | Shortcut |
|--------|----------|
| Open Terminal | `` Ctrl + ` `` |
| Save File | `Ctrl + S` |
| Open Command Palette | `Ctrl + Shift + P` |
| Open File | `Ctrl + P` |
| Format Document | `Shift + Alt + F` |
| Find in Files | `Ctrl + Shift + F` |

---

## ✅ Complete Checklist

### Setup:
- [ ] VS Code installed
- [ ] Project folder opened in VS Code
- [ ] Terminal opened (`Ctrl + ``)
- [ ] `npm install` completed
- [ ] `.env.local` file created
- [ ] `npm run dev` started
- [ ] Browser opened to http://localhost:3000

### Testing:
- [ ] Page loads correctly
- [ ] Can enter GitHub URL
- [ ] Analysis works
- [ ] Results display
- [ ] No errors in terminal
- [ ] No errors in browser console

### Git Upload:
- [ ] `git init` done
- [ ] `git add .` done
- [ ] `git commit` done
- [ ] GitHub repo created
- [ ] `git remote add origin` done
- [ ] `git push` done
- [ ] Code visible on GitHub

### Deployment:
- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Live site works

---

## 🎯 You're All Set!

**Current Status:**
- ✅ Code is ready
- ✅ Structure is correct
- ✅ All files in place
- ✅ Ready for testing
- ✅ Ready for Git upload
- ✅ Ready for deployment

**Next Steps:**
1. Open in VS Code
2. Run `npm install`
3. Create `.env.local`
4. Run `npm run dev`
5. Test it!
6. Upload to Git
7. Deploy to Vercel

---

**Need help?** Check the terminal output and browser console for specific error messages!

