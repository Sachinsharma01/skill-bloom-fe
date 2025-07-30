
import React from 'react';
import { CheckCircle, ArrowRight, Sparkles, Heart, Trophy, Star } from 'lucide-react';

interface AccountCreationSuccessProps {
  onBackToLogin: () => void;
  userName?: string;
}

const AccountCreationSuccess = ({ onBackToLogin, userName }: AccountCreationSuccessProps) => {
  return (
    <div className="w-full max-w-md mx-auto px-4">
      {/* Success Animation */}
      <div className="relative mb-6 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-4 shadow-2xl animate-scale-in">
          <CheckCircle className="w-10 h-10 text-white animate-pulse" />
        </div>
        
        {/* Floating celebration particles */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
          <Trophy className="w-5 h-5 text-yellow-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
        <div className="absolute top-3 right-1/4">
          <Star className="w-3 h-3 text-pink-400 animate-pulse" style={{ animationDelay: '0.8s' }} />
        </div>
        <div className="absolute top-3 left-1/4">
          <Sparkles className="w-3 h-3 text-blue-400 animate-bounce" style={{ animationDelay: '1.2s' }} />
        </div>
        <div className="absolute top-6 right-1/3">
          <Heart className="w-2 h-2 text-red-400 animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>
      </div>

      {/* Welcome Message */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3 animate-fade-in">
          Welcome to SkillBloom! 🎉
        </h2>
        <p className="text-gray-600 text-base mb-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {userName ? `Congratulations ${userName}!` : 'Congratulations!'} Your account has been created successfully.
        </p>
        <p className="text-gray-500 text-sm animate-fade-in" style={{ animationDelay: '0.6s' }}>
          You're now ready to start your career transformation journey.
        </p>
      </div>

      {/* Success Stats */}
      <div className="grid grid-cols-2 gap-3 mb-5 animate-fade-in" style={{ animationDelay: '0.9s' }}>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3">
          <div className="text-xl font-bold text-blue-600 mb-1">500+</div>
          <div className="text-xs text-blue-700">Startups Waiting</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3">
          <div className="text-xl font-bold text-green-600 mb-1">1000+</div>
          <div className="text-xs text-green-700">Job Opportunities</div>
        </div>
      </div>

      {/* Manual Login Button */}
      <button
        onClick={onBackToLogin}
        className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-3.5 px-6 rounded-xl font-bold text-base hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden group flex items-center justify-center space-x-2 animate-fade-in mb-6"
        style={{ animationDelay: '1.2s' }}
      >
        <span className="relative z-10">Start Your Journey - Sign In</span>
        <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>

      {/* Motivational Footer */}
      <div className="text-center animate-fade-in" style={{ animationDelay: '1.5s' }}>
        <div className="inline-flex items-center space-x-2 text-gray-400 mb-3">
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
          <span className="text-sm">Your success story begins now</span>
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
        </div>
        
        {/* Quick benefits */}
        <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
          <span className="bg-gray-100 px-2.5 py-1 rounded-full">✨ Expert Guidance</span>
          <span className="bg-gray-100 px-2.5 py-1 rounded-full">🚀 Career Growth</span>
          <span className="bg-gray-100 px-2.5 py-1 rounded-full">💼 Dream Jobs</span>
        </div>
      </div>
    </div>
  );
};

export default AccountCreationSuccess;
