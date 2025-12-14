import { NextRequest, NextResponse } from 'next/server'
import { fetchRepositoryData } from '@/lib/github'
import { analyzeRepository, calculateScore, getLevel } from '@/lib/analyzer'
import { generateSummaryAndRoadmap } from '@/lib/ai'

export async function POST(request: NextRequest) {
  try {
    const { repoUrl } = await request.json()

    if (!repoUrl) {
      return NextResponse.json(
        { error: 'Repository URL is required' },
        { status: 400 }
      )
    }

    // Validate GitHub URL
    const githubRegex = /^https?:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+/
    if (!githubRegex.test(repoUrl)) {
      return NextResponse.json(
        { error: 'Invalid GitHub repository URL' },
        { status: 400 }
      )
    }

    // Fetch repository data
    const repoData = await fetchRepositoryData(repoUrl)

    // Analyze repository
    const analysisDetails = analyzeRepository(repoData)
    const score = calculateScore(analysisDetails)
    const level = getLevel(score)

    // Generate AI summary and roadmap
    const { summary, roadmap } = await generateSummaryAndRoadmap(
      repoData,
      analysisDetails,
      score
    )

    return NextResponse.json({
      score,
      level,
      summary,
      roadmap,
      details: analysisDetails,
      repoInfo: {
        name: repoData.fullName,
        description: repoData.description,
        language: repoData.language,
        stars: repoData.stars,
      },
    })
  } catch (error: any) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to analyze repository' },
      { status: 500 }
    )
  }
}

