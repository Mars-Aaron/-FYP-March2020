import React from 'react';
import {View, Text, StyleSheet, BackHandler} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import {StackActions} from '@react-navigation/native';
import {hasUserLoggedIn} from '../models/NLAuthentication';

import Dialog from '../components/NLDialog';
import AppLogo from '../components/AppLogoContainer';

const LaunchViewErrors = {
  NoInternetConnection: {
    title: 'No Internet Connection',
    errorMessage:
      'Please ensure that you are connected to a stable network to proceed.',
  },
};

export default class LaunchView extends React.Component {
  state = {
    showingDialog: false,
    dialogInfo: {
      title: '',
      message: '',
      actions: [],
    },
  };

  _checkConnection = () => {
    setTimeout(() => {
      NetInfo.fetch().then(state => {
        if (state.isConnected && state.isInternetReachable) {
          // also check for session
          // this.props.navigation.navigate('Authentication');
          hasUserLoggedIn().then(hasSession => {
            if (hasSession) {
              this.props.navigation.dispatch(StackActions.replace('Dashboard'));
            } else {
              this.props.navigation.dispatch(
                StackActions.replace('Authentication'),
              );
            }
          });
        } else {
          this.setState(
            {
              dialogInfo: {
                title: LaunchViewErrors.NoInternetConnection.title,
                message: LaunchViewErrors.NoInternetConnection.errorMessage,
                actions: [
                  {
                    title: 'Retry',
                    isPrimary: true,
                    callback: () => {
                      this.setState({showingDialog: false}, () => {
                        this._checkConnection();
                      });
                    },
                  },
                  {
                    title: 'Cancel',
                    isPrimary: false,
                    callback: () => {
                      BackHandler.exitApp();
                    },
                  },
                ],
              },
            },
            () => {
              this.setState({showingDialog: true});
            },
          );
        }
      });
    }, 1000);
  };

  componentDidMount = () => {
    this._checkConnection();
  };

  render() {
    return (
      <View style={styles.rootContainer}>
        <AppLogo />
        <View style={styles.activityContainer}>
          <ActivityIndicator animating={true} size="large" />
          <Text style={styles.activityText}>Getting things ready...</Text>
        </View>
        {this.state.showingDialog && (
          <Dialog
            title={this.state.dialogInfo.title}
            message={this.state.dialogInfo.message}
            actions={this.state.dialogInfo.actions}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  activityContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
  },
  activityText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 20,
  },
});
