import React from 'react'

const GreetingBanner = ({ user }: { user: any }) => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 h-[200px]">
      <div className="relative z-10">
        <h1 className="text-4xl font-bold mb-2">Welcome back 👋, {user.name}</h1>
        <p className="text-lg opacity-90">Your journey to success begins here</p>
      </div>
      <div className="absolute right-0 bottom-0 opacity-10">
        <svg
          width="320"
          height="320"
          viewBox="0 0 320 320"
          fill="none"
        >
          <circle
            cx="160"
            cy="160"
            r="120"
            stroke="currentColor"
            strokeWidth="40"
          />
        </svg>
      </div>
    </div>
  )
}

export default GreetingBanner
