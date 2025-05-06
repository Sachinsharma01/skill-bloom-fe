import React, { useEffect, useState } from 'react'
import { Card } from '../ui/card'
import { redirect, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import GreetingBanner from '../common/GreetingBanner'
import { isNullOrUndefined } from '../../utils'
import config from '../../config'
import { CourseCard } from '../ui/courseCard'
import { makeAPICall } from '../../utils/api'

const DashboardEnrolledCoursesView = () => {
  const navigate = useNavigate()
  const { token } = useSelector((state: any) => state.tokenReducer)
  const { user } = useSelector((state: any) => state.metaDataReducer)
  const [loading, setLoading] = useState(false)
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([])
  const alreadyHasPortfolio = !isNullOrUndefined(user?.portfolio_id)

  useEffect(() => {
    setLoading(true)
    makeAPICall('enrolledCourses', { userId: user.id }, token)
      .then((res) => {
        console.log(res)
        setEnrolledCourses(res)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <>
      {loading && <div className="flex justify-center items-center h-screen">Loading...</div>}
      {!loading && (
        <div className="space-y-8">
          {/* Welcome Section */}
          <GreetingBanner user={user} />
          <div className="w-100">
            <div className="flex flex-row items-center justify-center gap-4">
              <div
                className="text-center w-1/2 bg-gradient-to-l from-purple-600 to-indigo-600 rounded-xl text-white p-3"
                style={{ height: 50, overflow: 'hidden' }}
              >
                <h3 className="text-center text-md text-bold text-white">
                  Total Enrolled Courses: {enrolledCourses.length}
                </h3>
              </div>
              <div
                className="text-center w-1/2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3"
                style={{ height: 50, overflow: 'hidden' }}
              >
                <h3 className="text-center text-md text-bold text-white">
                  Total Completed Courses: {enrolledCourses.length}
                </h3>
              </div>
            </div>
          </div>

          {/* Featured Content */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">My Courses</h2>
              <button
                onClick={() => navigate('/resources')}
                className="text-indigo-600 hover:text-indigo-700 flex items-center"
              >
                View All <span className="ml-1">→</span>
              </button>
            </div>
            <div>
              {enrolledCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {enrolledCourses.length > 0 &&
                    enrolledCourses.map((course: any, index) => (
                      <CourseCard
                        key={index}
                        {...course.course}
                        onClick={() => navigate(`/dashboard/course/${course.course.id}`)}
                      />
                    ))}
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  Oops! You haven't enrolled in any courses yet 😔. Start learning today!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DashboardEnrolledCoursesView
