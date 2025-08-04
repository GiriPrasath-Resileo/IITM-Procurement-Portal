import React from 'react';
import AuthForm from '../../../../../../shared/src/components/AuthForm';
import { ROUTES } from '../../../../../../shared/src/constants/routes';

const SignupScreen = ({ navigation }) => {
  const handleSubmit = (data) => {
    console.log('Signup data:', data);
    navigation.navigate(ROUTES.DASHBOARD);
  };
  
  const handleNavigate = (route) => {
    navigation.navigate(route);
  };
  
  return (
    <AuthForm 
      type="signup" 
      onSubmit={handleSubmit} 
      onNavigate={handleNavigate} 
    />
  );
};

export default SignupScreen;