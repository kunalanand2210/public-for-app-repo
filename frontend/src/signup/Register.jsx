import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  TextInput
} from 'react-native';

import React, { useState } from 'react';

import { useToast } from "react-native-toast-notifications";

import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import colors from '../constant/colors';


var screenSize = Dimensions.get('window');
var screenWidth = screenSize.width;
var screenHalfWidth = screenSize.width * 0.465;


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
      let result = await fetch('http://192.168.1.109:5000/users/add', {
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
      result = await result.json();

      // to show the alert 
      if (result.message == 'ok') {
        toast.show("User Added successfully", {
          type: "success",
          placement: "top",
          duration: 1500,
          offset: 30,
          animationType: "zoom-in",
        });
        // timeout for redirect the screen
        setTimeout(() => {
          navigation.navigate('Login');
        }, 1500);
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
    <ScrollView style={{ backgroundColor: 'white' }}>
      <KeyboardAvoidingView behavior='position'>


        <View style={styles.backbg}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name='arrowleft' size={26} color='black' />
          </TouchableOpacity>

          <Text style={styles.backbtn}>Back</Text>
        </View>

        <Text style={styles.logintext} >Register</Text>


        <View style={styles.inputStyle}>



          <TextInput
            style={styles.input}
            placeholder="Name"
            keyboardType='default'
            onChangeText={setName}
            value={name}
          />
          {errField.nameErr.length > 0 && <Text style={styles.validline}>{errField.nameErr}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType='default'
            onChangeText={setEmail}
            value={email}
          />
          {errField.emailErr.length > 0 && <Text style={styles.validline}>{errField.emailErr}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Mobile"
            keyboardType='number-pad'
            onChangeText={setMobile}
            value={mobile}
          />
          {errField.mobileErr.length > 0 && <Text style={styles.validline}>{errField.mobileErr}</Text>}

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






          <View>
            <TextInput
              style={styles.input}
              placeholder="Confirm-Password"
              keyboardType='default'
              onChangeText={setCpassword}
              value={cpassword}
              secureTextEntry={showCPassword}
            />
            <Icon2 name={showCPassword ? 'eye-with-line' : 'eye'} size={24} onPress={() => setShowCPassword(!showCPassword)} style={styles.passIcon} />
            {errField.cpasswordErr.length > 0 && <Text style={styles.validline}>{errField.cpasswordErr}</Text>}
          </View>


          <TouchableOpacity onPress={Submit}>
            <View style={styles.inputbutton}>
              <Text style={styles.inputbuttontext}>SUBMIT</Text>
            </View>
          </TouchableOpacity>




        </View>

      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default Register

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
  registerline: {
    fontSize: 15,
    alignSelf: 'center',
    marginLeft: 100,
    marginTop: 40,

  },
  bgbtn: {
    fontSize: 16,
    fontWeight: '800',
    backgroundColor: colors.buttonColor,
    borderRadius: 5,

  },
  validline: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: '2%'
  },
  container: {
    flex: 1
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