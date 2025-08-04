import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable,
  KeyboardAvoidingView, Platform
} from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
import PasswordStrength from './PasswordStrength';
import useResponsive from '../hooks/useResponsive';
import { styles } from './styles';

const AuthForm = ({ type, onSubmit, onNavigate }) => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isTV, isMobile } = useResponsive();

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.identifier) {
      newErrors.identifier = 'Email or username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (type === 'signup') {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (isSubmitting) return;
    
    if (validate()) {
      setIsSubmitting(true);
      onSubmit(formData);
      // In a real app, you'd reset submitting state after API response
      setTimeout(() => setIsSubmitting(false), 1000);
    }
  };

  const isLogin = type === 'login';
  const isSignup = type === 'signup';
  const isForgot = type === 'forgotPassword';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={[styles.form, isTV && styles.formTV]}>
        <View style={styles.header}>
          <Text style={{ fontSize: isTV ? 64 : 48, color: "#6200ea" }}>
            {isLogin ? '🔒' : isSignup ? '👤' : '🔑'}
          </Text>
          <Text style={[styles.title, isTV && styles.titleTV]}>
            {isLogin ? 'Welcome Back' : isSignup ? 'Create Account' : 'Reset Password'}
          </Text>
          <Text style={styles.subtitle}>
            {isLogin ? 'Sign in to continue' : 
             isSignup ? 'Get started with us today' : 
             'Recover your account'}
          </Text>
        </View>

        {isSignup && (
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <View style={[styles.inputContainer, errors.name && styles.inputError]}>
              <Text style={[styles.icon, { fontSize: 24, color: "#6200ea" }]}>👤</Text>
              <TextInput
                style={[styles.input, isTV && styles.inputTV]}
                placeholder="John Doe"
                value={formData.name}
                onChangeText={text => handleChange('name', text)}
                placeholderTextColor="#999"
              />
            </View>
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            {isForgot ? 'Your Email' : 'Email or Username'}
          </Text>
          <View style={[styles.inputContainer, errors.identifier && styles.inputError]}>
            <Text style={[styles.icon, { fontSize: 24, color: "#6200ea" }]}>
              {isForgot ? '📧' : '👤'}
            </Text>
            <TextInput
              style={[styles.input, isTV && styles.inputTV]}
              placeholder={isForgot ? 'email@example.com' : 'Email or username'}
              value={formData.identifier}
              onChangeText={text => handleChange('identifier', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View>
          {errors.identifier && <Text style={styles.errorText}>{errors.identifier}</Text>}
        </View>

        {(isLogin || isSignup) && (
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={[styles.inputContainer, errors.password && styles.inputError]}>
              <Text style={[styles.icon, { fontSize: 24, color: "#6200ea" }]}>🔒</Text>
              <TextInput
                style={[styles.input, isTV && styles.inputTV]}
                placeholder="Enter your password"
                secureTextEntry
                value={formData.password}
                onChangeText={text => handleChange('password', text)}
                placeholderTextColor="#999"
              />
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            {isSignup && <PasswordStrength password={formData.password} />}
          </View>
        )}

        {isSignup && (
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={[styles.inputContainer, errors.confirmPassword && styles.inputError]}>
              <Text style={[styles.icon, { fontSize: 24, color: "#6200ea" }]}>🔓</Text>
              <TextInput
                style={[styles.input, isTV && styles.inputTV]}
                placeholder="Confirm your password"
                secureTextEntry
                value={formData.confirmPassword}
                onChangeText={text => handleChange('confirmPassword', text)}
                placeholderTextColor="#999"
              />
            </View>
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
          </View>
        )}

        <Pressable 
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            isTV && styles.buttonTV,
            isSubmitting && styles.buttonDisabled
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Text style={styles.buttonText}>Processing...</Text>
          ) : (
            <Text style={styles.buttonText}>
              {isLogin ? 'Sign In' : 
               isSignup ? 'Create Account' : 'Reset Password'}
            </Text>
          )}
        </Pressable>

        <View style={styles.footer}>
          {isLogin ? (
            <>
              <Pressable onPress={() => onNavigate('forgotPassword')}>
                <Text style={styles.linkText}>Forgot Password?</Text>
              </Pressable>
              <Text style={styles.footerText}>
                Don't have an account?{' '}
                <Text style={styles.linkText} onPress={() => onNavigate('signup')}>
                  Sign Up
                </Text>
              </Text>
            </>
          ) : isSignup ? (
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text style={styles.linkText} onPress={() => onNavigate('login')}>
                Sign In
              </Text>
            </Text>
          ) : (
            <Text style={styles.footerText}>
              Remember your password?{' '}
              <Text style={styles.linkText} onPress={() => onNavigate('login')}>
                Sign In
              </Text>
            </Text>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthForm;