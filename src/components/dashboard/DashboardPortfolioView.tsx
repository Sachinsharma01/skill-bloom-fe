import React, { useEffect, useState } from 'react'
import { Card } from '../ui/card'
import { CourseCard } from '../ui/courseCard'
import { redirect, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { makeAPICall } from '../../utils/api'
import GreetingBanner from '../common/GreetingBanner'
import { isNullOrUndefined } from '../../utils'
import config from '../../config'
const DashboardPortfolioView = () => {
  const navigate = useNavigate()
  const { token } = useSelector((state: any) => state.tokenReducer)
  const { user } = useSelector((state: any) => state.metaDataReducer)
  const [loading, setLoading] = useState(false)
  const alreadyHasPortfolio = !isNullOrUndefined(user?.portfolio_id)

  return (
    <>
      {loading && <div className="flex justify-center items-center h-screen">Loading...</div>}
      {!loading && (
        <div className="space-y-8">
          {/* Welcome Section */}
          <GreetingBanner user={user} />

          {/* Featured Content */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">My Portfolio</h2>
            </div>
            {user?.has_portfolio_access ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6"></div>
            ) : (
              <div className="flex justify-center items-center">
                Oops! You haven't access to portfolio yet 😔. Please contact support to get access.
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Portfolio Builder</h3>
              <p className="text-gray-600 mb-4">
                {alreadyHasPortfolio
                  ? 'Edit your portfolio'
                  : 'Create a stunning portfolio to showcase your skills and projects.'}
              </p>
              <button
                onClick={() => navigate('/portfolio/create')}
                className="text-indigo-600 hover:text-indigo-700"
              >
                Get Started →
              </button>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">View Portfolio</h3>
              <p className="text-gray-600 mb-4">Access your portfolio to showcase your skills and projects.</p>
              <button
                onClick={() => window.open(`${config.skillbloom_portfoilo_url}/portfolio/${user?.portfolio_id}`, '_blank')}
                className="text-indigo-600 hover:text-indigo-700"
              >
                View Portfolio →
              </button>
            </Card>
          </div>
        </div>
      )}
    </>
  )
}

export default DashboardPortfolioView
