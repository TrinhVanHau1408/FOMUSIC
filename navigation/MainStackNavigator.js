import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Test,
  Register,
  Login,
  ForgotPassword,
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
  Search} from "../views";


import { MainTabNavigator } from "./MainTabNavigator";
import Playing from "../views/Playing";
import PlayingMore from "../views/PlayingMore";
import PlayingFullLyric from "../views/PlayingFullLyric";
import Notification from "../views/Notification";
import Upload from "../views/UpLoad";

const Stack = createNativeStackNavigator();

const MainStackNavigator = ({ navigation }) => (
  <Stack.Navigator
    initialRouteName='Home1'
    screenOptions={{
      headerShown: false
    }} >
    {/* <Stack.Screen
      name="Home1"
      component={MainTabNavigator}
      options={{ headerShown: false }}
    /> */}

    {/* <Stack.Screen name="Home" component={Home} /> */}
    
    {/* <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Playing" component={Playing} />
    <Stack.Screen name="PlayingMore" component={PlayingMore} />
    <Stack.Screen name="PlayingFullLyric" component={PlayingFullLyric} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
    <Stack.Screen name="NewPassword" component={NewPassword} />
    <Stack.Screen name="Library" component={Library} />
    <Stack.Screen name="Artist" component={Artist} />
    <Stack.Screen name="Playlist" component={Playlist} />
    <Stack.Screen name="DetailPlaylist" component={DetailPlaylist} />
    <Stack.Screen name="Album" component={Album} />
    <Stack.Screen name="Following" component={Following} />
    <Stack.Screen name="Like" component={Like} />
    <Stack.Screen name="Notification" component={Notification} /> */}
    <Stack.Screen name="Upload" component={Upload} />
    <Stack.Screen name="DetailAlbum" component={DetailAlbum} />
    <Stack.Screen name="Search" component={Search} />
  </Stack.Navigator>
);

export { MainStackNavigator };