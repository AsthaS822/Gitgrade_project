import axios from 'axios'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN

export interface GitHubRepoData {
  name: string
  fullName: string
  description: string
  language: string
  languages: Record<string, number>
  stars: number
  forks: number
  openIssues: number
  hasReadme: boolean
  readmeContent: string
  fileCount: number
  folderStructure: string[]
  hasTests: boolean
  testFiles: string[]
  commitCount: number
  recentCommits: any[]
  branches: string[]
  hasPRs: boolean
  prCount: number
  hasCI: boolean
  contributors: number
  createdAt: string
  updatedAt: string
}

export async function fetchRepositoryData(repoUrl: string): Promise<GitHubRepoData> {
  const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/)
  if (!match) {
    throw new Error('Invalid GitHub repository URL')
  }

  const [, owner, repo] = match
  const baseURL = 'https://api.github.com'

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  }

  if (GITHUB_TOKEN) {
    headers.Authorization = `token ${GITHUB_TOKEN}`
  }

  try {
    // Fetch basic repo info
    const repoResponse = await axios.get(`${baseURL}/repos/${owner}/${repo}`, { headers })
    const repoData = repoResponse.data

    // Fetch languages
    const languagesResponse = await axios.get(`${baseURL}/repos/${owner}/${repo}/languages`, { headers })
    const languages = languagesResponse.data

    // Fetch README
    let readmeContent = ''
    let hasReadme = false
    try {
      const readmeResponse = await axios.get(`${baseURL}/repos/${owner}/${repo}/readme`, { headers })
      readmeContent = Buffer.from(readmeResponse.data.content, 'base64').toString('utf-8')
      hasReadme = true
    } catch (e) {
      // README not found
    }

    // Fetch file tree (using contents API)
    let fileCount = 0
    let folderStructure: string[] = []
    let hasTests = false
    let testFiles: string[] = []
    
    try {
      const contentsResponse = await axios.get(`${baseURL}/repos/${owner}/${repo}/git/trees/${repoData.default_branch}?recursive=1`, { headers })
      const tree = contentsResponse.data.tree || []
      fileCount = tree.filter((item: any) => item.type === 'blob').length
      folderStructure = [...new Set(tree.map((item: any) => item.path.split('/')[0]))].filter(Boolean)
      
      testFiles = tree
        .filter((item: any) => 
          item.type === 'blob' && (
            item.path.includes('test') || 
            item.path.includes('spec') ||
            item.path.endsWith('.test.js') ||
            item.path.endsWith('.test.ts') ||
            item.path.endsWith('.spec.js') ||
            item.path.endsWith('.spec.ts')
          )
        )
        .map((item: any) => item.path)
      hasTests = testFiles.length > 0
    } catch (e) {
      // Tree fetch failed, use basic structure
    }

    // Fetch commits
    let commitCount = 0
    let commits: any[] = []
    try {
      const commitsResponse = await axios.get(`${baseURL}/repos/${owner}/${repo}/commits?per_page=30`, { headers })
      commits = commitsResponse.data
      commitCount = commits.length
      // Try to get total count from headers if available
      const linkHeader = commitsResponse.headers['link']
      if (linkHeader) {
        const match = linkHeader.match(/page=(\d+)>; rel="last"/)
        if (match) {
          commitCount = parseInt(match[1]) * 30 // Approximate
        }
      }
    } catch (e) {
      // Commits fetch failed
      commitCount = 0
    }

    // Fetch branches
    const branchesResponse = await axios.get(`${baseURL}/repos/${owner}/${repo}/branches`, { headers })
    const branches = branchesResponse.data.map((b: any) => b.name)

    // Fetch PRs
    let prCount = 0
    let hasPRs = false
    try {
      const prsResponse = await axios.get(`${baseURL}/repos/${owner}/${repo}/pulls?state=all&per_page=1`, { headers })
      prCount = parseInt(prsResponse.headers['link']?.match(/page=(\d+)>; rel="last"/)?.[1] || '0') || prsResponse.data.length
      hasPRs = prCount > 0
    } catch (e) {
      // PRs fetch failed
    }

    // Check for CI/CD
    let hasCI = false
    try {
      const workflowsResponse = await axios.get(`${baseURL}/repos/${owner}/${repo}/actions/workflows`, { headers })
      hasCI = workflowsResponse.data.total_count > 0
    } catch (e) {
      // Workflows check failed
    }

    // Fetch contributors count
    let contributors = 0
    try {
      const contributorsResponse = await axios.get(`${baseURL}/repos/${owner}/${repo}/contributors?per_page=1`, { headers })
      contributors = parseInt(contributorsResponse.headers['link']?.match(/page=(\d+)>; rel="last"/)?.[1] || '1') || contributorsResponse.data.length
    } catch (e) {
      contributors = 1
    }

    return {
      name: repoData.name,
      fullName: repoData.full_name,
      description: repoData.description || '',
      language: repoData.language || 'Unknown',
      languages,
      stars: repoData.stargazers_count || 0,
      forks: repoData.forks_count || 0,
      openIssues: repoData.open_issues_count || 0,
      hasReadme,
      readmeContent,
      fileCount,
      folderStructure,
      hasTests,
      testFiles,
      commitCount,
      recentCommits: commits.slice(0, 10),
      branches,
      hasPRs,
      prCount,
      hasCI,
      contributors,
      createdAt: repoData.created_at,
      updatedAt: repoData.updated_at,
    }
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error('Repository not found. Make sure it exists and is public.')
    }
    if (error.response?.status === 403) {
      throw new Error('Rate limit exceeded. Please try again later.')
    }
    throw new Error(`Failed to fetch repository: ${error.message}`)
  }
}

