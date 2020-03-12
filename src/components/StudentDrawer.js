import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {TouchableRipple} from 'react-native-paper';

import AppColors from '../config/Colors';
import {getUser} from '../models/NLFirebase';

import FAIcon from 'react-native-vector-icons/FontAwesome';

export default class StudentDrawer extends React.Component {
  state = {
    fullName: '',
    username: '',
  };

  _fetchUserData = async () => {
    let user = await getUser();
    this.setState({
      fullName:
        user.profile._data.GivenName + ' ' + user.profile._data.FamilyName,
      username: user.profile._data.Username,
    });
  };

  _getRouteName = () => {
    return this.props.state.routeNames[this.props.state.index];
  };

  componentDidMount = () => {
    this._fetchUserData();
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
          </View>
          <View style={styles.profileNameContainer}>
            <Text style={styles.profileNameText}>{this.state.fullName}</Text>
          </View>
          <View style={styles.profileUsernameContainer}>
            <Text style={styles.profileUsernameText}>
              {this.state.username}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={
            this._getRouteName() === 'TopicStack'
              ? styles.activeDrawerItem
              : styles.inactiveDrawerItem
          }
          onPress={() => this.props.navigation.navigate('TopicStack')}>
          <FAIcon
            style={
              this._getRouteName() === 'TopicStack'
                ? styles.activeDrawerItemIcon
                : styles.inactiveDrawerItemIcon
            }
            name="book"
            size={25}
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
          onPress={() => this.props.navigation.navigate('ViewProfile')}>
          <FAIcon
            style={
              this._getRouteName() === 'ViewProfile'
                ? styles.activeDrawerItemIcon
                : styles.inactiveDrawerItemIcon
            }
            name="user-circle"
            size={25}
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
          style={styles.logoutDrawerItem}
          onPress={() => console.log('Logout')}>
          <FAIcon
            style={styles.activeDrawerItemIcon}
            name="sign-out"
            size={25}
            color={AppColors.secondaryTextColor}
          />
          <Text style={styles.activeDrawerItemText}>Sign Out</Text>
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
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  profileNameContainer: {
    marginTop: 10,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  profileNameText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  profileUsernameContainer: {
    marginTop: 5,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: AppColors.secondaryAccentColorDarker,
  },
  profileUsernameText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  inactiveDrawerItem: {
    margin: 10,
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.secondaryAccentColor,
  },
  logoutDrawerItem: {
    margin: 10,
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#bd2d2d',
  },
  activeDrawerItem: {
    margin: 10,
    marginVertical: 5,
    padding: 10,
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
  },
  inactiveDrawerItemIcon: {
    color: AppColors.secondaryTextColor,
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
