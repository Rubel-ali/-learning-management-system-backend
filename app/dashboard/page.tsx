import Navigation from '@/components/Navigation'
import { BookOpen, Clock, Award, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const enrolledCourses = [
    {
      id: 1,
      title: 'Web Development Fundamentals',
      progress: 65,
      completedVideos: 16,
      totalVideos: 24,
      instructor: 'Sarah Chen',
    },
    {
      id: 2,
      title: 'Advanced React Patterns',
      progress: 40,
      completedVideos: 13,
      totalVideos: 32,
      instructor: 'Alex Kumar',
    },
  ]

  const stats = [
    {
      label: 'Courses Enrolled',
      value: 5,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Hours Learned',
      value: 47,
      icon: Clock,
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      label: 'Certificates Earned',
      value: 3,
      icon: Award,
      color: 'from-green-500 to-green-600',
    },
    {
      label: 'Learning Streak',
      value: 12,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
    },
  ]

  return (
    <main className="bg-slate-950 min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-8 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Welcome Back, <span className="gradient-text">Learner</span>
          </h1>
          <p className="text-slate-400">Continue your learning journey and master new skills</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="glass rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                </div>
              )
            })}
          </div>

          {/* Enrolled Courses */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Your Courses</h2>
              <a href="/courses" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                Browse More →
              </a>
            </div>

            <div className="space-y-6">
              {enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="glass rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{course.title}</h3>
                      <p className="text-slate-400 text-sm">Instructor: {course.instructor}</p>
                    </div>
                    <div className="text-right mt-2 md:mt-0">
                      <p className="text-lg font-bold text-cyan-400">{course.progress}%</p>
                      <p className="text-slate-400 text-sm">
                        {course.completedVideos} of {course.totalVideos} lessons
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>

                  <div className="mt-4">
                    <button className="px-6 py-2 bg-gradient-to-r from-blue-500/80 to-cyan-500/80 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all">
                      Continue Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="glass rounded-xl p-8 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-white mb-6">This Week's Activity</h2>
            <div className="grid md:grid-cols-7 gap-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={day} className="text-center">
                  <p className="text-slate-400 text-sm mb-2">{day}</p>
                  <div className="w-full h-20 bg-slate-800 rounded-lg relative overflow-hidden">
                    <div
                      className="absolute bottom-0 w-full bg-gradient-to-t from-cyan-500 to-blue-500"
                      style={{ height: `${Math.random() * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
