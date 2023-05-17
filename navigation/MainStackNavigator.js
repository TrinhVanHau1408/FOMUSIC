
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { MainTabNavigator } from './MainTabNavigator';
import { ForgotPassword, Login, NewPassword, Register, VerifyAccount, Wellcome } from '../views';

const Stack = createNativeStackNavigator();
const MainStackNavigator = () => (

    <Stack.Navigator
        initialRouteName='init'
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name='init' component={Wellcome} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='VerifyAccount' component={VerifyAccount} />
        <Stack.Screen name='NewPassword' component={NewPassword} />
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
        {/* <Stack.Screen name='App' component={MainTabNavigator} /> */}
    </Stack.Navigator>
)

export { MainStackNavigator }