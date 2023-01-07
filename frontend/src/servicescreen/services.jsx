import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';

import Dropdown from '../component/Dropdown';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Feather';
import colors from '../constant/colors';

import FilePicker from 'react-native-document-picker';

import { useToast } from "react-native-toast-notifications";

var screenSize = Dimensions.get('window');
var screenWidth = screenSize.width;

const Services = ({ navigation }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');

  const [errField, setErrField] = useState({
    brandErr:'',
    productErr:'',
    nameErr: '',
    emailErr: '',
    mobileErr: '',
    addressErr: '',
    invoiceErr:''
  })

  // these for document select and upload 
  const [filedata, setFiledata] = useState([]);

  const handleFilePicker = async () => {
    try {
      const response = await FilePicker.pick({
        presentationStyle: 'fullScreen'
      });
      let result = response[0].uri;
      setFiledata(result);
      console.log(filedata);
    } catch (err) {
      console.log(err);
    }
  }
 
  const [selecteditem, setSelecteditem] = useState(null);
  const [selecteditem1, setSelecteditem1] = useState(null);
  const [brand, setBrand] = useState();
  const [product, setProduct] = useState();
  let data = [
    { id: 1, name: "Thompson" },
    { id: 2, name: "White WestingHouse" },
    { id: 3, name: "WestingHouse" },
    { id: 4, name: "Blaupunkt" },
    { id: 5, name: "kodak TV" }
  ];
  let data1 = [
    { id: 1, name: "LED TV" },
    { id: 2, name: "Washing Machine" },
    { id: 3, name: "Cooler" },
    { id: 4, name: "AC" }
  ];

  const onSelect = (e) => {
    setSelecteditem(e.name);
    setBrand(e.id);
  };
  const onSelect1 = (e) => {
    setSelecteditem1(e.name);
    setProduct(e.id);
  };

  const Submit = async () => {                                              //submit function here//
    if (validForm()) {
      // let result = await fetch('http://192.168.1.41:5000/users/add', {
      //   method: 'post',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     name,
      //     email,
      //     mobile,
      //     password
      //   })
      // })
      // result = await result.json();

      // to show the alert 
      // if (result.message == 'ok') {
      //   toast.show("User Added successfully", {
      //     type: "success",
      //     placement: "top",
      //     duration: 3000,
      //     offset: 30,
      //     animationType: "zoom-in",
      //   });
      //   // timeout for redirect the screen
      //   setTimeout(() => {
      //     navigation.navigate('Login');
      //   }, 3000);
      // }


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
      brandErr:'',
      productErr:'',
      nameErr: '',
      emailErr: '',
      mobileErr: '',
      addressErr:'',
      invoiceErr:'',
    })
    let formIsValid = true;

    const validEmailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i);
    if (selecteditem == null) {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, brandErr: 'Please Select Brand name'
      }))
    }
    if (selecteditem1 == null) {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, productErr: 'Please Select Product'
      }))
    }
    if (name == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, nameErr: 'Please Enter Customer Name'
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
    if (address == '') {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, addressErr: 'Please Enter Address'
      }))
    }
    if (!filedata.name) {
      formIsValid = false;
      setErrField(prevState => ({
        ...prevState, invoiceErr: 'Please upload invoice'
      }))
    }
    return formIsValid;
  }

  const toast = useToast();

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <KeyboardAvoidingView behavior='position'>
        <SafeAreaView>
          <View>
            <View style={styles.backbg}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name='arrowleft' size={26} color='black' />
              </TouchableOpacity>

              <Text style={styles.backbtn}>Back</Text>
            </View>
            <Text style={styles.logintext}>Service</Text>

            <View style={styles.inputStyle}>
              <Dropdown daata={data} value={selecteditem} onSelect={onSelect} name='Select Brand' style={styles.input} />
              {errField.brandErr.length > 0 && <Text style={styles.validline}>{errField.brandErr}</Text>}
           
              <Dropdown daata={data1} value={selecteditem1} onSelect={onSelect1} name='select Product' style={styles.input} />
              {errField.productErr.length > 0 && <Text style={styles.validline}>{errField.productErr}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Customer Name"
                keyboardType='default'
                onChangeText={setName}
                value={name}
              />
              {errField.nameErr.length > 0 && <Text style={styles.validline}>{errField.nameErr}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                keyboardType='number-pad'
                onChangeText={setMobile}
                value={mobile}
              />
              {errField.mobileErr.length > 0 && <Text style={styles.validline}>{errField.mobileErr}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Email Address"
                keyboardType='default'
                onChangeText={setEmail}
                value={email}
              />
              {errField.emailErr.length > 0 && <Text style={styles.validline}>{errField.emailErr}</Text>}

              <TextInput
                style={styles.addinput}
                placeholder="Address"
                keyboardType='default'
                onChangeText={setAddress}
                value={address}
                multiline={true}
              />
              {errField.addressErr.length > 0 && <Text style={styles.validline}>{errField.addressErr}</Text>}

              <TouchableOpacity onPress={() => handleFilePicker()}>
                <View style={styles.upload}>
                  <Text style={styles.uploadtext}>{filedata ? 'Upload Invoice' : filedata.name }</Text>
                  <Icon1 name='upload' size={28} style={styles.icon1} />
                </View>
              </TouchableOpacity>
              {errField.invoiceErr.length > 0 && <Text style={styles.validline}>{errField.invoiceErr}</Text>}
            
             <TouchableOpacity onPress={Submit}>
             <View style={styles.inputbutton}>
                <Text style={styles.inputbuttontext}>SUBMIT</Text>
              </View>
             </TouchableOpacity>
             
            </View>


          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default Services

const styles = StyleSheet.create({
  inputStyle: {
    paddingVertical: '4%',
    paddingHorizontal: '4%',
    width: screenWidth,

  },
  logintext: {
    fontWeight: '400',
    fontSize: 20,
    color: '#878686',
    marginLeft: '5%',
    marginVertical: '5%'
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
  addinput: {
    fontSize: 15,
    fontWeight: '400',
    paddingLeft: 10,
    marginVertical: '2%',
    fontFamily: 'roboto',
    borderWidth: 1,
    height: 90,
    backgroundColor: 'white'
  },
  validline: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: '2%'
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

  },
  upload: {
    paddingLeft: 10,
    marginVertical: '2%',
    borderWidth: 1,
    height: 52,
    backgroundColor: 'white',
    paddingVertical: '3%'
  },
  icon1: {
    position: 'absolute',
    top: '50%',
    left: '2%'
  },
  uploadtext: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'roboto',
    position: 'absolute',
    top: '50%',
    left: '13%'
  }
})