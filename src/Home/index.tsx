import React, { useEffect } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Custom Components
import { HomeRoutes } from "../Component/Navigation";

// App Screens
import Dashboard from "./Dashboard";
import Quote from "./Quote";
import Profile from "./Profile";
import Transaction from "./Transaction";

// Tabs Defination
const Tab = createBottomTabNavigator<HomeRoutes>();

const ManageStackScreens = () => {


  return (
    <Tab.Navigator
      screenOptions={({ route }: any) => ({
        tabBarIcon: ({ focused, color, size }: any) => {
          let iconName: any;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Quote') {
            iconName = focused ? 'clock' : 'clock';
          } else if (route.name === 'Transaction') {
            iconName = focused ? 'truck' : 'truck';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'settings' : 'settings';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={23} color={color} />;
        },
        // tabBarStyle: {
        //   height: 60,
        // },
        tabBarActiveTintColor: '#eb7325',
        tabBarInactiveTintColor: '#A16931',
        headerShown: false,

      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard}
        options={{ unmountOnBlur: true, }}
      />
      <Tab.Screen name="Quote" component={Quote}
        options={{ unmountOnBlur: true, }}
      />
      <Tab.Screen name="Profile" component={Profile}
        options={{ unmountOnBlur: true, }}
      />
      <Tab.Screen name="Transaction" component={Transaction}
        options={{ unmountOnBlur: true, }}
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

    </Stack.Navigator>
  )
}


