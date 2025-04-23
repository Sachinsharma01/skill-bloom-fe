import { LogOutIcon } from 'lucide-react'
import { ArrowRightIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const ProfilePopover = ({ isHovered, onMouseLeave, onClick }: { isHovered: boolean; onMouseLeave: () => void; onClick: () => void }) => {
  const navigate = useNavigate()
  const handleLogout = () => {
   localStorage.clear()
    navigate('/login')
  }
  return (
    <div
      className="absolute right-50 mt-4 flex items-center justify-center bg-edtech-white border rounded-lg text-edtech-common w-1/6 z-10"
      style={{ width: '150px', backgroundColor: 'white' }}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex flex-col items-center justify-center bg-edtech-white">
        <div className="w-full bg-white text-edtech-dark bg-edtech-white flex items-center justify-center gap-3" onClick={onClick}>
          <span className="text-sm text-gray-400 text-edtech-dark hover:text-edtech-dark">Profile</span>
          <ArrowRightIcon className="w-4 h-4 text-edtech-common" />
        </div>
        <div className="w-full bg-white text-edtech-dark bg-edtech-white mt-4 flex items-center justify-center gap-3" >
          <span className="text-sm text-gray-400 text-edtech-dark hover:text-edtech-dark">Logout</span>
          <LogOutIcon className="w-4 h-4 text-edtech-common" onClick={handleLogout} />
        </div>
      </div>
    </div>
  )
}

export default ProfilePopover
