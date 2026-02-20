import Link from 'next/link'
import { ArrowRight, BookOpen, Users, TrendingUp, Play } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import CourseCard from '@/components/CourseCard'
import CTA from '@/components/CTA'

export default function Home() {
  const courses = [
    {
      id: 1,
      title: 'Web Development Fundamentals',
      instructor: 'Sarah Chen',
      students: 2400,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
      category: 'Development',
      level: 'Beginner',
      videos: 24,
    },
    {
      id: 2,
      title: 'Advanced React Patterns',
      instructor: 'Alex Kumar',
      students: 1800,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
      category: 'Development',
      level: 'Advanced',
      videos: 32,
    },
    {
      id: 3,
      title: 'UI/UX Design Masterclass',
      instructor: 'Maria Rodriguez',
      students: 3100,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
      category: 'Design',
      level: 'Intermediate',
      videos: 28,
    },
    {
      id: 4,
      title: 'Data Science with Python',
      instructor: 'Dr. James Wilson',
      students: 2800,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f70e504b3?w=500&h=300&fit=crop',
      category: 'Data Science',
      level: 'Intermediate',
      videos: 40,
    },
  ]

  return (
    <main className="bg-slate-950">
      <Navigation />
      <Hero />
      
      {/* Featured Courses Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured <span className="gradient-text">Courses</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl">
            Master new skills with our carefully curated selection of courses from industry experts. Learn at your own pace.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <Features />

      {/* Stats Section */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="w-12 h-12 text-cyan-500" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">50K+</h3>
              <p className="text-slate-400">Active Learners</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <BookOpen className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">200+</h3>
              <p className="text-slate-400">Expert Courses</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <TrendingUp className="w-12 h-12 text-cyan-500" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">15K+</h3>
              <p className="text-slate-400">Success Stories</p>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  )
}
