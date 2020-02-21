'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  Image,
} from 'react-native';

import {TEAM_ICONS} from '../../constants/main';

export default class TeamConference extends Component {
  selectTeam = item => {
    const {navigation} = this.props;

    navigation.navigate('TeamView', {
      screen: 'Detail',
      params: {teamInfo: JSON.stringify(item)},
    });
  };

  renderRow = ({item, index}) => {
    return (
      <TouchableHighlight
        onPress={() => this.selectTeam(item)}
        underlayColor="transparent">
        <View style={styles.item}>
          <View style={styles.order}>
            <Text style={styles.orderLabel}>{parseInt(index, 10) + 1}</Text>
          </View>
          <View style={styles.team}>
            <Text style={styles.teamCity}>{item.teamSitesOnly.teamName}</Text>
            <Text style={styles.teamName}>
              {item.teamSitesOnly.teamNickname}
            </Text>
          </View>
          <View style={styles.standing}>
            <Text style={styles.standingLabel}>
              {`W ${item.win} - L ${item.loss}`}
            </Text>
          </View>
          <View style={styles.logo}>
            <Image
              style={styles.logoImage}
              source={TEAM_ICONS[item.teamSitesOnly.teamTricode.toLowerCase()]}
            />
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    const {data} = this.props;

    return (
      <FlatList
        data={data}
        renderItem={this.renderRow}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

const styles = StyleSheet.create({
  // item
  item: {
    height: 70,
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  // order
  order: {
    alignSelf: 'center',
    width: 50,
  },
  orderLabel: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // team
  team: {
    flex: 5,
    justifyContent: 'center',
  },
  teamCity: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  teamName: {
    color: 'white',
    fontSize: 13,
    fontWeight: '400',
  },
  // Standing
  standing: {
    alignSelf: 'center',
    flex: 3,
  },
  standingLabel: {
    color: 'white',
    textAlign: 'right',
  },
  // Logo
  logo: {
    alignSelf: 'center',
    flex: 3,
  },
  logoImage: {
    alignSelf: 'center',
    height: 35,
    width: 35,
  },
});

TeamConference.propTypes = {
  data: PropTypes.array,
  navigator: PropTypes.object,
};
