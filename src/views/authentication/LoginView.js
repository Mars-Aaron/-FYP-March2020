import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import {
  Login,
  LoginFailureReasons,
} from '../../controllers/AuthenticationController';
import {replace, push} from '../../navigation/RootNavigation';

import NLPrimaryButton from '../../components/NLPrimaryButton';
import NLSecondaryButton from '../../components/NLSecondaryButton';
import AppLogoContainer from '../../components/AppLogoContainer';
import NLTextField from '../../components/NLTextField';
import ActivityIndicator from '../../components/NLActivityIndicator';
import Dialog from '../../components/NLDialog';
import AppColors from '../../config/Colors';

const LoginViewModelErrors = {
  EmptyFieldError: {
    title: 'Empty Field Error',
    errorMessage: 'Email or Password cannot be empty.',
  },
  InvalidEmailError: {
    title: 'Envalid Email Error',
    errorMessage:
      'The email you entered is invalid, please provide a valid email.',
  },
  UserNotFoundError: {
    title: 'User Not Found Error',
    errorMessage: 'The email or password you entered is incorrect.',
  },
  AccountNotVerifiedError: {
    title: 'Account Not Verified Error',
    errorMessage: 'The account has not been verified.',
  },
  AccountDeactivatedError: {
    title: 'Account Deactivated Error',
    errorMessage:
      'The account is currently deactivated, contact an admin to re-activate it.',
  },
};

export default class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailModelState: true,
      passwordModelState: true,
      modelState: false,
      modelStateError: LoginViewModelErrors.EmptyFieldError,
      hasActivity: false,
      showingDialog: false,
      dialogInfo: {
        title: '',
        message: '',
        actions: [],
      },
    };
  }

  _dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  _emailIsEmpty = () => {
    return this.state.email === '';
  };

  _passwordIsEmpty = () => {
    return this.state.password === '';
  };

  _showDialog = () => {
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

  _login = () => {
    this._dismissKeyboard();
    console.log(this.state.modelState);
    if (!this.state.modelState) {
      this._showDialog();
    } else {
      this.setState({hasActivity: true}, () => {
        Login(this.state.email, this.state.password, (isSuccess, reason) => {
          this.setState({hasActivity: false}, () => {
            if (isSuccess) {
              replace('Dashboard');
            } else {
              this.setState(
                {
                  modelStateError:
                    reason === LoginFailureReasons.EmailOrPasswordIncorrect
                      ? LoginViewModelErrors.UserNotFoundError
                      : reason === LoginFailureReasons.AccountDeactivated
                      ? LoginViewModelErrors.AccountDeactivatedError
                      : LoginViewModelErrors.AccountNotVerifiedError,
                },
                () => this._showDialog(),
              );
            }
          });
        });
      });
    }
  };

  validateViewModel = () => {
    if (this._emailIsEmpty() || this._passwordIsEmpty()) {
      this.setState(
        {
          modelState: false,
          modelStateError: LoginViewModelErrors.EmptyFieldError,
        },
        () => console.log(this.state.modelState),
      );
    } else if (!this.state.emailModelState) {
      this.setState(
        {
          modelState: false,
          modelStateError: LoginViewModelErrors.InvalidEmailError,
        },
        () => console.log(this.state.modelState),
      );
    } else {
      this.setState(
        {
          modelState: true,
          modelStateError: null,
        },
        () => console.log(this.state.modelState),
      );
    }
  };

  _onChangeEmail = (email, isValidInput) => {
    console.log(`Latest: ${email}`);
    this.setState({emailModelState: isValidInput, email: email}, () => {
      this.validateViewModel();
    });
  };

  _onChangePassword = (password, isValidInput) => {
    this.setState(
      {passwordModelState: isValidInput, password: password},
      () => {
        this.validateViewModel();
      },
    );
  };

  _getEmail = () => {
    console.log(`Email: ${this.state.email}`);
    return this.state.email;
  };

  _getPassword = () => {
    return this.state.password;
  };

  _navigateToRegister = () => push('Register');

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this._dismissKeyboard}
        style={styles.rootView}>
        <View style={styles.rootView}>
          <View style={styles.inputContainer}>
            <AppLogoContainer />
            <NLTextField
              type="email"
              placeholder="Email"
              _getValue={this._getEmail}
              _onChangeValue={this._onChangeEmail}
              containerStyle={styles.emailContainerStyle}
            />
            <NLTextField
              performValidation={false}
              type="password"
              placeholder="Password"
              _getValue={this._getPassword}
              _onChangeValue={this._onChangePassword}
              containerStyle={styles.passwordContainerStyle}
            />
            <NLPrimaryButton
              title="Sign In"
              containerStyle={styles.loginContainerStyle}
              onPress={this._login}
            />
            <NLSecondaryButton
              title="I don't have an account"
              onPress={this._navigateToRegister}
            />
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
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: AppColors.primaryColor,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20,
  },
  loginContainerStyle: {
    marginBottom: 20,
  },
  emailContainerStyle: {
    marginBottom: 20,
  },
  passwordContainerStyle: {
    marginBottom: 50,
  },
});
