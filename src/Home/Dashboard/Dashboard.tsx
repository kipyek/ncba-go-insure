import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import Toast from 'react-native-root-toast'

const Dashboard = () => {
  const handleToastTest = () => {
    Toast.show("You have successfully created account", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      backgroundColor: 'green',
      shadow: false,
      animation: true,
      hideOnPress: true,
      delay: 0,
    })
  }
  return (
    <SafeAreaView className='flex-1 justify-center items-center'>
      <TouchableOpacity onPress={handleToastTest}>
        <Text style={styles.text} className='font-["SFProText-Bold"] '>Dashboard</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
})