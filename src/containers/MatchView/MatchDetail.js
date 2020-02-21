import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  PixelRatio,
  Dimensions,
  Image,
} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

import {handleGetMatchDetail, handleGetLeagueStandings} from '../../actions';
import {COLORS, MATCH_STATUS, TEAM_ICONS} from '../../constants/main';
import MatchPlayers from './MatchPlayers';

class MatchDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matchDetail: null,
      leagueStandings: null,
      activeTabIndex: 0,
    };

    this.timerId = null;
    this.mounted = false;
  }

  componentDidMount() {
    this.handleLoadMatchDetail();
  }

  UNSAFE_componentWillMount() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  handleLoadMatchDetail = () => {
    const {matchId, matchDate} = this.props.route.params;
    this.props.handleGetMatchDetail(matchId, matchDate, matchDetail => {
      const {navigation} = this.props;

      if (navigation.isFocused()) {
        this.setState({matchDetail});
      }

      if (matchDetail.period_time.game_status === MATCH_STATUS.LIVE) {
        if (this.timerId) {
          clearTimeout(this.timerId);
        }

        setTimeout(this.handleLoadMatchDetail, 10000);
      }
    });
    this.props.handleGetLeagueStandings(matchDate, leagueStandings =>
      this.setState({leagueStandings}),
    );
  };

  getTeamStandings(teamId) {
    const {leagueStandings} = this.state;

    if (!leagueStandings) {
      return '•••';
    }

    const tIdx = leagueStandings.findIndex(e => e.id === teamId);

    if (tIdx === -1) {
      return '';
    }

    return `${leagueStandings[tIdx].team_stats.wins} - ${leagueStandings[tIdx].team_stats.losses}`;
  }

  render() {
    const {matchDetail} = this.state;

    if (!matchDetail) {
      return (
        <View style={styles.container}>
          <View style={styles.loadingIndicator}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        </View>
      );
    }

    const homeTeam = matchDetail.home;
    const opTeam = matchDetail.visitor;
    const gameStatus = matchDetail.period_time.game_status;
    let matchStatus = '';

    switch (gameStatus) {
      case MATCH_STATUS.UNSTART:
        matchStatus = matchDetail.period_time.period_status.replace(
          /\s*ET\s*/,
          '',
        );
        break;
      case MATCH_STATUS.LIVE:
        matchStatus = `${matchDetail.period_time.period_status} ${matchDetail.period_time.game_clock}`;
        break;
      case MATCH_STATUS.OVER:
        matchStatus = matchDetail.period_time.period_status;
        break;
      default:
    }

    return (
      <View style={styles.container}>
        <View style={styles.matchTotalInfo}>
          <View style={styles.team}>
            <Image
              style={styles.teamLogo}
              source={TEAM_ICONS[homeTeam.abbreviation.toLowerCase()]}
            />
            <Text style={styles.teamCity}>{homeTeam.city}</Text>
            <Text style={styles.teamName}>{homeTeam.nickname}</Text>
            <Text style={styles.standing}>
              {this.getTeamStandings(homeTeam.id)}
            </Text>
          </View>

          <View style={styles.matchInfo}>
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
                <View style={styles.infoScoreBlock}>
                  <Text style={styles.infoSide}>Home</Text>
                  <Text style={styles.infoScore}>{homeTeam.score}</Text>
                </View>
                <View style={styles.infoDivider} />
                <View style={styles.infoScoreBlock}>
                  <Text style={styles.infoSide}>Away</Text>
                  <Text style={styles.infoScore}>{opTeam.score}</Text>
                </View>
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
            <Text style={styles.standing}>
              {this.getTeamStandings(opTeam.id)}
            </Text>
          </View>
        </View>
        {gameStatus !== MATCH_STATUS.UNSTART && (
          <TabView
            style={{backgroundColor: COLORS.secondary}}
            renderTabBar={props => (
              <TabBar
                {...props}
                style={{backgroundColor: COLORS.primary}}
                indicatorStyle={styles.tabIndicator}
                renderLabel={({route, focused, color}) => {
                  return (
                    <Text style={[{color}, styles.tabLabel]}>
                      {route.title}
                    </Text>
                  );
                }}
              />
            )}
            navigationState={{
              index: this.state.activeTabIndex,
              routes: [
                {
                  key: 'homeTeam',
                  title: `${homeTeam.city.toUpperCase()} ${homeTeam.nickname.toUpperCase()}`,
                },
                {
                  key: 'opTeam',
                  title: `${opTeam.city.toUpperCase()} ${opTeam.nickname.toUpperCase()}`,
                },
              ],
            }}
            renderScene={SceneMap({
              homeTeam: () => <MatchPlayers teamData={homeTeam} />,
              opTeam: () => <MatchPlayers teamData={opTeam} />,
            })}
            onIndexChange={activeTabIndex => this.setState({activeTabIndex})}
            initialLayout={{
              width: Dimensions.get('window').width,
            }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  loadingIndicator: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchTotalInfo: {
    height: 200,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    position: 'relative',
    paddingLeft: 15,
    paddingTop: 50,
  },
  // Team
  team: {
    alignItems: 'center',
    flex: 1,
  },
  teamLogo: {
    width: 75,
    height: 75,
  },
  teamCity: {
    fontWeight: 'bold',
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
  standing: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
  },
  matchInfo: {
    alignItems: 'center',
    flex: 1.5,
    flexDirection: 'column',
  },
  infoProcess: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 18,
    marginBottom: 3,
  },
  processUnstart: {
    fontSize: 20,
    position: 'relative',
    top: 9,
  },
  infoScorePanel: {
    flex: 1,
    flexDirection: 'row',
  },
  infoScoreBlock: {
    alignItems: 'center',
    width: 60,
  },
  infoScore: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 28,
  },
  infoSide: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 6,
  },
  infoDivider: {
    backgroundColor: 'white',
    marginTop: 7,
    marginLeft: 15,
    marginRight: 15,
    width: 2 / PixelRatio.get(),
    height: 55,
  },
  tabIndicator: {
    backgroundColor: 'white',
  },
  tabLabel: {
    fontWeight: 'bold',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    handleGetMatchDetail: (matchId, matchDate, cb) =>
      dispatch(handleGetMatchDetail(matchId, matchDate, cb)),
    handleGetLeagueStandings: (matchDate, cb) =>
      dispatch(handleGetLeagueStandings(matchDate, cb)),
  };
};

export default connect(null, mapDispatchToProps)(MatchDetail);
