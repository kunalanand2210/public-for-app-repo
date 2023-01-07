import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react';

import colors from '../constant/colors';

const image = require('../asource/logoback.jpg');


var screenSize = Dimensions.get('window');
var screenWidth = screenSize.width;
var screenHalfWidth = screenSize.width * 0.465;


const Onboarding = ({ navigation }) => {

  return (

    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Image source={require('../asource/logo.png')} style={styles.imagelogo} />

        <View  style={[styles.btnContain, {
        width:screenWidth,
      }]}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <View style={[styles.loginStyle,{
              width:screenHalfWidth,
            }]}>
              <Text style={styles.logintext}>LOG IN</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <View style={[styles.registerStyle,{
              width:screenHalfWidth,
            }]}>
              <Text style={styles.registertext}>REGISTER</Text>
            </View>
          </TouchableOpacity>
        </View>


      </ImageBackground>
    </View>
  )
}

export default Onboarding

const styles = StyleSheet.create({
  image: {
    flex: 1,
    
  },
  imagelogo: {
    width: '50%',
    height: '15%',
    alignSelf: 'center',
    resizeMode: 'contain',
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -70 }],
  },

  btnContain :{
    position:'absolute',
    bottom:'1.5%',
    paddingVertical:10,
    paddingHorizontal:10,
    flexDirection:'row',
    justifyContent:'space-between',
  },

  registerStyle: {
    borderColor: 'black',
    width: '100%',
    height: 52,
    borderRadius: 6,
    backgroundColor: colors.buttonColor,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    

  },
  loginStyle: {
    borderColor: 'black',
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',

    
    // top: 350,
  },

  container: {
    flex: 1,
  },

  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  },
  logintext: {
    padding: 13,
    fontSize: 16,
    fontWeight: '700'
  },
  registertext: {
    padding: 13,
    fontSize: 16,
    fontWeight: '700',
    color: 'white'
  }

})