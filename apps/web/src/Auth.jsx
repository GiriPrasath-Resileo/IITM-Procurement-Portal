import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './screens/Login';
import SignupScreen from './screens/SignUp';
import ForgotPasswordScreen from './screens/ForgotPassword';
import { DashboardScreen } from './screens/Dashboard';

const Auth = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
      </Routes>
    </Router>
  );
};

export default Auth;