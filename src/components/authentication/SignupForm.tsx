import React, { useState, useCallback, useEffect } from 'react'
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Phone,
  Briefcase,
  Sparkles,
  ArrowRight,
  Check,
  X,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import AccountCreationSuccess from './AccountCreationSuccess'
import { makeAPICall } from '../../utils/api'
import { validateUserName } from '../../utils'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

interface SignupFormProps {
  onToggleForm: () => void
}

const SignupForm = ({ onToggleForm }: SignupFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle')
  const [showSuccess, setShowSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    mobileNumber: '',
    profession: '',
  })
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleProfessionChange = (value: string) => {
    setFormData({
      ...formData,
      profession: value,
    })
  }

  const checkUsernameAvailability = useCallback(async (username: string) => {
    if (username.length < 3) {
      setUsernameStatus('idle')
      return
    }

    setUsernameStatus('checking')
    const usernameError: string | Promise<boolean> = validateUserName(username)
    if (typeof usernameError === 'string') {
      toast.dismiss()
      toast.error(usernameError)
      return
    } else {
      usernameError.then((response: any) => {
        if (!response.valid) {
          setUsernameStatus('taken')
        } else {
          setUsernameStatus('available')
        }
      })
    }
  }, [])

  useEffect(() => {
    if (formData.username) {
      checkUsernameAvailability(formData.username)
    }
  }, [formData.username, checkUsernameAvailability])

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: '', color: '', text: '', progress: 0 }
    if (password.length < 6) return { strength: 'weak', color: 'text-red-500', text: 'Weak', progress: 25 }
    if (password.length < 10 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return { strength: 'medium', color: 'text-yellow-500', text: 'Medium', progress: 65 }
    }
    return { strength: 'strong', color: 'text-green-500', text: 'Strong', progress: 100 }
  }

  const passwordStrength = getPasswordStrength(formData.password)

  const getUsernameIcon = () => {
    switch (usernameStatus) {
      case 'checking':
        return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
      case 'available':
        return <Check className="w-4 h-4 text-green-500" />
      case 'taken':
        return <X className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  const getUsernameMessage = () => {
    switch (usernameStatus) {
      case 'checking':
        return <span className="text-sm text-blue-500">Checking availability...</span>
      case 'available':
        return <span className="text-sm text-green-500">Username is available!</span>
      case 'taken':
        return <span className="text-sm text-red-500">Username is taken. Try another one.</span>
      default:
        return null
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    toast.loading('Creating account...')

    makeAPICall('signup', {
      name: formData.fullName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      mobile_number: formData.mobileNumber,
      country: 'India',
      state: 'N/A',
      profession: formData.profession,
    }).then((res: any) => {
      console.log(res)
      if (res.error || res.errorMessage) {
        toast.error(res.message ?? res.errorMessage ?? res.error)
        toast.dismiss()
        setIsLoading(false)
      } else {
        toast.dismiss()
        toast.success('Account created successfully')
        setIsLoading(false)
        setShowSuccess(true)
      }
    })
  }

  const handleBackToLogin = () => {
    setShowSuccess(false)
    onToggleForm()
  }

  if (showSuccess) {
    return (
      <AccountCreationSuccess
        onBackToLogin={handleBackToLogin}
        userName={formData.fullName}
      />
    )
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 mb-3">
          <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Join SkillBloom
          </h2>
          <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
        </div>
        <p className="text-gray-600">Start your career transformation today</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="group">
            <label className="text-sm font-semibold text-gray-700 block mb-2">Full Name</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-800 placeholder-gray-400"
                required
              />
            </div>
          </div>

          <div className="group">
            <label className="text-sm font-semibold text-gray-700 block mb-2">Username</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="@johndoe"
                className="w-full pl-11 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-800 placeholder-gray-400"
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">{getUsernameIcon()}</div>
            </div>
            {formData.username.length >= 3 && <div className="mt-2">{getUsernameMessage()}</div>}
          </div>
        </div>

        <div className="group">
          <label className="text-sm font-semibold text-gray-700 block mb-2">Email Address</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500">
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-800 placeholder-gray-400"
              required
            />
          </div>
        </div>

        <div className="group">
          <label className="text-sm font-semibold text-gray-700 block mb-2">Password</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500">
              <Lock className="w-5 h-5" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a strong password"
              className="w-full pl-11 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-800 placeholder-gray-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {formData.password && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${passwordStrength.color}`}>
                  Password strength: {passwordStrength.text}
                </span>
                <span className="text-xs text-gray-500">{passwordStrength.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    passwordStrength.strength === 'weak'
                      ? 'bg-red-500'
                      : passwordStrength.strength === 'medium'
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                  style={{ width: `${passwordStrength.progress}%` }}
                />
              </div>
              <div className="mt-2 text-xs text-gray-500 space-y-1">
                <div className="flex items-center space-x-2">
                  {formData.password.length >= 8 ? (
                    <Check className="w-3 h-3 text-green-500" />
                  ) : (
                    <AlertCircle className="w-3 h-3 text-gray-400" />
                  )}
                  <span>At least 8 characters</span>
                </div>
                <div className="flex items-center space-x-2">
                  {/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password) ? (
                    <Check className="w-3 h-3 text-green-500" />
                  ) : (
                    <AlertCircle className="w-3 h-3 text-gray-400" />
                  )}
                  <span>Mixed case letters</span>
                </div>
                <div className="flex items-center space-x-2">
                  {/(?=.*\d)/.test(formData.password) ? (
                    <Check className="w-3 h-3 text-green-500" />
                  ) : (
                    <AlertCircle className="w-3 h-3 text-gray-400" />
                  )}
                  <span>At least one number</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="group">
            <label className="text-sm font-semibold text-gray-700 block mb-2">Mobile Number</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500">
                <Phone className="w-5 h-5" />
              </div>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-800 placeholder-gray-400"
                required
              />
            </div>
          </div>

          <div className="group">
            <label className="text-sm font-semibold text-gray-700 block mb-2">Profession</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500 z-10">
                <Briefcase className="w-5 h-5" />
              </div>
              <Select
                value={formData.profession}
                onValueChange={handleProfessionChange}
                required
              >
                <SelectTrigger className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-800 h-auto min-h-[3.5rem]">
                  <SelectValue
                    placeholder="Choose your profession"
                    className="text-gray-500 text-base"
                  />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-gray-200 rounded-xl shadow-xl z-50">
                  <SelectItem
                    value="student"
                    className="py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                  >
                    Student
                  </SelectItem>
                  <SelectItem
                    value="working-professional"
                    className="py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                  >
                    Working Professional
                  </SelectItem>
                  <SelectItem
                    value="freelancer"
                    className="py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                  >
                    Freelancer
                  </SelectItem>
                  <SelectItem
                    value="entrepreneur"
                    className="py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                  >
                    Entrepreneur
                  </SelectItem>
                  <SelectItem
                    value="other"
                    className="py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                  >
                    Other
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={usernameStatus === 'taken' || passwordStrength.strength === 'weak' || isLoading}
          className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden group flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              <span className="relative z-10">Create Account</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </>
          )}
        </button>
      </form>

      <div className="text-center mt-6">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="h-px bg-gray-300 flex-1"></div>
          <span className="text-gray-500 font-medium">Already have an account?</span>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>
        <button
          onClick={onToggleForm}
          className="text-blue-600 hover:text-indigo-600 font-bold text-lg transition-colors duration-300 hover:underline decoration-2 underline-offset-4"
        >
          Sign in here →
        </button>
      </div>
    </div>
  )
}

export default SignupForm
