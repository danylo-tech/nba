import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {DarkTheme} from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'react-native-elements';

import store from './stores';
import AppRouter from './routers/AppRouter';

class App extends Component {
  render() {
    return (
      <NavigationContainer theme={DarkTheme}>
        <Provider store={store}>
          <ThemeProvider>
            <AppRouter />
          </ThemeProvider>
        </Provider>
      </NavigationContainer>
    );
  }
}

export default App;
