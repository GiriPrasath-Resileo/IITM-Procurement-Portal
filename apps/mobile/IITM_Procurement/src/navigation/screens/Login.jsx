import React from 'react';
import AuthForm from '../../../../../../shared/src/components/AuthForm';
import { ROUTES } from '../../../../../../shared/src/constants/routes';

const LoginScreen = ({ navigation }) => {
  const handleSubmit = (data) => {
    console.log('Login data:', data);
    navigation.navigate(ROUTES.DASHBOARD);
  };
  
  const handleNavigate = (route) => {
    navigation.navigate(route);
  };
  
  return (
    <AuthForm 
      type="login" 
      onSubmit={handleSubmit} 
      onNavigate={handleNavigate} 
    />
  );
};

export default LoginScreen;