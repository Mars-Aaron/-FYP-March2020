import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import AppColors from '../config/Colors';

export default class NLActivityIndicator extends React.Component {
  render() {
    return (
      <View style={styles.hasActivity}>
        <ActivityIndicator
          animating={true}
          color={AppColors.accentColor}
          size="large"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hasActivity: {
    position: 'absolute',
    backgroundColor: '#F5FCFF88',
    bottom: 0,
    right: 0,
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
  },
});
