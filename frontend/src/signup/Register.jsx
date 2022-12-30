import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import React, { useState } from 'react';

import { useToast } from "react-native-toast-notifications";





const Register = ({ navigation }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const [showPassword, setShowPassword] = useState(true);
  const [showCPassword, setShowCPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const [errField, setErrField] = useState({
    nameErr: '',
    emailErr: '',
    mobileErr: '',
    passwordErr: '',
    cpasswordErr: ''
  })

  const Submit = async () => {                                              //submit function here//
    if (validForm()) {
      setLoading(true);
       let result = await fetch('http://192.168.1.13:5000/users/add', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          mobile,
          password
        })
      })
      result = await  result.json();
      
                                             // to show the alert 
      if(result.message == 'ok'){
        toast.show("User Added successfully", {
          type: "success",
          placement: "top",
          duration: 3000,
          offset: 30,
          animationType: "zoom-in",
        });
                                       // timeout for redirect the screen
        setTimeout(() => {
          navigation.navigate('Login');
        }, 3000);
      }
    

    } else {
      toast.show("Something went wrong", {
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
      nameErr: '',
      emailErr: '',
      mobileErr: '',
      passwordErr: '',
      cpasswordErr: ''
    })
    let formIsValid = true;

    const validEmailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i);

    if (name == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, nameErr: 'Please Enter Name'
      }))
    }
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
    if (mobile == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, mobileErr: 'Please Enter  Mobile no'
      }))
    }
    if (mobile != '' && mobile.length != 10) {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, mobileErr: 'Please Enter 10 Digit Mobile no'
      }))
    }
    if (password == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, passwordErr: 'Please Enter Password'
      }))
    }
    if (cpassword == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, cpasswordErr: 'Please Enter Confirm Password'
      }))
    }
    if (cpassword != '' && password != cpassword) {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, cpasswordErr: 'Password and confirm Password must be same'
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
    <>

      <Image source={require('../asource/logo.png')} style={styles.imagelogo} />

      <Text style={styles.logintext} >Sign Up Here !</Text>

      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <TextInput
          style={styles.input}

          label="Name"
          mode='outlined'
          keyboardType='default'
          onChangeText={setName}
          value={name}
        />
        {errField.nameErr.length > 0 && <Text style={styles.validline}>{errField.nameErr}</Text>}

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
          label='Mobile'
          mode='outlined'
          keyboardType='number-pad'
          onChangeText={setMobile}
          value={mobile}
        />
        {errField.mobileErr.length > 0 && <Text style={styles.validline}>{errField.mobileErr}</Text>}

       
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


        


       
          <TextInput
            style={styles.input}
            mode='outlined'
            label='Confirm-Password'
            keyboardType='default'
            onChangeText={setCpassword}
            value={cpassword}
            secureTextEntry={showCPassword}
            right={<TextInput.Icon icon={showCPassword ? 'eye-off' : 'eye'} size={25} onPress={() => setShowCPassword(!showCPassword)} />}
          />
          {errField.cpasswordErr.length > 0 && <Text style={styles.validline}>{errField.cpasswordErr}</Text>}


        


        <Button icon="account-arrow-left" mode="contained" onPress={Submit} style={styles.bgbtn} loading={loading} >
          Submit
        </Button>

      </ScrollView>
    </>
  )
}

export default Register

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
  container: {
    flex: 1
  },
})