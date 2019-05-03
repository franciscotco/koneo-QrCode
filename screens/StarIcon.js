import React from 'react';
import { Icon } from 'expo';
import { Platform } from 'react-native';

import Colors from '../constants/Colors';

export default class StarIcon extends React.Component {
  render() {
      // console.log("color: ", this.props.color);
    return (
      <Icon.Ionicons
        name={Platform.OS === 'ios' ? 'ios-star' : 'md-star'}
        size={18}
        color={this.props.color}
      />
    );
  }
}