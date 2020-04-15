import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import TopicStack from '../navigation/stacks/TopicStack';
import ProfileStack from '../navigation/stacks/ProfileStack';
import StudentDrawer from '../components/StudentDrawer';
import AppStyles from '../config/Styles';

const Drawer = createDrawerNavigator();

const DashboardDrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => {
        return <StudentDrawer {...props} />;
      }}
      drawerStyle={AppStyles.drawerStyle}>
      <Drawer.Screen name="TopicStack" component={TopicStack} />
      <Drawer.Screen name="ViewProfile" component={ProfileStack} />
    </Drawer.Navigator>
  );
};

export default DashboardDrawerNavigation;
