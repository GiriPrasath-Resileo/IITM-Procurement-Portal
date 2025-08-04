const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Completely disable expo-router
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Remove any expo-router specific configurations
if (config.transformer && config.transformer.unstable_allowRequireContext !== undefined) {
  delete config.transformer.unstable_allowRequireContext;
}

// Add the shared workspace to the resolver
config.resolver.alias = {
  shared: path.resolve(__dirname, '../../../shared/src'),
};

// Watch for changes in the shared workspace
config.watchFolders = [
  path.resolve(__dirname, '../../../shared'),
];

// Add node modules resolution
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(__dirname, '../../../node_modules'),
];

module.exports = config;
