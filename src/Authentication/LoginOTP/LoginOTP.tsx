import { Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { CommonActions, useNavigation } from '@react-navigation/native'
import AuthCss from '../AuthCss'
import { api } from '../../Services'
import { Formik } from 'formik'
import * as Yup from "yup"

const validationSchema = Yup.object().shape({
  code: Yup
    .string()
    .required('Code is required')
    .trim(),
})

const LoginOTP = ({ route }: any) => {
  const { item } = route.params
  console.log("Login email", item)
  const navigation: any = useNavigation()
  const [isLoading, setisLoading] = useState(false)

  const handleSuccess = () => {
    navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [
        { name: 'Home' },
      ],
    }))
  }

  const handleLoginOtp = (values: any) => {
    setisLoading(true)
    const payload = {
      "Email": item,
      "Code": values.code
    }

    api.post("authentication/Verify/LoginOtp", payload)
      .then(response => {
        const data = response.data
        console.log(data)
        handleSuccess()
      }).catch(error => {
        console.log(error)
      }).finally(() =>
        setisLoading(false)
      )
  }

  return (
    <View className='bg-white flex-1'>
      <View className='mt-14 ml-4' style={AuthCss.card}>
        <Text className='font-["gothici-Regular"] text-[#333333]' style={{ fontSize: 20 }}>Welcome to NCBA Go Insure</Text>
        <Text className='font-["gothici-Regular"]' style={{ fontSize: 12 }}>Enter your authenticator code sent to your phone number and email</Text>
      </View>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={values => handleLoginOtp(values)}>
        {({
          handleChange,
          handleBlur,
          errors,
          handleSubmit,
        }) => (
          <View className='mr-4 ml-4 mt-10'>
            <TextInput
              className='p-1 rounded-md '
              style={{ borderWidth: 1 }}
              onChangeText={handleChange("code")}
              onBlur={handleBlur("code")}
              placeholder="Enter the OTP code sent to your phone"
              keyboardType="numeric"
            />

            <View className='flex-row mt-6'>
              <Text>OTP not received? click</Text>
              <Text className='ml-2 font-["gothici-Bold"]'>RESEND</Text>
            </View>

            <View className='flex-row justify-between'>
              <View className='item-center bg-primary p-2 mt-3 rounded-md w-32'>
                <TouchableOpacity>
                  <Text className='text-center text-white font-["gothici-Bold"]'>RESEND</Text>
                </TouchableOpacity>
              </View>
              <View className='item-center bg-primary p-3 mt-2 rounded-md w-32'>
                {!isLoading ?
                  <TouchableOpacity onPress={() => handleSubmit()}>
                    <Text className='text-center text-white font-["gothici-Bold"]'>VERIFY</Text>
                  </TouchableOpacity>
                  :
                  <Text className='text-center text-white font-["gothici-Bold"]'>Processing...</Text>
                }
              </View>
            </View>

          </View>
        )}
      </Formik>


    </View>

  )
}

export default LoginOTP;