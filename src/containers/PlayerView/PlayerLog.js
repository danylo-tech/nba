'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import {COLORS} from '../../constants/main';

export default class PlayerLog extends Component {
  constructor(props) {
    super(props);
    const data = this.props.data[0];
    const width = this.getWidth(data);
    this.state = {
      ppg: new Animated.Value(width.ppg),
      apg: new Animated.Value(width.apg),
      rpg: new Animated.Value(width.rpg),
      spg: new Animated.Value(width.spg),
      bpg: new Animated.Value(width.bpg),
      topg: new Animated.Value(width.topg),
      mpg: new Animated.Value(width.mpg),
      currentIndex: 0,
    };
  }

  /**
   * Calculate width of each bar
   * @params {pts: {Number}, ast, reb, stl, blk, tov, min}
   * @return {pts: {Number}, ast, reb, stl, blk, tov, min}
   */
  getWidth(data) {
    const deviceWidth = Dimensions.get('window').width;
    const maxWidth = 350;
    const indicators = ['ppg', 'apg', 'rpg', 'spg', 'bpg', 'topg', 'mpg'];
    const unit = {
      ppgUnit: Math.floor(maxWidth / 45),
      apgUnit: Math.floor(maxWidth / 15),
      rpgUnit: Math.floor(maxWidth / 18),
      spgUnit: Math.floor(maxWidth / 6),
      bpgUnit: Math.floor(maxWidth / 7),
      topgUnit: Math.floor(maxWidth / 10),
      mpgUnit: Math.floor(maxWidth / 60),
    };
    let width = {};
    let widthCap; // Give with a max cap
    indicators.forEach(item => {
      /* React-Native bug: if width=0 at first time, the borderRadius can't be implemented in the View */
      widthCap = data.teams[0][item] * unit[`${item}Unit`] || 5;
      width[item] = widthCap <= deviceWidth - 50 ? widthCap : deviceWidth - 50;
    });
    console.log(width);

    return width;
  }

  onPressLeft() {
    const {currentIndex} = this.state;
    const {data} = this.props;
    if (currentIndex < data.length - 1) {
      this.handleAnimation(currentIndex + 1);
    }
  }

  onPressRight() {
    const {currentIndex} = this.state;
    if (currentIndex > 0) {
      this.handleAnimation(currentIndex - 1);
    }
  }

  handleAnimation(index) {
    const {data} = this.props;
    const width = this.getWidth(data[index]);
    const timing = Animated.timing;

    const indicators = ['ppg', 'apg', 'rpg', 'spg', 'bpg', 'topg', 'mpg'];

    Animated.parallel(
      indicators.map(item => {
        return timing(this.state[item], {toValue: width[item]});
      }),
    ).start();
    /**
     * Animated won't trigger react life cycle
     * I'm not sure if using animated and setState in a same time would affect performance, not bad for now
     */
    this.setState({
      currentIndex: index,
    });
  }

  render() {
    const {ppg, apg, rpg, spg, bpg, topg, mpg} = this.state;
    const {currentIndex} = this.state;
    const data = this.props.data[currentIndex];

    const seasonYear = data.seasonYear;
    const seasonData = data.teams[0];

    /* set opacity=0 if no prev or no next, or the size will be changed unexpected */
    const canPrev = currentIndex < this.props.data.length - 1 ? 1 : 0;
    const canNext = currentIndex > 0 ? 1 : 0;
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.label}>Points</Text>
          <View style={styles.data}>
            {ppg && (
              <Animated.View
                style={[styles.bar, styles.points, {width: ppg}]}
              />
            )}
            <Text style={styles.dataNumber}>{seasonData.ppg}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Assists</Text>
          <View style={styles.data}>
            {apg && (
              <Animated.View
                style={[styles.bar, styles.assists, {width: apg}]}
              />
            )}
            <Text style={styles.dataNumber}>{seasonData.apg}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Rebounds</Text>
          <View style={styles.data}>
            {rpg && (
              <Animated.View
                style={[styles.bar, styles.rebounds, {width: rpg}]}
              />
            )}
            <Text style={styles.dataNumber}>{seasonData.rpg}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Steals</Text>
          <View style={styles.data}>
            {spg && (
              <Animated.View
                style={[styles.bar, styles.steals, {width: spg}]}
              />
            )}
            <Text style={styles.dataNumber}>{seasonData.spg}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Blocks</Text>
          <View style={styles.data}>
            {bpg && (
              <Animated.View
                style={[styles.bar, styles.blocks, {width: bpg}]}
              />
            )}
            <Text style={styles.dataNumber}>{seasonData.bpg}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Turnovers</Text>
          <View style={styles.data}>
            {topg && (
              <Animated.View
                style={[styles.bar, styles.turnovers, {width: topg}]}
              />
            )}
            <Text style={styles.dataNumber}>{seasonData.topg}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Minutes</Text>
          <View style={styles.data}>
            {mpg && (
              <Animated.View
                style={[styles.bar, styles.minutes, {width: mpg}]}
              />
            )}
            <Text style={styles.dataNumber}>{seasonData.mpg}</Text>
          </View>
        </View>

        <View style={styles.controller}>
          <TouchableHighlight
            onPress={this.onPressLeft.bind(this)}
            underlayColor="transparent"
            style={[styles.button, {opacity: canPrev}]}>
            <Icon
              name="arrow-left"
              size={28}
              color="white"
              style={styles.chevronLeft}
            />
          </TouchableHighlight>
          <Text style={styles.date}>{seasonYear}</Text>
          <TouchableHighlight
            onPress={this.onPressRight.bind(this)}
            underlayColor="transparent"
            style={[styles.button, {opacity: canNext}]}>
            <Icon
              name="arrow-right"
              size={28}
              color="white"
              style={styles.chevronRight}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 6,
  },
  // Item
  item: {
    flexDirection: 'column',
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  label: {
    color: 'white',
    flex: 1,
    fontSize: 12,
    position: 'relative',
    top: 2,
  },
  data: {
    flex: 2,
    flexDirection: 'row',
  },
  dataNumber: {
    color: 'white',
    fontSize: 11,
  },
  // Bar
  bar: {
    alignSelf: 'center',
    borderRadius: 5,
    height: 8,
    marginRight: 5,
  },
  points: {
    backgroundColor: COLORS.primary,
    marginBottom: 5,
    marginTop: 5,
  },
  assists: {
    backgroundColor: COLORS.primary,
    marginBottom: 5,
    marginTop: 5,
  },
  rebounds: {
    backgroundColor: COLORS.primary,
    marginBottom: 5,
    marginTop: 5,
  },
  steals: {
    backgroundColor: COLORS.primary,
    marginBottom: 5,
    marginTop: 5,
  },
  blocks: {
    backgroundColor: COLORS.primary,
    marginBottom: 5,
    marginTop: 5,
  },
  turnovers: {
    backgroundColor: COLORS.primary,
    marginBottom: 5,
    marginTop: 5,
  },
  minutes: {
    backgroundColor: COLORS.primary,
    marginBottom: 5,
    marginTop: 5,
  },
  // controller
  controller: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  button: {
    flex: 1,
    position: 'relative',
    top: -1,
  },
  chevronLeft: {
    alignSelf: 'flex-end',
    height: 28,
    marginRight: 10,
    width: 28,
  },
  chevronRight: {
    alignSelf: 'flex-start',
    height: 28,
    marginLeft: 10,
    width: 28,
  },
  date: {
    color: 'white',
    flex: 1,
    fontSize: 22,
    fontWeight: '300',
    height: 28,
    textAlign: 'center',
  },
});

PlayerLog.propTypes = {
  data: PropTypes.array,
};
