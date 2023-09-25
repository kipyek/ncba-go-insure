import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native'
import React, { useState } from 'react'
import { Header } from '../../Component/Header'
import { useNavigation } from '@react-navigation/native'
import HomeCss from '../HomeCss'
import { StatusBar } from 'expo-status-bar'


const Claim = () => {
  const navigation: any = useNavigation();
  return (
    <View className='flex-1'>
      <StatusBar backgroundColor='#87CEEB' />
      <Header
        label="Claims"

      />
      <View className='item-center bg-primary p-4 rounded-md '>
        <TouchableOpacity onPress={() => navigation.navigate("ClaimForm")}>
          <Text className='text-center text-white font-["gothici-Bold"]'>Click Here to Book a Claim</Text>
        </TouchableOpacity>
      </View>
      <Image source={require("../../../assets/images/claimlanding.png")} style={HomeCss.claimImage} />


    </View>

  )
}

export default Claim;