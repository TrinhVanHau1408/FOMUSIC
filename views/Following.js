import { View, Text, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, {useState} from 'react'
import HeaderApp from '../components/header/HeaderApp'
import MyFollowing from '../components/following/MyFollowing'
import { icons, images } from '../constants'

const music = [
  {
  title: 'Lovely',
  artist: 'Billie Eilish',
  songImg: images.imgLovely,
  // url: require('https://sample-music.netlify.app/death%20bed.mp3'),
  duration: 2 * 60 + 53,
  id: '1',
},
{
  title: 'Understand',
  artist: 'Keshi',
  songImg: images.imgUnderstand,
  // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
  duration: 2 * 60,
  id: '2',
  track_number: '2'
},{
  title: 'Snooze',
  artist: 'SZA',
  songImg: images.imgSZATout,
  // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
  duration: 2 * 60,
  id: '3',
  track_number: '3'
},{
  title: 'If you',
  artist: 'BigBang',
  songImg: images.imgIfYou,
  // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
  duration: 2 * 60,
  id: '4',
  track_number: '4'
},{
  title: 'Shoong',
  artist: 'Teayang',
  songImg: images.imgSZATout,
  // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
  duration: 2 * 60,
  id: '5',
  track_number: '5'
},{
  title: 'Die For You',
  artist: 'The Weeknd',
  songImg: images.imgDieForYou,
  // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
  duration: 2 * 60,
  id: '6',
  track_number: '6'
},
{
  title: 'double take',
  artist: 'dhruv',
  songImg: images.imgDoubleTakeL,
  // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
  duration: 2 * 60,
  id: '7',
  track_number: '7'
}
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
          data={music}
          renderItem={({ item }) =>
            <MyFollowing
              id={item.id}
              userName={item.artist}
              userImg={item.songImg}
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