import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import AppColors from '../config/Colors';
import AppStyles from '../config/Styles';
import NotebookThemes from '../config/NotebookThemes';

const MAX_WIDTH = 100;

export default class NLNotebookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 100,
      height: 400,
      padding: 10,
    };
  }

  showTheme = () => {
    Animated.parallel([
      Animated.timing(this.state.width, {
        useNativeDriver: false,
        toValue: MAX_WIDTH,
      }),
      Animated.timing(this.state.padding, {
        useNativeDriver: false,
        toValue: 10,
      }),
    ]).start();
  };

  hideTheme = () => {
    Animated.parallel([
      Animated.timing(this.state.width, {
        useNativeDriver: false,
        toValue: 0,
      }),
      Animated.timing(this.state.padding, {
        useNativeDriver: false,
        toValue: 0,
      }),
    ]).start();
  };

  notebookThemes = () => {
    let notebookThemes = Object.values(NotebookThemes);
    return notebookThemes.map(value => {
      const notebookStyles = StyleSheet.create({
        touchableStyle: {width: '100%', aspectRatio: 1},
        notebookStyle: {
          width: '100%',
          height: '100%',
        },
      });
      return (
        <TouchableOpacity
          style={notebookStyles.touchableStyle}
          onPress={() => this.props.onSelectNotebook(value)}>
          <value.Component style={notebookStyles.notebookStyle} />
        </TouchableOpacity>
      );
    });
  };

  render = () => {
    const styles = StyleSheet.create({
      containerStyle: {
        borderRadius: 10,
        elevation: 10,
        backgroundColor: AppColors.primaryColor,
      },
      scrollViewStyle: {
        width: '100%',
        height: '100%',
      },
      closeButton: {
        borderRadius: 10,
        elevation: 10,
        backgroundColor: AppColors.accentColor,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });
    return (
      <Animated.View
        style={[
          styles.containerStyle,
          {
            padding: this.state.padding,
            width: this.state.width,
            height: this.state.height,
          },
        ]}>
        <TouchableOpacity
          style={[
            styles.closeButton,
            {
              padding: this.state.padding,
            },
          ]}
          onPress={this.props.onHide}>
          <Text style={AppStyles.primaryButtonText}>Close</Text>
        </TouchableOpacity>
        <ScrollView
          style={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}>
          {this.notebookThemes()}
        </ScrollView>
      </Animated.View>
    );
  };
}
