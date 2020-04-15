import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import AppColors from '../config/Colors';
import SmallButton from '../components/NLSmallButton';
import Textfield from '../components/NLTextField';

export default class NLInputDialog extends React.Component {
  render() {
    const actions = this.props.actions.map(
      ({title, isPrimary, callback}, index) => {
        return (
          <SmallButton
            isPrimary={isPrimary}
            key={index}
            title={title}
            onPress={callback}
          />
        );
      },
    );

    const inputs = this.props.inputs.map(
      (
        {
          placeholder,
          type,
          performValidation,
          getValue,
          onChangeValue,
          containerStyle,
        },
        index,
      ) => {
        return (
          <Textfield
            performValidation={performValidation}
            type={type}
            placeholder={placeholder}
            _getValue={getValue}
            _onChangeValue={onChangeValue}
            containerStyle={containerStyle}
          />
        );
      },
    );

    return (
      <View style={styles.overlayContainer}>
        <View style={styles.dialogContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{this.props.title}</Text>
          </View>
          <View style={styles.messageContainer}>{inputs}</View>
          <View style={styles.actionContainer}>{actions}</View>
          <TouchableOpacity
            style={styles.closeButtonContainer}
            onPress={this.props.onClose}>
            <MCIcon
              name="window-close"
              size={16}
              color={AppColors.secondaryTextColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#555d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogContainer: {
    width: '80%',
    borderRadius: 10,
    backgroundColor: AppColors.primaryColor,
    elevation: 20,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    backgroundColor: AppColors.secondaryAccentColorDarker,
  },
  titleContainer: {
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AppColors.secondaryTextColor,
  },
  messageContainer: {
    justifyContent: 'center',
    padding: 20,
  },
  message: {
    fontSize: 18,
  },
  actionContainer: {
    padding: 20,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
