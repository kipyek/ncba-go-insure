import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react';
import Toast from 'react-native-root-toast'
import { Header } from '../../Component/Header';
import { Feather } from '@expo/vector-icons';
import HomeCss from '../HomeCss';

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
      <Image source={require("../../../assets/images/background.png")} style={HomeCss.homeImage} />

    </SafeAreaView>
  )
}

export default Dashboard;