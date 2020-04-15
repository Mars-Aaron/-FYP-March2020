import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginView from '../../views/authentication/LoginView';
import RegisterView from '../../views/authentication/RegisterView';

import AppColors from '../../config/Colors';

const Stack = createStackNavigator();

const AuthenticationStack = () => {
  const LoginReference = props => <LoginView {...props} />;
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginReference}
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
          title: '',
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
