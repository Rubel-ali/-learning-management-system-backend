import Link from 'next/link'
import Image from 'next/image'
import { Star, Play, Users } from 'lucide-react'

interface Course {
  id: number
  title: string
  instructor: string
  students: number
  rating: number
  image: string
  category: string
  level: string
  videos: number
}

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/courses/${course.id}`}>
      <div className="glass group rounded-xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer h-full">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden bg-slate-800">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Play size={24} className="text-white fill-white" />
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-blue-500/90 text-white text-xs font-semibold rounded-full">
              {course.category}
            </span>
          </div>

          {/* Level Badge */}
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 bg-slate-900/80 text-cyan-400 text-xs font-semibold rounded-full">
              {course.level}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-white text-base mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
            {course.title}
          </h3>

          <p className="text-slate-400 text-sm mb-4">{course.instructor}</p>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm mb-4 pb-4 border-b border-slate-700">
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-white font-semibold">{course.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <Users size={14} />
              <span className="text-xs">{(course.students / 1000).toFixed(1)}K</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <Play size={14} />
              <span className="text-xs">{course.videos}</span>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full py-2 bg-gradient-to-r from-blue-500/80 to-cyan-500/80 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all">
            View Course
          </button>
        </div>
      </div>
    </Link>
  )
}
