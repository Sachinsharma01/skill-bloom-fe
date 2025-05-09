import React, { useEffect, useState } from 'react'
import Navbar from '../../components/common/Navbar'
import ProfileSetting from '../../components/profile/ProfileSetting'
import ProfilePictureUploader from '../../components/profile/ProfilePictureUploader'
import { makeAPICall } from '../../utils/api'
import { useDispatch, useSelector } from 'react-redux'

const Profile = () => {
  const [activeTab, setActiveTab]: [number, (activeTab: number) => void] = useState(1)

  const { user } = useSelector((state: any) => state.metaDataReducer)
  const { token } = useSelector((state: any) => state.tokenReducer)

  useEffect(() => {
    makeAPICall('profile', { id: user?.id }, token).then((res: any) => {
      console.log('profile', res)
    })
  }, [])

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Profile & settings</h1>
        <div className="border-b mb-6 flex space-x-6 text-gray-700 font-semibold">
          <button
            className={`border-b-2 border-black pb-2 ${activeTab === 1 ? 'border-black' : 'border-transparent'}`}
            onClick={() => setActiveTab(1)}
          >
            Profile
          </button>
          <button
            className={`pb-2 ${activeTab === 2 ? 'border-black' : 'border-transparent'}`}
            onClick={() => setActiveTab(2)}
          >
            Profile picture
          </button>
        </div>
        {activeTab === 1 && <ProfileSetting user={user} />}
        {activeTab === 2 && <ProfilePictureUploader user={user} />}
      </div>
    </>
  )
}

export default Profile
