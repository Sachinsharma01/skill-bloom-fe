import React from 'react'
import { useNavigate } from 'react-router-dom';
const Avatar = ({ image, name }: { image: string, name: string }) => {
    const imageSource = image ?? `https://d1om2ubwmy56c7.cloudfront.net/avatar/${name.split(" ")[0][0].toLowerCase()}.png`
    const navigate = useNavigate();
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden border" style={{borderColor: "#396FDF"}} onClick={() => navigate("/profile")}>
        <img src={imageSource} alt={name} className="w-full h-full object-cover" />
    </div>
  )
}

export default Avatar