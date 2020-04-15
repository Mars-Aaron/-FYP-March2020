import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import {CreateEmailPassword, Logout} from '../../models/NLAuthentication';
import CollectionFactory from '../../models/NLCollectionFactory';
import Profile from '../../models/NLProfile';
import {pop} from '../../navigation/RootNavigation';

import AppValues from '../../config/Values';
import AppColors from '../../config/Colors';
import NLPrimaryButton from '../../components/NLPrimaryButton';
import NLTextField from '../../components/NLTextField';
import NLToggleButtonGroup from '../../components/NLToggleButtonGroup';
import Dialog from '../../components/NLDialog';
import ActivityIndicator from '../../components/NLActivityIndicator';

const RegisterViewModelErrors = {
  EmptyFieldError: {
    title: 'Empty Field Error',
    errorMessage: 'Please make sure all fields has a value.',
  },
  UserTypeNotSelectedError: {
    title: 'User Type Not Selected Error',
    errorMessage: 'Please select a user type.',
  },
  InvalidEmailError: {
    title: 'Invalid Email Error',
    errorMessage:
      'The email you entered is invalid, please provide a valid email.',
  },
  InvalidPasswordError: {
    title: 'Invalid Password Error',
    errorMessage:
      'The password you entered is invalid, password needs to be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one digit and one symbol.',
  },
  NonMatchingPasswordError: {
    title: 'Password does not match',
    errorMessage: 'The password you entered does not match.',
  },
  InvalidNameError: {
    title: 'Invalid Name Error',
    errorMessage: 'Name field must only consist of alphabets and space.',
  },
  UserAlreadyExistError: {
    title: 'User Already Exist Error',
    errorMessage: 'The email that you entered is already in use.',
  },
  UsernameAlreadyInUseError: {
    title: 'Username Taken Error.',
    errorMessage: 'The username you entered has already been taken',
  },
};

export default class RegisterView extends React.Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    givenName: '',
    familyName: '',
    // displayName: '',
    userType: '',
    emailModelState: true,
    passwordModelState: true,
    confirmPasswordModelState: true,
    usernameModelState: true,
    givenNameModelState: true,
    familyNameModelState: true,
    displayNameModelState: true,
    modelState: false,
    modelStateError: RegisterViewModelErrors.EmptyFieldError,
    hasActivity: false,
    showingDialog: false,
    dialogInfo: {
      title: '',
      message: '',
      actions: [],
    },
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

  _emailIsEmpty = () => {
    return this.state.email === '';
  };

  _passwordIsEmpty = () => {
    return this.state.password === '';
  };

  _givenNameIsEmpty = () => {
    return this.state.givenName === '';
  };

  _familyNameisEmpty = () => {
    return this.state.familyName === '';
  };

  _usernameIsEmpty = () => {
    return this.state.username === '';
  };

  _confirmPasswordIsEmpty = () => {
    return this.state.confirmPassword === '';
  };

  _userTypeIsNotSelected = () => {
    return this.state.userType === '';
  };

  validateViewModel = () => {
    if (
      this._emailIsEmpty() ||
      this._passwordIsEmpty() ||
      this._givenNameIsEmpty() ||
      this._familyNameisEmpty() ||
      this._usernameIsEmpty() ||
      this._confirmPasswordIsEmpty()
    ) {
      this.setState({
        modelState: false,
        modelStateError: RegisterViewModelErrors.EmptyFieldError,
      });
    } else if (!this.state.emailModelState) {
      this.setState({
        modelState: false,
        modelStateError: RegisterViewModelErrors.InvalidEmailError,
      });
    } else if (!this.state.passwordModelState) {
      this.setState({
        modelState: false,
        modelStateError: RegisterViewModelErrors.InvalidPasswordError,
      });
    } else if (this.state.confirmPassword !== this.state.password) {
      this.setState({
        modelState: false,
        modelStateError: RegisterViewModelErrors.NonMatchingPasswordError,
      });
    } else if (!this.state.givenNameModelState) {
      this.setState({
        modelState: false,
        modelStateError: RegisterViewModelErrors.InvalidNameError,
      });
    } else if (!this.state.familyNameModelState) {
      this.setState({
        modelState: false,
        modelStateError: RegisterViewModelErrors.InvalidNameError,
      });
    } else if (this._userTypeIsNotSelected()) {
      this.setState({
        modelState: false,
        modelStateError: RegisterViewModelErrors.UserTypeNotSelectedError,
      });
    } else {
      this.setState({
        modelState: true,
        modelStateError: null,
      });
    }
  };

  _onChangeEmail = (email, isValidInput) => {
    this.setState(
      {emailModelState: isValidInput, email: email},
      this.validateViewModel,
    );
  };

  _onChangePassword = (password, isValidInput) => {
    this.setState(
      {passwordModelState: isValidInput, password: password},
      this.validateViewModel,
    );
  };

  _onChangeConfirmPassword = (confirmPassword, isValidInput) => {
    this.setState(
      {
        confirmPasswordModelState: isValidInput,
        confirmPassword: confirmPassword,
      },
      this.validateViewModel,
    );
  };

  _onChangeUsername = (username, isValidInput) => {
    this.setState(
      {usernameModelState: isValidInput, username: username},
      this.validateViewModel,
    );
  };

  _onChangeGivenName = (givenName, isValidInput) => {
    this.setState(
      {givenNameModelState: isValidInput, givenName: givenName},
      this.validateViewModel(),
    );
  };

  _onChangeFamilyName = (familyName, isValidInput) => {
    this.setState(
      {familyNameModelState: isValidInput, familyName: familyName},
      this.validateViewModel(),
    );
  };

  _onSelectEducator = () => {
    this.setState({userType: 'educator'}, this.validateViewModel);
  };

  _onSelectStudent = () => {
    this.setState({userType: 'student'}, this.validateViewModel);
  };

  _register = () => {
    if (!this.state.modelState) {
      this._showAlert();
    } else {
      this.setState({hasActivity: true}, () => {
        CreateEmailPassword(
          this.state.email,
          this.state.password,
          `${this.state.givenName} ${this.state.familyName}`,
          credential => {
            if (credential.additionalUserInfo.isNewUser) {
              let profile = CollectionFactory.createProfileCollectionReference();
              profile.IsUniqueUsername(this.state.username, isUnique => {
                if (isUnique) {
                  let newUserID = credential.user.uid;
                  let data = {};
                  data[Profile.Fields.GivenName] = this.state.givenName;
                  data[Profile.Fields.FamilyName] = this.state.familyName;
                  data[Profile.Fields.Username] = this.state.username;
                  data[Profile.Fields.UserType] = this.state.userType;
                  Logout(() => {
                    profile.CreateProfile(newUserID, data, () => {
                      this.setState({hasActivity: false}, () => {
                        this._showDialog({
                          title: 'Success',
                          message:
                            'New account has been successfully created. A verification link will be sent to your email shortly.',
                          actions: [
                            {
                              title: 'Proceed to Login',
                              isPrimary: true,
                              callback: () => {
                                this.setState({showingDialog: false}, () =>
                                  pop(1),
                                );
                              },
                            },
                          ],
                        });
                      });
                    });
                  });
                }
              });
            } else {
              this.setState(
                {
                  hasActivity: false,
                  modelStateError:
                    RegisterViewModelErrors.UserAlreadyExistError,
                },
                () => {
                  this._showAlert();
                },
              );
            }
          },
        );
      });
    }
  };

  _showDialog = dialogInfo => {
    this.setState({dialogInfo: dialogInfo}, () =>
      this.setState({showingDialog: true}),
    );
  };

  _showAlert = () => {
    this.setState(
      {
        dialogInfo: {
          title: this.state.modelStateError.title,
          message: this.state.modelStateError.errorMessage,
          actions: [
            {
              title: 'Okay',
              isPrimary: true,
              callback: () => {
                this.setState({showingDialog: false});
              },
            },
          ],
        },
      },
      () => {
        this.setState({showingDialog: true});
      },
    );
  };

  _dismissKeyboard = () => {
    Keyboard.dismiss();
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
            <View style={styles.usernameContainer}>
              <View style={styles.usernameAnnotationContainer}>
                <Text style={styles.usernameAnnotation}>@</Text>
              </View>
              <NLTextField
                type="username"
                placeholder="Username"
                _getValue={this._getUsername}
                _onChangeValue={this._onChangeUsername}
                containerStyle={styles.textfieldContainerStyle}
              />
            </View>
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
            <NLToggleButtonGroup
              containerStyle={styles.toggleButtonContainerStyle}
              options={[
                {title: 'Educator', onSelect: this._onSelectEducator},
                {title: 'Student', onSelect: this._onSelectStudent},
              ]}
            />
            <NLPrimaryButton title="Register" onPress={this._register} />
          </View>
          {this.state.hasActivity && <ActivityIndicator />}
          {this.state.showingDialog && (
            <Dialog
              title={this.state.dialogInfo.title}
              message={this.state.dialogInfo.message}
              actions={this.state.dialogInfo.actions}
              onClose={() => {
                this.setState({showingDialog: false});
              }}
            />
          )}
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
    flex: 1,
  },
  usernameContainer: {
    flexDirection: 'row',
  },
  usernameAnnotationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    marginRight: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: AppColors.secondaryAccentColorDarker,
  },
  usernameAnnotation: {
    fontSize: 20,
    fontFamily: 'FaxSansBeta',
    fontWeight: 'bold',
    color: AppColors.secondaryTextColor,
  },
  toggleButtonContainerStyle: {
    flex: 1,
    marginBottom: 20,
  },
});
