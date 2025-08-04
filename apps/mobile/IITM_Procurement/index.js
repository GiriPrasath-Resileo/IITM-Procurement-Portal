import 'react-native-url-polyfill/auto';
import { AppRegistry } from 'react-native';
import { registerRootComponent } from 'expo';
import App from './src/App';

// Register the main application component with both methods
AppRegistry.registerComponent('main', () => App);
AppRegistry.registerComponent('IITM_Procurement', () => App);
registerRootComponent(App);
