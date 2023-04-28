import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import  {Test}  from "./views";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Home" component={Test}  />
    </Stack.Navigator>
  );
}

export { MainStackNavigator };
