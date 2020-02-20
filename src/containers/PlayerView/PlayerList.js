import React, {Component} from 'react';
import {View, Text} from 'react-native';

class PlayerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
    };
  }

  render() {
    return (
      <View>
        <Text> List </Text>
      </View>
    );
  }
}

export default PlayerList;
