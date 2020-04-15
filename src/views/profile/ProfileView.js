import React from 'react';
import {View, StyleSheet} from 'react-native';

import Notebook from '../../components/NLNotebook';

import AppStyles from '../../config/Styles';
import NotebookThemes from '../../config/NotebookThemes';

export default class ViewProfile extends React.Component {
  // backAction = () => {
  //   BackHandler.exitApp();
  // };

  // componentDidMount() {
  //   BackHandler.addEventListener('hardwareBackPress', this.backAction);
  // }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.backAction);
  // }

  constructor(props) {
    super(props);
    // this.state = {
    //   book2PosX: new Animated.Value(100),
    //   book2PoxY: new Animated.Value(30),
    // };
  }

  check = () => {
    // Pull notebook out
    // Animated.timing(this.state.book2PosX, {
    //   useNativeDriver: true,
    //   toValue: 50,
    //   duration: 100,
    // }).start();
    // this.setState({book2PosX: new Animated.Value(120)});
  };

  reset = () => {
    // Push notebook back in
  };

  render() {
    return (
      <View style={{...AppStyles.rootViewStyle, ...styles.viewContainer}}>
        <View style={styles.notebookContainer}>
          <Notebook theme={NotebookThemes.MINT} style={styles.notebook} />
        </View>
      </View>
    );
  }
}

const bookSize = 400;

const styles = StyleSheet.create({
  viewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  notebookContainer: {
    width: bookSize,
    height: bookSize,
  },
  notebook: {
    width: '100%',
    height: '100%',
  },
});
