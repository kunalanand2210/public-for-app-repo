
import React from 'react';


import Login from '../signup/Login';
import Register from '../signup/Register';
import Onboarding from '../signup/Onboarding';
import TabNavigation from './TabNavigation';

import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();

const Navigation = () => {
 

  return (
    <Stack.Navigator
      initialRouteName='Onboarding'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Next" component={TabNavigation} />
    </Stack.Navigator>
  )
}

export default Navigation

