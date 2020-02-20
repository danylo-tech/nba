import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';

class PlayerRow extends Component {
  render() {
    const {playerInfo, last} = this.props;
    const player = playerInfo.item;

    return (
      <View
        style={
          !last ? styles.playerBox : [styles.playerBox, styles.playerBoxLast]
        }>
        <View style={[styles.p2, styles.p2Name]}>
          <Text style={styles.pName}>
            {player.first_name.substring(0, 1) + '.' + player.last_name}
          </Text>
        </View>
        <View style={styles.p1}>
          <View style={styles.tableCell}>
            <Text style={styles.dataBox}>
              {player.starting_position ? player.starting_position : '-'}
            </Text>
          </View>
        </View>
        <View style={styles.p1}>
          <View style={styles.tableCell}>
            <Text style={styles.dataBox}>{player.points}</Text>
          </View>
        </View>
        <View style={styles.p1}>
          <View style={styles.tableCell}>
            <Text style={styles.dataBox}>{player.assists}</Text>
          </View>
        </View>
        <View style={styles.p1}>
          <View style={styles.tableCell}>
            <Text style={styles.dataBox}>
              {parseInt(player.rebounds_defensive, 10) +
                parseInt(player.rebounds_offensive, 10)}
            </Text>
          </View>
        </View>
        <View style={styles.p1}>
          <View style={styles.tableCell}>
            <Text style={styles.dataBox}>
              {player.field_goals_made + ' - ' + player.field_goals_attempted}
            </Text>
          </View>
        </View>
        <View style={styles.p1}>
          <View style={styles.tableCell}>
            <Text style={styles.dataBox}>{player.blocks}</Text>
          </View>
        </View>
        <View style={styles.p1}>
          <View style={styles.tableCell}>
            <Text style={styles.dataBox}>{player.steals}</Text>
          </View>
        </View>
        <View style={styles.p1}>
          <View style={styles.tableCell}>
            <Text style={styles.dataBox}>
              {player.three_pointers_made +
                ' - ' +
                player.three_pointers_attempted}
            </Text>
          </View>
        </View>
        <View style={styles.p1}>
          <View style={styles.tableCell}>
            <Text style={styles.dataBox}>
              {player.free_throws_made + ' - ' + player.free_throws_attempted}
            </Text>
          </View>
        </View>
        <View style={styles.p1}>
          <View style={styles.tableCell}>
            <Text style={styles.dataBox}>{player.turnovers}</Text>
          </View>
        </View>
        <View style={styles.p1}>
          <View style={styles.tableCell}>
            <Text style={styles.dataBox}>{player.fouls}</Text>
          </View>
        </View>
        <View style={styles.p1}>
          <View style={styles.tableCell}>
            <Text style={styles.dataBox}>{player.plus_minus}</Text>
          </View>
        </View>
        <View style={[styles.p1, styles.lastP1]}>
          <View style={styles.tableCell}>
            <Text style={styles.dataBox}>{player.minutes}</Text>
          </View>
        </View>
      </View>
    );
  }
}

class MatchPlayers extends Component {
  renderHeaders() {
    return (
      <View style={[styles.playerBox, styles.titleRow]}>
        <View style={styles.p2} />
        <View style={styles.p1}>
          <View style={styles.tableCell}>
            <Text style={styles.title}>P</Text>
          </View>
        </View>
        <View style={styles.p1}>
          <View style={styles.tableCell}>
            <Text style={styles.title}>PTS</Text>
          </View>
        </View>
        <View style={styles.p1}>
          <View style={styles.tableCell}>
            <Text style={styles.title}>AST</Text>
          </View>
        </View>
        <View style={styles.p1}>
          <View style={styles.tableCell}>
            <Text style={styles.title}>REB</Text>
          </View>
        </View>
        <View style={styles.p1}>
          <View style={styles.tableCell}>
            <Text style={styles.title}>FG</Text>
          </View>
        </View>
        <View style={styles.p1}>
          <View style={styles.tableCell}>
            <Text style={styles.title}>BLK</Text>
          </View>
        </View>
        <View style={styles.p1}>
          <View style={styles.tableCell}>
            <Text style={styles.title}>STL</Text>
          </View>
        </View>
        <View style={styles.p1}>
          <View style={styles.tableCell}>
            <Text style={styles.title}>3PT</Text>
          </View>
        </View>
        <View style={styles.p1}>
          <View style={styles.tableCell}>
            <Text style={styles.title}>FT</Text>
          </View>
        </View>
        <View style={styles.p1}>
          <View style={styles.tableCell}>
            <Text style={styles.title}>TO</Text>
          </View>
        </View>
        <View style={styles.p1}>
          <View style={styles.tableCell}>
            <Text style={styles.title}>PF</Text>
          </View>
        </View>
        <View style={styles.p1}>
          <View style={styles.tableCell}>
            <Text style={styles.title}>+/-</Text>
          </View>
        </View>
        <View style={[styles.p1, styles.lastP1]}>
          <View style={styles.tableCell}>
            <Text style={styles.title}>MIN</Text>
          </View>
        </View>
      </View>
    );
  }

  renderRow = player => {
    const {teamData} = this.props;

    if (player.index === 0) {
      return this.renderHeaders();
    }

    return (
      <PlayerRow
        playerInfo={player}
        last={player.index === teamData.players.player.length + 1}
      />
    );
  };

  render() {
    const {teamData} = this.props;
    const players = teamData.players === '' ? [] : [...teamData.players.player];
    players.splice(0, 0, players[0]);

    return (
      <View style={styles.container}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          horizontal={true}
          style={styles.scrollView}>
          <FlatList
            data={players}
            renderItem={this.renderRow}
            style={styles.listView}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Container
  container: {
    flex: 13,
    position: 'relative',
  },
  // Scroll
  scrollView: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  // List
  listView: {
    flex: 1,
    flexDirection: 'column',
    width: 800,
  },
  // Player box (tr)
  titleRow: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    borderTopWidth: 1,
    borderTopColor: 'white',
    height: 30,
    borderStyle: 'solid',
  },
  playerBox: {
    alignItems: 'stretch',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    height: 30,
  },
  playerBoxLast: {
    borderBottomWidth: 0,
  },
  // Every box (td)
  title: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 12,
  },
  pName: {
    color: 'white',
    fontSize: 12,
    paddingLeft: 5,
  },
  dataBox: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 11,
  },
  p1: {
    alignItems: 'center',
    borderRightColor: 'white',
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
  },
  lastP1: {
    borderRightWidth: 1,
  },
  p2: {
    borderRightColor: 'white',
    borderLeftColor: 'white',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    flex: 2,
    flexDirection: 'row',
  },
  p2Name: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  tableCell: {
    flexDirection: 'column',
    flex: 1,
  },
});

export default MatchPlayers;
