import React from 'react'
import { DashboardSidebar } from '../../components/dashboard/DashboardSidebar'
import DashboardOverview from '../../components/dashboard/DashboardOverview'
import { useIsMobile } from '../../hooks/use-mobile'
import Navbar from '../../components/common/Navbar'
const Dashboard = () => {
  const isMobile = useIsMobile()

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        <DashboardSidebar />
        <main className="flex-1 p-4 md:p-8 w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            <DashboardOverview />
          </div>
        </main>
      </div>
    </>
  )
}

export default Dashboard
