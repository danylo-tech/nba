import React, {Component} from 'react';
import {
  View,
  Text,
  PixelRatio,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';

import {MATCH_STATUS, TEAM_ICONS, COLORS} from '../../constants/main';

class MatchPanel extends Component {
  handleGoDetail = () => {
    const {navigation, MATCH} = this.props;

    // const gameStatus = MATCH.item.period_time.game_status;

    // if (gameStatus !== MATCH_STATUS.UNSTART) {
    navigation.navigate('MatchView', {
      screen: 'Detail',
      params: {matchDate: MATCH.item.date, matchId: MATCH.item.id},
    });
    // }
  };

  render() {
    const {MATCH} = this.props;
    const homeTeam = MATCH.item.home;
    const opTeam = MATCH.item.visitor;
    const gameStatus = MATCH.item.period_time.game_status;
    let matchStatus = '';

    switch (gameStatus) {
      case MATCH_STATUS.UNSTART:
        matchStatus = MATCH.item.period_time.period_status.replace(
          /\s*ET\s*/,
          '',
        );
        break;
      case MATCH_STATUS.LIVE:
        matchStatus = '';
        break;
      case MATCH_STATUS.OVER:
        matchStatus = 'Final';
        break;
      default:
    }

    return (
      <TouchableHighlight
        onPress={this.handleGoDetail}
        underlayColor="transparent">
        <View style={styles.container}>
          <View style={styles.team}>
            <Image
              style={styles.teamLogo}
              source={TEAM_ICONS[homeTeam.abbreviation.toLowerCase()]}
            />
            <Text style={styles.teamCity}>{homeTeam.city}</Text>
            <Text style={styles.teamName}>{homeTeam.nickname}</Text>
          </View>

          <View style={styles.gameInfo}>
            <Text
              style={[
                styles.infoProcess,
                gameStatus === MATCH_STATUS.UNSTART
                  ? styles.processUnstart
                  : '',
              ]}>
              {matchStatus}
            </Text>
            {gameStatus !== MATCH_STATUS.UNSTART && (
              <View style={styles.infoScorePanel}>
                <Text style={styles.infoScore}>{homeTeam.score}</Text>
                <View style={styles.infoDivider} />
                <Text style={styles.infoScore}>{opTeam.score}</Text>
              </View>
            )}
          </View>

          <View style={styles.team}>
            <Image
              style={styles.teamLogo}
              source={TEAM_ICONS[opTeam.abbreviation.toLowerCase()]}
            />
            <Text style={styles.teamCity}>{opTeam.city}</Text>
            <Text style={styles.teamName}>{opTeam.nickname}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

MatchPanel.propTypes = {
  MATCH: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    flexDirection: 'row',
    height: 100,
    marginHorizontal: 15,
    marginBottom: 10,
    backgroundColor: COLORS.primary,
  },
  // Team
  team: {
    alignItems: 'center',
    borderRadius: 5,
    flex: 1.5,
  },
  teamLogo: {
    width: 50,
    height: 50,
    marginTop: 10,
  },
  teamCity: {
    color: '#fff',
    fontSize: 11,
    marginTop: 2,
  },
  teamName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    position: 'relative',
    top: 0,
  },
  // Info
  gameInfo: {
    alignItems: 'center',
    flex: 1.5,
    flexDirection: 'column',
  },
  infoProcess: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 22,
    marginBottom: 3,
  },
  processUnstart: {
    fontSize: 22,
    position: 'relative',
    top: 13,
  },
  infoScorePanel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  infoScore: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 31,
    textAlign: 'center',
    width: 50,
  },
  infoDivider: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    height: 25,
    marginTop: 7,
    marginLeft: 10,
    marginRight: 10,
    width: 2 / PixelRatio.get(),
  },
});

export default MatchPanel;
