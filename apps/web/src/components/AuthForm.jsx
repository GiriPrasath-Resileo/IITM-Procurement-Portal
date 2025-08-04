import React, { useState } from 'react';
import { MaterialIcons } from './WebIcons';

const AuthForm = ({ type, onSubmit, onNavigate }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  };

  const linkButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '14px'
  };

  const containerStyle = {
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center', marginBottom: '10px', color: '#333', fontSize: '24px', fontWeight: 'bold' }}>
        IITM Procurement Portal
      </h1>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#666', fontSize: '18px' }}>
        {type === 'login' ? 'Login' : type === 'signup' ? 'Sign Up' : 'Reset Password'}
      </h2>

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        {type === 'signup' && (
          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              style={inputStyle}
            />
          </div>
        )}

        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        {type !== 'forgotPassword' && (
          <div style={{ marginBottom: '15px', position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <MaterialIcons name={showPassword ? 'visibility-off' : 'visibility'} size={20} />
            </button>
          </div>
        )}

        {type === 'signup' && (
          <div style={{ marginBottom: '15px', position: 'relative' }}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              required
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <MaterialIcons name={showConfirmPassword ? 'visibility-off' : 'visibility'} size={20} />
            </button>
          </div>
        )}

        <button type="submit" style={buttonStyle}>
          {type === 'login' ? 'Login' : type === 'signup' ? 'Sign Up' : 'Reset Password'}
        </button>
      </form>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        {type === 'login' && (
          <>
            <button
              onClick={() => onNavigate('forgotPassword')}
              style={{ ...linkButtonStyle, marginRight: '15px' }}
            >
              Forgot Password?
            </button>
            <button
              onClick={() => onNavigate('signup')}
              style={linkButtonStyle}
            >
              Don't have an account? Sign Up
            </button>
          </>
        )}

        {type === 'signup' && (
          <button
            onClick={() => onNavigate('login')}
            style={linkButtonStyle}
          >
            Already have an account? Login
          </button>
        )}

        {type === 'forgotPassword' && (
          <button
            onClick={() => onNavigate('login')}
            style={linkButtonStyle}
          >
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
