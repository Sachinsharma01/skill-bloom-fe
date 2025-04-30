import React from 'react'
import { Card } from '../ui/card'
import { CourseCard } from '../ui/courseCard'
import { useNavigate } from 'react-router-dom'

const DashboardOverview = () => {
  const navigate = useNavigate()
  const courses = [
    {
      title: 'Data Analytics Bootcamp 4.0: With Practical Job',
      image: 'https://placehold.co/600x400',
      duration: '1:09:07h',
      lectureCount: '536',
      type: 'Bootcamp',
    },
    {
      title: 'Excel: Mother of Business Intelligence',
      image: 'https://placehold.co/600x400',
      duration: '09:00h',
      lectureCount: '70',
    },
    {
      title: 'Potato Disease Classification Free Course',
      image: 'https://placehold.co/600x400',
      duration: '00:00h',
      lectureCount: '8',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 h-[200px]">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">Welcome to Skill Bloom!</h1>
          <p className="text-lg opacity-90">Your journey to success begins here</p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10">
          <svg
            width="320"
            height="320"
            viewBox="0 0 320 320"
            fill="none"
          >
            <circle
              cx="160"
              cy="160"
              r="120"
              stroke="currentColor"
              strokeWidth="40"
            />
          </svg>
        </div>
      </div>

      {/* Featured Content */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">My Courses</h2>
          <button className="text-indigo-600 hover:text-indigo-700 flex items-center">
            View All <span className="ml-1">→</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              {...course}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Portfolio Builder</h3>
          <p className="text-gray-600 mb-4">Create a stunning portfolio to showcase your skills and projects.</p>
          <button onClick={() => navigate('/portfolio')} className="text-indigo-600 hover:text-indigo-700">Get Started →</button>
        </Card>
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Resource Library</h3>
          <p className="text-gray-600 mb-4">Access our curated collection of learning materials and templates.</p>
          <button onClick={() => navigate('/resources')} className="text-indigo-600 hover:text-indigo-700">Browse Resources →</button>
        </Card>
      </div>
    </div>
  )
}

export default DashboardOverview
