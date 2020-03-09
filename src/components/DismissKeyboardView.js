import React from 'react';
import {TouchableWithoutFeedback, Keyboard, View} from 'react-native';

export default class DismissKeyboardView extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback>
        <View
          style={this.props.style}
          onPress={Keyboard.dismiss}
          accessible={false}>
          {this.children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
