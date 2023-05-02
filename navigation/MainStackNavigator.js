import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import  { Test, SignUp }  from "../views";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => (
    <Stack.Navigator initialRouteName="Thai" >
      <Stack.Screen name="Home" component={ Test }  />
      <Stack.Screen name="Thai" component={ SignUp }  />
    </Stack.Navigator>
  );


export { MainStackNavigator };
