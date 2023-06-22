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
  Systems,
  Setting,
  InterfaceStyle,
  BasicSettings,
  Home3,
  Notifications,
  Notification
} from "../views";
import Profile from "../views/Profile";
import MyFOMUSIC from "../views/MyFOMUSIC";
// import OptionSong from "../views/OptionSong";
import DetailSong from "../views/DetailSong";
import EditDetailSong from "../views/EditDetailSong";
import DeleteSong from "../views/DeleteSong";
import UpLoad from "../views/UpLoad";
import Playing from "../views/PlayingFullLyric";






const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator
    initialRouteName='HomeStack'
    screenOptions={{
      headerShown: false
    }}>
    <Stack.Screen name='HomeStack' component={Home} />
    <Stack.Screen name='BXH' component={Home3} />
    <Stack.Screen name='Play' component={Playing} />
  </Stack.Navigator>
)


const LibraryStack = () => (
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

const SearchStack = () => (
  <Stack.Navigator
    initialRouteName='SearchStack'
    screenOptions={{
      headerShown: false
    }}>
    <Stack.Screen name='SearchStack' component={Search} />
    <Stack.Screen name='Artist' component={Artist} />
  </Stack.Navigator>
)

const MenuStack = () => (
  <Stack.Navigator
    initialRouteName='MenuStack'
    screenOptions={{
      headerShown: false
    }}>
    <Stack.Screen name='MenuStack' component={Menu} />
    <Stack.Screen name='Profile' component={Profile} />
    <Stack.Screen name='EditProfile ' component={Test} />
    <Stack.Screen name='Notification' component={Notification} />
    <Stack.Screen name='Systems' component={Systems} />
    <Stack.Screen name='Notifications' component={Notifications} />
    <Stack.Screen name='Setting' component={Setting}/>
    <Stack.Screen name='InterfaceStyle' component={InterfaceStyle} />
    <Stack.Screen name='BasicSettings' component={BasicSettings} />
    <Stack.Screen name='MyFOMUSIC' component={MyFOMUSIC} />
    {/* <Stack.Screen name='OptionSong' component={OptionSong} /> */}
    <Stack.Screen name='DetailSong' component={DetailSong} />
    <Stack.Screen name='EditDetailSong' component={EditDetailSong} />
    <Stack.Screen name='DeleteSong' component={DeleteSong} />
    <Stack.Screen name='Upload' component={UpLoad} />
   
  </Stack.Navigator> 

)


export { HomeStack, LibraryStack, SearchStack, MenuStack };