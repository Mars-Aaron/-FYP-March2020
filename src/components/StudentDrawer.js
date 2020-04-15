import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import ContentLoader from 'react-native-content-loader';
import {Circle, Rect} from 'react-native-svg';
import {navigate, replace} from '../navigation/RootNavigation';

import AppColors from '../config/Colors';
import CollectionFactory from '../models/NLCollectionFactory';
import Profile from '../models/NLProfile';
import {Logout} from '../controllers/AuthenticationController';
import Dialog from '../components/NLDialog';

import FAIcon from 'react-native-vector-icons/FontAwesome';

export default class StudentDrawer extends React.Component {
  state = {
    fullName: '',
    username: '',
    loadingData: true,
    // showingDialog: false,
    // dialogInfo: {title: '', message: '', actions: [], onClose: () => {}},
  };

  _circleLoader = (
    <View style={styles.loader}>
      <ContentLoader
        primaryColor="#d1d1d1"
        secondaryColor="#ddd"
        duration={1200}
        width={'100%'}
        height={'100%'}>
        <Circle cx="75" cy="75" r="65" />
      </ContentLoader>
    </View>
  );

  _rectLoader = (
    <View style={styles.loader}>
      <ContentLoader
        primaryColor="#d1d1d1"
        secondaryColor="#ddd"
        duration={1200}
        width={'100%'}
        height={'100%'}>
        <Rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
      </ContentLoader>
    </View>
  );

  _fetchUserData = async () => {
    let profileReference = CollectionFactory.createProfileCollectionReference();
    profileReference.GetProfile(data => {
      this.setState({
        loadingData: false,
        fullName: `${data[Profile.Fields.GivenName]} ${
          data[Profile.Fields.FamilyName]
        }`,
        username: data[Profile.Fields.Username],
      });
    });
  };

  _getRouteName = () => {
    return this.props.state.routeNames[this.props.state.index];
  };

  _onPressLogout = () => {
    Logout(() => {
      replace('Authentication');
    });
  };

  // _getDialog = () => {
  //   return <Dialog {...this.state.dialogInfo} />;
  // };

  // _showDialog = () => this.setState({showingDialog: true});

  // _hideDialog = () => this.setState({showingDialog: false});

  // _setLogoutDialog = () => {
  //   this.state.dialogInfo.title = 'Logout';
  //   this.state.dialogInfo.message = 'Are you sure?';
  //   this.state.dialogInfo.actions = [
  //     {
  //       title: 'Yes',
  //       isPrimary: true,
  //       callback: this._onPressLogout,
  //     },
  //     {
  //       title: 'Cancel',
  //       callback: this._hideDialog,
  //     },
  //   ];
  //   this.state.dialogInfo.onClose = this._hideDialog;
  //   this._showDialog();
  // };

  componentDidMount = () => {
    this._fetchUserData();
    console.disableYellowBox = true;
  };

  render() {
    return (
      <Animated.View>
        {/* ... drawer contents */}
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <ImageBackground
              style={styles.profileImage}
              source={require('../../static/ProfilePicTemplate.png')}
            />
            {this.state.loadingData && this._circleLoader}
          </View>
          <View style={styles.profileNameContainer}>
            <Text style={styles.profileNameText}>{this.state.fullName}</Text>
            {this.state.loadingData && this._rectLoader}
          </View>
          <View style={styles.profileUsernameContainer}>
            <Text style={styles.profileUsernameText}>
              {this.state.username}
            </Text>
            {this.state.loadingData && this._rectLoader}
          </View>
        </View>
        <TouchableOpacity
          style={
            this._getRouteName() === 'TopicStack'
              ? styles.activeDrawerItem
              : styles.inactiveDrawerItem
          }
          onPress={() => navigate('TopicStack')}>
          <FAIcon
            style={
              this._getRouteName() === 'TopicStack'
                ? styles.activeDrawerItemIcon
                : styles.inactiveDrawerItemIcon
            }
            name="book"
            color={AppColors.secondaryTextColor}
          />
          <Text
            style={
              this._getRouteName() === 'TopicStack'
                ? styles.activeDrawerItemText
                : styles.inactiveDrawerItemText
            }>
            View Topics
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            this._getRouteName() === 'ViewProfile'
              ? styles.activeDrawerItem
              : styles.inactiveDrawerItem
          }
          onPress={() => navigate('ViewProfile')}>
          <FAIcon
            style={
              this._getRouteName() === 'ViewProfile'
                ? styles.activeDrawerItemIcon
                : styles.inactiveDrawerItemIcon
            }
            name="user-circle"
            color={AppColors.secondaryTextColor}
          />
          <Text
            style={
              this._getRouteName() === 'ViewProfile'
                ? styles.activeDrawerItemText
                : styles.inactiveDrawerItemText
            }>
            View Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inactiveDrawerItem}
          onPress={this._onPressLogout}>
          <FAIcon
            style={styles.inactiveDrawerItemIcon}
            name="sign-out"
            color={AppColors.secondaryTextColor}
          />
          <Text style={styles.inactiveDrawerItemText}>Logout</Text>
        </TouchableOpacity>
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  profileContainer: {
    padding: 10,
    backgroundColor: AppColors.secondaryAccentColor,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileEditButton: {
    padding: 10,
    backgroundColor: AppColors.primaryColor,
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 100,
  },
  profileImageContainer: {
    width: '50%',
    aspectRatio: 1,
  },
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  profileNameContainer: {
    width: '100%',
    marginTop: 10,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  profileNameText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileUsernameContainer: {
    width: '100%',
    marginTop: 5,
  },
  profileUsernameText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 10,
    alignSelf: 'center',
    backgroundColor: AppColors.secondaryAccentColorDarker,
  },
  inactiveDrawerItem: {
    margin: 10,
    marginVertical: 5,
    padding: 15,
    paddingVertical: 20,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.secondaryAccentColor,
  },
  activeDrawerItem: {
    margin: 10,
    marginVertical: 5,
    padding: 15,
    paddingVertical: 20,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.accentColorLighter,
  },
  inactiveDrawerItemText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    color: AppColors.secondaryTextColor,
  },
  activeDrawerItemText: {
    fontSize: 15,
    marginLeft: 10,
    fontWeight: 'bold',
    color: AppColors.textColor,
  },
  activeDrawerItemIcon: {
    color: AppColors.textColor,
    fontSize: 20,
  },
  inactiveDrawerItemIcon: {
    color: AppColors.secondaryTextColor,
    fontSize: 20,
  },
  versionContainer: {
    padding: 10,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  versionText: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});
