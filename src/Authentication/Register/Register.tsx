import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Fragment, useState } from 'react'
import { RadioButton } from '../../Component/RadioButton';
import { useNavigation } from '@react-navigation/native';
import { Fontisto } from '@expo/vector-icons';
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';
import { api } from '../../Services';
import AuthCss from '../AuthCss';
import { Formik } from 'formik'
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
  sname: Yup
    .string()
    .required('Surname is required'),
  fname: Yup
    .string()
    .required('Firstname is required'),
  nationalId: Yup
    .string()
    .required('National Id is required'),
  kra: Yup
    .string()
    .required('KRA Pin is required'),
  email: Yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
  phone: Yup
    .string()
    .required('Phone number is required'),
  password: Yup
    .string()
    .required('Password is required'),
  pass: Yup
    .string()
    .required('Confirm password is required')
});

const Register = () => {
  const navigation: any = useNavigation()
  const [selectedOption, setSelectedOption] = useState('customer');
  const [date, setDate] = useState(null);
  const [isLoading, setisLoading] = useState(false)
  const [code, setCode] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)


  const handleRadioButtonChange = (value: any) => {
    setSelectedOption(value);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirmDate = (date: any) => {
    setDate(date)
    hideDatePicker()
  }

  const handleConfirmEMail = () => {
    Alert.alert('Welcome to NCBA Go Insure',
      'Thank you for your interest in NCBA Go Insure. Please check your email for a link to activate your account.Incase you have not received the confirmation email, click "Resend" below to send a new code',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Resend', onPress: () => console.log('OK Pressed') },
      ]);
  }



  const handleRegistration = (values: any) => {
    setisLoading(true)
    if (values.password === values.pass) {
      const payload = {
        "Email": values.email,
        "IDNumber": values.nationalId,
        "FirstName": values.fname,
        "Surname": values.sname,
        "OtherNames": values.otherName,
        "PhoneNumber": values.phone,
        "KRAPin": values.kra,
        "UserType": "Customer",
        "DateOfBirth": date,
        "Password": values.password,
      }
      console.log(payload)

      api.post("authentication/SignUp", payload)
        .then(response => {
          const data = response.data
          const email = data.body
          //alert(data.message)
          navigation.navigate("RegisterOTP", { item: email })
        }).catch(error => {
          alert(error.response.data.message)
        }).finally(() => {
          setisLoading(false)
        })
    } else {
      console.log("Password do not match")
    }
  }

  return (
    <Fragment>
      <View className='flex-1'>
        <View className='mt-14 ml-4' style={AuthCss.card}>
          <Text className='font-["gothici-Regular"] text-[#333333]' style={{ fontSize: 20 }}>Welcome to NCBA Go Insure</Text>
          <Text className='font-["gothici-Regular"]'>Please register here</Text>
        </View>
        <View className='mt-1 ml-4 mr-4'>
          <Text className='mb-3 font-["gothici-Regular"]'>Register as</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8 }}>
            <RadioButton
              label="Customer"
              value="customer"
              selected={selectedOption === 'customer'}
              onSelect={handleRadioButtonChange}
            />
            <RadioButton
              label="Agent"
              value="agent"
              selected={selectedOption === 'agent'}
              onSelect={handleRadioButtonChange}
            />
          </View>

          <View style={{ borderColor: 'grey', borderWidth: 0.5, opacity: 0.5 }} />
        </View>


        <Formik
          initialValues={{ sname: '', fname: '', otherName: '', nationalId: '', kra: '', email: '', phone: '', password: '', pass: '' }}
          validationSchema={validationSchema}
          onSubmit={values => handleRegistration(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched
          }) => (
            <View>
              <ScrollView>
                <View className='mb-40'>
                  <View className='mt-4 ml-4 mr-4'>
                    <View className='flex-row item-center gap-1'>
                      <View className='flex-1'>
                        <TextInput
                          className='p-1 rounded-md'
                          style={{ borderWidth: 1 }}
                          onChangeText={handleChange("sname")}
                          onBlur={handleBlur("sname")}
                          placeholder="Enter Surname"
                          keyboardType="visible-password"
                        />
                        {errors && <Text className='text-red-400 font-light'>{errors.sname}</Text>}
                      </View>

                      <View className='flex-1'>
                        <TextInput
                          className='p-1 rounded-md'
                          style={{ borderWidth: 1 }}
                          onChangeText={handleChange("fname")}
                          onBlur={handleBlur("fname")}
                          placeholder="Enter first name"
                          keyboardType="visible-password"
                        />
                        {errors && <Text className='text-red-400 font-light'>{errors.fname}</Text>}
                      </View>

                    </View>


                    <TextInput
                      className='p-1 rounded-md mt-2 mb-3'
                      style={{ borderWidth: 1 }}
                      onChangeText={handleChange("otherName")}
                      onBlur={handleBlur("otherName")}
                      placeholder="Enter your other names"
                      keyboardType="visible-password"
                    />
                    {selectedOption === 'customer' ?
                      <View className='flex-row item-center gap-1 mt-2 mb-4'>
                        <TextInput
                          className='p-1 rounded-md flex-1 '
                          style={{ borderWidth: 1 }}
                          onChangeText={handleChange("nationalId")}
                          onBlur={handleBlur("nationalId")}
                          placeholder="Enter your national ID"
                          keyboardType="default"
                        />
                        <TextInput
                          className='p-1 rounded-md flex-1'
                          style={{ borderWidth: 1 }}
                          onChangeText={handleChange("kra")}
                          onBlur={handleBlur("kra")}
                          placeholder="Enter your KRA PIN"
                          keyboardType="default"
                        />
                      </View>
                      :
                      null
                    }

                    {selectedOption === 'agent' ?
                      <TextInput
                        className='p-1 rounded-md  mt-2'
                        style={{ borderWidth: 1 }}
                        onChangeText={text => setCode(text)}
                        value={code}
                        placeholder="Enter your DSA Code"
                        keyboardType="default"
                      />
                      :
                      null
                    }

                    <View>
                      <TextInput
                        className='p-1 rounded-md mt-2'
                        style={{ borderWidth: 1 }}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        placeholder="Enter your email"
                        keyboardType="visible-password"
                      />
                      {errors ? <Text className='text-red-400 font-light'>{errors.email}</Text> : <Text></Text>}
                    </View>

                    <View>
                      <TextInput
                        className='p-1 rounded-md mt-2'
                        style={{ borderWidth: 1 }}
                        onChangeText={handleChange("phone")}
                        onBlur={handleBlur("phone")}
                        placeholder="07XXXXXXXX"
                        keyboardType="visible-password"
                      />
                      {errors ? <Text className='text-red-400 font-light'>{errors.phone}</Text> : null}
                    </View>


                    <View className='flex-row justify-between p-2 rounded-md mt-2' style={{ borderWidth: 1 }}>
                      {date ?
                        <Text>{Moment(date).format('Do MMMM, YYYY')}</Text>
                        :
                        <Text className='text-gray-400'>Select date of birth</Text>
                      }
                      <Fontisto name="date" size={20} color="black" onPress={() => setDatePickerVisibility(true)} />
                    </View>


                    <View className='flex-row item-center gap-1 mt-4'>
                      <View className='flex-1'>
                        <TextInput
                          className='p-1 rounded-md'
                          style={{ borderWidth: 1 }}
                          onChangeText={handleChange("password")}
                          onBlur={handleBlur("password")}
                          placeholder="Type your password"
                          keyboardType="visible-password"
                        />
                        {errors ? <Text className='text-red-400 font-light'>{errors.password}</Text> : <Text></Text>}
                      </View>

                      <View className='flex-1'>
                        <TextInput
                          className='p-1 rounded-md'
                          style={{ borderWidth: 1 }}
                          onChangeText={handleChange("pass")}
                          onBlur={handleBlur("pass")}
                          placeholder="Confirm password"
                          keyboardType="visible-password"
                        />
                        {errors ? <Text className='text-red-400 font-light'>{errors.pass}</Text> : <Text></Text>}
                      </View>

                    </View>

                    <View className='item-center bg-primary p-4 mt-4 rounded-md '>
                      {!isLoading ?
                        <TouchableOpacity onPress={() => handleSubmit()}>
                          <Text className='text-center text-white font-["gothici-Bold"]'>REGISTER</Text>
                        </TouchableOpacity>
                        :
                        <Text className='text-center text-white font-["gothici-Bold"]'>Processing...</Text>
                      }

                    </View>
                  </View>

                  <View className='ml-4 mr-4 mt-10'>
                    <View className='flex-row'>
                      <Text className='font-["gothici-Regular"]'>Already have an account?</Text>
                      <Text className='font-["gothici-Bold"] text-ncba1' onPress={() => navigation.navigate("Login")}> Please Login</Text>
                    </View>
                    <Text className='mt-2 font-["gothici-Regular"] text-ncba1' onPress={() => navigation.navigate("GetQuote")}>Get Motor Quote</Text>
                  </View>
                </View>

              </ScrollView>
            </View>
          )}
        </Formik>


      </View >
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        display='default'
        pickerContainerStyleIOS={{ justifyContent: "center", paddingHorizontal: 150 }}
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      // minimumDate={new Date()}
      //maximumDate={new Date(new Date().getTime() - (14 * 24 * 60 * 60 * 1000))}
      />
    </Fragment>

  )
}

export default Register