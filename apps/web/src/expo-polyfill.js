// Enhanced mock implementations for common Expo modules
const mockModules = {
  ExpoFontLoader: {
    loadAsync: async (fontFamilyName, resource) => {
      // Enhanced font loading for web
      if (typeof document !== 'undefined') {
        try {
          let fontUrl = resource;

          // Handle different resource formats
          if (typeof resource === 'object') {
            if (resource.uri) {
              fontUrl = resource.uri;
            } else if (resource.default) {
              fontUrl = resource.default;
            } else {
              // For Material Icons and other icon fonts, use Google Fonts
              if (fontFamilyName.toLowerCase().includes('material')) {
                fontUrl = 'https://fonts.googleapis.com/icon?family=Material+Icons';
                // Load via link tag for Google Fonts
                const existingLink = document.querySelector(`link[href*="Material+Icons"]`);
                if (!existingLink) {
                  const link = document.createElement('link');
                  link.rel = 'stylesheet';
                  link.href = fontUrl;
                  document.head.appendChild(link);
                }
              } else {
                console.warn(`Unknown resource format for font ${fontFamilyName}:`, resource);
                return Promise.resolve();
              }
            }
          }

          // Only use FontFace API for actual font URLs
          if (typeof fontUrl === 'string' && fontUrl.startsWith('http') && !fontUrl.includes('googleapis.com')) {
            const fontFace = new FontFace(fontFamilyName, `url(${fontUrl})`);
            await fontFace.load();
            document.fonts.add(fontFace);
          }

          // Add to loaded fonts list
          if (!globalThis._loadedFonts) {
            globalThis._loadedFonts = new Set();
          }
          globalThis._loadedFonts.add(fontFamilyName);
        } catch (error) {
          console.warn(`Failed to load font ${fontFamilyName}:`, error);
          // Still mark as loaded to prevent repeated attempts
          if (!globalThis._loadedFonts) {
            globalThis._loadedFonts = new Set();
          }
          globalThis._loadedFonts.add(fontFamilyName);
        }
      }
      return Promise.resolve();
    },
    unloadAsync: async (fontFamilyName) => {
      if (typeof document !== 'undefined' && document.fonts) {
        // Remove font from document fonts
        for (const font of document.fonts) {
          if (font.family === fontFamilyName) {
            document.fonts.delete(font);
          }
        }
        // Remove from loaded fonts list
        if (globalThis._loadedFonts) {
          globalThis._loadedFonts.delete(fontFamilyName);
        }
      }
      return Promise.resolve();
    },
    getLoadedFonts: () => {
      // Return list of loaded fonts
      if (!globalThis._loadedFonts) {
        globalThis._loadedFonts = new Set();
      }
      return Array.from(globalThis._loadedFonts);
    },
    isLoaded: (fontFamilyName) => {
      // Check if a specific font is loaded
      if (!globalThis._loadedFonts) {
        globalThis._loadedFonts = new Set();
      }
      return globalThis._loadedFonts.has(fontFamilyName);
    },
    isLoadedAsync: async (fontFamilyName) => {
      // Async version of isLoaded
      if (!globalThis._loadedFonts) {
        globalThis._loadedFonts = new Set();
      }
      return Promise.resolve(globalThis._loadedFonts.has(fontFamilyName));
    },
  },
  ExpoHaptics: {
    impactAsync: async (style) => {
      // Try to use web vibration API if available
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        const duration = style === 'light' ? 10 : style === 'medium' ? 20 : 30;
        navigator.vibrate(duration);
      }
      return Promise.resolve();
    },
    notificationAsync: async () => Promise.resolve(),
    selectionAsync: async () => {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(5);
      }
      return Promise.resolve();
    },
  },
  ExpoConstants: {
    appOwnership: 'expo',
    deviceName: 'Web Browser',
    platform: { web: true },
    isDevice: false,
    expoVersion: '53.0.0',
    statusBarHeight: 0,
    systemFonts: [],
    getWebViewUserAgentAsync: async () => navigator.userAgent || 'Unknown',
  },
  ExponentConstants: {
    appOwnership: 'expo',
    deviceName: 'Web Browser',
    platform: { web: true },
    isDevice: false,
    expoVersion: '53.0.0',
    statusBarHeight: 0,
    systemFonts: [],
    getWebViewUserAgentAsync: async () => navigator.userAgent || 'Unknown',
  },
  ExpoAsset: {
    downloadAsync: async (assets) => {
      // Mock asset download - in web, assets are typically already available
      const assetArray = Array.isArray(assets) ? assets : [assets];
      return Promise.resolve(assetArray.map(asset => ({
        ...asset,
        downloaded: true,
        localUri: asset.uri || asset.localUri,
      })));
    },
    fromModule: (moduleId) => {
      // Mock asset from module
      return {
        name: 'asset',
        type: 'unknown',
        uri: moduleId,
        localUri: moduleId,
        downloaded: true,
        downloadAsync: async () => Promise.resolve(),
      };
    },
    fromURI: (uri) => {
      // Mock asset from URI
      return {
        name: 'asset',
        type: 'unknown',
        uri: uri,
        localUri: uri,
        downloaded: true,
        downloadAsync: async () => Promise.resolve(),
      };
    },
  },
  ExpoWebBrowser: {
    openBrowserAsync: async (url, options = {}) => {
      if (typeof window !== 'undefined') {
        const target = options.showInRecents === false ? '_blank' : '_blank';
        window.open(url, target);
      }
      return Promise.resolve({ type: 'opened' });
    },
    dismissBrowser: async () => Promise.resolve(),
  },
  ExpoFileSystem: {
    documentDirectory: 'file:///',
    cacheDirectory: 'file:///',
    readAsStringAsync: async () => Promise.resolve(''),
    writeAsStringAsync: async () => Promise.resolve(),
    deleteAsync: async () => Promise.resolve(),
    makeDirectoryAsync: async () => Promise.resolve(),
    getInfoAsync: async () => Promise.resolve({ exists: false }),
  },
  ExpoSplashScreen: {
    hideAsync: async () => Promise.resolve(),
    preventAutoHideAsync: async () => Promise.resolve(),
  },
  ExpoStatusBar: {
    setStatusBarStyle: () => {},
    setStatusBarBackgroundColor: () => {},
    setStatusBarTranslucent: () => {},
    setStatusBarHidden: () => {},
  },
};

// Polyfill for Expo modules in web environment
if (typeof globalThis !== 'undefined' && !globalThis.expo) {
  // Create a mock NativeModule constructor
  function NativeModule(name) {
    return {
      addListener: () => ({ remove: () => {} }),
      removeListeners: () => {},
      removeAllListeners: () => {},
      emit: () => {},
      // Add other common native module methods as needed
    };
  }

  globalThis.expo = {
    NativeModule,
    modules: mockModules,
    // Add requireOptionalNativeModule function
    requireOptionalNativeModule: function(moduleName) {
      const module = mockModules[moduleName];
      if (!module) {
        // For optional modules, we can return a generic mock instead of null
        // This prevents many "module not found" errors
        console.warn(`Creating generic mock for optional native module '${moduleName}'`);
        const genericMock = {
          addListener: () => ({ remove: () => {} }),
          removeListeners: () => {},
          removeAllListeners: () => {},
          emit: () => {},
          // Add common async methods that return resolved promises
          ...Object.fromEntries(
            ['loadAsync', 'unloadAsync', 'downloadAsync', 'hideAsync', 'preventAutoHideAsync']
              .map(method => [method, async () => Promise.resolve()])
          ),
        };
        // Cache the mock for future use
        mockModules[moduleName] = genericMock;
        return genericMock;
      }
      return module;
    },
    // Add requireNativeModule function that throws if module not found
    requireNativeModule: function(moduleName) {
      const module = mockModules[moduleName];
      if (!module) {
        // Create a generic mock module for unknown modules
        console.warn(`Creating generic mock for missing native module '${moduleName}'`);
        const genericMock = {
          addListener: () => ({ remove: () => {} }),
          removeListeners: () => {},
          removeAllListeners: () => {},
          emit: () => {},
          // Add common async methods that return resolved promises
          ...Object.fromEntries(
            ['loadAsync', 'unloadAsync', 'downloadAsync', 'hideAsync', 'preventAutoHideAsync']
              .map(method => [method, async () => Promise.resolve()])
          ),
        };
        // Cache the mock for future use
        mockModules[moduleName] = genericMock;
        return genericMock;
      }
      return module;
    },
    // Add other expo globals as needed
  };

  // Also add modules to global scope for requireNativeModule
  Object.keys(mockModules).forEach(moduleName => {
    globalThis.expo[moduleName] = mockModules[moduleName];
  });

  // Register web globals function
  globalThis.expo.registerWebGlobals = function() {
    // This function is called by ensureNativeModulesAreInstalled
    return true;
  };
}

// Ensure window.global is set for compatibility
if (typeof window !== 'undefined' && !window.global) {
  window.global = globalThis;
}

// Pre-load Material Icons font
if (typeof document !== 'undefined') {
  // Ensure Material Icons are available
  if (!globalThis._loadedFonts) {
    globalThis._loadedFonts = new Set();
  }

  // Mark Material Icons as loaded since we're loading them via HTML link tags
  globalThis._loadedFonts.add('Material Icons');
  globalThis._loadedFonts.add('MaterialIcons');
  globalThis._loadedFonts.add('material');
  globalThis._loadedFonts.add('Material Icons Outlined');
}

// Polyfill for process if not available
if (typeof globalThis !== 'undefined' && !globalThis.process) {
  globalThis.process = {
    env: {
      NODE_ENV: 'development',
      EXPO_OS: 'web'
    }
  };
}


