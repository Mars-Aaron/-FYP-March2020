import React from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Text,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoadingImage from '../../static/loading.png';
import AppStyles from '../config/Styles';
import AppColors from '../config/Colors';

export default class NLSmallButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconTransform: new Animated.Value(0),
      isLoading: false,
    };
  }

  _startLoading = () => {
    this.setState({isLoading: true});
    this.state.iconTransform.setValue(0);
    this.loadingAnimation = Animated.timing(this.state.iconTransform, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.linear,
    });
    this.loadingAnimation.start(() => {
      this.state.isLoading && this._startLoading();
    });
  };

  _stopLoading = () => {
    console.log('Attempting Stop');
    if (this.loadingAnimation) {
      console.log('Stopped');
      this.setState({isLoading: false});
    }
  };

  render() {
    const RotateData = this.state.iconTransform.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    var {title, isPrimary, labelType, onPress, iconName} = this.props;
    labelType = labelType ?? 'string';
    console.log(this.state.isLoading);
    return (
      <TouchableOpacity
        onPress={this.state.isLoading ? () => {} : onPress}
        style={
          isPrimary
            ? AppStyles.primarySmallButton
            : AppStyles.secondarySmallButton
        }>
        {labelType === 'string' && !this.state.isLoading ? (
          <Text
            style={
              isPrimary
                ? AppStyles.primaryButtonText
                : AppStyles.secondaryButtonText
            }>
            {title}
          </Text>
        ) : labelType === 'icon' && !this.state.isLoading ? (
          <Ionicons name={iconName} size={25} color={AppColors.textColor} />
        ) : (
          <View style={styles.loadingContainer}>
            <Animated.Image
              style={[styles.loadingImage, {transform: [{rotate: RotateData}]}]}
              source={LoadingImage}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    width: 25,
    height: 25,
  },
  loadingImage: {
    width: '100%',
    height: '100%',
  },
});
