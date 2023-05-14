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
  Search
} from "../views";


import { MainTabNavigator } from "./MainTabNavigator";
import Playing from "../views/Playing";
import PlayingMore from "../views/PlayingMore";
import PlayingFullLyric from "../views/PlayingFullLyric";
import Notification from "../views/Notification";
import Upload from "../views/UpLoad";
<<<<<<< HEAD
<<<<<<< HEAD
import Profile from "../views/Profile";
import Setting from "../views/Setting";
import BasicSettings from "../views/BasicSettings";
import InterfaceStyle from "../views/InterfaceStyle";
import Notifications from "../views/Notifications";
=======
=======
import Profile from "../views/Profile";
>>>>>>> 03ff1fce792b5c7e39c7971d1e71213c0370bd24

>>>>>>> parent of 134e1d4 (view Setting, Basic Setting, Notifications,Interface Style)
const Stack = createNativeStackNavigator();

const MainStackNavigator = ({ navigation }) => (
  <Stack.Navigator
    initialRouteName='Home1'
    screenOptions={{
      headerShown: false
    }} >
    <Stack.Screen
      name="Home1"
      component={MainTabNavigator}
      options={{ headerShown: false }}
    />
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> parent of 134e1d4 (view Setting, Basic Setting, Notifications,Interface Style)
=======
>>>>>>> 03ff1fce792b5c7e39c7971d1e71213c0370bd24
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Register" component={Register} />
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
<<<<<<< HEAD
<<<<<<< HEAD
    <Stack.Screen name="Notification" component={Notification} /> 
=======
    <Stack.Screen name="Notification" component={Notification} />
>>>>>>> parent of 134e1d4 (view Setting, Basic Setting, Notifications,Interface Style)
=======
    <Stack.Screen name="Notification" component={Notification} /> 
>>>>>>> 03ff1fce792b5c7e39c7971d1e71213c0370bd24
    <Stack.Screen name="Upload" component={Upload} />
    <Stack.Screen name="DetailAlbum" component={DetailAlbum} />
<<<<<<< HEAD
    <Stack.Screen name="Search" component={Search} /> 
    <Stack.Screen name="Profile" component={Profile} />


    <Stack.Screen name="Setting" component={Setting} />
    <Stack.Screen name="BasicSettings" component={BasicSettings} />

    <Stack.Screen name="InterfaceStyle" component={InterfaceStyle} />
    <Stack.Screen name="Notifications" component={Notifications} />


=======
    <Stack.Screen name="Search" component={Search} />
<<<<<<< HEAD
>>>>>>> parent of 134e1d4 (view Setting, Basic Setting, Notifications,Interface Style)
=======
    <Stack.Screen name="Profile" component={Profile} />

>>>>>>> 03ff1fce792b5c7e39c7971d1e71213c0370bd24
  </Stack.Navigator>
);

export { MainStackNavigator };