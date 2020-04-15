import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableRipple} from 'react-native-paper';

import AppColors from '../config/Colors';
import AppValues from '../config/Values';

export default class NLToggleButton extends React.Component {
  state = {isSeleted: false};

  _onPress = () => {
    this.setState({isSeleted: true}, () => {
      this.props.callback();
      this.props.toggleAction();
    });
  };

  doUnselect = () => {
    this.setState({isSeleted: false});
  };

  render() {
    return (
      <View style={this.props.containerStyle}>
        <TouchableRipple
          style={
            this.state.isSeleted
              ? styles.buttonWrapperSelected
              : styles.buttonWrapperNotSelected
          }
          rippleColor={
            this.state.isSeleted
              ? AppColors.accentColorDarker
              : AppColors.secondaryAccentColorDarker
          }
          onPress={this._onPress}>
          <Text
            style={
              this.state.isSeleted
                ? styles.buttonTextSelected
                : styles.buttonTextNotSelected
            }>
            {this.props.title}
          </Text>
        </TouchableRipple>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonWrapperNotSelected: {
    backgroundColor: AppColors.secondaryAccentColor,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: AppValues.glBorderRadius,
    alignItems: 'center',
  },
  buttonWrapperSelected: {
    backgroundColor: AppColors.accentColorLighter,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: AppValues.glBorderRadius,
    alignItems: 'center',
    elevation: 10,
  },
  buttonTextNotSelected: {
    fontSize: 17,
    fontFamily: 'FaxSansBeta',
    fontWeight: 'bold',
    color: AppColors.secondaryTextColor,
  },
  buttonTextSelected: {
    fontSize: 17,
    fontFamily: 'FaxSansBeta',
    fontWeight: 'bold',
    color: AppColors.textColor,
  },
});
