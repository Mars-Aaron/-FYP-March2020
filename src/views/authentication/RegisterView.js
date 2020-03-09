import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import AppValues from '../../config/Values';
import NLPrimaryButton from '../../components/NLPrimaryButton';
import NLTextField from '../../components/NLTextField';

export default class RegisterView extends React.Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    givenName: '',
    familyName: '',
    displayName: '',
    userType: '',
    emailModelState: true,
    passwordModelState: true,
    usernameModelState: true,
    givenNameModelState: true,
    familyNameModelState: true,
    displayNameModelState: true,
  };

  _getEmail = () => {
    return this.state.email;
  };

  _getPassword = () => {
    return this.state.password;
  };

  _getConfirmPassword = () => {
    return this.state.confirmPassword;
  };

  _getUsername = () => {
    return this.state.username;
  };

  _getGivenName = () => {
    return this.state.givenName;
  };

  _getFamilyName = () => {
    return this.state.familyName;
  };

  _getDisplayName = () => {
    return this.state.displayName;
  };

  _onChangeEmail = (email, isValidInput) => {
    this.setState({emailModelState: isValidInput});
    this.setState({email: email});
  };

  _onChangePassword = (password, isValidInput) => {
    this.setState({passwordModelState: isValidInput});
    this.setState({password: password});
  };

  _onChangeConfirmPassword = (confirmPassword, isValidInput) => {
    this.setState({confirmPasswordModelState: isValidInput});
    this.setState({confirmPassword: confirmPassword});
  };

  _onChangeUsername = (username, isValidInput) => {
    this.setState({usernameModelState: isValidInput});
    this.setState({username: username});
  };

  _onChangeGivenName = (givenName, isValidInput) => {
    this.setState({givenNameModelState: isValidInput});
    this.setState({givenName: givenName});
  };

  _onChangeFamilyName = (familyName, isValidInput) => {
    this.setState({familyNameModelState: isValidInput});
    this.setState({familyName: familyName});
  };

  _onChangeDisplayName = (displayName, isValidInput) => {
    this.setState({displayNameModelState: isValidInput});
    this.setState({displayName: displayName});
  };

  _register = () => {
    alert('Registering');
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this._dismissKeyboard}
        style={styles.rootView}>
        <ScrollView style={AppValues.rootViewStyle}>
          <View style={styles.formContainerStyle}>
            <View style={styles.textfieldContainerStyle}>
              <Text style={styles.H1Text}>Welcome.</Text>
              <Text style={styles.H2Text}>Create your account.</Text>
            </View>
            <NLTextField
              type="name"
              placeholder="Given Name"
              _getValue={this._getGivenName}
              _onChangeValue={this._onChangeGivenName}
              containerStyle={styles.textfieldContainerStyle}
            />
            <NLTextField
              type="name"
              placeholder="Family Name"
              _getValue={this._getFamilyName}
              _onChangeValue={this._onChangeFamilyName}
              containerStyle={styles.textfieldContainerStyle}
            />
            <NLTextField
              type="name"
              placeholder="Display Name"
              _getValue={this._getDisplayName}
              _onChangeValue={this._onChangeDisplayName}
              containerStyle={styles.textfieldContainerStyle}
            />
            <NLTextField
              type="username"
              placeholder="Username"
              _getValue={this._getUsername}
              _onChangeValue={this._onChangeUsername}
              containerStyle={styles.textfieldContainerStyle}
            />
            <NLTextField
              type="email"
              placeholder="Email"
              _getValue={this._getEmail}
              _onChangeValue={this._onChangeEmail}
              containerStyle={styles.textfieldContainerStyle}
            />
            <NLTextField
              type="password"
              placeholder="Password"
              _getValue={this._getPassword}
              _onChangeValue={this._onChangePassword}
              containerStyle={styles.textfieldContainerStyle}
            />
            <NLTextField
              type="password"
              placeholder="Confirm Password"
              _getValue={this._getConfirmPassword}
              _onChangeValue={this._onChangeConfirmPassword}
              containerStyle={styles.textfieldContainerStyle}
            />
            <NLPrimaryButton title="Register" onPress={() => {}} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  formContainerStyle: {
    padding: 20,
  },
  H1Text: {
    fontSize: 40,
    fontFamily: 'FaxSansBeta',
    fontWeight: 'bold',
  },
  H2Text: {
    fontSize: 30,
    fontFamily: 'FaxSansBeta',
    fontWeight: 'bold',
  },
  textfieldContainerStyle: {
    marginBottom: 20,
  },
});
