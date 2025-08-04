import React from 'react';

// Simple web-compatible icon components
export const MaterialIcons = ({ name, size = 24, color = '#000', style, ...props }) => {
  const iconStyle = {
    fontFamily: 'Material Icons',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: size,
    color: color,
    lineHeight: 1,
    letterSpacing: 'normal',
    textTransform: 'none',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    wordWrap: 'normal',
    direction: 'ltr',
    WebkitFontFeatureSettings: 'liga',
    WebkitFontSmoothing: 'antialiased',
    ...style
  };

  // Map of common icon names to Material Icons ligatures
  const iconMap = {
    'email': 'email',
    'lock': 'lock',
    'visibility': 'visibility',
    'visibility-off': 'visibility_off',
    'person': 'person',
    'home': 'home',
    'menu': 'menu',
    'search': 'search',
    'settings': 'settings',
    'logout': 'logout',
    'dashboard': 'dashboard',
    'shopping-cart': 'shopping_cart',
    'receipt': 'receipt',
    'history': 'history',
    'notifications': 'notifications',
    'account-circle': 'account_circle',
    'arrow-back': 'arrow_back',
    'arrow-forward': 'arrow_forward',
    'check': 'check',
    'close': 'close',
    'add': 'add',
    'edit': 'edit',
    'delete': 'delete',
    'download': 'download',
    'upload': 'upload',
    'refresh': 'refresh',
    'info': 'info',
    'warning': 'warning',
    'error': 'error',
    'success': 'check_circle'
  };

  const iconName = iconMap[name] || name;

  return (
    <span style={iconStyle} {...props}>
      {iconName}
    </span>
  );
};

// FontAwesome-style icons using Unicode
export const FontAwesome = ({ name, size = 16, color = '#000', style, ...props }) => {
  const iconStyle = {
    fontSize: size,
    color: color,
    display: 'inline-block',
    ...style
  };

  // Map of common FontAwesome icon names to Unicode characters
  const iconMap = {
    'user': '👤',
    'lock': '🔒',
    'eye': '👁',
    'eye-slash': '🙈',
    'home': '🏠',
    'menu': '☰',
    'search': '🔍',
    'settings': '⚙️',
    'logout': '🚪',
    'dashboard': '📊',
    'shopping-cart': '🛒',
    'receipt': '🧾',
    'history': '📜',
    'bell': '🔔',
    'user-circle': '👤',
    'arrow-left': '←',
    'arrow-right': '→',
    'check': '✓',
    'times': '✕',
    'plus': '+',
    'edit': '✏️',
    'trash': '🗑️',
    'download': '⬇️',
    'upload': '⬆️',
    'refresh': '🔄',
    'info': 'ℹ️',
    'warning': '⚠️',
    'exclamation': '❗'
  };

  const iconChar = iconMap[name] || name;

  return (
    <span style={iconStyle} {...props}>
      {iconChar}
    </span>
  );
};

// Expo Vector Icons compatibility layer
export const Ionicons = MaterialIcons;
export const AntDesign = MaterialIcons;
export const Entypo = MaterialIcons;
export const EvilIcons = MaterialIcons;
export const Feather = MaterialIcons;
export const Foundation = MaterialIcons;
export const MaterialCommunityIcons = MaterialIcons;
export const Octicons = MaterialIcons;
export const SimpleLineIcons = MaterialIcons;
export const Zocial = MaterialIcons;

// Default export for backward compatibility
export default {
  MaterialIcons,
  FontAwesome,
  Ionicons,
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  Foundation,
  MaterialCommunityIcons,
  Octicons,
  SimpleLineIcons,
  Zocial
};
