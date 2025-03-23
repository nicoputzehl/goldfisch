const { getDefaultConfig } = require('expo/metro-config');
const path = require('node:path');

const config = getDefaultConfig(__dirname);

// Add support for import aliases
config.resolver.extraNodeModules = {
  '@': path.resolve(__dirname, 'src'),
  '~': path.resolve(__dirname)
};

module.exports = config;