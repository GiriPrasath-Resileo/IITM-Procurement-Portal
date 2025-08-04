import { useState, useEffect } from 'react';

const useResponsive = () => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine device types based on screen size
  const isMobile = dimensions.width < 768;
  const isTablet = dimensions.width >= 768 && dimensions.width < 1024;
  const isDesktop = dimensions.width >= 1024 && dimensions.width < 1920;
  const isTV = dimensions.width >= 1920;

  return {
    width: dimensions.width,
    height: dimensions.height,
    isMobile,
    isTablet,
    isDesktop,
    isTV,
    isWeb: true,
    platform: 'web',
    // Additional utility properties
    isSmallScreen: isMobile || isTablet,
    isLargeScreen: isDesktop || isTV,
    orientation: dimensions.width > dimensions.height ? 'landscape' : 'portrait'
  };
};

export default useResponsive;
