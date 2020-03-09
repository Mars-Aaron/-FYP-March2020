import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import AppColors from '../config/Colors';
import AppStyles from '../config/Styles';
import RippleSmallButton from '../components/NLRippleSmallButton';
import PrimaryButton from '../components/NLPrimaryButton';
import SecondaryButton from '../components/NLSecondaryButton';

export default class NLDialog extends React.Component {
  render() {
    const actions = this.props.actions.map(
      ({title, isPrimary, callback}, index) => {
        return isPrimary ? (
          <PrimaryButton
            key={index}
            title={title}
            onPress={callback}
            containerStyle={
              index < this.props.actions.length - 1 ? styles.action : {}
            }
          />
        ) : (
          <SecondaryButton
            key={index}
            title={title}
            onPress={callback}
            containerStyle={
              index < this.props.actions.length - 1 ? styles.action : {}
            }
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
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{this.props.message}</Text>
          </View>
          <View style={styles.actionContainer}>{actions}</View>
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
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: AppColors.secondaryTextColor,
  },
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 30,
  },
  message: {
    fontSize: 20,
    textAlign: 'center',
  },
  action: {
    marginBottom: 20,
  },
  actionContainer: {
    padding: 10,
    justifyContent: 'space-between',
  },
});
