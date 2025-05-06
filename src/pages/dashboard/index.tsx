import React, { useState } from 'react'
import { DashboardSidebar } from '../../components/dashboard/DashboardSidebar'
import DashboardOverview from '../../components/dashboard/DashboardOverview'
import { useIsMobile } from '../../hooks/use-mobile'
import Navbar from '../../components/common/Navbar'
import DashboardPortfolioView from '../../components/dashboard/DashboardPortfolioView'
import DashboardEnrolledCoursesView from '../../components/dashboard/DashboardEnrolledCoursesView'
const Dashboard = () => {
  const isMobile = useIsMobile()
  const [selectedTab, setSelectedTab] = useState('overview')

  console.log('selectedTab', selectedTab)

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 relative">
        <div className="md:fixed md:top-[64px] md:left-0 md:h-[calc(100vh-64px)] md:w-64">
          <DashboardSidebar onClick={(tab) => setSelectedTab(tab)} selectedTab={selectedTab} />
        </div>
        <main className="flex-1 p-4 md:p-8 w-full md:ml-64">
          <div className="max-w-7xl mx-auto">
            {selectedTab === 'overview' && <DashboardOverview />}
            {selectedTab === 'portfolio' && <DashboardPortfolioView />}
            {selectedTab === 'enrolled-resources' && <DashboardEnrolledCoursesView />}
          </div>
        </main>
      </div>
    </>
  )
}

export default Dashboard
