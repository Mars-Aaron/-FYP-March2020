import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import TopicsListView from '../views/topics/TopicsListView';
import ViewProfile from '../views/profile/ViewProfile';
import TopicStack from '../navigation/stacks/TopicStack';
import StudentDrawer from '../components/StudentDrawer';
import AppColors from '../config/Colors';

import FA5 from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = createDrawerNavigator();

const DashboardDrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => {
        return <StudentDrawer {...props} />;
      }}>
      <Drawer.Screen name="TopicStack" component={TopicStack} />
      <Drawer.Screen
        name="ViewProfile"
        component={ViewProfile}
        options={{
          title: 'View Profile',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DashboardDrawerNavigation;
