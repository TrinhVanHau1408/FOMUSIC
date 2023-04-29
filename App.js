/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from './navigation/MainStackNavigator';
import { Test } from './views';


function App() {

  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}



export default App;
