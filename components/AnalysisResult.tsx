'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, AlertTriangle, TrendingUp, FileText, Code, GitBranch, Star, Download } from 'lucide-react'
import jsPDF from 'jspdf'

interface AnalysisResultProps {
  result: {
    score: number
    level: string
    summary: string
    roadmap: string[]
    details: {
      codeQuality: number
      documentation: number
      gitPractices: number
      structure: number
      tests: number
      realWorldRelevance: number
    }
  }
}

export default function AnalysisResult({ result }: AnalysisResultProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getLevelBadge = (level: string) => {
    const colors: Record<string, string> = {
      'Advanced': 'bg-green-500/20 text-green-400 border-green-500/50',
      'Intermediate': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      'Beginner': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    }
    return colors[level] || colors['Beginner']
  }

  const handleDownloadPdf = () => {
    const doc = new jsPDF()
    const lineHeight = 7
    const margin = 14
    const pageHeight = doc.internal.pageSize.getHeight()

    let cursorY = margin

    const addLine = (text: string, options: { bold?: boolean } = {}) => {
      const lines = doc.splitTextToSize(text, doc.internal.pageSize.getWidth() - margin * 2)
      lines.forEach((line: string) => {
        if (cursorY + lineHeight > pageHeight - margin) {
          doc.addPage()
          cursorY = margin
        }
        if (options.bold) {
          doc.setFont(undefined, 'bold')
        } else {
          doc.setFont(undefined, 'normal')
        }
        doc.text(line, margin, cursorY)
        cursorY += lineHeight
      })
      cursorY += 2
    }

    doc.setFontSize(18)
    doc.setFont(undefined, 'bold')
    doc.text('GitGrade Repository Report', margin, cursorY)
    cursorY += lineHeight + 4

    doc.setFontSize(12)
    addLine(`Overall Score: ${result.score} / 100`, { bold: true })
    addLine(`Level: ${result.level}`, { bold: true })

    cursorY += 2
    doc.setFontSize(14)
    doc.setFont(undefined, 'bold')
    doc.text('Summary', margin, cursorY)
    cursorY += lineHeight
    doc.setFontSize(11)
    addLine(result.summary)

    cursorY += 2
    doc.setFontSize(14)
    doc.setFont(undefined, 'bold')
    doc.text('Detailed Metrics', margin, cursorY)
    cursorY += lineHeight
    doc.setFontSize(11)

    const metrics: { label: string; key: keyof AnalysisResultProps['result']['details'] }[] = [
      { key: 'codeQuality', label: 'Code Quality' },
      { key: 'documentation', label: 'Documentation' },
      { key: 'gitPractices', label: 'Git Practices' },
      { key: 'structure', label: 'Structure' },
      { key: 'tests', label: 'Tests' },
      { key: 'realWorldRelevance', label: 'Real-World Relevance' },
    ]

    metrics.forEach((metric) => {
      const score = result.details[metric.key]
      addLine(`${metric.label}: ${score}%`)
    })

    cursorY += 2
    doc.setFontSize(14)
    doc.setFont(undefined, 'bold')
    doc.text('Personalized Roadmap', margin, cursorY)
    cursorY += lineHeight
    doc.setFontSize(11)

    result.roadmap.forEach((item, idx) => {
      addLine(`${idx + 1}. ${item}`)
    })

    doc.save('gitgrade-report.pdf')
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Score Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 glow-border"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">Repository Score</h2>
            <div className="flex items-center gap-4">
              <div className={`text-6xl font-bold ${getScoreColor(result.score)}`}>
                {result.score}
              </div>
              <div className="text-4xl text-slate-500">/ 100</div>
            </div>
          </div>
          <div className="flex flex-col items-stretch gap-3 md:items-end">
            <div className={`px-6 py-3 rounded-xl border ${getLevelBadge(result.level)}`}>
              <span className="text-xl font-semibold">{result.level}</span>
            </div>
            <button
              onClick={handleDownloadPdf}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-600 text-xs md:text-sm font-medium text-slate-100 hover:bg-slate-800 hover:border-blue-400 hover:text-blue-100 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF report
            </button>
          </div>
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50"
      >
        <div className="flex items-start gap-3 mb-4">
          <FileText className="w-6 h-6 text-blue-400 mt-1" />
          <h2 className="text-2xl font-bold text-white">Summary</h2>
        </div>
        <p className="text-slate-300 text-lg leading-relaxed">{result.summary}</p>
      </motion.div>

      {/* Detailed Metrics */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Detailed Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { key: 'codeQuality', label: 'Code Quality', icon: Code },
            { key: 'documentation', label: 'Documentation', icon: FileText },
            { key: 'gitPractices', label: 'Git Practices', icon: GitBranch },
            { key: 'structure', label: 'Structure', icon: Star },
            { key: 'tests', label: 'Tests', icon: CheckCircle2 },
            { key: 'realWorldRelevance', label: 'Real-World Relevance', icon: TrendingUp },
          ].map((metric) => {
            const score = result.details[metric.key as keyof typeof result.details]
            return (
              <div key={metric.key} className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/30">
                <div className="flex items-center gap-3 mb-3">
                  <metric.icon className="w-5 h-5 text-blue-400" />
                  <h3 className="font-semibold text-white">{metric.label}</h3>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 bg-slate-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        score >= 70 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <span className={`text-sm font-semibold ${getScoreColor(score)}`}>{score}%</span>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Roadmap */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50"
      >
        <div className="flex items-start gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-purple-400 mt-1" />
          <h2 className="text-2xl font-bold text-white">Personalized Roadmap</h2>
        </div>
        <div className="space-y-4">
          {result.roadmap.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              className="flex items-start gap-4 bg-slate-900/50 rounded-xl p-5 border border-slate-700/30 hover:border-purple-500/50 transition-all"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center">
                <span className="text-purple-400 font-semibold">{idx + 1}</span>
              </div>
              <p className="text-slate-300 flex-1 leading-relaxed">{item}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

