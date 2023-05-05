import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Test, SignUp, Login } from "../views";
import { MainTabNavigator } from "./MainTabNavigator";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="SignUp"
    screenOptions={{
      headerShown: false
    }} >
    <Stack.Screen
      name="Home1"
      component={MainTabNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Home" component={Test} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
);


export { MainStackNavigator };
