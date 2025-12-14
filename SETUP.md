# Quick Setup Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn

## Installation Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create environment file**
   
   Create a `.env.local` file in the root directory with:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   GITHUB_TOKEN=your_github_token_here
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```
   
   **⚠️ SECURITY**: The `.env.local` file is gitignored and will NOT be committed to your repository.

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Testing

Try analyzing these sample repositories:
- `https://github.com/vercel/next.js`
- `https://github.com/facebook/react`
- Any public GitHub repository

## Build for Production

```bash
npm run build
npm start
```

## Troubleshooting

**Port 3000 already in use:**
```bash
# Use a different port
PORT=3001 npm run dev
```

**Module not found errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

**Environment variables not working:**
- Make sure `.env.local` is in the root directory
- Restart the dev server after changing env variables
- Variables starting with `NEXT_PUBLIC_` are exposed to the browser

