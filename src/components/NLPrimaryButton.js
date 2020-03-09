import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableRipple} from 'react-native-paper';

import AppColors from '../config/Colors';
import AppValues from '../config/Values';

export default class NLPrimaryButton extends React.Component {
  render() {
    return (
      <View style={this.props.containerStyle}>
        <TouchableRipple
          style={styles.buttonWrapper}
          rippleColor={AppColors.accentColorLighter}
          onPress={this.props.onPress}>
          <Text style={styles.buttonText}>{this.props.title}</Text>
        </TouchableRipple>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonWrapper: {
    backgroundColor: AppColors.accentColor,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: AppValues.glBorderRadius,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontFamily: 'FaxSansBeta',
    fontWeight: 'bold',
    color: AppColors.textColor,
  },
});
