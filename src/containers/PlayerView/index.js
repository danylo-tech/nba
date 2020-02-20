import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PlayerDetail from './PlayerDetail';
import PlayerList from './PlayerList';

const Stack = createStackNavigator();

class PlayerView extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="List" headerMode="none">
        <Stack.Screen name="List" component={PlayerList} />
        <Stack.Screen name="Detail" component={PlayerDetail} />
      </Stack.Navigator>
    );
  }
}

export default PlayerView;
