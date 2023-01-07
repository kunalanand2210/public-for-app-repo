import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import MainScreen from '../screens/MainScreen';
import Product from '../productscreen/Product';
import Services from '../servicescreen/Services';
import Thankyou from '../servicescreen/Thankyou';








const StackScreen =()=>{
  return(
    <Stack.Navigator
    initialRouteName='Home2'
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Home2" component={MainScreen} />
    <Stack.Screen name="Service" component={Services} />
    <Stack.Screen name="Product" component={Product} />
    <Stack.Screen name="Thankyou" component={Thankyou} />
  </Stack.Navigator>
  )
}

const TabNavigation = () => {
  return (
    <Tab.Navigator
    screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: '#AD40AF'},
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: 'yellow',
      }}
      >
    <Tab.Screen name="Home" component={StackScreen} />
    <Tab.Screen name="Settings" component={Product} />
  </Tab.Navigator>
  )
}

export default TabNavigation

const styles = StyleSheet.create({})