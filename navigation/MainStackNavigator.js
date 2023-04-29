import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import  { Test }  from "../views";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => (
    <Stack.Navigator initialRouteName="Home" >
      <Stack.Screen name="Home" component={ Test }  />
    </Stack.Navigator>
  );


export { MainStackNavigator };
