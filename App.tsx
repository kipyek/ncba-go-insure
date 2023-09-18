import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { ThemeProvider } from '@shopify/restyle';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootSiblingParent } from 'react-native-root-siblings';


// Fonts
const fonts = {
  "SFProText-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  "Poppins-Italic": require("./assets/fonts/Poppins-MediumItalic.ttf"),
  "gothici-Bold": require("./assets/fonts/gothicb.ttf"),
  "gothici-Regular": require("./assets/fonts/CenturyGothic.ttf")
};

// Custom Components
import { LoadAssets, theme } from './src/Component';
import { AppRoutes } from "./src/Component/Navigation";

// App Screens
import { HomeNavigator } from "./src/Home";
import { AuthenticationNavigator } from "./src/Authentication";

// Init Routes
const AppStack = createNativeStackNavigator<AppRoutes>();

// AuthPath: Starts With Login
const AuthPath = () => {
  return (
    <ThemeProvider {...{ theme }}>
      <LoadAssets {...{ fonts }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#a06931' }}>
          <AppStack.Navigator initialRouteName="Authentication" screenOptions={{ headerShown: false }}>
            <AppStack.Group>
              <AppStack.Screen name="Authentication" component={AuthenticationNavigator} />
              <AppStack.Screen name="Home" component={HomeNavigator} />
            </AppStack.Group>
          </AppStack.Navigator>
        </SafeAreaView>
      </LoadAssets>
    </ThemeProvider>
  )
}

// HomePaths: Authenticated Users Path
const HomePath = () => {
  return (
    <ThemeProvider {...{ theme }}>
      <LoadAssets {...{ fonts }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#a06931' }}>
          <AppStack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <AppStack.Screen name="Home" component={HomeNavigator} />
            <AppStack.Screen name="Authentication" component={AuthenticationNavigator} />
          </AppStack.Navigator>
        </SafeAreaView>
      </LoadAssets>
    </ThemeProvider>
  )
}

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false)
  const [userToken, setUserToken] = useState(null)
  useEffect(() => {
    let unmounted = false
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value === null) {
        AsyncStorage.setItem('alreadyLaunched', 'true')
        setIsFirstLaunch(true)
      } else {
        setIsFirstLaunch(false)
      }
    }).catch(error => {
      console.log(error)
    })


    return () => { unmounted = true }
  }, [isFirstLaunch]);



  // Check Token Validity
  useEffect(() => {
    let unmounted = false
    AsyncStorage.getItem('activeUser').then((value: any) => {
      let parsed = JSON.parse(value);
      if (parsed.token === null) {

        console.log("Not Auhtorized");
      } else {
        setUserToken(parsed?.token);
      }
    }).catch(error => {
      console.log(error)
    })

    return () => { unmounted = true }
  }, [userToken]);

  // returning main
  if (isFirstLaunch) {
    return (
      <AuthPath />
    )
  }
  else {
    return (
      userToken ? <RootSiblingParent><AuthPath /></RootSiblingParent> : <RootSiblingParent><HomePath/></RootSiblingParent>

    );
  };
};

