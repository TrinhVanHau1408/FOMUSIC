import React from 'react';
import { Image, Text, View, FlatList, SafeAreaView, Alert } from 'react-native';
import HeaderApp from '../components/header/HeaderApp';
import { colors, icons, images } from '../constants';
import SquareAlbum from '../components/misc/SquareAlbum';
import { ScrollView } from 'react-native-gesture-handler';
import CircleAlbum from '../components/misc/CircleAlbum';
import RectangleAlbum from '../components/misc/RectangleAlbum';
import TitleAlbum from '../components/misc/TitleAlbum';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useDispatch } from 'react-redux';
import { getUserHistoryUid } from '../redux/slices/historySlice';

// const music = [
//   {
//     title: 'Lovely',
//     artist: 'Billie Eilish',
//     songImg: images.imgLovely,
//     // url: require('https://sample-music.netlify.app/death%20bed.mp3'),
//     duration: 2 * 60 + 53,
//     id: '1',
//   },
//   {
//     title: 'Understand',
//     artist: 'Keshi',
//     songImg: images.imgUnderstand,
//     // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
//     duration: 2 * 60,
//     id: '2',
//     track_number: '2'
//   },
//   {
//     title: 'Snooze',
//     artist: 'SZA',
//     songImg: images.imgSZATout,
//     // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
//     duration: 2 * 60,
//     id: '3',
//     track_number: '3'
//   },
//   {
//     title: 'If you',
//     artist: 'BigBang',
//     songImg: images.imgIfYou,
//     // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
//     duration: 2 * 60,
//     id: '4',
//     track_number: '4'
//   },
//   {
//     title: 'Shoong',
//     artist: 'Teayang',
//     songImg: images.imgSZATout,
//     // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
//     duration: 2 * 60,
//     id: '5',
//     track_number: '5'
//   }, {
//     title: 'Die For You',
//     artist: 'The Weeknd',
//     songImg: images.imgDieForYou,
//     // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
//     duration: 2 * 60,
//     id: '6',
//     track_number: '6'
//   },
//   {
//     title: 'double take',
//     artist: 'dhruv',
//     songImg: images.imgDoubleTakeL,
//     // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
//     duration: 2 * 60,
//     id: '7',
//     track_number: '7'
//   }
// ]
const playlist = [
  {
    title: 'SVT Playlist 2023',
    artist: 'FOMUSIC ',
    songImg: images.playlistSVT,
    // url: require(''),
    duration: 2 * 60 + 53,
    id: '1',
  },
  {
    title: 'Playlist For Relax',
    artist: 'FOMISUC',
    songImg: images.playlistFlower,
    // url: require(''),
    duration: 2 * 60,
    id: '2',
    track_number: '2'
  },
  {
    title: 'Nhac Buon Ngay Mua',
    artist: 'FOMUSIC',
    songImg: images.playlistBuon,
    // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
    duration: 2 * 60,
    id: '3',
    track_number: '3'
  },
  {
    title: 'Twice Are Once',
    artist: 'FOMUSIC',
    songImg: images.playlistTwice,
    // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
    duration: 2 * 60,
    id: '4',
    track_number: '4'
  },
]
const getItem = (_data, index) => ({
  id: Math.random().toString(12).substring(0),
  title: `Item ${index + 1}`,
});

const getItemCount = _data => 50;


export default function Library({ navigation }) {
  const [arrayuserHistory, setArrayUserHistory] = React.useState(null)
  const handleButton = () => {
    Alert.alert('Test', 'Library button');
  }
  const handleNavigatorArtist = (id) => {
    navigation.navigate('Artist', { id: id });
  }

  const handleNavigatorPlaylist = (id) => {
    navigation.navigate('Playlist', { id: id });
  }

  const handleNavigatorAlbum = (id) => {
    navigation.navigate('Album', { id: id });
  }

  const handleNavigatorFollowing = () => {
    navigation.navigate('Following');
  }

  const handleNavigatorLikes = () => {
    navigation.navigate('Like');
  }
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getdata = async () => {
      dispatch(getUserHistoryUid({}))
    }
    getdata()
  }, [])

  React.useEffect(() => {
    const data = []
    for (key in userHistory) {
      data.push({
        id: key
      })
    }
    setArrayUserHistory(data)
  }, [userHistory])

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderApp title={'Library'} />
        <View>
          <Image source={icons.musicNote1} style={{ position: 'absolute', top: -55, left: -15, resizeMode: 'stretch', tintColor: colors.primary, opacity: 0.5 }} />
          <Image source={icons.musicNote2} style={{ position: 'absolute', top: -55, right: -7, resizeMode: 'stretch', tintColor: colors.primary, opacity: 0.5 }} />
        </View>
        <View style={{ marginLeft: 24 }}>
          <View >
            <TitleAlbum
              type={1}
              name={'Listening history'} />
            <View>
              arrayuserHistory?
              <FlatList
                data={arrayuserHistory}
                renderItem={({ item }) =>
                  <SquareAlbum id={item.id} name={item.title} img={item.songImg} handleButton={handleButton} />}
                keyExtractor={(item, index) => index}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>

          <View>
            <TitleAlbum
              type={4}
              name={'Artists'} />
            <FlatList
              data={music}
              renderItem={({ item }) =>
                <CircleAlbum
                  id={item.id}
                  name={item.artist}
                  img={item.songImg}
                  handleNavigator={handleNavigatorArtist} />}
              keyExtractor={(item, index) => index}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View>
            <TitleAlbum
              type={4}
              name={'Playlist'} />
            <FlatList
              data={playlist}
              renderItem={({ item }) =>
                <RectangleAlbum
                  id={item.id}
                  name={item.title}
                  img={item.songImg}
                  isPlaylist={true}
                  handleNavigator={handleNavigatorPlaylist} />}
              keyExtractor={(item, index) => index}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View>
            <TitleAlbum
              type={4}
              name={'Album'} />
            <FlatList
              data={music}
              renderItem={({ item }) =>
                <SquareAlbum
                  id={item.id}
                  name={item.title}
                  img={item.songImg}
                  handleNavigator={handleNavigatorAlbum} />}
              keyExtractor={(item, index) => index}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View>
            <TitleAlbum
              type={4}
              name={'Following'} />
            <FlatList
              data={music}
              renderItem={({ item }) =>
                <CircleAlbum
                  id={item.id}
                  name={item.title}
                  img={item.songImg}
                  handleNavigator={handleNavigatorFollowing} />}
              keyExtractor={(item, index) => index}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View>
            <TitleAlbum name={'Likes'} />
            <FlatList
              style={{ marginBottom: 100 }}
              data={music}
              renderItem={({ item }) =>
                <SquareAlbum
                  id={item.id}
                  name={item.title}
                  img={item.songImg}
                  handleNavigator={handleNavigatorLikes} />}
              keyExtractor={(item, index) => index}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={{ flex: 1, height: 50 }}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

