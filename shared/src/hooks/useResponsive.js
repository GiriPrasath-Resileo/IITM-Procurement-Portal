import { Dimensions, Platform } from 'react-native';

// This function creates the hook using the React instance from the consuming app
export function createUseResponsive(useState, useEffect) {
  return function useResponsive() {
    const [dimensions, setDimensions] = useState({
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    });

    useEffect(() => {
      const onChange = ({ window }) => {
        setDimensions({
          width: window.width,
          height: window.height
        });
      };

      const subscription = Dimensions.addEventListener('change', onChange);
      return () => subscription?.remove();
    }, []);

    const width = dimensions.width;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024 && width < 1920;
    const isTV = width >= 1920;
    const isWeb = Platform.OS === 'web';

    return {
      width,
      height: dimensions.height,
      isMobile,
      isTablet,
      isDesktop,
      isTV,
      isWeb,
      platform: Platform.OS
    };
  };
}

// Default export that tries to use React from global context
export default function useResponsive() {
  // This will use the React from the consuming app's context
  const React = require('react');
  const { useState, useEffect } = React;

  return createUseResponsive(useState, useEffect)();
}