import React, { useEffect, useState } from 'react'
import { Card } from '../ui/card'
import { CourseCard } from '../ui/courseCard'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { makeAPICall } from '../../utils/api'
import GreetingBanner from '../common/GreetingBanner'
import PortfolioModel from '../portfolio/PortfolioModel'
import { isNullOrUndefined } from '../../utils'
import config from '../../config'
import { toast } from 'sonner'

const DashboardOverview = () => {
  const navigate = useNavigate()
  const { token } = useSelector((state: any) => state.tokenReducer)
  const { user } = useSelector((state: any) => state.metaDataReducer)
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([])
  const [renderPortfolioModal, setRenderPortfolioModal] = useState(false)
  const alreadyHasPortfolio = !isNullOrUndefined(user?.portfolio_id)
  const userHasPortfolioAccess = user?.has_portfolio_access

  const [loading, setLoading] = useState(false)

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

  const handleCreatePortfolio = () => {
    if (alreadyHasPortfolio) {
      navigate(`${config.skillbloom_portfoilo_url}/portfolio/${user?.portfolio_id}`)
    } else if (userHasPortfolioAccess && !alreadyHasPortfolio) {
      navigate('/portfolio/create')
    } else if (!userHasPortfolioAccess) {
      toast.error("You don't have access to the portfolio yet, please contact support to get access")
      setRenderPortfolioModal(true)
    }
  }

  console.log('enrolledCourses', enrolledCourses)

  return (
    <>
      {loading && <div className="flex justify-center items-center h-screen">Loading...</div>}
      {!loading && (
        <div className="space-y-8">
          {/* Welcome Section */}
          <GreetingBanner user={user} />

          {/* Featured Content */}
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

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Portfolio Builder</h3>
              <p className="text-gray-600 mb-4">Create a stunning portfolio to showcase your skills and projects.</p>
              <button
                onClick={handleCreatePortfolio}
                className="text-indigo-600 hover:text-indigo-700"
              >
                Get Started →
              </button>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Resource Library</h3>
              <p className="text-gray-600 mb-4">Access our curated collection of learning materials and templates.</p>
              <button
                onClick={() => navigate('/resources')}
                className="text-indigo-600 hover:text-indigo-700"
              >
                Browse Resources →
              </button>
            </Card>
          </div>
        </div>
      )}
      {
        <PortfolioModel
          onClick={() => setRenderPortfolioModal(!renderPortfolioModal)}
          open={renderPortfolioModal}
        />
      }
    </>
  )
}

export default DashboardOverview
