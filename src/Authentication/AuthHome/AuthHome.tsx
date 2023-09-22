import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import AuthCss from '../AuthCss'

const AuthHome = () => {
  const navigation: any = useNavigation()
  return (
    <View className='flex-1 bg-white'>
      <Image source={location[0]} style={AuthCss.image} />
      <View className='ml-3 mr-3 flex-1'>
        <View className='item-center bg-primary mt-20 p-4 rounded-md'>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className='text-center text-white font-[gothici-Regular]'>Login</Text>
          </TouchableOpacity>
        </View>
        <View className='item-center bg-primary mt-2 p-4 mb-4 rounded-md'>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text className='text-center text-white font-[gothici-Regular]'>Register</Text>
          </TouchableOpacity>
        </View>

        {/* line */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
          <View>
            <Text style={{ width: 50, textAlign: 'center', fontFamily: 'gothici-Regular' }}>or</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
        </View>

        <View className='item-center bg-primary p-4 mt-4 rounded-md '>
          <TouchableOpacity onPress={() => navigation.navigate("GetQuote")}>
            <Text className='text-center text-white font-[gothici-Regular]'>GET MOTOR QUOTE</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Help")}><Text className='text-center bottom-2 font-[gothici-Regular]'>Help?</Text></TouchableOpacity>

    </View >
  )
}

export default AuthHome
const location = [require("../../../assets/images/landing.jpg")]