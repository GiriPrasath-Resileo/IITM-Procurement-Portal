import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../../../../../shared/src/constants/routes';
import LoginScreen from './screens/Login';
import SignupScreen from './screens/SignUp';
import ForgotPasswordScreen from './screens/ForgotPassword';
import { DashboardScreen } from './screens/Dashboard';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.LOGIN}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#f5f5f5' }
      }}
    >
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTES.SIGNUP} component={SignupScreen} />
      <Stack.Screen 
        name={ROUTES.FORGOT_PASSWORD} 
        component={ForgotPasswordScreen} 
      />
      <Stack.Screen name={ROUTES.DASHBOARD} component={DashboardScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;