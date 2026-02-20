import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-slate-900 via-blue-900/30 to-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Career?
        </h2>
        <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
          Join thousands of students already learning and advancing their careers with LearnHub. Start your free trial today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
          >
            Start Learning Now
            <ArrowRight size={20} />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800/50 text-white font-semibold rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}
