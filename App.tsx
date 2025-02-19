import {Text, LogBox, TextInput} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {PaperProvider} from 'react-native-paper';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import BootSplash from 'react-native-bootsplash';
import Toast from 'react-native-toast-message';

interface TextWithDefaultProps extends Text {
  defaultProps?: {allowFontScaling?: boolean};
}

interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: {allowFontScaling?: boolean};
}
//Textinput sizes
(Text as unknown as TextWithDefaultProps).defaultProps =
  (Text as unknown as TextWithDefaultProps).defaultProps || {};
(Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling =
  false;
(TextInput as unknown as TextInputWithDefaultProps).defaultProps =
  (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
(
  TextInput as unknown as TextInputWithDefaultProps
).defaultProps!.allowFontScaling = false;

LogBox.ignoreAllLogs();

export const navigationRef = createNavigationContainerRef();

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => BootSplash.hide({fade: true})}>
          <StackNavigator />
          <Toast position="top" />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
