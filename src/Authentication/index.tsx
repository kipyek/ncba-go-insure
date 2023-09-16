import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthenticationRoutes } from "../Component/Navigation";

// App Screens
import Login from "./Login";
import AuthHome from "./AuthHome/AuthHome";
import Register from "./Register/Register";
import Help from "./Help/Help";
import GetQuote from "./GetQuote/GetQuote";


// Stack Defination
const AuthenticationStack = createNativeStackNavigator<AuthenticationRoutes>();


export const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthenticationStack.Group>
        <AuthenticationStack.Screen name="AuthHome" component={AuthHome} />
        <AuthenticationStack.Screen name="Login" component={Login} />
        <AuthenticationStack.Screen name="Register" component={Register} />
        <AuthenticationStack.Screen name="Help" component={Help} />
        <AuthenticationStack.Screen name="GetQuote" component={GetQuote} />
      </AuthenticationStack.Group>
    </AuthenticationStack.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <AuthenticationStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthenticationStack.Screen name="AuthHome" component={AuthHome} />
      <AuthenticationStack.Screen name="Login" component={Login} />
      <AuthenticationStack.Screen name="Register" component={Register} />
      <AuthenticationStack.Screen name="Help" component={Help} />
      <AuthenticationStack.Screen name="GetQuote" component={GetQuote} />
    </AuthenticationStack.Navigator>
  );
};


