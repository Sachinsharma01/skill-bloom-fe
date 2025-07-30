
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Zap, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { makeAPICall } from '../../utils/api';
import tokenActions from '../../redux/actions/tokenActions';
import metaDataActions from '../../redux/actions/metaDataActions';

interface LoginFormProps {
  onToggleForm: () => void;
  onForgotPassword: () => void;
}

const LoginForm = ({ onToggleForm, onForgotPassword }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formData.email || !formData.password) {
      toast.error('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    makeAPICall('signin', formData).then((res: any) => {
      if (res.error ?? res.errorMessage) {
        toast.error(res.errorMessage ?? res.error);
        setIsLoading(false);
        return;
      }
      dispatch(tokenActions.setToken(res.accessToken));
      dispatch(metaDataActions.setMetaData(res.user));
      toast.success('Login successful');
      setIsLoading(false);
      navigate('/dashboard');
    });
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 mb-3">
          <Zap className="w-6 h-6 text-yellow-500 animate-pulse" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome Back!
          </h2>
        </div>
        <p className="text-gray-600">Continue your career journey</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="Enter your email"
              className="w-full pl-11 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-800 placeholder-gray-400"
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
              placeholder="Enter your password"
              className="w-full pl-11 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-800 placeholder-gray-400"
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
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center group cursor-pointer">
            <input 
              type="checkbox" 
              className="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-all duration-200"
            />
            <span className="ml-3 text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Remember me</span>
          </label>
          <button 
            type="button" 
            onClick={onForgotPassword}
            className="text-blue-600 hover:text-indigo-600 font-semibold transition-colors duration-300 hover:underline decoration-2 underline-offset-4"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden group flex items-center justify-center space-x-2"
        >
          {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>
            <span className="relative z-10">Sign In</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </>}
        </button>
      </form>

      <div className="text-center mt-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="h-px bg-gray-300 flex-1"></div>
          <span className="text-gray-500 font-medium">New to SkillBloom?</span>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>
        <button
          onClick={onToggleForm}
          className="text-blue-600 hover:text-indigo-600 font-bold text-lg transition-colors duration-300 hover:underline decoration-2 underline-offset-4"
        >
          Create an account →
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
