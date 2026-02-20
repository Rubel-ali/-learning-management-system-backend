import Navigation from '@/components/Navigation'
import CourseCard from '@/components/CourseCard'
import { Search } from 'lucide-react'

export default function CoursesPage() {
  const allCourses = [
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
    {
      id: 5,
      title: 'Machine Learning Fundamentals',
      instructor: 'Emily Zhang',
      students: 2200,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
      category: 'Data Science',
      level: 'Intermediate',
      videos: 35,
    },
    {
      id: 6,
      title: 'Mobile App Development',
      instructor: 'Marcus Johnson',
      students: 1900,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
      category: 'Development',
      level: 'Advanced',
      videos: 38,
    },
    {
      id: 7,
      title: 'Graphic Design Essentials',
      instructor: 'Lisa Wang',
      students: 1600,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
      category: 'Design',
      level: 'Beginner',
      videos: 20,
    },
    {
      id: 8,
      title: 'Cloud Computing with AWS',
      instructor: 'Robert Adams',
      students: 2100,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
      category: 'Cloud',
      level: 'Advanced',
      videos: 42,
    },
  ]

  return (
    <main className="bg-slate-950 min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Explore Our <span className="gradient-text">Courses</span>
          </h1>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl">
            Choose from hundreds of expert-led courses designed to help you master new skills.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input
              type="text"
              placeholder="Search courses, instructors..."
              className="w-full px-12 py-4 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Filters & Courses */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filter Tags */}
          <div className="flex flex-wrap gap-3 mb-12">
            {['All', 'Development', 'Design', 'Data Science', 'Cloud'].map((filter) => (
              <button
                key={filter}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  filter === 'All'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800 border border-slate-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Courses Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
