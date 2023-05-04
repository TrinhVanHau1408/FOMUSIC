import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import  { Test }  from "../views";
import Login from "../views/Login";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => (
    <Stack.Navigator initialRouteName="Sign In" >
      <Stack.Screen name="Sign In" component={ Login }  />
    </Stack.Navigator>
  );


export { MainStackNavigator };
