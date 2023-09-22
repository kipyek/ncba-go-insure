import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import AuthCss from '../AuthCss'

const Help = () => {
  return (
    <View className='flex-1 bg-white'>
      <Image source={require("../../../assets/images/ncba.png")} style={AuthCss.helpImage} />
      <View style={AuthCss.card}>
        <Text className='mt-2 font-[gothici-Regular]'>Mara Rd. Upper-hill </Text>
        <Text className='mt-2 font-[gothici-Regular]'>P.O Box 44599-00100, Nairobi Kenya </Text>
        <Text className='mt-2 font-[gothici-Regular]'>Customer Contact Centre </Text>
        <Text className='mt-2 font-[gothici-Regular]'>Tel:+254 20 2884444 </Text>
        <Text className='mt-2 font-[gothici-Regular]'>Whatsapp +254 717 804 444</Text>
        <Text className='mt-2 font-[gothici-Regular]'>Toll Free Number: 0800 720 444</Text>
        <Text className='mt-2 font-[gothici-Regular]'>Mobile: +254 711 056444/+254 732 156444</Text>
        <Text className='mt-2 font-[gothici-Regular]'>Whistleblow Line (Toll Free): 0800722626</Text>
        <Text className='mt-2 font-[gothici-Regular]'>Toll Free Fax: 00800007788</Text>
      </View>

    </View>
  )
}

export default Help

