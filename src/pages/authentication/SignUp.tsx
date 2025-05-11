import React, { useState } from 'react'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { toast } from 'sonner'
import { makeAPICall } from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import { validateUserName } from '../../utils'
import { Link } from 'react-router-dom'
import AuthImage from '../../assets/auth.jpeg'
import { isMobileDevice, isTabletDevice } from '../../utils'
import logo from '../../assets/logo.png'
import authBg from '../../assets/auth_bg.png'
import { Loader2 } from 'lucide-react'
function SignUp() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mobile, setMobile] = useState('')
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [profession, setProfession] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    toast.loading('Creating account...')
    const usernameError: string | Promise<boolean> = validateUserName(username)
    if (typeof usernameError === 'string') {
      toast.dismiss()
      toast.error(usernameError)
      return
    } else {
      usernameError.then((response: any) => {
        if (!response.valid) {
          toast.dismiss()
          toast.error('Username is already taken')
          setIsLoading(false)
          return
        }
      })
    }
    makeAPICall('signup', {
      name,
      username,
      email,
      password,
      mobile_number: mobile,
      country: 'India',
      state:  "N/A",
      profession,
    }).then((res: any) => {
      console.log(res)
      if (res.error || res.errorMessage) {
        toast.dismiss()
        toast.error(res.message ?? res.error ?? res.errorMessage)
        setIsLoading(false)
      } else {
        toast.dismiss()
        toast.success('Account created successfully')
        setIsLoading(false)
        navigate('/login')
      }
    })
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `url(${authBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '1rem',
      }}
    >
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen py-8">
        <div className="flex flex-col lg:flex-row gap-4 justify-center items-center bg-white lg:p-10 p-4 rounded-lg w-full lg:w-[75%] max-w-6xl">
          {!isMobileDevice() && !isTabletDevice() && (
            <img
              src={AuthImage}
              alt="logo"
              className="w-full lg:w-1/3 h-auto object-cover rounded-lg"
            />
          )}
          <div className="w-full lg:w-1/2 p-4 lg:p-6 login-container bg-white border-gray-200 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-6">
              <h2 className="text-sm text-edtech-dark text-center sm:text-left">
                <span className="text-edtech-common">Kick Start</span> your journey with
              </h2>
              <img
                src={logo}
                alt="logo"
                style={{ width: '40px', height: '40px' }}
                onClick={() => navigate('/')}
                className="cursor-pointer"
              />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center sm:text-left">Create an Account</h2>
            <div className="w-full">
              <form
                className="space-y-4"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <Input
                      type="text"
                      id="name"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-edtech-secondary focus:ring-edtech-secondary"
                      placeholder="Enter your name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Username
                    </label>
                    <Input
                      type="text"
                      id="username"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-edtech-secondary focus:ring-edtech-secondary"
                      placeholder="Enter your username"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-edtech-secondary focus:ring-edtech-secondary"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <Input
                    type="password"
                    id="password"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-edtech-secondary focus:ring-edtech-secondary"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Mobile Number
                    </label>
                    <Input
                      type="number"
                      id="mobile"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-edtech-secondary focus:ring-edtech-secondary"
                      placeholder="Enter your mobile number"
                      onChange={(e) => setMobile(e.target.value)}
                      value={mobile}
                      maxLength={10}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="profession"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Profession
                    </label>
                    <select
                      id="profession"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-edtech-secondary focus:ring-edtech-secondary px-3 py-2 bg-white border border-gray-300"
                      onChange={(e) => setProfession(e.target.value)}
                      value={profession}
                    >
                      <option value="">Select profession</option>
                      <option value="student">Student</option>
                      <option value="working_professional">Working Professional</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Country
                    </label>
                    <Input
                      type="text"
                      id="country"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-edtech-secondary focus:ring-edtech-secondary"
                      placeholder="Enter your country"
                      onChange={(e) => setCountry(e.target.value)}
                      value={country}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      State
                    </label>
                    <Input
                      type="text"
                      id="state"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-edtech-secondary focus:ring-edtech-secondary"
                      placeholder="Enter your state"
                      onChange={(e) => setState(e.target.value)}
                      value={state}
                    />
                  </div>
                </div> */}
                <Button
                  type="submit"
                  className="w-full mt-6"
                  style={{ backgroundColor: '#396FDF' }}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign Up'}
                </Button>
              </form>
              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="text-edtech-secondary hover:text-edtech-primary transition-colors"
                >
                  Already have an account? <span className="text-edtech-primary font-bold">Login</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
