import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {FlatList, TouchableHighlight} from 'react-native-gesture-handler';

import {handleGetMatches} from '../../actions';
import {COLORS, MATCH_STATUS} from '../../constants/main';
import MatchPanel from './MatchPanel';

class MatchList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: null,
      matchDate: new Date(),
      showDatePicker: false,
    };

    this.timerId = null;
  }

  componentDidMount() {
    this.handleLoadMatches();
  }

  handleLoadMatches = () => {
    const {matchDate} = this.state;
    this.props.handleGetMatches(matchDate, matches => {
      const {navigation} = this.props;

      if (navigation.isFocused()) {
        this.setState({matches});
      }

      const isLiveExists = matches.some(e => {
        return e.period_time.game_status === MATCH_STATUS.LIVE;
      });

      if (this.timerId) {
        clearTimeout(this.timerId);
      }

      this.timerId = setTimeout(
        this.handleLoadMatches,
        isLiveExists ? 5000 : 120000,
      );
    });
  };

  renderMatch = (match, index) => {
    const {navigation} = this.props;
    return <MatchPanel MATCH={match} navigation={navigation} />;
  };

  handleChangeDate = async (event, matchDate) => {
    await this.setState({matchDate, matches: null});

    this.handleLoadMatches();
  };

  UNSAFE_componentWillMount() {
    clearTimeout(this.timerId);
  }

  render() {
    const {matchDate, matches} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.listHeader}>
          <TouchableHighlight
            onPress={() =>
              this.setState({showDatePicker: !this.state.showDatePicker})
            }
            underlayColor="transparent">
            <Icon
              name="calendar-alt"
              size={18}
              color="#fff"
              style={styles.calendarIcon}
            />
          </TouchableHighlight>
          <Text style={styles.matchDate}>
            {moment(matchDate).format('YYYY-MM-DD')}
          </Text>
          <Text style={styles.matchCount}>
            {matches ? `${matches.length} Matches` : '•••'}
          </Text>
        </View>
        {matches ? (
          <FlatList
            data={matches}
            renderItem={this.renderMatch}
            style={styles.listContent}
          />
        ) : (
          <View style={styles.listContent}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        )}

        {this.state.showDatePicker && (
          <DateTimePicker
            testID="matchDatePicker"
            timeZoneOffsetInMinutes={0}
            value={matchDate}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={this.handleChangeDate}
            style={styles.datePicker}
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
  listHeader: {
    height: 150,
    backgroundColor: COLORS.primary,
    flexDirection: 'column',
    position: 'relative',
    paddingLeft: 15,
    paddingTop: 40,
  },
  listContent: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.secondary,
    flexGrow: 1,
    padding: 15,
  },
  datePicker: {
    backgroundColor: 'white',
    color: 'white',
  },
  calendarIcon: {
    alignSelf: 'flex-end',
    height: 18,
    marginRight: 15,
    marginTop: 12,
    width: 18,
  },
  matchDate: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 25,
  },
  matchCount: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    handleGetMatches: (matchDate, cb) =>
      dispatch(handleGetMatches(matchDate, cb)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MatchList);
