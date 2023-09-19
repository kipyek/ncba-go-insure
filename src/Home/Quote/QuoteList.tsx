import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const QuoteList = ({onNextStepPressList}:any) => {

  const handleQuoteList = () => {
    onNextStepPressList()
  }
  return (
    <View>
      <View style={styles.introCard}>
        <Text className='font-[gothici-Regular]'>Please review the quotes below from different insurers. Click "BUY" against your preferred insurer to add optional benefits.</Text>
      </View>

       <View style={styles.card}>
      <View className='flex-row items-center'>
        <Image source={require("../../../assets/images/uap.jpg")} className='w-32 h-32'  />
        <View className='w-48'>
          <Text>Insurance company:</Text>
          <Text >UAP Insurance Company Ltd </Text>
          <View className='flex-row mt-2'>
             <Text>Premium: </Text>
          <Text>184,828</Text>
          </View>
         
        </View>
      </View>

      <View className='item-center bg-[#302A29] p-4 mt-4 rounded-md '>
          <TouchableOpacity onPress={handleQuoteList}>
            <Text className='text-center text-white font-["gothici-Bold"]'>BUY</Text>
          </TouchableOpacity>
      </View>
      
    </View> 
    </View>
  
  )
}

export default QuoteList

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
  },
  warningCard: {
    backgroundColor: 'red',
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