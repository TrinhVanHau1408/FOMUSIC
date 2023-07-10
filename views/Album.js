import { View, Text, FlatList, Alert, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import HeaderApp from '../components/header/HeaderApp'
import SquareAlbum from '../components/misc/SquareAlbum'
import { icons, images } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
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
  }, {
    title: 'Snooze',
    artist: 'SZA',
    songImg: images.imgSZATout,
    // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
    duration: 2 * 60,
    id: '3',
    track_number: '3'
  }, {
    title: 'If you',
    artist: 'BigBang',
    songImg: images.imgIfYou,
    // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
    duration: 2 * 60,
    id: '4',
    track_number: '4'
  }, {
    title: 'Shoong',
    artist: 'Teayang',
    songImg: images.imgSZATout,
    // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
    duration: 2 * 60,
    id: '5',
    track_number: '5'
  }, {
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
export default function Album({ navigation, route }) {
  //  const { id } = route.params;
  const dispatch = useDispatch();

  const { album } = useSelector((state) => state.album)
  console.log('ALBUMS in ALBUM view: ', album);

  const [albumSelected, setAlbumSelected] = useState({});
  const handleButton = () => {
    Alert.alert('Test', 'Library button');
  }

  const handleNavigatorDetailAlbum = (albumSelectedId) => {
    console.log('ALBUM_SELECTED_ID: ', albumSelectedId)
    const albumSelected = album.filter(({key}) => key === albumSelectedId)[0]

    console.log('handleNavigatorDetailAlbum:', albumSelected)

    navigation.navigate('DetailAlbum', { albumSelected });
  }

  const goBack = () => {
    navigation.goBack();
  }
  return (
    <View>
      <HeaderApp title='Albums' iconLeft={icons.arrowBack} goBack={goBack} />
      <View style={styles.container}>
        {album ?
          <FlatList
            style={{ marginTop: 25, marginBottom: 100 }}
            data={album}
            renderItem={({ item }) =>
              <SquareAlbum
                id={item.key}
                name={item.name}
                artwork={item.imgUrl}
                handleNavigator={handleNavigatorDetailAlbum}
                isAlbum={true} />}
            keyExtractor={(item, index) => index}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />: 
          <TouchableOpacity>
            <Text>Không có Album nào!</Text>
          </TouchableOpacity>
          }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})