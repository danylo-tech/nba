import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {handleGetPlayerList, handleGetTeamList} from '../../actions';
import {COLORS} from '../../constants/main';

class PlayerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
    };
  }

  componentDidMount() {
    this.props.handleGetPlayerList();
    this.props.handleGetTeamList();
  }

  selectPlayer = player => {
    const {navigation} = this.props;

    navigation.navigate('PlayerView', {
      screen: 'Detail',
      params: {personId: player.personId},
    });
  };

  renderRow = ({index, item}) => {
    const {teamList} = this.props;
    const fullName = `${item.firstName} ${item.lastName}`;
    const playerTeam = teamList.find(e => e.teamId === item.teamId);

    return (
      <TouchableHighlight
        onPress={() => this.selectPlayer(item)}
        underlayColor="transparent">
        <View style={styles.panel}>
          <View style={styles.panelLeft}>
            <Text style={styles.panelName}>{fullName}</Text>
            <Text style={styles.panelTeam}>
              {playerTeam ? playerTeam.fullName : 'Unknown'}
            </Text>
          </View>
          <View style={styles.panelRight}>
            <Icon
              name="arrow-right"
              size={16}
              color="white"
              style={styles.enterIcon}
            />
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  getSearchedItems = () => {
    const {playerList, teamList} = this.props;
    const {keyword} = this.state;

    return playerList.filter(e => {
      const playerTeam = teamList.find(t => t.teamId === e.teamId);
      const fullName = `${e.firstName.toLowerCase()} ${e.lastName.toLowerCase()}`;
      const teamName = (playerTeam ? playerTeam.fullName : '').toLowerCase();

      return (
        fullName.includes(keyword.toLowerCase()) ||
        teamName.includes(keyword.toLowerCase())
      );
    });
  };

  render() {
    const {teamList, playerList} = this.props;

    if (!teamList || !playerList) {
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
          <View style={styles.headerInner}>
            <TextInput
              style={styles.textInput}
              onChangeText={keyword => this.setState({keyword})}
              keyboardType={'default'}
              textAlignVertical={'center'}
              autoCorrect={false}
              placeholder={'Find player'}
              value={this.state.keyword}
            />
            <View style={styles.searchIconView}>
              <Icon
                name="search"
                size={16}
                color="#fff"
                style={styles.searchIcon}
              />
            </View>
          </View>
        </View>
        <FlatList
          data={this.getSearchedItems()}
          renderItem={this.renderRow}
          style={styles.list}
          keyExtractor={(item, index) => index.toString()}
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
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Header
  header: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    height: 150,
    paddingTop: 40,
  },
  headerInner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    color: COLORS.primary,
    fontSize: 14,
    height: 40,
    paddingHorizontal: 5,
    width: 260,
  },
  searchIconView: {
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderWidth: 2,
    borderColor: 'white',
    height: 40,
    left: -5,
    position: 'relative',
    width: 40,
  },
  searchIcon: {
    width: 16,
    height: 16,
    left: 20,
    marginLeft: -10,
    marginTop: -10,
    position: 'absolute',
    top: 20,
  },
  // List
  list: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  panel: {
    borderColor: 'white',
    borderBottomWidth: 1,
    height: 65,
    flexDirection: 'row',
  },
  panelLeft: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  panelName: {
    color: 'white',
    fontSize: 17,
  },
  panelTeam: {
    color: 'white',
    fontSize: 13,
  },
  panelRight: {
    height: 65,
    position: 'relative',
    width: 30,
  },
  enterIcon: {
    height: 30,
    left: 15,
    marginLeft: -15,
    marginTop: -15,
    position: 'absolute',
    top: 32.5,
    width: 30,
  },
});

const mapStateToProps = state => {
  return {
    teamList: state.rcGlobal.teamList,
    playerList: state.rcGlobal.playerList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleGetPlayerList: cb => dispatch(handleGetPlayerList(cb)),
    handleGetTeamList: cb => dispatch(handleGetTeamList(cb)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PlayerList);
