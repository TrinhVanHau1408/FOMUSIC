import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Test, SignUp, Login } from "../views";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerShown: false
    }} >
    <Stack.Screen name="Home" component={Test} />
    <Stack.Screen name="Thai" component={SignUp} />
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
);


export { MainStackNavigator };
