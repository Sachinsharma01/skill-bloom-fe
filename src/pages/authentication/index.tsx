
import React, { useState } from 'react';
import AuthLayout from '../../components/authentication/AuthLayout' ;
import SignupForm from '../../components/authentication/SignupForm';
import LoginForm from '../../components/authentication/LoginForm';
import ForgotPasswordForm from '../../components/authentication/ForgotPasswordForm';

const Authentication = () => {
  const [currentView, setCurrentView] = useState<'login' | 'signup' | 'forgotPassword'>('signup');

  const toggleForm = () => {
    setCurrentView(currentView === 'login' ? 'signup' : 'login');
  };

  const showForgotPassword = () => {
    setCurrentView('forgotPassword');
  };

  const backToLogin = () => {
    setCurrentView('login');
  };

  return (
    <AuthLayout>
      <div className="transition-all duration-300 ease-in-out">
        {currentView === 'login' && (
          <LoginForm onToggleForm={toggleForm} onForgotPassword={showForgotPassword} />
        )}
        {currentView === 'signup' && (
          <SignupForm onToggleForm={toggleForm} />
        )}
        {currentView === 'forgotPassword' && (
          <ForgotPasswordForm onBackToLogin={backToLogin} />
        )}
      </div>
    </AuthLayout>
  );
};

export default Authentication;
