import React, { useEffect, useState } from 'react'
import { Card } from '../ui/card'
import { redirect, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import GreetingBanner from '../common/GreetingBanner'
import { isNullOrUndefined } from '../../utils'
import config from '../../config'
import { toast } from 'sonner'
import PortfolioModel from '../portfolio/PortfolioModal'

const DashboardPortfolioView = () => {
  const navigate = useNavigate()
  const { token } = useSelector((state: any) => state.tokenReducer)
  const { user } = useSelector((state: any) => state.metaDataReducer)
  const [loading, setLoading] = useState(false)
  const [renderPortfolioModal, setRenderPortfolioModal] = useState(false)
  const alreadyHasPortfolio = !isNullOrUndefined(user?.portfolio_id)
  const userHasPortfolioAccess = user?.has_portfolio_access

  const viewText = userHasPortfolioAccess && alreadyHasPortfolio ? 'View Portfolio' : 'Sample Portfolio'
  const viewLink =
    userHasPortfolioAccess && alreadyHasPortfolio
      ? `${config.skillbloom_portfoilo_url}/portfolio/${user?.portfolio_id}`
      : `${config.skillbloom_portfoilo_url}/portfolio/681fb7e408b2dd085bbde23c`
  const createdEditText = userHasPortfolioAccess && alreadyHasPortfolio ? 'Edit Portfolio' : 'Create Portfolio'

  const handleCreatePortfolio = () => {
    if (alreadyHasPortfolio) {
      console.log('already has portfolio')
      navigate('/portfolio/create')
      // window.open(`${config.skillbloom_portfoilo_url}/portfolio/${user?.portfolio_id}`, '_blank')
    } else if (userHasPortfolioAccess && !alreadyHasPortfolio) {
      navigate('/portfolio/create')
    } else if (!userHasPortfolioAccess) {
      toast.error("You don't have access to the portfolio yet, please contact support to get access")
      setRenderPortfolioModal(true)
    }
  }

  console.log('renderPortfolioModal', renderPortfolioModal)

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
            {userHasPortfolioAccess ? (
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
                onClick={handleCreatePortfolio}
                className="text-indigo-600 hover:text-indigo-700"
              >
                {createdEditText} →
              </button>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{viewText}</h3>
              <p className="text-gray-600 mb-4">Access your portfolio to showcase your skills and projects.</p>
              <button
                onClick={() => window.open(`${viewLink}`, '_blank')}
                className="text-indigo-600 hover:text-indigo-700"
              >
                View {userHasPortfolioAccess ? 'Portfolio' : 'Sample Portfolio'} →
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

export default DashboardPortfolioView
