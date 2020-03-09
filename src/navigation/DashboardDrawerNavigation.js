import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import ViewTopics from '../views/topics/ViewTopicsView';

const Drawer = createDrawerNavigator();

const DashboardDrawerNavigation = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="ViewTopics" component={ViewTopics} />
    </Drawer.Navigator>
  );
};

export default DashboardDrawerNavigation;
