import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Test,
  Register,
  VerifyAccount,
  NewPassword,
  Home,
  Library,
  Artist,
  Playlist,
  Album,
  Following,
  Like,
  DetailPlaylist,
  DetailAlbum,
  Search,
  Wellcome,
  Menu,
  Login,
  ForgotPassword,
  Setting,
  InterfaceStyle,
  BasicSettings,
  Home3
} from "../views";



import Playing from "../views/Playing";
import PlayingMore from "../views/PlayingMore";
import PlayingFullLyric from "../views/PlayingFullLyric";
import Notification from "../views/Notification";

import Profile from "../views/Profile";
import { MainTabNavigator } from "./MainTabNavigator";


const Stack = createNativeStackNavigator();
// const LoginStack = ({ navigation }) => {
//   <Stack.Navigator
//     initialRouteName='Wellcome'
//     screenOptions={{
//       headerShown: false
//     }}
//   >
//     <Stack.Screen name='Wellcome' component={Wellcome} />
//     <Stack.Screen name='Login' component={Login} />
//     <Stack.Screen name='Register' component={Register} />
//     <Stack.Screen name='VerifyAccount' component={VerifyAccount} />
//     <Stack.Screen name='NewPassword' component={NewPassword} />
//     <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
//     <Stack.Screen name='LoginToHome' component={Home} />
//   </Stack.Navigator>
// }

const HomeStack = ({ navigation }) => (
  <Stack.Navigator
    initialRouteName='HomeStack'
    screenOptions={{
      headerShown: false
    }}>
    <Stack.Screen name='HomeStack' component={Home} />
    <Stack.Screen name='BXH' component={Home3} />
  </Stack.Navigator>
)


const LibraryStack = ({ navigation }) => (
  <Stack.Navigator
    initialRouteName='LibraryStack'
    screenOptions={{
      headerShown: false
    }}>
    <Stack.Screen name='LibraryStack' component={Library} />
    <Stack.Screen name='Artist' component={Artist} />
    <Stack.Screen name='Playlist' component={Playlist} />
    <Stack.Screen name='Album' component={Album} />
    <Stack.Screen name='Following' component={Following} />
    <Stack.Screen name='Like' component={Like} />
    <Stack.Screen name='DetailPlaylist' component={DetailPlaylist} />
    <Stack.Screen name='DetailAlbum' component={DetailAlbum} />

  </Stack.Navigator>
)

const SearchStack = ({ navigation }) => (
  <Stack.Navigator
    initialRouteName='SearchStack'
    screenOptions={{
      headerShown: false
    }}>
    <Stack.Screen name='SearchStack' component={Search} />
  </Stack.Navigator>
)

const MenuStack = ({ navigation }) => (
  <Stack.Navigator
    initialRouteName='MenuStack'
    screenOptions={{
      headerShown: false
    }}>
    <Stack.Screen name='MenuStack' component={Menu} />
    <Stack.Screen name='Profile' component={Profile} />
    <Stack.Screen name='Notification' component={Notification} />
    <Stack.Screen name='Setting' component={Setting}/>
    <Stack.Screen name='InterfaceStyle' component={InterfaceStyle} />
    <Stack.Screen name='BasicSettings ' component={BasicSettings} />
  </Stack.Navigator> 
)


export { HomeStack, LibraryStack, SearchStack, MenuStack };