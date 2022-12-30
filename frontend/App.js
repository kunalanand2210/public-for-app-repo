
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

// here is import of splash screen
import SplashScreen from 'react-native-splash-screen';
import MainScreen from './src/screens/MainScreen';
import Navigation from './src/navigation/Navigation';

import { ToastProvider } from 'react-native-toast-notifications'    //toaster for notification import

const App = () => {


  setTimeout(() => {
    SplashScreen.hide();
  }, 500);

  return (

    <ToastProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
      </ToastProvider >
      )
}

      export default App

      const styles = StyleSheet.create({ })