import React from 'react'
import PortfolioForm from '../../components/portfolio/PortfolioForm'
import Navbar from '../../components/common/Navbar'

function CreatePortfolio() {
  return (
    <>
      <Navbar />
      <div className="container max-w-4xl mx-auto py-8 animate-fade-in">
        <PortfolioForm />
      </div>
    </>
  )
}

export default CreatePortfolio
