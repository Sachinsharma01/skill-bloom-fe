import React, { useState } from 'react';
import { Mail, ArrowRight, ArrowLeft, Lock, Shield, CheckCircle } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import PasswordResetSuccess from './PasswordResetSuccess';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

const ForgotPasswordForm = ({ onBackToLogin }: ForgotPasswordFormProps) => {
  const [step, setStep] = useState<'email' | 'otp' | 'newPassword' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 1500);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      setIsLoading(true);
      // Simulate OTP verification
      setTimeout(() => {
        setIsLoading(false);
        setStep('newPassword');
      }, 1500);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      setIsLoading(true);
      // Simulate password reset
      setTimeout(() => {
        setIsLoading(false);
        setStep('success');
      }, 1500);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: '', color: '', text: '' };
    if (password.length < 6) return { strength: 'weak', color: 'text-red-500', text: 'Weak' };
    if (password.length < 10 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return { strength: 'medium', color: 'text-yellow-500', text: 'Medium' };
    }
    return { strength: 'strong', color: 'text-green-500', text: 'Strong' };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  if (step === 'success') {
    return <PasswordResetSuccess onBackToLogin={onBackToLogin} />;
  }

  if (step === 'email') {
    return (
      <div className="w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Forgot Password?
          </h2>
          <p className="text-gray-600">No worries! Enter your email and we'll send you a reset code</p>
        </div>
        
        <form onSubmit={handleEmailSubmit} className="space-y-6">
          <div className="group">
            <label className="text-sm font-semibold text-gray-700 block mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-11 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-800 placeholder-gray-400"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden group flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <span className="relative z-10">Send Reset Code</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={onBackToLogin}
            className="text-blue-600 hover:text-indigo-600 font-semibold transition-colors duration-300 hover:underline decoration-2 underline-offset-4 flex items-center space-x-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sign In</span>
          </button>
        </div>
      </div>
    );
  }

  if (step === 'otp') {
    return (
      <div className="w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Verify Code
          </h2>
          <p className="text-gray-600">We've sent a 6-digit code to {email}</p>
        </div>
        
        <form onSubmit={handleOtpSubmit} className="space-y-6">
          <div className="group">
            <label className="text-sm font-semibold text-gray-700 block mb-4 text-center">Enter Verification Code</label>
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="w-12 h-12 text-lg font-bold border-2 border-gray-200 rounded-lg focus:border-blue-500" />
                  <InputOTPSlot index={1} className="w-12 h-12 text-lg font-bold border-2 border-gray-200 rounded-lg focus:border-blue-500" />
                  <InputOTPSlot index={2} className="w-12 h-12 text-lg font-bold border-2 border-gray-200 rounded-lg focus:border-blue-500" />
                  <InputOTPSlot index={3} className="w-12 h-12 text-lg font-bold border-2 border-gray-200 rounded-lg focus:border-blue-500" />
                  <InputOTPSlot index={4} className="w-12 h-12 text-lg font-bold border-2 border-gray-200 rounded-lg focus:border-blue-500" />
                  <InputOTPSlot index={5} className="w-12 h-12 text-lg font-bold border-2 border-gray-200 rounded-lg focus:border-blue-500" />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || otp.length !== 6}
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden group flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <span className="relative z-10">Verify Code</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600 mb-2">Didn't receive the code?</p>
          <button className="text-blue-600 hover:text-indigo-600 font-semibold transition-colors duration-300 hover:underline decoration-2 underline-offset-4">
            Resend Code
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Create New Password
        </h2>
        <p className="text-gray-600">Your new password must be different from previous passwords</p>
      </div>
      
      <form onSubmit={handlePasswordSubmit} className="space-y-6">
        <div className="group">
          <label className="text-sm font-semibold text-gray-700 block mb-2">New Password</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500">
              <Lock className="w-5 h-5" />
            </div>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full pl-11 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-800 placeholder-gray-400"
              required
            />
          </div>
          {newPassword && (
            <div className="mt-2 flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${passwordStrength.strength === 'weak' ? 'bg-red-500' : passwordStrength.strength === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
              <span className={`text-sm font-medium ${passwordStrength.color}`}>
                Password strength: {passwordStrength.text}
              </span>
            </div>
          )}
        </div>

        <div className="group">
          <label className="text-sm font-semibold text-gray-700 block mb-2">Confirm Password</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500">
              <Lock className="w-5 h-5" />
            </div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full pl-11 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white text-gray-800 placeholder-gray-400"
              required
            />
          </div>
          {confirmPassword && newPassword !== confirmPassword && (
            <div className="mt-2 flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-sm font-medium text-red-500">
                Passwords do not match
              </span>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || newPassword !== confirmPassword || passwordStrength.strength === 'weak'}
          className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden group flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <span className="relative z-10">Reset Password</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
