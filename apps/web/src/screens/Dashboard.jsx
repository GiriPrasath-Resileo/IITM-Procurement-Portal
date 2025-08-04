import React from 'react';

export const DashboardScreen = () => {
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
      <div style={{
        textAlign: 'center',
        maxWidth: '600px',
        padding: '40px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '16px'
        }}>
          Welcome to your Dashboard!
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#666',
          marginBottom: '32px'
        }}>
          You have successfully logged into the IITM Procurement Portal.
        </p>
        <div style={{
          padding: '24px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{
            fontSize: '20px',
            color: '#333',
            marginBottom: '12px'
          }}>
            Quick Actions
          </h3>
          <p style={{
            color: '#666',
            fontSize: '16px'
          }}>
            Dashboard features will be available here.
          </p>
        </div>
      </div>
    </div>
  );
};
