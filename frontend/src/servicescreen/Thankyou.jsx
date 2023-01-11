import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import React from 'react';

var screenSize = Dimensions.get('window');
var screenWidth = screenSize.width;
var screenHight = screenSize.height;

const Thankyou = () => {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Image source={require('../asource/grateful.png')} style={styles.image} />
        <View style={styles.text}>
          <Text style={styles.heytext}>Hey User !</Text>
          <Text style={styles.usertext}>Thank You for Submitting your service / installation request for</Text>
          <Text style={styles.usertext}>Product Name</Text>
          <Text style={styles.usertext2}>Service Request No : #1212</Text>
          <Text style={styles.usertext3}>Estimate Time: 2 to 3 days</Text>
        </View>
      </View>
    </View >
  )
}

export default Thankyou

const styles = StyleSheet.create({
  container: {
    height: screenHight,
    width: screenWidth,
    backgroundColor: 'white',
  },
  background: {
    backgroundColor: '#F2F2F2BD',
    height: '100%',
    marginTop: '20%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50

  },
  image: {
    position: 'absolute',
    alignSelf: 'center',
    width: '80%',
    height: '40%',
    top: '8%'
  },
  heytext: {
    color: 'black',
    fontSize: 20,
    fontWeight: '800',
    marginBottom:22,
  },
  text: {
    alignItems: 'center',
    paddingHorizontal: '18%',
    position: 'absolute',
    top: '62%',
    transform: [{ translateY: -70 }],
    width: '100%'
  },
  usertext: {
    color: 'black',
    fontWeight: '400',
    fontSize: 18,

  },
  usertext2: {
    color: 'black',
    fontWeight: '400',
    fontSize: 16,
   marginTop:20,
  },
  usertext3: {
    color: 'black',
    fontWeight: '400',
    fontSize: 16,

  },
})