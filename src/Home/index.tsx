import React, { useEffect } from "react";
import { Feather as Icon, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Custom Components
import { HomeRoutes } from "../Component/Navigation";

// App Screens
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Transaction from "./Transaction";
import Claim from "./Claim";
import ClaimForm from "./ClaimForm";
import QuoteDetails from "./QuoteDetails";
import ClaimDocuments from "./ClaimDocuments";
import QuoteRequest from "./QuoteRequest";
import QuoteList from "./QuoteList";
import QuoteConfirm from "./QuoteConfirm";
import QuoteFinish from "./QuoteFinish";
import QuoteBenefit from "./QuoteBenefit";

// Tabs Defination
const Tab = createBottomTabNavigator<HomeRoutes>();

const ManageStackScreens = () => {


  return (
    <Tab.Navigator
      screenOptions={({ route }: any) => ({
        tabBarIcon: ({ focused, color, size }: any) => {
          let iconName: any;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Claim') {
            iconName = focused ? 'clock' : 'clock';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={23} color={color} />;
        },
        // tabBarStyle: {
        //   height: 60,
        // },
        tabBarActiveTintColor: '#87CEEB',
        tabBarInactiveTintColor: 'grey',
        headerShown: false,

      })}
    >
      <Tab.Screen name="Home" component={Dashboard}
      // options={{ unmountOnBlur: true, }}
      />
      <Tab.Screen name="Quote" component={QuoteRequest}
        options={{
          tabBarIcon: ({ focused }) => (focused ?
            <MaterialIcons name="request-quote" size={24} color="#87CEEB" />
            :
            <MaterialIcons name="request-quote" size={24} color="grey" />),
        }} />
      <Tab.Screen name="Claim" component={Claim}
      // options={{ unmountOnBlur: true, }}
      />

      <Tab.Screen name="Transaction" component={Transaction}
        options={{
          tabBarIcon: ({ focused }) => (focused ?
            <FontAwesome name="money" size={24} color="#87CEEB" />
            :
            <FontAwesome name="money" size={24} color="grey" />),
        }} />
      <Tab.Screen name="Profile" component={Profile}
      //options={{ unmountOnBlur: true, }}
      />
      {/* Add more screens here as need be */}
    </Tab.Navigator>
  );
}

// Home Stack Defination
const Stack = createNativeStackNavigator<HomeRoutes>();



export const HomeNavigator = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={ManageStackScreens} />
      <Stack.Screen name="ClaimForm" component={ClaimForm} />
      <Stack.Screen name="QuoteDetails" component={QuoteDetails} />
      <Stack.Screen name="ClaimDocuments" component={ClaimDocuments} />
      <Stack.Screen name="QuoteConfirm" component={QuoteConfirm} />
      <Stack.Screen name="QuoteFinish" component={QuoteFinish} />
      <Stack.Screen name="QuoteList" component={QuoteList} />
      <Stack.Screen name="QuoteBenefit" component={QuoteBenefit} />

    </Stack.Navigator>
  )
}


