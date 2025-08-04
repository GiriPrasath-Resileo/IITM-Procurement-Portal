
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    // Custom plugin to handle React Native and Expo compatibility
    {
      name: 'expo-web-polyfill',
      resolveId(id) {
        // Redirect react-native to react-native-web
        if (id === 'react-native') {
          return 'react-native-web';
        }

        // Block specific problematic packages
        if (id.includes('@react-native/') ||
            id.includes('@expo/metro-runtime')) {
          return false;
        }

        // Provide polyfill for expo-modules-core
        if (id === 'expo-modules-core') {
          return path.resolve(__dirname, 'src/expo-polyfill.js');
        }
      },
      load(id) {
        // Handle invariant module to provide default export
        if (id.includes('invariant/browser.js')) {
          return `
            const invariant = require('invariant/browser.js');
            export default invariant;
            export { invariant };
          `;
        }
      }
    }
  ],
  resolve: {
    alias: {
      // Complete React Native to React Native Web aliasing
      'react-native$': path.resolve(__dirname, 'node_modules/react-native-web'),
      'react-native/Libraries/EventEmitter/NativeEventEmitter': 'react-native-web/dist/exports/NativeEventEmitter',
      'react-native/Libraries/Image/AssetRegistry': 'react-native-web/dist/modules/AssetRegistry',
      'react-native/Libraries/vendor/emitter/EventEmitter': 'react-native-web/dist/vendor/react-native/emitter/EventEmitter',
      'react-native/Libraries/Animated/nodes/AnimatedProps': 'react-native-web/dist/exports/Animated',
      'react-native/Libraries/Pressability/Pressability': 'react-native-web/dist/exports/Pressable',
      'react-native/Libraries/Renderer/shims/ReactNativeTypes': 'react-native-web/dist/types',
      'react-native/src/private/animated/createAnimatedPropsHook': 'react-native-web/dist/exports/Animated',
      'react-native/src/private/animated/NativeAnimatedHelper': 'react-native-web/dist/exports/Animated',

      // Fix for invariant module
      'invariant': 'invariant/browser.js',

      // Shared alias
      'shared': path.resolve(__dirname, '../../shared/src')
    },
    extensions: ['.web.js', '.web.jsx', '.js', '.jsx', '.json', '.ts', '.tsx']
  },
  define: {
    global: 'globalThis',
    __DEV__: process.env.NODE_ENV !== 'production',
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      EXPO_OS: JSON.stringify('web'),
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
  optimizeDeps: {
    include: [
      'react-native-web',
      '@expo/vector-icons',
      'expo-constants',
      'expo-font',
      'expo-asset',
      'invariant'
    ],
    exclude: [
      'react-native',
      'expo-modules-core',
      '@expo/metro-runtime',
      '@react-native/virtualized-lists',
      '@react-native/community-cli-plugin',
      '@react-native/debugger-frontend'
    ],
    esbuildOptions: {
      loader: { '.js': 'jsx' },
      resolveExtensions: ['.web.js', '.web.jsx', '.js', '.jsx', '.json'],
      // Handle CommonJS modules
      format: 'esm',
      target: 'es2020'
    },
  },
  server: {
    fs: {
      // Allow access to workspace root and shared dependencies
      allow: [
        '..',
        '../..',
        '../../shared',
        '../../shared/node_modules',
        '../../node_modules'
      ],
      // Completely deny access to React Native files
      deny: [
        '**/node_modules/react-native/**',
        '**/node_modules/@react-native/**'
      ]
    }
  }
});
