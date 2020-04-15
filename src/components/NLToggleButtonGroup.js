import React from 'react';
import {View, StyleSheet} from 'react-native';

import ToggleButton from '../components/NLToggleButton';
import AppColors from '../config/Colors';
import AppStyles from '../config/Styles';

export default class NLToggleButtonGroup extends React.Component {
  state = {
    selectedButton: -1,
    toggleButtonReferences: [],
  };

  toggleButtons = this.props.options.map((option, index, array) => {
    let margin = index === array.length - 1 ? 0 : 20;
    let onSelect = () => {
      if (
        this.state.selectedButton !== -1 &&
        this.state.selectedButton !== index
      ) {
        this.state.toggleButtonReferences[
          this.state.selectedButton
        ].doUnselect();
      }
      this.setState({selectedButton: index});
    };
    let toggleButton = (
      <ToggleButton
        ref={component => this.state.toggleButtonReferences.push(component)}
        containerStyle={[styles.optionContainer, {marginRight: margin}]}
        key={index}
        toggleAction={onSelect}
        callback={option.onSelect}
        title={option.title}
      />
    );
    return toggleButton;
  });

  render() {
    return (
      <View style={[AppStyles.rootViewStyle, styles.viewContainer]}>
        {this.toggleButtons}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionContainer: {
    flex: 1,
  },
  buttonText: {
    fontSize: 17,
    fontFamily: 'FaxSansBeta',
    fontWeight: 'bold',
    color: AppColors.secondaryTextColor,
  },
});
