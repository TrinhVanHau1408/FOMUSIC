import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import  { Test }  from "../views";
import Login from "../views/Login";
import  { Test, SignUp }  from "../views";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => (
    <Stack.Navigator initialRouteName="SignIn" >
      <Stack.Screen name="Home" component={ Test }  />
      <Stack.Screen name="Thai" component={ SignUp }  />
       <Stack.Screen name="SignIn" component={ Login }  />
    </Stack.Navigator>
  );


export { MainStackNavigator };
