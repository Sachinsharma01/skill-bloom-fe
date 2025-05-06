import React from 'react'
import { FormLayout } from '../../components/portfolio/FormLayout'
import Navbar from '../../components/common/Navbar'
const CreatePortfolio = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-50 via-slate-50 to-zinc-50 py-8 px-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        <header className="max-w-5xl mx-auto text-center mb-12 relative">
          <div className="inline-block">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-primary to-purple-600 filter drop-shadow-sm pb-2">
              Skillbloom's PortfolioPal
            </h1>
            <div className="h-1 w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          </div>
          <p className="text-xl text-gray-600 mt-4 max-w-xl mx-auto">Build a professional portfolio in minutes</p>
        </header>

        <main className="relative z-10 max-w-5xl mx-auto border border-gray-200 rounded-lg p-4">
          <FormLayout />
        </main>

        <footer className="mt-20 py-6 border-t border-gray-100/50">
          <div className="max-w-5xl mx-auto text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} PortfolioPal. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}

export default CreatePortfolio
