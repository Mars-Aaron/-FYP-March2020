import React from 'react';
import {View, StyleSheet} from 'react-native';

import AppColors from '../../config/Colors';

export default class NLPageLine extends React.Component {
  render = () => {
    return <View style={styles.line} />;
  };
}

const styles = StyleSheet.create({
  line: {
    height: 40,
    width: '100%',
    borderBottomWidth: 2,
    // backgroundColor: 'red',
    borderColor: AppColors.secondaryAccentColorDarker,
  },
});
