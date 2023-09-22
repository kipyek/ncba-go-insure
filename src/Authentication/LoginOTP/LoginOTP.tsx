import { Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { CommonActions, useNavigation } from '@react-navigation/native'
import AuthCss from '../AuthCss'

const LoginOTP = () => {
  const navigation: any = useNavigation()
  const [code, setCode] = useState('')

  const handleSuccess = () => {
    navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [
        { name: 'Home' },
      ],
    }))
  }
  return (
    <View className='bg-white flex-1'>
      <View className='mt-14 ml-4' style={AuthCss.card}>
        <Text className='font-["gothici-Regular"] text-[#333333]' style={{ fontSize: 20 }}>Welcome to NCBA Go Insure</Text>
        <Text className='font-["gothici-Regular"]' style={{ fontSize: 12 }}>Enter your authenticator code sent to your phone number and email</Text>
      </View>

      <View className='mr-2 ml-2 mt-10'>
        <TextInput
          className='p-1 rounded-md '
          style={{ borderWidth: 1 }}
          onChangeText={text => setCode(text)}
          value={code}
          placeholder="Enter the OTP code sent to your phone"
          keyboardType="default"
        />

        <View className='flex-row mt-6'>
          <Text>OTP not received? click</Text>
          <Text className='ml-2 font-["gothici-Bold"]'>RESEND</Text>
        </View>

        <View className='flex-row justify-between'>
          <View className='item-center bg-[#302A29] p-2 mt-3 rounded-md w-32'>
            <TouchableOpacity onPress={() => navigation.navigate("LoginOTP")}>
              <Text className='text-center text-white font-["gothici-Bold"]'>RESEND</Text>
            </TouchableOpacity>
          </View>
          <View className='item-center bg-[#302A29] p-3 mt-2 rounded-md w-32'>
            <TouchableOpacity onPress={() => handleSuccess()}>
              <Text className='text-center text-white font-["gothici-Bold"]'>VERIFY</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>


    </View>

  )
}

export default LoginOTP;