import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import Navigation from './Navigation';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './TabNavigation';

import AsyncStorage from '@react-native-async-storage/async-storage';

const AppNav = () => {
    const [auth, setAuth]= useState(false);
  const [valid, setValid]=useState(null);
  const Authorized = async() =>{
    // AsyncStorage.clear()
    setValid(await AsyncStorage.getItem('token'));
    if(valid !=null){
      setAuth(true);
    }
  }
  Authorized();
  
    return (
        <NavigationContainer>
           {auth ? <TabNavigation/>: <Navigation />} 
        </NavigationContainer>
       
    )
}

export default AppNav

const styles = StyleSheet.create({})