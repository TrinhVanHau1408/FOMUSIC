import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Test, Register, Login, ForgotPassword, VerifyAccount, NewPassword, Home } from "../views";
import { MainTabNavigator } from "./MainTabNavigator";

const Stack = createNativeStackNavigator();

const MainStackNavigator = ({ navigation }) => (
  <Stack.Navigator
    initialRouteName = 'Home1'
    screenOptions={{
      headerShown: false
    }} >
    <Stack.Screen
      name="Home1"
      component={MainTabNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
    <Stack.Screen name="NewPassword" component={NewPassword} />
  </Stack.Navigator>
);


export { MainStackNavigator };
