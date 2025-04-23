import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOutIcon, ArrowRightIcon } from 'lucide-react'
import ProfilePopover from '../profile/ProfilePopover'
const Avatar: React.FC<{ image: string; name: string }> = ({ image, name }) => {
  const imageSource = image ?? `https://d1om2ubwmy56c7.cloudfront.net/avatar/${name.split(' ')[0][0].toLowerCase()}.png`
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      className="w-10 h-10 rounded-full overflow-hidden border cursor-pointer"
      style={{ borderColor: '#396FDF' }}
      onMouseEnter={() => setIsHovered(true)}
    >
      <img
        src={imageSource}
        alt={name}
        className="w-full h-full object-cover"
      />
      {isHovered && <ProfilePopover onClick={() => navigate('/profile')} isHovered={isHovered} onMouseLeave={() => setIsHovered(false)} />}
    </div>
  )
}

export default Avatar
