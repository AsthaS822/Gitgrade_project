import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GitGrade - AI-Powered Repository Analysis',
  description: 'Evaluate your GitHub repository and get personalized feedback with actionable roadmaps',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

