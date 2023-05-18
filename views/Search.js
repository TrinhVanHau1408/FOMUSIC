import { View, Text, TextInput, StyleSheet, Image, FlatList } from 'react-native'
import React from 'react'
import HeaderApp from '../components/header/HeaderApp'
import { icons, colors, images } from '../constants'
import TitleAlbum from '../components/misc/TitleAlbum'
import RectangleImg from '../components/search/RectangleImg'
import SquareImg from '../components/search/SquareImg'
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
export default function Search({navigation}) {
  const goBack = () => {
    navigation.goBack();
  }
  return (
    <View>
      <HeaderApp title={'Search'} iconLeft={icons.arrowBack} goBack={goBack} />
      <View style={styles.InputTextContainer}>
        <Image source={icons.search} style={styles.Icon} />
        <TextInput placeholder={'Demo'} style={styles.InputText} />
      </View>
      <View style={{ marginLeft: 24 }}>
        <TitleAlbum name={'Tìm kiếm gần đây'} />
        <FlatList
          style={{ marginTop: 10 }}
          data={music}
          renderItem={({ item, index }) =>
            <RectangleImg
              id={item.id}
              songImg={item.songImg}
            />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={{ marginLeft: 24 }}>
        <TitleAlbum name={'Đề xuất'} />
        <FlatList
          style={{ marginTop: 10, marginBottom: 120}}
          data={music}
          renderItem={({ item, index }) =>
            <SquareImg
              id={item.id}
              songImg={item.songImg}
            />}
          numColumns={3}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  InputTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.primary,
    borderWidth: 2,
    margin: 5,
    marginTop: 16,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 20
  },
  InputText:
  {
    padding: 4,
    margin: 0,
    height: 40,
    color: "#555454",
    flex: 1
  },
  Icon:
  {
    marginLeft: 10,
    marginTop: 4,
    marginRight: 8,
    marginBottom: 4,
    tintColor: colors.primary,
    height: 24,
    width: 24,
  },
})