import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Header } from '../../Component/Header'

const Transaction = () => {
  return (
    <View>
      <Header
        label="My Transactions"
      />
      <Text>Transaction</Text>
    </View>
  )
}

export default Transaction

const styles = StyleSheet.create({})