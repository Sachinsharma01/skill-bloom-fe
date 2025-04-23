import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { toast } from 'sonner'
import { makeAPICall } from '../../utils/api'
import { useDispatch } from 'react-redux'
import tokenActions from '../../redux/actions/tokenActions'
import metaDataActions from '../../redux/actions/metaDataActions'
import AuthImage from '../../assets/auth.svg'
import { isMobileDevice, isTabletDevice } from '../../utils'
import logo from '../../assets/logo.png'
import authBg from '../../assets/auth_bg.png'
const Login: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email || !password) {
      toast.error('Please enter both email and password')
      return
    }

    makeAPICall('signin', { email, password }).then((res: any) => {
      if (res.error) {
        toast.error(res.message)
        return
      }
      dispatch(tokenActions.setToken(res.accessToken))
      dispatch(metaDataActions.setMetaData(res.user))
      toast.success('Login successful')

      console.log('res', res)
      navigate(`/profile`)
    })
  }

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundImage: `url(${authBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex md:flex-col sm:flex-col lg:flex-row items-center justify-center h-screen">
        <div className="lg:w-1/2 flex justify-center items-center bg-white lg:p-20 rounded-lg">
          {!isMobileDevice() && !isTabletDevice() && (
            <img
              src={AuthImage}
              alt="logo"
              className="w-1/3 h-1/3 mx-auto"
            />
          )}
          <div className="w-full max-w-md p-10 login-container bg-white border-gray-200 rounded-lg shadow-md mx-2 gap-3">
            <div className="flex justify-center items-center gap-3">
              <h2 className="text-sm text-edtech-dark">
                <span className="text-edtech-common">Welcome</span> to Skillbloom
              </h2>
              <img
                src={logo}
                alt="logo"
                style={{ width: '50px', height: '50px' }}
                onClick={() => navigate('/')}
                className="cursor-pointer"
              />
            </div>

            <div className="w-full max-w-md">
              <form
                className="space-y-4"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-edtech-secondary focus:ring-edtech-secondary"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Input
                    type="password"
                    id="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-edtech-secondary focus:ring-edtech-secondary"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  style={{ backgroundColor: '#396FDF' }}
                >
                  Login
                </Button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Don't have an account?{' '}
                  <Link
                    to="/signup"
                    className="text-edtech-primary hover:text-edtech-primary/80"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
