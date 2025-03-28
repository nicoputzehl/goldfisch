// Mocking @expo/vector-icons 
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  
  // Mock für alle Iconsets
  const mockIcon = ({ name, size, color }) => {
    return React.createElement(Text, {}, `Icon:${name}`);
  };

  return {
    Ionicons: mockIcon,
    MaterialCommunityIcons: mockIcon,
    AntDesign: mockIcon,
    Feather: mockIcon,
    FontAwesome: mockIcon,
    FontAwesome5: mockIcon,
    MaterialIcons: mockIcon,
    Entypo: mockIcon,
    // Weitere Icon-Sets nach Bedarf
  };
});

// Mock für TouchableOpacity und andere Animation-abhängige Komponenten
jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  
  // Ersetzt die Animation-abhängigen Implementierungen
  rn.TouchableOpacity = ({ children, ...props }) => {
    const React = require('react');
    const { View } = rn;
    return React.createElement(View, props, children);
  };
  
  // Mock für die Animated-API
  rn.Animated = {
    View: rn.View,
    Text: rn.Text,
    Image: rn.Image,
    ScrollView: rn.ScrollView,
    FlatList: rn.FlatList,
    createAnimatedComponent: (comp) => comp,
    Value: jest.fn(() => ({
      interpolate: jest.fn(),
      setValue: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
    })),
    timing: jest.fn(() => ({
      start: jest.fn(cb => cb && cb()),
    })),
    spring: jest.fn(() => ({
      start: jest.fn(cb => cb && cb()),
    })),
    parallel: jest.fn(() => ({
      start: jest.fn(cb => cb && cb()),
    })),
  };
  
  return rn;
});

// Mock für alle formspezifischen Komponenten, um die Tests zu vereinfachen
jest.mock('@/components/ui/inputs/SelectInput', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  
  return {
    SelectInput: ({ label, value, onChange, options }) => {
      return React.createElement(View, {}, [
        React.createElement(Text, { key: 'label' }, label),
        React.createElement(Text, { key: 'value' }, value),
      ]);
    },
  };
});

// Mock für den gesamten SammlungForm-Test
jest.mock('@/components/ui/Layout', () => {
  const React = require('react');
  const { View } = require('react-native');
  
  return {
    Container: ({ children, ...props }) => React.createElement(View, props, children),
    ScrollContainer: ({ children, ...props }) => React.createElement(View, props, children),
    Row: ({ children, ...props }) => React.createElement(View, { ...props, style: { flexDirection: 'row' } }, children),
    Spacer: () => null,
  };
});

jest.mock('@/components/ui/Button', () => {
  const React = require('react');
  const { TouchableOpacity, Text } = require('react-native');
  
  return {
    Button: ({ title, onPress, ...props }) => {
      return React.createElement(TouchableOpacity, { ...props, onPress }, 
        React.createElement(Text, {}, title)
      );
    },
  };
});

// Unterdrücke React-Native Warnungen im Test-Output aber nicht komplett alle Fehler
const originalConsoleError = console.error;
console.error = (...args) => {
  // Filtere die "Warning: An update to X inside a test was not wrapped in act(...)" Warnungen
  if (args[0] && typeof args[0] === 'string' && (
    args[0].includes('not wrapped in act') ||
    args[0].includes('React.jsx: type is invalid') ||
    args[0].includes('Function components cannot be given refs') ||
    args[0].includes('The above error occurred in')
  )) {
    return;
  }
  
  // Alle anderen Fehler normal ausgeben
  originalConsoleError(...args);
};
