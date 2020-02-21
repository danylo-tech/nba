'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Image, Text, TouchableHighlight} from 'react-native';
import {COLORS} from '../../constants/main';
import moment from 'moment';

export default class TeamDetailPlayer extends Component {
  onPress = () => {
    const {player, navigation} = this.props;

    navigation.navigate('PlayerView', {
      screen: 'Detail',
      params: {personId: player.personId},
    });
  };

  render() {
    const {player} = this.props;
    const playerId = player.personId;

    return (
      <TouchableHighlight onPress={this.onPress} underlayColor="transparent">
        <View style={styles.container}>
          <View style={styles.portrait}>
            <View style={styles.portraitBackground}>
              <Image
                style={styles.portraitImage}
                source={{
                  uri: `http://stats.nba.com/media/players/230x185/${playerId}.png`,
                }}
              />
            </View>
          </View>

          <View style={styles.info}>
            <Text
              style={styles.infoName}>{`${player.temporaryDisplayName}`}</Text>
            <Text style={styles.infoPosition}>{`Position: ${player.pos}`}</Text>
          </View>

          <View style={styles.data}>
            <View style={styles.dataPerson}>
              <Text style={styles.dataPersonItem}>
                {'Age: ' +
                  moment()
                    .utc()
                    .diff(moment(player.dateOfBirthUTC), 'years')}
              </Text>
              <Text style={styles.dataPersonItem}>
                {`Height: ${player.heightMeters}m`}
              </Text>
              <Text style={styles.dataPersonItem}>
                {`Weight: ${player.weightKilograms}Kg`}
              </Text>
            </View>
            <View style={styles.dataGame}>
              <View style={styles.dataGameItem}>
                <Text style={styles.dataGameItemLabel}>Years as Pro: </Text>
                <Text style={styles.dataGameItemData}>{player.yearsPro}</Text>
              </View>
              <View style={styles.dataGameItem}>
                <Text style={styles.dataGameItemLabel}>Country: </Text>
                <Text style={styles.dataGameItemData}>{player.country}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'white',
    borderBottomWidth: 1,
    height: 60,
    flexDirection: 'row',
  },
  // Portrait
  portrait: {
    flex: 1,
    justifyContent: 'center',
  },
  portraitBackground: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    height: 36,
    width: 36,
  },
  portraitImage: {
    height: 36,
    width: 36,
    borderRadius: 18,
    borderWidth: 1,
    backgroundColor: COLORS.primary,
  },
  // Info
  info: {
    flex: 2,
    justifyContent: 'center',
  },
  infoName: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoPosition: {
    color: 'white',
    fontSize: 12,
  },
  // Data
  data: {
    flex: 5,
    justifyContent: 'center',
  },
  // Data persion
  dataPerson: {
    flexDirection: 'row',
  },
  dataPersonItem: {
    color: 'white',
    fontSize: 10,
    marginRight: 10,
  },
  // Data game
  dataGame: {
    flexDirection: 'row',
  },
  dataGameItem: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginRight: 10,
  },
  dataGameItemData: {
    color: 'white',
    fontSize: 12,
    position: 'relative',
    top: 1,
  },
  dataGameItemLabel: {
    color: 'white',
    fontSize: 9,
  },
});

TeamDetailPlayer.propTypes = {
  player: PropTypes.object,
  team: PropTypes.object,
  navigator: PropTypes.object,
};
