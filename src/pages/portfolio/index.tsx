import React from 'react'
import Navbar from '../../components/common/Navbar'
import { Button } from '../../components/ui/button'
import { useSelector } from 'react-redux'
import { isNullOrUndefined } from '../../utils'
import { useNavigate } from 'react-router-dom'
const Portfolio = () => {
  const { user } = useSelector((state: any) => state.metaDataReducer)
  const navigate = useNavigate()
  console.log('user', user)
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold">Portfolio</h1>
          <p className="text-gray-500">
            This is your portfolio page. You can add your projects, skills, and other information here.
          </p>
          {user?.has_portfolio_access && (
            <Button onClick={() => navigate(`${user?.portfolio_id ? '/portfolio/edit' : '/portfolio/create'}`)}>
              {!isNullOrUndefined(user?.portfolio_id) ? 'Edit Portfolio' : 'Create Portfolio'}
            </Button>
          )}
          {!user?.has_portfolio_access && (
            <p className="text-red-500">
              OOPs!! You don't have access to the portfolio yet, get the access and create the portfolio, come back
              later
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default Portfolio
