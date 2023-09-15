import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthenticationRoutes } from "../Component/Navigation";

// App Screens
import Login from "./Login";


// Stack Defination
const AuthenticationStack = createNativeStackNavigator<AuthenticationRoutes>();


export const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthenticationStack.Group>
        <AuthenticationStack.Screen name="Login" component={Login} />
      </AuthenticationStack.Group>
    </AuthenticationStack.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <AuthenticationStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthenticationStack.Screen name="Login" component={Login} />
    </AuthenticationStack.Navigator>
  );
};


