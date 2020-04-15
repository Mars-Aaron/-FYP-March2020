import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import AppColors from '../config/Colors';

export default class NLTextField extends React.Component {
  state = {
    inputValid: true,
    hasFocus: false,
    performValidation: this.props.performValidation ?? true,
    keyboardType: this.props.type === 'email' ? 'email-address' : 'default',
  };
  inputRef;

  emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[_@-])[0-9a-zA-Z_@-]{8,}$/;
  nameRegEx = /^[a-zA-Z ]+$/;
  usernameRegEx = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
  topicNameRegEx = /^[a-zA-Z0-9 _[\]()\-.\\|@#&{}<>:=+]+$/;

  validateInput = text => {
    switch (this.props.type) {
      case 'email':
        return this.emailRegEx.test(text);
      case 'password':
        return this.passwordRegEx.test(text);
      case 'name':
        return this.nameRegEx.test(text);
      case 'username':
        return this.usernameRegEx.test(text);
      case 'topic':
        return this.topicNameRegEx.test(text);
      default:
        return true;
    }
  };

  _makeInvalid = () => {
    this.setState({inputValid: false});
  };

  _onFocus = () => {
    this.setState({hasFocus: true}, () => {
      this.inputRef.focus();
    });
  };

  _onLostFocus = () => {
    this.setState({hasFocus: false});
  };

  _onChangeText = text => {
    if (this.state.performValidation) {
      this.setState({inputValid: this.validateInput(text)}, () => {
        this.props._onChangeValue(text, this.state.inputValid);
      });
    } else {
      this.props._onChangeValue(text, this.state.inputValid);
    }
  };

  render() {
    // console.log(this.props._getValue());
    return (
      <View style={this.props.containerStyle}>
        {this.state.hasFocus ? (
          <TextInput
            keyboardType={this.state.keyboardType}
            ref={ref => (this.inputRef = ref)}
            style={[
              this.state.hasFocus && this.props._getValue() === ''
                ? styles.placeholderStyle
                : this.state.hasFocus && this.props._getValue() !== ''
                ? styles.valueStyle
                : !this.state.hasFocus && this.props._getValue() === ''
                ? styles.placeholderStyleNoFocus
                : styles.valueStyleNoFocus,
              styles.textInputStyle,
              this.state.hasFocus ? styles.textInputHasFocus : {},
              !this.state.inputValid ? styles.textInputHasError : {},
            ]}
            onChangeText={this._onChangeText}
            onBlur={this._onLostFocus}
            value={this.props._getValue()}
          />
        ) : (
          <></>
        )}
        {!this.state.hasFocus ? (
          <TouchableOpacity
            style={[
              this.state.hasFocus
                ? styles.textInputWrapper
                : styles.textInputWrapperNoFocus,
              !this.state.inputValid ? styles.textInputWrapperHasError : {},
            ]}
            onPress={this._onFocus}>
            <Text style={styles.placeholderStyleNoFocus}>
              {!this.state.hasFocus && this.props._getValue() === ''
                ? this.props.placeholder
                : !this.state.hasFocus && this.props._getValue() !== ''
                ? this.props._getValue()
                : this.props.placeholder}
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInputWrapper: {
    backgroundColor: AppColors.accentColorLighter,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  textInputWrapperNoFocus: {
    backgroundColor: AppColors.secondaryAccentColor,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  textInputWrapperHasError: {
    borderWidth: 1,
    borderColor: AppColors.textWarningColor,
  },
  textInputStyle: {
    backgroundColor: AppColors.accentColorLighter,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  textInputHasFocus: {
    elevation: 20,
  },
  textInputHasError: {
    backgroundColor: AppColors.textWarningColor,
  },
  mainText: {
    fontSize: 20,
    color: AppColors.textColor,
  },
  placeholderText: {
    fontSize: 20,
    color: AppColors.textDisabledColor,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'FaxSansBeta',
    fontWeight: 'bold',
    color: AppColors.textColor,
  },
  placeholderStyle: {
    fontSize: 20,
    fontFamily: 'FaxSansBeta',
    fontWeight: 'bold',
    color: AppColors.secondaryTextColor,
  },
  placeholderStyleNoFocus: {
    fontSize: 20,
    fontFamily: 'FaxSansBeta',
    fontWeight: 'bold',
    color: AppColors.secondaryTextColor,
  },
  valueStyle: {
    fontSize: 20,
    fontFamily: 'FaxSansBeta',
    fontWeight: 'bold',
    color: AppColors.textColor,
  },
  valueStyleNoFocus: {
    fontSize: 20,
    fontFamily: 'FaxSansBeta',
    fontWeight: 'bold',
    color: AppColors.textColor,
  },
});
