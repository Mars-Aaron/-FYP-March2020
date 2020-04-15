import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import TopicsListView from '../../views/topics/TopicsListView';
import AddTopicView from '../../views/topics/AddTopicView';
import TopicView from '../../views/topics/TopicView';

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
          title: 'My Topics',
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
      <Stack.Screen
        name="AddTopic"
        component={AddTopicView}
        options={{
          title: 'Add Topic',
          headerShown: true,
          headerStyle: {
            elevation: 0,
            height: AppValues.HEADER_HEIGHT,
            backgroundColor: AppColors.primaryColor,
          },
          headerRightContainerStyle: {
            marginVertical: 10,
            marginRight: 20,
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
        name="Topic"
        component={TopicView}
        options={{
          title: 'Topic',
          headerShown: true,
          headerStyle: {
            elevation: 0,
            height: AppValues.HEADER_HEIGHT,
            backgroundColor: AppColors.primaryColor,
          },
          headerRightContainerStyle: {
            marginVertical: 10,
            marginRight: 20,
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
