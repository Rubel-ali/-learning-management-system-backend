'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <span className="font-bold text-white">LH</span>
          </div>
          <span className="hidden md:inline font-bold text-xl text-white">LearnHub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-slate-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/courses" className="text-slate-300 hover:text-white transition-colors">
            Courses
          </Link>
          <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
            About
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="px-6 py-2 text-white hover:text-cyan-400 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 p-4 space-y-4">
          <Link href="/" className="block text-slate-300 hover:text-white transition-colors py-2">
            Home
          </Link>
          <Link href="/courses" className="block text-slate-300 hover:text-white transition-colors py-2">
            Courses
          </Link>
          <Link href="/dashboard" className="block text-slate-300 hover:text-white transition-colors py-2">
            Dashboard
          </Link>
          <Link href="/about" className="block text-slate-300 hover:text-white transition-colors py-2">
            About
          </Link>
          <div className="flex gap-4 pt-4 border-t border-slate-800">
            <Link href="/login" className="flex-1 text-center px-4 py-2 text-white hover:text-cyan-400">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg text-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
