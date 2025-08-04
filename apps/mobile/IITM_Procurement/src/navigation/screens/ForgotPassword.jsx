import React from 'react';
import AuthForm from '../../../../../../shared/src/components/AuthForm';
import { ROUTES } from '../../../../../../shared/src/constants/routes';

const ForgotPasswordScreen = ({ navigation }) => {
  const handleSubmit = (data) => {
    console.log('Password reset data:', data);
    navigation.navigate(ROUTES.LOGIN);
  };
  
  const handleNavigate = (route) => {
    navigation.navigate(route);
  };
  
  return (
    <AuthForm 
      type="forgotPassword" 
      onSubmit={handleSubmit} 
      onNavigate={handleNavigate} 
    />
  );
};

export default ForgotPasswordScreen;