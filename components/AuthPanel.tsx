'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { motion } from 'framer-motion'
import { LogIn, LogOut, UserPlus } from 'lucide-react'

type Mode = 'login' | 'register'

interface AuthError {
  message: string
}

export default function AuthPanel() {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AuthError | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    if (!supabase) return

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null)
    })

    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleAuth = async () => {
    if (!supabase) {
      setError({ message: 'Supabase is not configured. Please check your environment variables.' })
      return
    }

    setLoading(true)
    setError(null)

    try {
      if (!email || !password) {
        throw new Error('Please provide email and password')
      }

      if (mode === 'register') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        // Immediately reflect created account in the UI
        setUserEmail(data.user?.email ?? email)
        setEmail('')
        setPassword('')
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        // Immediately show logged-in state after successful login
        setUserEmail(data.user?.email ?? email)
        setEmail('')
        setPassword('')
      }
    } catch (err: any) {
      setError({ message: err.message || 'Authentication failed' })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    if (!supabase) return
    setLoading(true)
    setError(null)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (err: any) {
      setError({ message: err.message || 'Failed to log out' })
    } finally {
      setLoading(false)
    }
  }

  if (userEmail) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto mb-8"
      >
        <div className="bg-slate-800/60 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-slate-700/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">Signed in as</p>
            <p className="text-base md:text-lg font-semibold text-white break-all">{userEmail}</p>
          </div>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-600 text-slate-100 text-sm font-medium hover:border-red-400 hover:text-red-200 hover:bg-red-900/40 transition-colors disabled:opacity-60"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-400 bg-red-900/20 border border-red-500/40 rounded-lg px-3 py-2">
            {error.message}
          </p>
        )}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto mb-8"
    >
      <div className="bg-slate-800/60 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/60">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-white flex items-center gap-2">
            {mode === 'login' ? <LogIn className="w-5 h-5 text-blue-400" /> : <UserPlus className="w-5 h-5 text-emerald-400" />}
            {mode === 'login' ? 'Log in to save your progress' : 'Create an account'}
          </h2>
          <div className="inline-flex items-center rounded-full bg-slate-900/60 p-1 border border-slate-600/70">
            <button
              onClick={() => setMode('login')}
              className={`px-3 py-1.5 text-xs md:text-sm rounded-full transition-colors ${
                mode === 'login'
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Log in
            </button>
            <button
              onClick={() => setMode('register')}
              className={`px-3 py-1.5 text-xs md:text-sm rounded-full transition-colors ${
                mode === 'register'
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl bg-slate-900/70 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl bg-slate-900/70 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3">
            <p className="text-xs md:text-sm text-slate-300">
              {mode === 'login'
                ? 'Log in to keep track of your analyses and improvements across sessions.'
                : 'Register to start saving your GitGrade analysis history and personalized roadmaps.'}
            </p>
            <div className="space-y-2">
              {error && (
                <p className="text-xs text-red-400 bg-red-900/20 border border-red-500/40 rounded-lg px-3 py-2">
                  {error.message}
                </p>
              )}
              <button
                onClick={handleAuth}
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:from-blue-500 hover:to-purple-500 transition-all disabled:opacity-60"
              >
                {loading ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Create account'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}


