import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Header } from '../../Component/Header'
import { createDrawerNavigator } from '@react-navigation/drawer';
import ConfirmedQuote from './ConfirmedQuote';
import ActivePolicies from './ActivePolicies';
import ExpiredPolicies from './ExpiredPolicies';
import Claims from './Claims';
import PPayment from './PPayment';
import Payments from './Payments';

const Drawer = createDrawerNavigator();

const Transaction = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: '#87CEEB',
        headerTitleStyle: {
          fontFamily: 'gothici-Regular',
        },
        drawerContentContainerStyle: {
          marginTop: 40
        },
        drawerStyle: {
          width: 240,
        },
        headerTitleAlign: 'center',
        headerBackground: () => (
          <Header />
        ),
      }}
    >
      <Drawer.Screen name="Confirmed Quote" component={ConfirmedQuote} />
      <Drawer.Screen name="Active Policies" component={ActivePolicies} />
      <Drawer.Screen name="Expired Policies" component={ExpiredPolicies} />
      <Drawer.Screen name="Claims" component={Claims} />
      <Drawer.Screen name="Pending Payments" component={PPayment} />
      <Drawer.Screen name="Payments" component={Payments} />
    </Drawer.Navigator>
  )
}

export default Transaction;