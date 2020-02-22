import React, {Component} from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {COLORS} from '../../constants/main';

class IntroView extends Component {
  _renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        {/* <Text style={styles.title}> {item.title}</Text> */}
        <Image style={styles.image} source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="arrow-right" color={COLORS.primary} size={24} />
      </View>
    );
  };
  _renderPrevButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="arrow-left" color={COLORS.primary} size={24} />
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="check" color={COLORS.primary} size={24} />
      </View>
    );
  };

  render() {
    const slides = [
      {
        key: 'matches',
        title: 'NBA World',
        text: 'NBA Live Matches And Records',
        image: require('../../assets/img/match.png'),
      },
      {
        key: 'players',
        title: 'All Stars',
        text: 'Explore your Favorite Players!',
        image: require('../../assets/img/player.png'),
      },
      {
        key: 'teams',
        title: 'Champions',
        text: 'Explore your Favorite Teams!',
        image: require('../../assets/img/team.png'),
      },
    ];

    return (
      <>
        <Image
          source={require('../../assets/img/logo.png')}
          style={styles.logo}
        />
        <AppIntroSlider
          renderNextButton={this._renderNextButton}
          renderPrevButton={this._renderPrevButton}
          renderDoneButton={this._renderDoneButton}
          onDone={this.props.handleIntroDone}
          renderItem={this._renderItem}
          slides={slides}
          showPrevButton
          // eslint-disable-next-line react-native/no-inline-styles
          paginationStyle={{marginBottom: 30}}
          dotStyle={{backgroundColor: COLORS.white}}
          activeDotStyle={{backgroundColor: COLORS.primary}}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
  },
  logo: {
    position: 'absolute',
    top: 70,
    right: 30,
    width: 70,
    height: 70,
    zIndex: 1000,
  },
  image: {
    alignSelf: 'center',
    width: 300,
    height: 300,
  },
  text: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 100,
    color: 'white',
  },
  buttonCircle: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IntroView;
