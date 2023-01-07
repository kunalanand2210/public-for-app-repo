
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';



// here is import of splash screen
import SplashScreen from 'react-native-splash-screen';

import Navigation from './src/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';


import { ToastProvider } from 'react-native-toast-notifications'    //toaster for notification import
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';

const App = () => {


  setTimeout(() => {
    SplashScreen.hide();
  }, 500);

  return (
    
      <ToastProvider>
        <AppNav />
      </ToastProvider >
       
  );
}

export default App

const styles = StyleSheet.create({})