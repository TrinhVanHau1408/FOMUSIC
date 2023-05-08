import { View, Text, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, {useState} from 'react'
import HeaderApp from '../components/header/HeaderApp'
import MyFollowing from '../components/following/MyFollowing'
import { icons, images } from '../constants'

const dataUser = [
  {
    id: 1,
    userName: 'User Name 1',
    userImg: images.defaultAvt,
    isFollowing: true,
    follower: 210,
    following: 50,
  },
  {
    id: 2,
    userName: 'User Name 2',
    userImg: images.defaultAvt,
    isFollowing: false,
    follower: 201,
    following: 500,
  },
  {
    id: 3,
    userName: 'User Name 3',
    userImg: images.defaultAvt,
    isFollowing: false,
    follower: 240,
    following: 50,
  },
  {
    id: 4,
    userName: 'User Name 4',
    userImg: images.defaultAvt,
    isFollowing: true,
    follower: 200,
    following: 500,
  },
  {
    id: 5,
    userName: 'User Name 1',
    userImg: images.defaultAvt,
    isFollowing: true,
    follower: 20,
    following: 50,
  },
]
export default function Following({navigation}) {
 
  const goBack = () => {
    navigation.goBack();
  }
  return (
    <View>
      <HeaderApp title='Following' iconLeft={icons.arrowBack} goBack={goBack} />
      <View style={{marginTop: 31}}>
        <FlatList
          data={dataUser}
          renderItem={({ item }) =>
            <MyFollowing
              id={item.id}
              userName={item.userName}
              userImg={item.userImg}
              isFollowing={item.isFollowing}
              follower= {item.follower}
              following= {item.following} />}
          keyExtractor={(item, index) => index}
          
          showsVerticalScrollIndicator={false}
        />

      </View>
    </View>
  )
}