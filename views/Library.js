import React, { useEffect, useState } from 'react';
import { Image, Text, View, FlatList, SafeAreaView, Alert } from 'react-native';
import HeaderApp from '../components/header/HeaderApp';
import { colors, icons, images } from '../constants';
import SquareAlbum from '../components/misc/SquareAlbum';
import { ScrollView, State } from 'react-native-gesture-handler';
import CircleAlbum from '../components/misc/CircleAlbum';
import RectangleAlbum from '../components/misc/RectangleAlbum';
import TitleAlbum from '../components/misc/TitleAlbum';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { writeDataFirebase } from '../firebase/controllerDB';
import { useDispatch, useSelector } from 'react-redux';
import { getSongInUserHistory, historySlice } from '../redux/slices/historySlice';
import { getUserHistoryUid } from '../redux/slices/historySlice';
import { getPlayLists } from '../redux/slices/playlistsSlice'
import { getArtist } from '../redux/slices/artistSlice';
import { getAlbum } from '../redux/slices/albumSlice';

const musics = [
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
  },
  {
    title: 'Snooze',
    artist: 'SZA',
    songImg: images.imgSZATout,
    // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
    duration: 2 * 60,
    id: '3',
    track_number: '3'
  },
  {
    title: 'If you',
    artist: 'BigBang',
    songImg: images.imgIfYou,
    // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
    duration: 2 * 60,
    id: '4',
    track_number: '4'
  },
  {
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
  // const {userHistory} = useSelector((state) => state[historySlice.name])
  // const userHistory = useSelector(state => state.historySlice.userHistory)
  const [arrayuserHistory, setArrayUserHistory] = React.useState(null)
  const [songs, setSongs] = useState(null)
  // const [details, setDetails] = useState(userHistory[id])
  const [music, setMusic] = useState()

  const [arrayplaylist, setArrayPlaylist] = useState(null)
  const [arrayArtist, setArrayArtist] = useState(null)
  const [arrayAlbum, setArrayAlbum] = useState(null)

  // const [songs, setSongs] = useState()
  // const [details, setDetails] = useState(userHistory[id])
  // const [music, setMusic] = useState()
  // const [idSong, setIdSong] = useState(0);
  const { userHistory } = useSelector((state) => state.userHistory);
  const { playlists } = useSelector((state) => state.playlists);
  const { artist } = useSelector((state) => state.artist)
  const album = useSelector((state) => state.album)

  // History-------------------------------------------
  // Nhan data songs
  // useEffect(() => {
  //   const getSongs = async () => {
  //     const res = await readDataFirebase('songs')
  //     setSongs(res)
  //     // console.log(res)
  //   }
  //   getSongs()
  // }, [])
  console.log(album.album)

  useEffect(() => {
    if (userHistory) {
      const { userHistoryId } = userHistory;
      const getdata = async () => {
        dispatch(getUserHistoryUid({}))
      }
      getdata()
    }
  }, [])

  // useEffect(() => {
  //   setDetails(userHistory[id])
  //   // console.log(playlists[id])
  // }, [playlists[id]])

  // useEffect(() => {
  //   if (songs) {
  //     if (!details.songs)
  //       setMusic([])
  //   }
  //   else {
  //     const data = []
  //     for (key in userHistory) {
  //       console.log(key)
  //       data.push({
  //         id: key
  //       })
  //     }
  //   }
  //   setArrayUserHistory(data)
  // }, [userHistory])

  // React.useEffect(() => {
  //     const songData = async () => {
  //       dispatch(getSongInUserHistory({}))
  //     }
  //     songData()
  //     for (key in userHistory) {
  //       songData.push({
  //         id: key,
  //         title: userHistory[key].song

  //       })
  //     }
  //     setArrayUserHistory(songData)
  //   }, [userHistory])

  // }

  // Playlist------------------------------------
  React.useEffect(() => {
    const getdata = async () => {
      dispatch(getPlayLists({}))
    }
    getdata()
  }, [])

  React.useEffect(() => {
    const data = []
    for (key in playlists) {
      data.push({
        title: playlists[key].name,
        imageUrl: playlists[key].imageUrl,
        id: key
      })
    }
    setArrayPlaylist(data)
  }, [playlists])

  // Artist--------------------------------------------

  React.useEffect(() => {
    const getdata = async () => {
      dispatch(getArtist({}))
    }
    getdata()
  }, [])

  React.useEffect(() => {
    const data = []
    var flag = 1
    for (key in artist) {
      data.push({
        title: artist[key].name,
        imageUrl: artist[key].imageUrl,
        id: flag,
        key: key
      })
    }
    setArrayArtist(data)
  }, [artist])

  //  ALBUM----------------------------------------------

  React.useEffect(() => {
    const getdata = async () => {
      dispatch(getAlbum({}))
    }
    getdata()
  }, [])

  React.useEffect(() => {
    const data = []
    for (key in album) {
      data.push({
        title: album[key].name,
        imageUrl: album[key].imgUrl,
        id: key
      })
    }
    setArrayAlbum(data)
  }, [album])



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

  // React.useEffect(() => {
  //   const getdata = async () => {
  //     dispatch(getUserHistoryUid({}))
  //   }
  //   getdata()
  // }, [])

  // React.useEffect(() => {
  //   const data = []
  //   for (key in userHistory) {
  //     data.push({
  //       id: key

  //     })
  //   }
  //   setArrayUserHistory(data)
  // }, [userHistory])

  // React.useEffect(() => {
  //   const getSongs = async () => {
  //     const res = await readDataFirebase('songs')
  //     setSongs(res)
  //     // console.log(res)
  //   }
  //   getSongs()
  // }, [])

  // React.useEffect(() => {
  //   setDetails(userHistory[id])
  // }, [userHistory[id]])

  // React.useEffect(() => {
  //   // console.log(details.songs)
  //   if (songs) {
  //     if (!details.songs) {
  //       setMusic([])
  //     }
  //     else {
  //       const data = []
  //       // console.log(songs)
  //       var flag = 1
  //       for (key in details.songs) {
  //         data.push({
  //           title: songs[key].name,
  //           artist: songs[key].artist,
  //           songImg: songs[key].imgUrl,
  //           id: flag,
  //           key: key
  //         })
  //         flag = flag + 1
  //       }
  //       setMusic(data)
  //     }
  //   }

  // }, [songs, details])

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderApp title={'Library'} />
        <View>
          <Image source={icons.musicNote1} style={{ position: 'absolute', top: -55, left: -15, resizeMode: 'stretch', tintColor: colors.primary, opacity: 0.5 }} />
          <Image source={icons.musicNote2} style={{ position: 'absolute', top: -55, right: -7, resizeMode: 'stretch', tintColor: colors.primary, opacity: 0.5 }} />
        </View>
        <View style={{ marginLeft: 24 }}>
          {/* -----------------------------History----------------------------------------------  */}
          <View >
            <TitleAlbum
              type={1}
              name={'Listening history'} />
            <View>
              {arrayuserHistory && (
                <>
                  <FlatList
                    data={arrayuserHistory}
                    renderItem={({ item, index }) =>
                      <SquareAlbum
                        id={item.id}
                        name={"aaaas"}
                        images={images.defaultAvt}
                      // img={item.songImg}
                      // handleButton={handleButton}
                      />}
                    keyExtractor={(item, index) => index}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                </>
              )}
            </View>
          </View>

          {/* ---------------------------------ARTIST----------------------------------------------  */}
          <View>
            {arrayArtist && (
              <>
                <TitleAlbum
                  type={4}
                  name={'Artists'} />
                <FlatList
                  data={arrayArtist}
                  renderItem={({ item, index }) =>
                    <CircleAlbum
                      id={item.id}
                      name={item.name}
                      img={{ uri: item.photoUrl }}
                      handleNavigator={handleNavigatorArtist} />}
                  keyExtractor={(item, index) => index}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </>
            )}
          </View>

          {/* ----------------------------------PLAYLIST----------------------------------------------  */}
          <View>
            {arrayplaylist && (
              <>
                <TitleAlbum
                  type={4}
                  name={'Playlist'} />
                <FlatList
                  data={arrayplaylist}
                  renderItem={({ item, index }) =>
                    <RectangleAlbum
                      id={item.id.toString()}
                      name={item.title.toString()}
                      img={{ uri: item.imageUrl }}
                      type={2}
                      isPlaylist={true}
                      handleNavigator={handleNavigatorPlaylist} />}
                  keyExtractor={(item, index) => index}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </>
            )}
          </View>

          {/* ------------------------------ALBUM------------------------------ */}
          <View>
            {arrayAlbum && (
              <>
                <TitleAlbum
                  type={4}
                  name={'Album'} />
                <FlatList
                  data={arrayAlbum}
                  renderItem={({ item, index }) =>
                    <SquareAlbum
                      id={item.id}
                      name={item.title}
                      img={{ uri: item.imageUrl }}
                      handleNavigator={handleNavigatorAlbum} />}
                  keyExtractor={(item, index) => index}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </>
            )}
          </View>

          {/* <View>
            <TitleAlbum
              type={4}
              name={'Following'} />
            <FlatList
              data={arrayuserHistory}
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
          </View> */}

          {/* <View>
            <TitleAlbum name={'Likes'} />
            <FlatList
              style={{ marginBottom: 100 }}
              data={arrayuserHistory}
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
          </View> */}
          <View style={{ flex: 1, height: 50 }}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

