import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import MainScreen from '../screens/MainScreen';
import Login from '../signup/Login';
import Register from '../signup/Register';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator
    initialRouteName='Login'
    screenOptions={{
        headerShown:false,
    }}
    >
      
      <Stack.Screen name="Home" component={MainScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      
      
    </Stack.Navigator>
  )
}

export default Navigation

const styles = StyleSheet.create({})