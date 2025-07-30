
import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, Sparkles, Heart } from 'lucide-react';

interface PasswordResetSuccessProps {
  onBackToLogin: () => void;
}

const PasswordResetSuccess = ({ onBackToLogin }: PasswordResetSuccessProps) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onBackToLogin();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onBackToLogin]);

  return (
    <div className="w-full text-center">
      {/* Success Animation */}
      <div className="relative mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-6 shadow-2xl animate-scale-in">
          <CheckCircle className="w-12 h-12 text-white animate-pulse" />
        </div>
        
        {/* Floating particles */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
          <Sparkles className="w-6 h-6 text-yellow-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
        <div className="absolute top-4 right-1/4">
          <Heart className="w-4 h-4 text-pink-400 animate-pulse" style={{ animationDelay: '0.8s' }} />
        </div>
        <div className="absolute top-4 left-1/4">
          <Sparkles className="w-4 h-4 text-blue-400 animate-bounce" style={{ animationDelay: '1.2s' }} />
        </div>
      </div>

      {/* Success Message */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 animate-fade-in">
          Password Reset Successfully! 🎉
        </h2>
        <p className="text-gray-600 text-lg mb-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Your password has been updated securely.
        </p>
        <p className="text-gray-500 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          You can now sign in with your new password.
        </p>
      </div>

      {/* Countdown and Redirect Info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 mb-6 animate-fade-in" style={{ animationDelay: '0.9s' }}>
        <div className="flex items-center justify-center space-x-2 mb-3">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-blue-700 font-medium">Auto-redirecting in</span>
        </div>
        <div className="text-3xl font-bold text-blue-600 mb-2">
          {countdown}
        </div>
        <div className="text-sm text-blue-600">
          seconds to login page
        </div>
      </div>

      {/* Manual Redirect Button */}
      <button
        onClick={onBackToLogin}
        className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden group flex items-center justify-center space-x-2 animate-fade-in"
        style={{ animationDelay: '1.2s' }}
      >
        <span className="relative z-10">Go to Sign In Now</span>
        <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>

      {/* Decorative Elements */}
      <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '1.5s' }}>
        <div className="inline-flex items-center space-x-2 text-gray-400">
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <span className="text-sm">Welcome back to your journey</span>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
