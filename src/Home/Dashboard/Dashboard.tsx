import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react';
import Toast from 'react-native-root-toast'
import { Header } from '../../Component/Header';
import { Feather } from '@expo/vector-icons';

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
    <SafeAreaView className='flex-1 '>
      <Header
        label="Dashboard"
      />
      <Image source={require("../../../assets/images/background.png")} style={styles.image} />
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
  },
  image: {
    width: "100%",
    height: '100%',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    opacity: 0.4
  },
})