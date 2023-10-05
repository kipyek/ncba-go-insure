import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import AuthCss from '../AuthCss'

const Help = () => {
  return (
    <View className='flex-1 bg-white'>
      <Image source={require("../../../assets/images/Coopbanklogo.jpg")} style={AuthCss.helpImage} resizeMode='cover' />
      <View style={AuthCss.card}>
        <Text className='mt-2 font-[gothici-Regular]'>Co-operative House, Haile Selassie Avenue, Nairobi, Kenya </Text>
        <Text className='mt-2 font-[gothici-Regular]'>P.O. Box 48231 - 00100, Nairobi</Text>
        <Text className='mt-2 font-[gothici-Regular]'>Call Center Numbers </Text>
        <Text className='mt-2 font-[gothici-Regular]'>Tel: 020-2776000, 0703027000</Text>
        <Text className='mt-2 font-[gothici-Regular]'>Email: customerservice@co-opbank.co.ke</Text>
        <Text className='mt-2 font-[gothici-Regular]'>Whatsapp: +254736690101</Text>
        <Text className='mt-2 font-[gothici-Regular]'>SMS: 16111</Text>
      </View>

    </View>
  )
}

export default Help

