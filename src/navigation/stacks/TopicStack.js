import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import TopicsListView from '../../views/topics/TopicsListView';

import AppColors from '../../config/Colors';
import AppValues from '../../config/Values';

const Stack = createStackNavigator();

const TopicStack = () => {
  return (
    <Stack.Navigator initialRouteName="TopicsList">
      <Stack.Screen
        name="TopicsList"
        component={TopicsListView}
        options={{
          title: 'Topics List',
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

export default TopicStack;
