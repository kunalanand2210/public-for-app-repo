import { StyleSheet, Text, View, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect, isValidElement } from 'react';

import { TextInput, Button } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useToast } from "react-native-toast-notifications";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errField, setErrField] = useState({
    emailErr: '',
    passwordErr: '',
  })

  const [showPassword, setShowPassword] = useState(true);

  const [loading, setLoading] = useState(false);

  const Submit = async () => {
    if(validForm()){
      setLoading(true);
      let result = await fetch('http://192.168.1.13:5000/users/Login', {
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
     result = await  result.json();
     
     console.log()
     if(result.data.status ==200){

      toast.show("You login Succesfully ", {
        type: "success",
        placement: "top",
        duration: 3000,
        offset: 30,
        animationType: "zoom-in",
      });

      try {
        await AsyncStorage.setItem("token", JSON.stringify(result.data.token));
      } catch (error) {
        console.log(error);
      }

      setTimeout(() => {
        navigation.navigate('Home');
      }, 3000);
    
     }
     if(result.data.status ==401){
      toast.show("Wrong Password", {
        type: "warning",
        placement: "top",
        duration: 3000,
        offset: 30,
        animationType: "zoom-in",
      });
    }
     
    }else{
      toast.show("Invalid Email or Password", {
        type: "warning",
        placement: "top",
        duration: 3000,
        offset: 30,
        animationType: "zoom-in",
      });
    }


    // fetch('http://192.168.29.194:5000/login', {
    //     method: 'post',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         email,
    //         password
    //     })
    // })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data)
    //         AsyncStorage.setItem("user", JSON.stringify(data));
    //         userdata();
    //     })
    
  }

  // const userdata = async () => {
  //     let user = await AsyncStorage.getItem('user');
  //     const user2 = JSON.parse(user);
  //     console.log(user);
  //    setUsercontent(user);
  //     console.log(user2);
  // }

  const validForm=()=>{
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
  const Tooast = () =>{
    toast.show("User Added successfully", {
      type: "success",
      placement: "top",
      duration: 3000,
      offset: 30,
      animationType: "zoom-in",
    });
  }
  
  // AsyncStorage.getItem('token').then((res) => console.log(res))
  return (
    <View  >
      <Image source={require('../asource/logo.png')} style={styles.imagelogo} />


      <Text style={styles.logintext}>Login here!</Text>
      
       <TextInput
          style={styles.input}
          label="Email"
          mode='outlined'
          keyboardType='default'
          onChangeText={setEmail}
          value={email}
        />
        {errField.emailErr.length > 0 && <Text style={styles.validline}>{errField.emailErr}</Text>}
        <TextInput
            style={styles.input}
            label='Password'
            mode='outlined'
            keyboardType='default'
            onChangeText={setPassword}
            value={password}
            secureTextEntry={showPassword}
            right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} size={25} onPress={() => setShowPassword(!showPassword)} />}
          />
          {errField.passwordErr.length > 0 && <Text style={styles.validline}>{errField.passwordErr}</Text>}

      

     
      <Button icon="account-arrow-left" mode="contained" onPress={Submit} style={styles.bgbtn} loading={loading} >
          Submit
        </Button>
    
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerline}>don't have Account ? Register here</Text>
      </TouchableOpacity>

    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  input: {
    marginHorizontal: '5%',
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: '#e0e7ee',
    fontSize: 16,
    fontWeight: '800',
    paddingLeft: 10,
  },
  imagelogo: {
    width: 200,
    height: 100,
    alignSelf: 'center',
    marginTop: 20,
  },
  logintext: {
    alignSelf: 'center',
    fontSize: 20,
    color: '#007AFF',
    marginTop: 20,
  },
  registerline: {
    fontSize: 15,
    alignSelf: 'center',
    marginLeft: 100,
    marginTop: 40,

  },
  bgbtn: {
    marginHorizontal: '5%',
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '800',
    paddingLeft: 10,
  },
  
  validline: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: '10%'
  },
})