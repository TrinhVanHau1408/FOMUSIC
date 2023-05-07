import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Test, Register, Login } from "../views";
import { MainTabNavigator } from "./MainTabNavigator";
import Playing from "../views/Playing";
import PlayingMore from "../views/PlayingMore";
import PlayingFullLyric from "../views/PlayingFullLyric";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Register"
    screenOptions={{
      headerShown: false
    }} >
      {/* <Stack.Screen
      name="Home1"
      component={MainTabNavigator}
      options={{ headerShown: false }}
      />
      <Stack.Screen name="Home" component={Test} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
       */}
      {/* <Stack.Screen name="Playing" component={Playing} /> */}
      {/* <Stack.Screen name="PlayingMore" component={PlayingMore} /> */}
      <Stack.Screen name="PlayingFullLyric" component={PlayingFullLyric} />
  </Stack.Navigator>
);


export { MainStackNavigator };
