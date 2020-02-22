import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {DarkTheme} from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'react-native-elements';

import store from './stores';
import AppRouter from './routers/AppRouter';
import IntroView from './containers/IntroView';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isIntro: true,
    };
  }

  handleIntroDone = () => {
    this.setState({isIntro: false});
  };

  render() {
    return (
      <NavigationContainer theme={DarkTheme}>
        <Provider store={store}>
          <ThemeProvider>
            {this.state.isIntro ? (
              <IntroView handleIntroDone={this.handleIntroDone} />
            ) : (
              <AppRouter />
            )}
          </ThemeProvider>
        </Provider>
      </NavigationContainer>
    );
  }
}

export default App;
