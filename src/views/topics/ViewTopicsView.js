import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class ViewTopicsView extends React.Component {
  render() {
    return (
      <View style={styles.viewContainer}>
        <Text>Loaded</Text>
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
