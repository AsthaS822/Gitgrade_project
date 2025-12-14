import { GitHubRepoData } from './github'

export interface AnalysisDetails {
  codeQuality: number
  documentation: number
  gitPractices: number
  structure: number
  tests: number
  realWorldRelevance: number
}

export interface AnalysisResult {
  score: number
  level: string
  summary: string
  roadmap: string[]
  details: AnalysisDetails
}

export function analyzeRepository(data: GitHubRepoData): AnalysisDetails {
  let codeQuality = 0
  let documentation = 0
  let gitPractices = 0
  let structure = 0
  let tests = 0
  let realWorldRelevance = 0

  // Code Quality (0-100)
  // Based on: language usage, file organization, code complexity indicators
  if (data.language) codeQuality += 20
  if (data.fileCount > 10) codeQuality += 20
  if (data.fileCount > 50) codeQuality += 10
  if (data.languages && Object.keys(data.languages).length > 0) codeQuality += 15
  if (data.folderStructure.length > 2) codeQuality += 15
  if (data.folderStructure.length > 5) codeQuality += 10
  if (data.stars > 0) codeQuality += 5
  if (data.stars > 10) codeQuality += 5
  codeQuality = Math.min(100, codeQuality)

  // Documentation (0-100)
  if (data.hasReadme) documentation += 40
  if (data.readmeContent) {
    const readmeLength = data.readmeContent.length
    if (readmeLength > 500) documentation += 20
    if (readmeLength > 1000) documentation += 15
    if (data.readmeContent.includes('##')) documentation += 10 // Has sections
    if (data.readmeContent.includes('```')) documentation += 10 // Has code examples
    if (data.readmeContent.toLowerCase().includes('install')) documentation += 5
  }
  if (data.description && data.description.length > 20) documentation += 10
  documentation = Math.min(100, documentation)

  // Git Practices (0-100)
  if (data.commitCount > 5) gitPractices += 20
  if (data.commitCount > 20) gitPractices += 20
  if (data.commitCount > 50) gitPractices += 10
  if (data.branches.length > 1) gitPractices += 15
  if (data.hasPRs) gitPractices += 20
  if (data.prCount > 0) gitPractices += 10
  if (data.hasCI) gitPractices += 15
  gitPractices = Math.min(100, gitPractices)

  // Structure (0-100)
  if (data.folderStructure.length > 0) structure += 20
  if (data.folderStructure.length > 3) structure += 20
  if (data.folderStructure.length > 5) structure += 15
  if (data.fileCount > 5) structure += 15
  if (data.fileCount > 20) structure += 15
  if (data.fileCount > 50) structure += 10
  // Check for common good structure patterns
  const hasSrc = data.folderStructure.some(f => f.toLowerCase().includes('src'))
  const hasComponents = data.folderStructure.some(f => f.toLowerCase().includes('component'))
  const hasUtils = data.folderStructure.some(f => f.toLowerCase().includes('util') || f.toLowerCase().includes('lib'))
  if (hasSrc) structure += 5
  if (hasComponents) structure += 5
  if (hasUtils) structure += 5
  structure = Math.min(100, structure)

  // Tests (0-100)
  if (data.hasTests) tests += 50
  if (data.testFiles.length > 0) tests += 20
  if (data.testFiles.length > 3) tests += 15
  if (data.testFiles.length > 10) tests += 15
  tests = Math.min(100, tests)

  // Real-World Relevance (0-100)
  if (data.description && data.description.length > 10) realWorldRelevance += 15
  if (data.stars > 0) realWorldRelevance += 20
  if (data.stars > 10) realWorldRelevance += 15
  if (data.forks > 0) realWorldRelevance += 15
  if (data.contributors > 1) realWorldRelevance += 15
  if (data.openIssues > 0) realWorldRelevance += 10
  if (data.hasReadme && data.readmeContent.length > 500) realWorldRelevance += 10
  realWorldRelevance = Math.min(100, realWorldRelevance)

  return {
    codeQuality,
    documentation,
    gitPractices,
    structure,
    tests,
    realWorldRelevance,
  }
}

export function calculateScore(details: AnalysisDetails): number {
  const weights = {
    codeQuality: 0.25,
    documentation: 0.20,
    gitPractices: 0.15,
    structure: 0.15,
    tests: 0.15,
    realWorldRelevance: 0.10,
  }

  const score = Math.round(
    details.codeQuality * weights.codeQuality +
    details.documentation * weights.documentation +
    details.gitPractices * weights.gitPractices +
    details.structure * weights.structure +
    details.tests * weights.tests +
    details.realWorldRelevance * weights.realWorldRelevance
  )

  return Math.min(100, Math.max(0, score))
}

export function getLevel(score: number): string {
  if (score >= 80) return 'Advanced'
  if (score >= 60) return 'Intermediate'
  return 'Beginner'
}

