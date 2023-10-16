import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import AuthCss from '../AuthCss'
import { helpDetails, projectImages } from '../../Component/util'

const Help = () => {
  return (
    <View className='flex-1 bg-white'>
      <Image source={projectImages.helpImage} style={AuthCss.helpImage} />
      <View style={AuthCss.card}>
        <Text className='mt-2 font-[gothici-Regular]'>{helpDetails.title1}</Text>
        <Text className='mt-2 font-[gothici-Regular]'>{helpDetails.title2}</Text>
        <Text className='mt-2 font-[gothici-Regular]'>{helpDetails.title3}</Text>
        <Text className='mt-2 font-[gothici-Regular]'>{helpDetails.title4}</Text>
        <Text className='mt-2 font-[gothici-Regular]'>{helpDetails.title5}</Text>
        <Text className='mt-2 font-[gothici-Regular]'>{helpDetails.title6}</Text>
        <Text className='mt-2 font-[gothici-Regular]'>{helpDetails.title7}</Text>
        <Text className='mt-2 font-[gothici-Regular]'>{helpDetails.title8}</Text>
        <Text className='mt-2 font-[gothici-Regular]'>{helpDetails.title9}</Text>
      </View>

    </View>
  )
}

export default Help

