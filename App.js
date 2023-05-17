
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from './navigation/StackNavigator';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ForgotPassword, Login, NewPassword, Register, VerifyAccount, Wellcome } from './views';
import { MainTabNavigator } from './navigation/MainTabNavigator';
const Stack = createNativeStackNavigator();

function App() {

  return (
    // <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='Init' component={Wellcome} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='VerifyAccount' component={VerifyAccount} />
        <Stack.Screen name='NewPassword' component={NewPassword} />
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
        <Stack.Screen name='App' component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
    // </AuthProvider>

  );
}

{/* <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name='Init' component={Wellcome} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='VerifyAccount' component={VerifyAccount} />
        <Stack.Screen name='NewPassword' component={NewPassword} />
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
        <Stack.Screen name='App' component={MainTabNavigator} />
    </Stack.Navigator> */}

export default App;
