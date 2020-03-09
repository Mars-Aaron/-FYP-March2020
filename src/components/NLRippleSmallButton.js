import React from 'react';
import {View, Text} from 'react-native';
import {TouchableRipple} from 'react-native-paper';

import AppStyles from '../config/Styles';
import AppColors from '../config/Colors';

export default class NLRippleSmallButton extends React.Component {
  render() {
    return (
      <TouchableRipple
        onPress={this.props.onPress}
        borderless={!this.props.isPrimary}
        rippleColor={
          this.props.isPrimary
            ? AppColors.accentColorLighter
            : AppColors.secondaryAccentColorDarker
        }
        style={
          this.props.isPrimary
            ? AppStyles.primarySmallButton
            : AppStyles.borderlessSmallButton
        }>
        <Text
          style={
            this.props.isPrimary
              ? AppStyles.primaryButtonText
              : AppStyles.secondaryButtonText
          }>
          {this.props.title}
        </Text>
      </TouchableRipple>
    );
  }
}
