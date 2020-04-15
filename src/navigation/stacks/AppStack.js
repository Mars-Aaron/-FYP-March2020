import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LaunchView from '../../views/LaunchView';
import DashboardDrawerNavigation from '../DashboardDrawerNavigation';
import AuthenticationStack from '../stacks/AuthenticationStack';

const Stack = createStackNavigator();

// class AppStack extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {isLoggedIn: false};
//   }

//   setisLoggedIn = isLoggedIn => this.setState({isLoggedIn: isLoggedIn});

//   render() {
//     const Launch = props => (
//       <LaunchView {...props} setIsLoggedIn={this.setisLoggedIn} />
//     );
//     return (
//       <Stack.Navigator
//         initialRouteName="Launch"
//         screenOptions={{headerShown: false}}>
//         <Stack.Screen name="Launch" component={Launch} />
//         <Stack.Screen name="Authentication" component={AuthenticationStack} />
//         <Stack.Screen name="Dashboard" component={DashboardDrawerNavigation} />
//       </Stack.Navigator>
//     );
//   }
// }

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Launch"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Launch" component={LaunchView} />
      <Stack.Screen name="Authentication" component={AuthenticationStack} />
      <Stack.Screen name="Dashboard" component={DashboardDrawerNavigation} />
    </Stack.Navigator>
  );
};

export default AppStack;
