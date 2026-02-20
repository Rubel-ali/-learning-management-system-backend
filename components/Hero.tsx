import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section className="pt-40 pb-20 px-4 relative overflow-hidden">
      {/* Gradient Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-6 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700">
            <span className="text-cyan-400 text-sm font-semibold">✨ Welcome to LearnHub</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Learn <span className="gradient-text">Everything</span> <br />
            You Need to Grow
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Master in-demand skills from world-class instructors. Learn at your own pace with lifetime access to courses.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            >
              Explore Courses
              <ArrowRight size={20} />
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800/50 text-white font-semibold rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors"
            >
              <Play size={20} />
              Watch Demo
            </Link>
          </div>
        </div>

        {/* Feature Preview Cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-20">
          <div className="glass rounded-xl p-6 border border-slate-700/50 hover:border-slate-600 transition-colors">
            <div className="text-3xl font-bold text-cyan-400 mb-2">1000+</div>
            <p className="text-slate-400">Hours of Content</p>
          </div>
          <div className="glass rounded-xl p-6 border border-slate-700/50 hover:border-slate-600 transition-colors">
            <div className="text-3xl font-bold text-blue-400 mb-2">Expert</div>
            <p className="text-slate-400">Industry Instructors</p>
          </div>
          <div className="glass rounded-xl p-6 border border-slate-700/50 hover:border-slate-600 transition-colors">
            <div className="text-3xl font-bold text-cyan-400 mb-2">Lifetime</div>
            <p className="text-slate-400">Access to Courses</p>
          </div>
        </div>
      </div>
    </section>
  )
}
