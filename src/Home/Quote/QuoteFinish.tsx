import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const QuoteFinish = () => {
  return (
    <View>
      <View style={styles.introCard}>
        <Text className='font-[gothici-Regular]'>Your quotation number is <Text className='font-bold font-[gothici-Regular]'>Q01721</Text> and total payable is <Text className='font-bold font-[gothici-Regular]'>Kes 184,868.00.</Text></Text>
        <Text className='font-[gothici-Regular]'>An email to activate your account has been sent to the email address. Follow the link to verify your account and access your transactions.</Text>
      </View>
    </View>
  )
}

export default QuoteFinish

const styles = StyleSheet.create({
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