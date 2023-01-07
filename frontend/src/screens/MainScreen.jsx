import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Avatar, IconButton, Card, Title, Paragraph } from 'react-native-paper';

import CardComponent from '../component/CardComponent';

import Icon from 'react-native-vector-icons/FontAwesome';



const MainScreen = ({ navigation }) => {



  return (
    <ScrollView>
      <SafeAreaView>
        <View >
          <View style={styles.userbox}>
            <View style={styles.userboxbg}>
              <Icon name='user' size={32} color='black' />
            </View>
            <Text style={styles.user}>Hi, User! </Text>
          </View>

          <View style={{ position: 'relative', marginTop: '8%' }}>
            <TouchableOpacity onPress={() => navigation.navigate('Service')}>
              <CardComponent heading='Service' para='For any Services and installation request' />
            </TouchableOpacity>
          </View>


          <View style={{ position: 'absolute', top: '36%' }}>
            <TouchableOpacity onPress={() => navigation.navigate('Product')}>
              <CardComponent heading='Product Information' para='For any Product Information' />
            </TouchableOpacity>
          </View>





        </View>

      </SafeAreaView>
    </ScrollView>

  )
}

export default MainScreen

const styles = StyleSheet.create({
  user: {
    fontWeight: '400',
    fontSize: 20,
    color: '#878686',
    margin: '2%'
  },
  userbox: {

    flexDirection: 'row',
    height: '6%',
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    marginVertical: '3%'
  },
  userboxbg: {
    width: '10%',
    backgroundColor: '#D9D9D9',
    paddingHorizontal: '2%',
    paddingVertical: '1%'
  }
})
