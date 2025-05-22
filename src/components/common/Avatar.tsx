import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOutIcon, ArrowRightIcon } from 'lucide-react'
import ProfilePopover from '../profile/ProfilePopover'
const Avatar: React.FC<{ image: string; name: string }> = ({ image, name }) => {
  console.log("image", image)
  const imageSource = image ?? `https://ui-avatars.com/api/?name=${name.split(' ')[0]}+${name.split(' ')[1]}`
  const navigate = useNavigate()
  console.log("imageSource", imageSource)
  // const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      className="w-10 h-10 rounded-full overflow-hidden border cursor-pointer hover:cursor-pointer"
      style={{ borderColor: '#396FDF' }}
      // onMouseEnter={() => setIsHovered(true)}
      onClick={() => navigate('/profile')}
    >
      <img
        src={imageSource}
        alt={name}
        className="w-full h-full object-cover"
      />
      {/* {isHovered && <ProfilePopover onClick={() => navigate('/profile')} isHovered={isHovered} onMouseLeave={() => setIsHovered(false)} />} */}
    </div>
  )
}

export default Avatar
