import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AuthCss from '../AuthCss'

const QuoteFinish = () => {
  return (
    <View>
      <View style={AuthCss.introCard}>
        <Text className='font-[gothici-Regular]'>Your quotation number is <Text className='font-bold font-[gothici-Regular]'>Q01721</Text> and total payable is <Text className='font-bold font-[gothici-Regular]'>Kes 184,868.00.</Text></Text>
        <Text className='font-[gothici-Regular]'>An email to activate your account has been sent to the email address. Follow the link to verify your account and access your transactions.</Text>
      </View>
    </View>
  )
}

export default QuoteFinish

const styles = StyleSheet.create({
})