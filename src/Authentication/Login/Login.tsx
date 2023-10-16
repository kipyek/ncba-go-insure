import { Linking, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AuthCss from '../AuthCss'
import { Formik } from 'formik'
import * as Yup from "yup"
import { api } from '../../Services'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { companiesDetails } from '../../Component/util'

const validationSchema = Yup.object().shape({
  email: Yup
    .string()
    .email('Please enter valid email')
    .trim()
    .required('Email is required'),
  password: Yup
    .string()
    .required('Password is required')
    .trim(),
})

const Login = () => {
  const navigation: any = useNavigation()
  const [isLoading, setisLoading] = useState(false)

  const privacyPolicy = () => {
    Linking.canOpenURL("https://ke.ncbagroup.com/privacy-policy/").then(supported => {
      if (supported) {
        Linking.openURL("https://ke.ncbagroup.com/privacy-policy/");
      } else {
        console.log("Unable to open link. Please Download a browser");
      }
    });
  };

  const handleLogin = (values: any) => {
    setisLoading(true)
    const payload = {
      "Email": values.email,
      "Password": values.password,
    }

    api.post("authentication/Login", payload)
      .then(response => {
        const data = response.data;
        const email = data.body;
        navigation.navigate("LoginOTP", { item: email })
        console.log(data)
      }).catch(error => {
        alert(error.response?.data?.message)
        console.log(error.response)
      }).finally(() => {
        setisLoading(false)
      })
  }


  return (
    <View className='bg-white flex-1'>
      <View className='mt-14 ml-4' style={AuthCss.card}>
        <Text className='font-["gothici-Regular"] text-[#333333]' style={{ fontSize: 20 }}>Welcome to {companiesDetails.name}</Text>
        <Text className='font-["gothici-Regular"]'>Login to your account</Text>
      </View>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={values => handleLogin(values)}>
        {({
          handleChange,
          handleBlur,
          errors,
          handleSubmit,
        }) => (
          <View>
            <View className='mr-2 ml-2 mt-10'>
              <View className='mb--2'>
                <TextInput
                  className='p-1 rounded-md '
                  style={{ borderWidth: 1 }}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  placeholder="Enter your email"
                  keyboardType="default"
                />
                {errors && <Text className='text-red-400 font-light'>{errors.email}</Text>}
              </View>

              <View>
                <TextInput
                  className='p-1 rounded-md mt-2'
                  style={{ borderWidth: 1 }}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  placeholder="Type your password"
                  autoCorrect={false}
                  keyboardType="visible-password"
                />
                {errors && <Text className='text-red-400 font-light'>{errors.password}</Text>}
              </View>


              <View className='item-center bg-primary p-4 mt-4 rounded-md '>
                {!isLoading ?
                  <TouchableOpacity onPress={() => handleSubmit()}>
                    <Text className='text-center text-white font-["gothici-Bold"]'>LOGIN</Text>
                  </TouchableOpacity>
                  :
                  <Text className='text-center text-white font-["gothici-Bold"]'>Processing...</Text>
                }
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text className='font-["gothici-Regular"] text-[#00BFFF] mt-6' >Not Registered? Click here to register</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                <Text className='font-["gothici-Regular"] text-[#00BFFF] mt-4' >Forgot your password?</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => navigation.navigate("GetQuote")}>
                <Text className='mt-4 font-["gothici-Regular"] text-[#00BFFF]'>Get Motor Quote</Text>
              </TouchableOpacity> */}
              <TouchableOpacity onPress={privacyPolicy}>
                <Text className='font-["gothici-Regular"] text-[#00BFFF] mt-4'>Privacy policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>


    </View>

  )
}

export default Login;