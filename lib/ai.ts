import axios from 'axios'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

export async function generateSummaryAndRoadmap(
  repoData: any,
  analysisDetails: any,
  score: number
): Promise<{ summary: string; roadmap: string[] }> {
  if (!OPENROUTER_API_KEY) {
    // Fallback to basic summary if no API key
    return generateBasicSummaryAndRoadmap(repoData, analysisDetails, score)
  }

  try {
    const prompt = `You are an expert code reviewer and mentor. Analyze this GitHub repository and provide:

Repository Info:
- Name: ${repoData.fullName}
- Description: ${repoData.description || 'No description'}
- Language: ${repoData.language}
- Stars: ${repoData.stars}
- Has README: ${repoData.hasReadme}
- Has Tests: ${repoData.hasTests}
- Commit Count: ${repoData.commitCount}
- Branches: ${repoData.branches.length}
- Has PRs: ${repoData.hasPRs}
- Has CI/CD: ${repoData.hasCI}

Analysis Scores:
- Code Quality: ${analysisDetails.codeQuality}/100
- Documentation: ${analysisDetails.documentation}/100
- Git Practices: ${analysisDetails.gitPractices}/100
- Structure: ${analysisDetails.structure}/100
- Tests: ${analysisDetails.tests}/100
- Real-World Relevance: ${analysisDetails.realWorldRelevance}/100
- Overall Score: ${score}/100

Provide:
1. A concise summary (2-3 sentences) highlighting strengths and weaknesses
2. A personalized roadmap with 5-7 actionable improvement steps

Format your response as JSON:
{
  "summary": "Your summary here",
  "roadmap": ["Step 1", "Step 2", "Step 3", ...]
}`

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert code reviewer. Provide honest, actionable feedback in JSON format.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://gitgrade.vercel.app',
          'X-Title': 'GitGrade',
        },
      }
    )

    const content = response.data.choices[0]?.message?.content || ''
    
    // Try to parse JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      return {
        summary: parsed.summary || generateBasicSummary(repoData, analysisDetails, score),
        roadmap: Array.isArray(parsed.roadmap) ? parsed.roadmap : generateBasicRoadmap(analysisDetails),
      }
    }

    // Fallback if JSON parsing fails
    return generateBasicSummaryAndRoadmap(repoData, analysisDetails, score)
  } catch (error: any) {
    console.error('AI generation error:', error.message)
    return generateBasicSummaryAndRoadmap(repoData, analysisDetails, score)
  }
}

function generateBasicSummaryAndRoadmap(
  repoData: any,
  analysisDetails: any,
  score: number
): { summary: string; roadmap: string[] } {
  return {
    summary: generateBasicSummary(repoData, analysisDetails, score),
    roadmap: generateBasicRoadmap(analysisDetails),
  }
}

function generateBasicSummary(repoData: any, analysisDetails: any, score: number): string {
  const strengths: string[] = []
  const weaknesses: string[] = []

  if (analysisDetails.codeQuality >= 70) strengths.push('strong code quality')
  else if (analysisDetails.codeQuality < 50) weaknesses.push('code quality needs improvement')

  if (analysisDetails.documentation >= 70) strengths.push('good documentation')
  else if (analysisDetails.documentation < 50) weaknesses.push('documentation is lacking')

  if (analysisDetails.structure >= 70) strengths.push('well-organized structure')
  else if (analysisDetails.structure < 50) weaknesses.push('project structure needs work')

  if (analysisDetails.tests >= 50) strengths.push('test coverage present')
  else weaknesses.push('missing test coverage')

  if (analysisDetails.gitPractices >= 60) strengths.push('good Git practices')
  else if (analysisDetails.gitPractices < 40) weaknesses.push('Git practices need improvement')

  let summary = ''
  if (strengths.length > 0) {
    summary += `The repository shows ${strengths.join(', ')}. `
  }
  if (weaknesses.length > 0) {
    summary += `However, ${weaknesses.join(', ')}. `
  }
  if (summary === '') {
    summary = 'This is a basic repository that needs development across multiple areas.'
  }

  return summary
}

function generateBasicRoadmap(analysisDetails: any): string[] {
  const roadmap: string[] = []

  if (analysisDetails.documentation < 70) {
    roadmap.push('Add a comprehensive README.md with project overview, setup instructions, and usage examples')
  }

  if (analysisDetails.structure < 60) {
    roadmap.push('Improve folder structure by organizing code into logical directories (src, components, utils, etc.)')
  }

  if (analysisDetails.tests < 50) {
    roadmap.push('Add unit tests and integration tests to improve code reliability')
  }

  if (analysisDetails.gitPractices < 60) {
    roadmap.push('Follow Git best practices: use meaningful commit messages, create branches for features, and use pull requests')
  }

  if (analysisDetails.codeQuality < 60) {
    roadmap.push('Refactor code for better readability and maintainability')
  }

  if (!roadmap.includes('Add CI/CD pipeline using GitHub Actions for automated testing and deployment')) {
    roadmap.push('Add CI/CD pipeline using GitHub Actions for automated testing and deployment')
  }

  if (analysisDetails.realWorldRelevance < 60) {
    roadmap.push('Enhance project with real-world features and better user documentation')
  }

  // Ensure at least 5 items
  while (roadmap.length < 5) {
    roadmap.push('Continue improving code quality and following best practices')
  }

  return roadmap.slice(0, 7)
}

