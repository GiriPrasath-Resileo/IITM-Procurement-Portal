import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import useResponsive from '../hooks/useResponsive';
import { styles } from './styles';

const ForgotPasswordScreen = () => {
  const navigate = useNavigate();
  const { isTV } = useResponsive();
  
  const handleSubmit = (data) => {
    console.log('Password reset data:', data);
    navigate('/');
  };
  
  const handleNavigate = (route) => {
    if (route === 'login') navigate('/');
    if (route === 'signup') navigate('/signup');
  };
  
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <AuthForm
        type="forgotPassword"
        onSubmit={handleSubmit}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default ForgotPasswordScreen;