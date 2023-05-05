import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Test, Register, Login } from "../views";
import { MainTabNavigator } from "./MainTabNavigator";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Register"
    screenOptions={{
      headerShown: false
    }} >
    <Stack.Screen
      name="Home1"
      component={MainTabNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Home" component={Test} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
);


export { MainStackNavigator };
