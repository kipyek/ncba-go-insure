import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AuthCss from '../AuthCss';
import { apis } from '../../Services';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    email !== '' &&
      apis.post(`authentication/Reset/Otp?email=${email}`)
        .then(response => {
          const data = response.data
          console.log("success", data)
        }).catch(error => {
          console.log(error.response?.data?.message)
        })
  }
  return (
    <View >
      <View className='mt-14'>
        <View style={AuthCss.card}>
          <Text className='font-["gothici-Regular"]' style={{ fontSize: 22 }}>Forgot password</Text>
          <Text className='font-["gothici-Regular"]' style={{ fontSize: 13 }}>Enter your email to receive code</Text>
        </View>

        <View className='mr-2 ml-2 mt-6'>
          <Text className='mb-1 font-[gothici-Regular]'>Enter your email</Text>
          <TextInput
            className='p-1 rounded-md '
            style={{ borderWidth: 1 }}
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder="Enter your email"
            keyboardType="default"
          />

          <View className='item-center bg-primary p-3 mt-4 rounded-md '>
            <TouchableOpacity onPress={() => handleResetPassword()}>
              <Text className='text-center text-white font-["gothici-Bold"]'>SUBMIT</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity >
            <Text className='mt-4 font-["gothici-Regular"] text-[#00BFFF]'>Resend Email Confirmation</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default ForgotPassword;