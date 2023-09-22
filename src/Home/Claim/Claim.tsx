import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native'
import React, { useState } from 'react'
import { Header } from '../../Component/Header'
import { useNavigation } from '@react-navigation/native'


const Claim = () => {
  const navigation: any = useNavigation();
  return (
    <View className='flex-1'>
      <Header
        label="Claims"

      />
      <View className='item-center bg-primary p-4 rounded-md '>
        <TouchableOpacity onPress={() => navigation.navigate("ClaimForm")}>
          <Text className='text-center text-white font-["gothici-Bold"]'>Click Here to Book a Claim</Text>
        </TouchableOpacity>
      </View>
      <Image source={require("../../../assets/images/claimlanding.png")} style={styles.image} />


    </View>

  )
}

export default Claim

const styles = StyleSheet.create({
  image: {
    flex: 1,
    opacity: 0.3
  }
})