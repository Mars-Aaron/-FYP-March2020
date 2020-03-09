import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginView from '../../views/authentication/LoginView';
import RegisterView from '../../views/authentication/RegisterView';

import AppColors from '../../config/Colors';

import DashboardDrawerNavigation from '../DashboardDrawerNavigation';

const Stack = createStackNavigator();

const AuthenticationStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginView}
        options={{
          title: 'Log In',
          headerShown: false,
          headerStyle: {
            elevation: 0,
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
      <Stack.Screen
        name="Register"
        component={RegisterView}
        options={{
          title: 'Register',
          headerStyle: {
            elevation: 0,
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

export default AuthenticationStack;
