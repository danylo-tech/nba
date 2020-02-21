import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TeamList from './TeamList';
import TeamDetail from './TeamDetail';

const Stack = createStackNavigator();

class TeamView extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="List" headerMode="none">
        <Stack.Screen name="List" component={TeamList} />
        <Stack.Screen name="Detail" component={TeamDetail} />
      </Stack.Navigator>
    );
  }
}

export default TeamView;
