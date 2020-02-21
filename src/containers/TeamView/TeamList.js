import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {handleGetConferenceStandings, handleGetPlayerList} from '../../actions';
import TeamConference from './TeamConference';
import {COLORS} from '../../constants/main';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';

class TeamList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cStandings: null,
      activeTabIndex: 0,
    };
  }

  componentDidMount() {
    this.props.handleGetPlayerList();
    this.props.handleGetConferenceStandings(cStandings => {
      this.setState({cStandings});
    });
  }

  scrollEnd = (x, y) => {
    if (x === 0) {
      this.setState({conference: 'Western'});
    } else {
      this.setState({conference: 'Eastern'});
    }
  };

  render() {
    const {cStandings} = this.state;
    const {playerList} = this.props;

    if (!cStandings || !playerList) {
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
          <Text style={styles.conference}>
            {this.state.activeTabIndex === 0 ? 'WESTERN' : 'EASTERN'}
          </Text>
          <Text style={styles.confLabel}>conference</Text>
        </View>
        <TabView
          style={styles.content}
          renderTabBar={props => (
            <TabBar
              {...props}
              style={{backgroundColor: COLORS.primary}}
              indicatorStyle={styles.tabIndicator}
              renderLabel={({route, focused, color}) => {
                return (
                  <Text style={[{color}, styles.tabLabel]}>{route.title}</Text>
                );
              }}
            />
          )}
          navigationState={{
            index: this.state.activeTabIndex,
            routes: [
              {
                key: 'Western',
                title: 'Western Conference',
              },
              {
                key: 'Eastern',
                title: 'Eastern Conference',
              },
            ],
          }}
          renderScene={SceneMap({
            Western: () => (
              <TeamConference
                data={cStandings.west}
                navigation={this.props.navigation}
              />
            ),
            Eastern: () => (
              <TeamConference
                data={cStandings.east}
                navigation={this.props.navigation}
              />
            ),
          })}
          onIndexChange={activeTabIndex => this.setState({activeTabIndex})}
          initialLayout={{
            width: Dimensions.get('window').width,
          }}
        />
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  // Header
  header: {
    backgroundColor: COLORS.primary,
    height: 150,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  content: {
    flexGrow: 1,
    backgroundColor: COLORS.secondary,
    width: Dimensions.get('window').width,
  },
  conference: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  confLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tabIndicator: {
    backgroundColor: 'white',
  },
  tabLabel: {
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => {
  return {
    playerList: state.rcGlobal.playerList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleGetConferenceStandings: cb =>
      dispatch(handleGetConferenceStandings(cb)),
    handleGetPlayerList: cb => dispatch(handleGetPlayerList(cb)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamList);
