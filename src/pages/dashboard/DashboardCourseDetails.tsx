import React, { useEffect, useState } from 'react'
import Navbar from '../../components/common/Navbar'
import { makeAPICall } from '../../utils/api'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { LinkedinIcon, LinkIcon } from 'lucide-react'
import { Button } from '../../components/ui/button'
import ReviewModal from '../../components/common/ReviewModal'

interface ResourceData {
  company_name: string
  careers_url: string
  industry: string
  location: string
  linkedin_url: string
}

interface APIData {
  course: {
    name: string
  }
  resourceData: ResourceData[]
}

const DashboardCourseDetails: React.FC = () => {
  const [resourceData, setResourceData] = useState<APIData>()
  const { id } = useParams()
  const { token } = useSelector((state: any) => state.tokenReducer)
  const { user } = useSelector((state: any) => state.metaDataReducer)
  const [loading, setLoading] = useState(true)
  const [openReviewModal, setOpenReviewModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true)
      makeAPICall('dashboardDetails', { id }, token as string).then((res: any) => {
        console.log('res', res)
        if (parseInt(res.course.id) === 7) {
          navigate('/qa')
        }
        setResourceData(res)
        setLoading(false)
      })
    }
    fetchCompanies()
  }, [])


  console.log('resourceData', resourceData)
  return (
    <>
      <Navbar />
      {loading && <div className="flex justify-center items-center h-screen">Loading...</div>}
      {!loading && (
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-6">{resourceData?.course?.name}</h1>
            <Button
              variant="secondary"
              className="mb-6"
              onClick={() => setOpenReviewModal(true)}
            >
              Review Course
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Careers Link
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sector
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    LinkedIn
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {resourceData.resourceData.map((company, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-edtech-common-light' : 'bg-white'}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.company_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                      <a
                        href={company.careers_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkIcon className="w-4 h-4" />
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.industry ?? 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                      <a
                        href={company.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkedinIcon className="w-4 h-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {
        <ReviewModal
          open={openReviewModal}
          onClick={() => setOpenReviewModal(false)}
          courseId={id}
          userId={user.id}
          token={token}
        />
      }
    </>
  )
}

export default DashboardCourseDetails
