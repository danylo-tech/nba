import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MatchDetail from './MatchDetail';
import MatchList from './MatchList';

const Stack = createStackNavigator();

class MatchView extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="List" headerMode="none">
        <Stack.Screen name="List" component={MatchList} />
        <Stack.Screen name="Detail" component={MatchDetail} />
      </Stack.Navigator>
    );
  }
}

export default MatchView;
