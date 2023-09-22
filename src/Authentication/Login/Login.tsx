import { Linking, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AuthCss from '../AuthCss'

const Login = () => {
  const navigation: any = useNavigation()
  const [email, setEmail] = useState('')
  const [password, SetPassword] = useState('')

  const privacyPolicy = () => {
    Linking.canOpenURL("https://ke.ncbagroup.com/privacy-policy/").then(supported => {
      if (supported) {
        Linking.openURL("https://ke.ncbagroup.com/privacy-policy/");
      } else {
        console.log("Unable to open link. Please Download a browser");
      }
    });
  };
  return (
    <View className='bg-white flex-1'>
      <View className='mt-14 ml-4' style={AuthCss.card}>
        <Text className='font-["gothici-Regular"] text-[#333333]' style={{ fontSize: 20 }}>Welcome to NCBA Go Insure</Text>
        <Text className='font-["gothici-Regular"]'>Login to your account</Text>
      </View>

      <View className='mr-2 ml-2 mt-10'>
        <TextInput
          className='p-1 rounded-md '
          style={{ borderWidth: 1 }}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="Enter your email"
          keyboardType="default"
        />

        <TextInput
          className='p-1 rounded-md mt-2'
          style={{ borderWidth: 1 }}
          onChangeText={text => SetPassword(text)}
          value={password}
          placeholder="Type your password"
          keyboardType="default"
        />

        <View className='item-center bg-primary p-4 mt-4 rounded-md '>
          <TouchableOpacity onPress={() => navigation.navigate("LoginOTP")}>
            <Text className='text-center text-white font-["gothici-Bold"]'>LOGIN</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text className='font-["gothici-Regular"] text-[#00BFFF] mt-6' >Not Registered? Click here to register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text className='font-["gothici-Regular"] text-[#00BFFF] mt-4' >Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("GetQuote")}>
          <Text className='mt-4 font-["gothici-Regular"] text-[#00BFFF]'>Get Motor Quote</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={privacyPolicy}>
          <Text className='font-["gothici-Regular"] text-[#00BFFF] mt-4'>Privacy policy</Text>
        </TouchableOpacity>
      </View>


    </View>

  )
}

export default Login;