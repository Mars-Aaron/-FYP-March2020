import React from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';

import AppColors from '../config/Colors';

const MAX_HEIGHT = 50;
const MIN_HEIGHT = 0;

export default class NLCustomerActivityIndicator extends React.Component {
  state = {
    node1Height: new Animated.Value(0),
    node2Height: new Animated.Value(0),
    node3Height: new Animated.Value(0),
    node4Height: new Animated.Value(0),
    node5Height: new Animated.Value(0),
    running: true,
  };

  _expand = () => {
    Animated.parallel(
      [
        Animated.timing(this.state.node1Height, {
          toValue: MAX_HEIGHT,
          delay: 0,
        }),
        Animated.timing(this.state.node2Height, {
          toValue: MAX_HEIGHT,
          delay: 100,
        }),
        Animated.timing(this.state.node3Height, {
          toValue: MAX_HEIGHT,
          delay: 200,
        }),
        Animated.timing(this.state.node4Height, {
          toValue: MAX_HEIGHT,
          delay: 300,
        }),
        Animated.timing(this.state.node5Height, {
          toValue: MAX_HEIGHT,
          delay: 400,
        }),
      ],
      {
        stopTogether: true,
      },
    ).start(() => {
      if (this.state.running) {
        this._shrink();
      }
    });
  };

  _shrink = () => {
    Animated.parallel(
      [
        Animated.timing(this.state.node1Height, {
          toValue: MIN_HEIGHT,
          delay: 0,
        }),
        Animated.timing(this.state.node2Height, {
          toValue: MIN_HEIGHT,
          delay: 100,
        }),
        Animated.timing(this.state.node3Height, {
          toValue: MIN_HEIGHT,
          delay: 200,
        }),
        Animated.timing(this.state.node4Height, {
          toValue: MIN_HEIGHT,
          delay: 300,
        }),
        Animated.timing(this.state.node5Height, {
          toValue: MIN_HEIGHT,
          delay: 400,
        }),
      ],
      {
        stopTogether: true,
      },
    ).start(() => {
      if (this.state.running) {
        this._expand();
      }
    });
  };

  _beginAnimation = () => {
    this._expand();
  };

  componentDidMount = () => {
    this._beginAnimation();
  };

  render() {
    return (
      <View style={styles.rootContainer}>
        <Animated.View
          style={{height: this.state.node1Height, ...styles.node}}
        />
        <Animated.View
          style={{height: this.state.node2Height, ...styles.node}}
        />
        <Animated.View
          style={{height: this.state.node3Height, ...styles.node}}
        />
        <Animated.View
          style={{height: this.state.node4Height, ...styles.node}}
        />
        <Animated.View
          style={{height: this.state.node5Height, ...styles.node}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#dddc',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  node: {
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: AppColors.accentColor,
  },
});
