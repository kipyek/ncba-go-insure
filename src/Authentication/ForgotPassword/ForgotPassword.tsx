import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  return (
    <View >
      <View className='mt-14'>
      <View style={styles.card}>
        <Text className='font-["gothici-Regular"]' style={{fontSize: 22}}>Forgot password</Text>
        <Text className='font-["gothici-Regular"]' style={{fontSize: 13}}>Enter your email to receive code</Text>
      </View>

      <View className='mr-2 ml-2 mt-6'>
      <Text className='mb-1 font-[gothici-Regular]'>Enter your email</Text>
        <TextInput
          className='p-1 rounded-md '
          style={{ borderWidth: 1 }}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="Enter your email"
          keyboardType="default"
        />

           <View className='item-center bg-[#302A29] p-3 mt-4 rounded-md '>
            <TouchableOpacity >
              <Text className='text-center text-white font-["gothici-Bold"]'>SUBMIT</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity >
          <Text className='mt-4 font-["gothici-Regular"] text-[#00BFFF]'>Resend Email Confirmation</Text>
        </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  }
})