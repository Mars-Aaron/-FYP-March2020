import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class ViewProfile extends React.Component {
  render() {
    return (
      <View style={styles.viewContainer}>
        <Text>Profile</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
