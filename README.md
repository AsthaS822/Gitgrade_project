# GitGrade - AI-Powered Repository Analysis

A modern web application that evaluates GitHub repositories and provides comprehensive feedback with personalized improvement roadmaps.

## 🚀 Features

- **Comprehensive Analysis**: Evaluates repositories across 6 key dimensions:
  - Code Quality & Readability
  - Documentation & Clarity
  - Git Practices & Version Control
  - Project Structure & Organization
  - Test Coverage & Maintainability
  - Real-World Relevance & Usefulness

- **AI-Powered Insights**: Uses OpenRouter API to generate personalized summaries and actionable roadmaps

- **Beautiful UI**: Modern, responsive design with glowing effects and smooth animations

- **Real-Time Analysis**: Fast and accurate repository evaluation using GitHub API

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **APIs**: GitHub API, OpenRouter API


**VIDEO**:**  https://drive.google.com/file/d/1Lxb-klT5kKsEH3Ke2qytfuQdxBYOCYCA/view?usp=sharing**

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- GitHub Personal Access Token
- OpenRouter API Key (optional, falls back to basic analysis)
- Supabase credentials (optional, for future enhancements)

## 🔧 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Hackathon_gitgrade
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   GITHUB_TOKEN=your_github_token_here
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```
   
   **⚠️ IMPORTANT**: Never commit `.env.local` to Git! It's already in `.gitignore`.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment to Vercel

1. **Push your code to GitHub**

2. **Import project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Add Environment Variables**
   In Vercel project settings, add all environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GITHUB_TOKEN`
   - `OPENROUTER_API_KEY`

4. **Deploy**
   Click "Deploy" and wait for the build to complete

## 📊 How It Works

1. **Input**: User provides a GitHub repository URL
2. **Data Fetching**: System fetches repository metadata using GitHub API:
   - Repository information
   - File structure
   - Commit history
   - Branch information
   - Pull requests
   - CI/CD configuration
   - README content
3. **Analysis**: Multi-dimensional analysis evaluates:
   - Code quality indicators
   - Documentation presence and quality
   - Git practices (commits, branches, PRs)
   - Project structure
   - Test coverage
   - Real-world relevance
4. **AI Enhancement**: OpenRouter API generates:
   - Personalized summary
   - Actionable improvement roadmap
5. **Output**: Comprehensive report with:
   - Overall score (0-100)
   - Level classification (Beginner/Intermediate/Advanced)
   - Detailed metrics breakdown
   - Written summary
   - Personalized roadmap

## 🎨 UI Features

- **Glowing Button Effects**: Animated borders and hover effects
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Works on all device sizes
- **Dark Theme**: Modern dark UI with gradient accents
- **Real-time Feedback**: Loading states and error handling

## 📝 API Endpoints

### POST `/api/analyze`

Analyzes a GitHub repository.

**Request Body:**
```json
{
  "repoUrl": "https://github.com/username/repository"
}
```

**Response:**
```json
{
  "score": 78,
  "level": "Intermediate",
  "summary": "Strong code consistency and folder structure; needs more tests and documentation.",
  "roadmap": [
    "Add unit tests",
    "Improve README with project instructions",
    "Introduce CI/CD using GitHub Actions"
  ],
  "details": {
    "codeQuality": 75,
    "documentation": 60,
    "gitPractices": 70,
    "structure": 80,
    "tests": 40,
    "realWorldRelevance": 65
  }
}
```

## 🔒 Security Notes

- GitHub token is stored server-side only
- API keys are never exposed to the client
- All API calls are made from the server

## 🤝 Contributing

This is a hackathon project. Feel free to fork and improve!

## 📄 License

MIT License

## 👨‍💻 Author

Built for Hackathon - AI + Code Analysis + Developer Profiling

---

**Note**: Make sure your GitHub token has appropriate permissions to access public repositories. The OpenRouter API key is optional - the system will fall back to basic analysis if not provided.

