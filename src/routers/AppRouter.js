import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MatchView from '../containers/MatchView';
import PlayerView from '../containers/PlayerView';
import {TAB_ICONS, COLORS} from '../constants/main';

const Tab = createBottomTabNavigator();

class AppRouter extends Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="MatchView"
        screenOptions={({route}) => {
          return {
            tabBarIcon: ({focused, color, size}) => {
              return (
                <Icon
                  name={TAB_ICONS[route.name]}
                  color={focused ? COLORS.primary : 'grey'}
                />
              );
            },
          };
        }}
        tabBarOptions={{
          activeTintColor: COLORS.primary,
          inactiveTintColor: 'grey',
        }}>
        <Tab.Screen
          name="MatchView"
          component={MatchView}
          options={{title: 'Matches'}}
        />
        <Tab.Screen
          name="PlayerView"
          component={PlayerView}
          options={{title: 'Players'}}
        />
        <Tab.Screen
          name="TeamView"
          component={PlayerView}
          options={{title: 'Teams'}}
        />
      </Tab.Navigator>
    );
  }
}

export default AppRouter;
