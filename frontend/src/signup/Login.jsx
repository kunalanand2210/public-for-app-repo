import { StyleSheet, RefreshControl, Text, View, Dimensions, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import React, { useState, useEffect, isValidElement } from 'react';

import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import colors from '../constant/colors';
import url from '../Common';



import AsyncStorage from '@react-native-async-storage/async-storage';

import { useToast } from "react-native-toast-notifications";

var screenSize = Dimensions.get('window');
var screenWidth = screenSize.width;
var screenHalfWidth = screenSize.width * 0.465;



const Login = ({ navigation }) => {

  
  const host = url.nodeUrl;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errField, setErrField] = useState({
    emailErr: '',
    passwordErr: '',
  })

  const [showPassword, setShowPassword] = useState(true);




  const Submit = async () => {

    if (validForm()) {

      let result = await fetch(host +"/users/Login", {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      })
      result = await result.json();

      
      if (result.data.status == 200) {

        toast.show("You login Succesfully ", {
          type: "success",
          placement: "top",
          duration: 3000,
          offset: 30,
          animationType: "zoom-in",
        });

        try {
          await AsyncStorage.setItem("token", result.data.token);
        } catch (error) {
          console.log(error);
        }



     

        setTimeout(() => {
          navigation.navigate('Next');
          
        }, 1500);

      }
      if (result.data.status == 401) {
        toast.show("Wrong Password", {
          type: "warning",
          placement: "top",
          duration: 3000,
          offset: 30,
          animationType: "zoom-in",
        });
      }

    } else {
      toast.show("Invalid Email or Password", {
        type: "warning",
        placement: "top",
        duration: 3000,
        offset: 30,
        animationType: "zoom-in",
      });
    }




  }



  const validForm = () => {
    setErrField({
      emailErr: '',
      passwordErr: ''
    })
    let formIsValid = true;
    const validEmailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i);

    if (email == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, emailErr: 'Please Enter EmaiID'
      }))
    }
    if (email != '' && !validEmailRegex.test(email)) {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, emailErr: 'Please Enter a valid Email ID'
      }))
    }
    if (password == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, passwordErr: 'Please Enter Password'
      }))
    }
    return formIsValid;
  }

  const toast = useToast();
  const Tooast = () => {
    toast.show("User Added successfully", {
      type: "success",
      placement: "top",
      duration: 3000,
      offset: 30,
      animationType: "zoom-in",
    });
  }



  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <KeyboardAvoidingView behavior='position'>

        <View style={styles.backbg}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name='arrowleft' size={26} color='black' />
          </TouchableOpacity>
          <Text style={styles.backbtn}>Back</Text>
        </View>

        <Text style={styles.logintext} >Log in</Text>

        <View style={styles.inputStyle}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType='default'
            onChangeText={setEmail}
            value={email}
          />
          {errField.emailErr.length > 0 && <Text style={styles.validline}>{errField.emailErr}</Text>}
          <View>
            <TextInput
              style={styles.input}
              placeholder="Password"
              keyboardType='default'
              onChangeText={setPassword}
              value={password}
              secureTextEntry={showPassword}
            />
            <Icon2 name={showPassword ? 'eye-with-line' : 'eye'} size={24} onPress={() => setShowPassword(!showPassword)} style={styles.passIcon} />
            {errField.passwordErr.length > 0 && <Text style={styles.validline}>{errField.passwordErr}</Text>}
          </View>
          <TouchableOpacity onPress={Submit}>
            <View style={styles.inputbutton}>
              <Text style={styles.inputbuttontext}>LOG IN</Text>
            </View>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default Login

const styles = StyleSheet.create({
  inputStyle: {
    paddingVertical: '4%',
    paddingHorizontal: '4%',
    width: screenWidth,

  },
  input: {
    fontSize: 15,
    fontWeight: '400',
    paddingLeft: 10,
    marginVertical: '2%',
    fontFamily: 'roboto',
    borderWidth: 1,
    height: 52,
    backgroundColor: 'white'
  },
  logintext: {
    fontWeight: '400',
    fontSize: 20,
    color: '#878686',
    marginLeft: '5%',
    marginVertical: '5%'
  },

  bgbtn: {
    fontSize: 16,
    fontWeight: '800',
    backgroundColor: colors.buttonColor,
    borderRadius: 5,

  },
  registerline: {
    fontSize: 15,
    alignSelf: 'center',
    marginLeft: 100,
    marginTop: 40,

  },
  validline: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: '2%'
  },
  backbtn: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Roboto',
    marginLeft: 10
  },
  backbg: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    marginVertical: 20
  },
  passIcon: {
    position: 'absolute',
    right: '4%',
    top: '31%'
  },
  inputbutton: {
    fontWeight: '400',
    alignItems: 'center',
    marginVertical: '2%',
    height: 52,
    borderRadius: 5,
    backgroundColor: colors.buttonColor,
    paddingVertical: '4%'
  },
  inputbuttontext: {
    color: 'white',
    fontSize: 14,
    fontWeight: '900'

  }
})