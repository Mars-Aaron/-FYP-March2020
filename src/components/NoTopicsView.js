import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import PrimaryButton from './NLPrimaryButton';
import AppValues from '../config/Values';

export default class NoTopicsView extends React.Component {
  render() {
    return (
      <View style={styles.emptyListContentContainer}>
        <View style={styles.emptyListImageContainer}>
          <Image
            style={styles.emptyListImage}
            source={AppValues.EMPTY_TOPICS_IMAGE}
          />
        </View>
        <PrimaryButton
          title="Create a Topic"
          containerStyle={styles.emptyListCreateButton}
          onPress={() => {}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyListContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListImageContainer: {
    width: '60%',
    aspectRatio: 4 / 3,
  },
  emptyListImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  emptyListCreateButton: {
    marginTop: 20,
  },
});
