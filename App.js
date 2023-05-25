import React, { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Provider } from 'react-redux';
import store from './redux/store';
import { ForgotPassword, Login, NewPassword, Register, VerifyAccount, Wellcome } from './views';
import { MainTabNavigator } from './navigation/MainTabNavigator';
import Playing from './views/Playing';
const Stack = createNativeStackNavigator();

function App() {

  return (
    <Provider store={store}>
      <NavigationContainer >
        <Stack.Navigator
          initialRouteName='Init'
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name='Init' component={Wellcome} />
          <Stack.Screen name='Playing' component={Playing} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Register' component={Register} />
          <Stack.Screen name='VerifyAccount' component={VerifyAccount} />
          <Stack.Screen name='NewPassword' component={NewPassword} />
          <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
          <Stack.Screen name='App' component={MainTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
