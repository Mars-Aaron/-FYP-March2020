import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import AppLogo from '../../static/NotesLiteLogo.png';

export default class AppLogoContainer extends React.Component {
  render() {
    return (
      <View style={styles.logoContainer}>
        <Image source={AppLogo} style={styles.logoStyle} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoContainer: {
    paddingVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyle: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
