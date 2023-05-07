import { View, Text, FlatList } from 'react-native';
import React from 'react';
import HeaderApp from '../components/header/HeaderApp';
import { icons, images } from '../constants';
import MyLike from '../components/like/MyLike';
import ControlMusic from '../components/misc/ControlMusic';

const dataLike = [
  {
    id: 1,
    songName: 'Song name 1',
    songImg: images.defaultAvt,
    artistName: 'Artis 1',
    isLiked: true
  },
  {
    id: 2,
    songName: 'Song name 2',
    songImg: images.defaultAvt,
    artistName: 'Artis 2',
    isLiked: false
  },
  {
    id: 3,
    songName: 'Song name 3',
    songImg: images.defaultAvt,
    artistName: 'Artis 3',
    isLiked: false
  },
  {
    id: 4,
    songName: 'Song name 3',
    songImg: images.defaultAvt,
    artistName: 'Artis 3',
    isLiked: true
  }
]
export default function Like() {
  return (
    <View style={{flex: 1}}>
      <HeaderApp title='Likes' iconLeft={icons.arrowBack} />
      <View style={{ marginTop: 28 }}>
        <FlatList
          data={dataLike}
          renderItem={({ item, index }) =>
            <MyLike
              id={item.id}
              songName={item.songName}
              songImg={item.songImg}
              artistName={item.artistName}
              isLike={item.isLiked}
              index={index} />}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
        />
      </View>
      
   
        <ControlMusic />
      
     
    </View>
  )
}