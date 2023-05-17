import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Image } from 'react-native'
import { icons } from "../constants";
import {
  Test,
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
  Notification,
  Systems
} from "../views";
import Playing from "../views/Playing";
import PlayingMore from "../views/PlayingMore";
import UpLoad from "../views/UpLoad";
import Profile from "../views/Profile";

// const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();
const options = ({ route }) => ({


  tabBarShowLabel: false,
  headerShown: false,
  tabBarIcon: ({ focused, color, size }) => {
    let screenName = route.name;
    // let icon = "";
    // if (screenName == 'home1') {
    //   icon = icons.home;
    // } else {
    //   if (screenName == 'library') {
    //     icon = icons.home;
    //   } else {
    //     if (screenName == 'search') {
    //       icon = icons.search;
    //     } else {
    //       icon = icons.menu;
    //     }
    //   }
    // }

    let icon = screenName == 'home1' ? icons.home : (
      screenName == 'Library' ? icons.library : (
        screenName == 'Search' ? icons.search : icons.menu));

    return <Image
      source={icon}
      style={{
        height: 42,
        width: 42,
        tintColor: focused ? '#8950F8' : '#797979',
      }}
    />
  },

  tabBarStyle: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 6,
    borderTopColor: 'rgba(121, 121, 121, 0.1)',
    borderTopRightWidth: 6,
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 25,
    paddingRight: 25,
    position: "absolute",
    left: 0,
    height: 66,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },

})

const MainTabNavigator = () => (

  <Tab.Navigator
    initialRouteName="home1"
    screenOptions={options}
  >
    <Tab.Screen name="home1" component={Home} />
    {/* <Tab.Screen name="Library" component={Library} /> */}
    <Tab.Screen name="Library" component={Library} />
    <Tab.Screen name="Search" component={Search} />
    <Tab.Screen name="Menu" component={Systems} />
  </Tab.Navigator>
);

export { MainTabNavigator };