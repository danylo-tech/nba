import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {COLORS} from '../../constants/main';
import {ScrollView} from 'react-native-gesture-handler';
import {handleGetPlayerProfile, handleGetPlayerLog} from '../../actions';
import PlayerLog from './PlayerLog';
import PlayerTrend from './PlayerTrend';

class PlayerDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerDetail: null,
      // playerLog: null,
    };
  }

  componentDidMount() {
    const {personId} = this.props.route.params;

    this.props.handleGetPlayerProfile(personId, playerDetail =>
      this.setState({playerDetail}),
    );
    // this.props.handleGetPlayerLog(personId, 2019, playerLog => {
    //   this.setState({playerLog});
    // });
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.route.params.personId !== this.props.route.params.personId) {
      this.setState({playerDetail: null});
      this.props.handleGetPlayerProfile(
        nextProps.route.params.personId,
        playerDetail => this.setState({playerDetail}),
      );
    }
    return true;
  }

  render() {
    const {personId} = this.props.route.params;
    const {playerList} = this.props;
    const {playerDetail /* , playerLog */} = this.state;

    const playerImage = `http://stats.nba.com/media/players/230x185/${personId}.png`;
    const playerBasic = playerList.find(p => p.personId === personId);

    if (!playerDetail /* || !playerLog */) {
      return (
        <View style={styles.container}>
          <View style={styles.loadingIndicator}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.portraitView}>
            <Image
              style={styles.portrait}
              source={{
                uri: playerImage,
              }}
            />
          </View>
          <Text style={styles.name}>
            {playerBasic.firstName + ' ' + playerBasic.lastName}
          </Text>
          <Text style={styles.jersey}>{playerBasic.jersey}</Text>
          <View style={styles.basicData}>
            <View style={styles.basicDataBlock}>
              <Text style={styles.basicDataNumber}>
                {playerDetail.stats.careerSummary.ppg}
              </Text>
              <Text style={styles.basicDataMark}>Points</Text>
            </View>
            <View style={styles.basicDataBlock}>
              <Text style={styles.basicDataNumber}>
                {playerDetail.stats.careerSummary.apg}
              </Text>
              <Text style={styles.basicDataMark}>Assists</Text>
            </View>
            <View style={styles.basicDataBlock}>
              <Text style={styles.basicDataNumber}>
                {playerDetail.stats.careerSummary.rpg}
              </Text>
              <Text style={styles.basicDataMark}>Rebounds</Text>
            </View>
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          <View>
            <PlayerLog data={playerDetail.stats.regularSeason.season} />
            <View style={styles.logDivider} />
            <PlayerTrend
              data={playerDetail.stats.regularSeason.season}
              color={COLORS.primary}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
  },
  loadingIndicator: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Header part
  header: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    flexDirection: 'column',
    height: 200,
    paddingTop: 50,
  },
  portraitView: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    fontWeight: 'bold',
    borderRadius: 60,
    marginTop: 5,
    height: 60,
    width: 60,
  },
  portrait: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  name: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
  jersey: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 14,
  },
  // Basic data
  basicData: {
    flexDirection: 'row',
    height: 28,
    justifyContent: 'center',
  },
  basicDataBlock: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 100,
  },
  basicDataNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 19,
    marginRight: 3,
  },
  basicDataMark: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    position: 'relative',
    bottom: 1,
  },
  // Divider
  scrollView: {
    flexGrow: 1,
    backgroundColor: COLORS.secondary,
  },
  logDivider: {
    backgroundColor: '#eee',
    height: 3,
    marginHorizontal: 10,
    marginVertical: 15,
  },
});

const mapStateToProps = state => {
  return {
    playerList: state.rcGlobal.playerList,
    teamList: state.rcGlobal.teamList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleGetPlayerProfile: (personId, cb) =>
      dispatch(handleGetPlayerProfile(personId, cb)),
    handleGetPlayerLog: (personId, year, cb) =>
      dispatch(handleGetPlayerLog(personId, year, cb)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDetail);
