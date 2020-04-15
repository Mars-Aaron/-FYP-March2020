import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ProfileView from '../../views/profile/ProfileView';

import AppColors from '../../config/Colors';
import AppValues from '../../config/Values';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileView">
      <Stack.Screen
        name="ProfileView"
        component={ProfileView}
        options={{
          title: 'My Profile',
          headerShown: true,
          headerStyle: {
            elevation: 0,
            height: AppValues.HEADER_HEIGHT,
            backgroundColor: AppColors.primaryColor,
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: AppColors.secondaryTextColor,
            fontSize: 23,
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
