import { Zap, Shield, BarChart3, Smartphone, Award, Globe } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Learn Fast',
      description: 'Condensed, structured courses designed to get you results quickly.',
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Enterprise-grade security to protect your data and learning progress.',
    },
    {
      icon: BarChart3,
      title: 'Track Progress',
      description: 'Detailed analytics and metrics to visualize your learning journey.',
    },
    {
      icon: Smartphone,
      title: 'Learn Anywhere',
      description: 'Access courses on any device, online or offline mode available.',
    },
    {
      icon: Award,
      title: 'Certifications',
      description: 'Earn recognized certificates upon completion of courses.',
    },
    {
      icon: Globe,
      title: 'Global Community',
      description: 'Connect with learners from around the world and share knowledge.',
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose <span className="gradient-text">LearnHub</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            We provide everything you need to succeed in your learning journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="glass rounded-xl p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
