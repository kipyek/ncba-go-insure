import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

const BenefitSelection = ({onNextStepPressSelection}:any) => {

  const handleNext = () => {
    onNextStepPressSelection()
  }
  return (
    <View>
      <View style={styles.introCard}>
        <Text className='font-[gothici-Regular]'>Please review the details of your quote including the scope of the cover under Cover Summary. To buy the cover, click "NEXT"</Text>
      </View>
      <ScrollView>
              <View style={styles.card}>
       <View className='flex-row items-center'>
        <Image source={require("../../../assets/images/uap.jpg")} className='w-32 h-32'  />
        <View className='w-48'>
          <Text>UAP Insurance Company Ltd</Text>
          <Text >MOTOR PSV - SELF DRIVE COMPREHENSIVE</Text>
          <View className='item-center bg-[#302A29] p-2 mt-4 rounded-md '>
              <TouchableOpacity>
                <Text className='text-center text-white font-["gothici-Bold"]'>SEND TO MY EMAIL</Text>
              </TouchableOpacity>
            </View>
         
        </View>

      </View>

      <View style={{borderWidth: 0.6, opacity: 0.5, borderColor: 'grey'}}/>
     {/**Pricing */}
    <View>
      <View className='flex-row mt-4 justify-between bg-gray-200'>
            <Text>Basic premium:</Text>
      <Text className='font-bold ml-2'>Kes 130,000</Text>
      </View>

      <View className='flex-row mt-2 justify-between bg-gray-200'>
            <Text>Windscreen:</Text>
      <Text className='font-bold ml-2'>Kes 130,000</Text>
      </View>
      <View className='flex-row mt-2 justify-between bg-gray-200'>
            <Text>Entertainment unit:</Text>
      <Text className='font-bold ml-2'>Kes 0</Text>
      </View>
      <View className='flex-row mt-2 justify-between bg-gray-200'>
            <Text>Extensions:</Text>
      <Text className='font-bold ml-14'>Kes 130,000</Text>
      </View>
      <View className='flex-row mt-2 justify-between bg-gray-200'>
            <Text>Total premium:</Text>
      <Text className='font-bold ml-2'>Kes 130,000</Text>
      </View>
      <View className='flex-row mt-2 justify-between bg-gray-200'>
            <Text>Levies:</Text>
      <Text className='font-bold ml-16'>Kes 130,000</Text>
      </View>
      <View className='flex-row mt-2 justify-between bg-gray-200'>
            <Text className='font-bold '>Gross premium:</Text>
      <Text className='font-bold ml-2'>Kes 130,000</Text>
      </View>
 
     <View className='flex-row justify-between mt-10'>
      <View className='item-center bg-[#302A29] p-2 mt-4 rounded-md w-36'>
              <TouchableOpacity >
                <Text className='text-center text-white font-["gothici-Bold"]'>BACK</Text>
              </TouchableOpacity>
            </View>
            <View className='item-center bg-[#302A29] p-2 mt-4 rounded-md w-36'>
              <TouchableOpacity onPress={() => handleNext()} >
                <Text className='text-center text-white font-["gothici-Bold"]'>NEXT</Text>
              </TouchableOpacity>
            </View>
 </View>
  
    </View>
        </View>
      </ScrollView>
   
    </View>
 
  )
}

export default BenefitSelection

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  introCard: {
    backgroundColor: '#87CEEB',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  }
})