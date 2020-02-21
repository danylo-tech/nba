'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Image, Text, FlatList} from 'react-native';

import TeamDetailPlayer from './TeamDetailPlayer';
import {COLORS, TEAM_ICONS} from '../../constants/main';

class TeamDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      team: JSON.parse(props.route.params.teamInfo),
    };
  }

  renderRow = ({index, item}) => {
    const {navigation} = this.props;
    const {team} = this.state;

    return (
      <TeamDetailPlayer
        player={item}
        isLast={false}
        team={team}
        navigation={navigation}
      />
    );
  };

  render() {
    const {team} = this.state;
    const {playerList} = this.props;
    const teamPlayers = playerList.filter(p => {
      return p.teamId === team.teamId;
    });

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTeam}>
            <Text style={styles.headerTeamCity}>
              {team.teamSitesOnly.teamName}
            </Text>
            <Text style={styles.headerTeamName}>
              {team.teamSitesOnly.teamNickname}
            </Text>
          </View>
          <View style={styles.headerLogo}>
            <Image
              style={styles.headerLogoImage}
              source={TEAM_ICONS[team.teamSitesOnly.teamTricode.toLowerCase()]}
            />
          </View>
          <View style={styles.headerRank}>
            <Text style={styles.headerRankResult}>
              {team.win + 'W - ' + team.loss + 'L'}
            </Text>
            <Text style={styles.headerRankConf}>
              {`#${team.confRank} in the Conference`}
            </Text>
            <Text style={styles.headerRankDivi}>
              {`#${team.divRank} in the Division`}
            </Text>
          </View>
        </View>

        <View style={styles.dataInfo}>
          <View style={styles.dataInfoItem}>
            <Text style={styles.itemLabel}>H-W</Text>
            <Text style={styles.itemData}>{team.homeWin}</Text>
          </View>
          <View style={styles.dataInfoItem}>
            <Text style={styles.itemLabel}>H-L</Text>
            <Text style={styles.itemData}>{team.homeLoss}</Text>
          </View>
          <View style={styles.dataInfoItem}>
            <Text style={styles.itemLabel}>A-W</Text>
            <Text style={styles.itemData}>{team.awayWin}</Text>
          </View>
          <View style={styles.dataInfoItem}>
            <Text style={styles.itemLabel}>A-L</Text>
            <Text style={styles.itemData}>{team.awayLoss}</Text>
          </View>
        </View>

        <FlatList
          data={teamPlayers}
          renderItem={this.renderRow}
          style={styles.listView}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    display: 'flex',
    height: '100%',
  },
  backIcon: {
    height: 30,
    marginLeft: 2,
    marginTop: 6,
    width: 30,
  },
  // Header part
  header: {
    height: 150,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 15,
    backgroundColor: COLORS.primary,
    paddingTop: 50,
  },
  // Heade team
  headerTeam: {
    flex: 1.5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerTeamCity: {
    color: '#fff',
    fontSize: 20,
  },
  headerTeamName: {
    color: '#fff',
    fontSize: 15,
  },
  // Header logo
  headerLogo: {
    flex: 1,
    justifyContent: 'center',
  },
  headerLogoImage: {
    alignSelf: 'flex-start',
    height: 90,
    width: 90,
  },
  // Header rank
  headerRank: {
    flex: 1.5,
    justifyContent: 'center',
  },
  headerRankResult: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  headerRankConf: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  headerRankDivi: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  // Data info
  dataInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 35,
    backgroundColor: COLORS.secondary,
  },
  dataInfoItem: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  itemLabel: {
    color: 'white',
    fontSize: 10,
  },
  itemData: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 2,
    position: 'relative',
    top: 2,
  },
  // list view,
  listView: {
    flexGrow: 1,
    backgroundColor: COLORS.secondary,
  },
});

const mapStateToProps = state => {
  return {
    playerList: state.rcGlobal.playerList,
    teamList: state.rcGlobal.teamList,
  };
};

export default connect(mapStateToProps, null)(TeamDetail);
