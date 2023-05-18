import { View, Text, FlatList, Alert } from 'react-native';
import React, { useState } from 'react';
import HeaderApp from '../components/header/HeaderApp';
import { icons, images } from '../constants';
import MyLike from '../components/like/MyLike';
import ControlMusic from '../components/misc/ControlMusic';

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
  track_number: '4',
  isLike: true
},{
  title: 'Shoong',
  artist: 'Teayang',
  songImg: images.imgSZATout,
  // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
  duration: 2 * 60,
  id: '5',
  track_number: '5',
  isLike: true
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
  track_number: '7',
  isLike: true
}
]
export default function Like({ navigation }) {
  const [isVisible, setIsVisible] = useState(false);
  const [idSong, setIdSong] = useState(0);
  const handleLayout = (id) => {
    setIsVisible(true);
    setIdSong(id);

  }
  const goBack = () => {
    navigation.goBack();
  }
  return (
    <View style={{ flex: 1 }}>
      <HeaderApp title='Likes' iconLeft={icons.arrowBack} goBack={goBack} />
      <View style={{ marginTop: 28 }}>
        <FlatList
          data={music}
          renderItem={({ item, index }) =>
            <MyLike
              id={item.id}
              idSongSelected={idSong}
              songName={item.title}
              songImg={item.songImg}
              artistName={item.artist}
              isLike={item.isLike}
              index={index}
              handleLayout={handleLayout}
            />}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {isVisible && <ControlMusic song={music.find(({ id }) => id === idSong)} />}
    </View>
  )
}