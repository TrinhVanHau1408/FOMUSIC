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
import { getAllHistoryByUserId, getSongInUserHistory, historySlice } from '../redux/slices/historySlice';
import { getUserHistoryUid } from '../redux/slices/historySlice';
import { getAllPlaylistByUserId, getPlayLists } from '../redux/slices/playlistsSlice'
import { getArtist, getFollowArtistByUserId, queryFollowedArtists } from '../redux/slices/artistSlice';
import { getAlbum } from '../redux/slices/albumSlice';
import { getHistorySong } from '../redux/slices/songSlice';
import { getUserUid } from '../redux/slices/userSlice';

// const musics = [
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
// const playlist = [
//   {
//     title: 'SVT Playlist 2023',
//     artist: 'FOMUSIC ',
//     songImg: images.playlistSVT,
//     // url: require(''),
//     duration: 2 * 60 + 53,
//     id: '1',
//   },
//   {
//     title: 'Playlist For Relax',
//     artist: 'FOMISUC',
//     songImg: images.playlistFlower,
//     // url: require(''),
//     duration: 2 * 60,
//     id: '2',
//     track_number: '2'
//   },
//   {
//     title: 'Nhac Buon Ngay Mua',
//     artist: 'FOMUSIC',
//     songImg: images.playlistBuon,
//     // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
//     duration: 2 * 60,
//     id: '3',
//     track_number: '3'
//   },
//   {
//     title: 'Twice Are Once',
//     artist: 'FOMUSIC',
//     songImg: images.playlistTwice,
//     // url: require('https://sample-music.netlify.app/Bad%20Liar.mp3'),
//     duration: 2 * 60,
//     id: '4',
//     track_number: '4'
//   },
// ]
// const getItem = (_data, index) => ({
//   id: Math.random().toString(12).substring(0),
//   title: `Item ${index + 1}`,
// });

// const getItemCount = _data => 50;


export default function Library({ navigation }) {
  // const {userHistory} = useSelector((state) => state[historySlice.name])
  // const userHistory = useSelector(state => state.historySlice.userHistory)
  const [arrayHistorySongs, setArrayHistorySongs] = React.useState([])
  const [songs, setSongs] = useState(null)
  // const [details, setDetails] = useState(userHistory[id])
  const [music, setMusic] = useState()

  const [arrayplaylist, setArrayPlaylist] = useState([])
  const [arrayFollowArtist, setArrayFollowArtist] = useState(null)
  const [arrayAlbum, setArrayAlbum] = useState(null)

  // const [songs, setSongs] = useState()
  // const [details, setDetails] = useState(userHistory[id])
  // const [music, setMusic] = useState()
  // const [idSong, setIdSong] = useState(0);
  const {user} = useSelector((state) => state.user);
  const { userHistory } = useSelector((state) => state.userHistory);
  const historySongs = useSelector(state => state.song.historySongs);
  const playlists = useSelector((state) => state.playlists.playlists);
  const followedArtist  = useSelector((state) => state.followedArtist);
  const album = useSelector((state) => state.album.album);

  // ------------------------------History-------------------------------------------
  
  const dispatch = useDispatch();

  
  const userId = user.uid;

  console.log('userId get in Libarary: ', userId);

  useEffect(() => {
    dispatch(getHistorySong({userId})).unwrap().then((result) => {
      setArrayHistorySongs(result); 
      
    }).catch((err) => {
      console.log('loading history error')
    });
  },[dispatch, userId])

  // console.log('history result: ', historySongs)
  //---------------------------------- Artist--------------------------------------------

  // queryFollowedArtists(userId)
  useEffect(() => {
    const getdata = async () => {
      dispatch(queryFollowedArtists({userId}))
    }
    getdata()
  }, [dispatch, userId])

  useEffect(() => {
    const data = []
    for (key in followedArtist) {
      // if (playlists[key].userId == user.user.uid) {
        data.push({
          name: followedArtist[key].name,
          imageUrl: followedArtist[key].photoUrl,
          id: key
        })
      // }
    }
    setArrayFollowArtist(data)
  }, [followedArtist])


  console.log("ARTIST dang follow: ", followedArtist)

  // ------------------------------Playlist------------------------------------
  
  useEffect(() => {
    const getdata = async () => {
      dispatch(getAllPlaylistByUserId({userId}))
    }
    getdata()
  }, [])

  useEffect(() => {
    const data = []
    for (key in playlists) {
      // if (playlists[key].userId == user.user.uid) {
        data.push({
          name: playlists[key].name,
          imageUrl: playlists[key].imageUrl,
          id: key
        })
      // }
    }
    setArrayPlaylist(data)
  }, [playlists])

  // console.log('playlist moi tao ne: ', playlists)



  // --------------------------------- ALBUM----------------------------------------------

  React.useEffect(() => {
    const getdata = async () => {
      dispatch(getAlbum())
    }
    getdata()
  }, [dispatch])
  console.log("ALBUM: ", album)


  React.useEffect(() => {
    const data = []
    for (key in album) {
      data.push({
        name: album[key].name,
        imgUrl: album[key].imgUrl,
        id: key
      })
    }
    setArrayAlbum(data)
  }, [album])

  console.log("ALBUM: ", album)



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
              {historySongs && (
                <>
                  <FlatList
                    data={historySongs}
                    renderItem={({ item, index }) =>
                      <SquareAlbum
                        id={item.id}
                        name={item.name}
                        artwork={item.artwork}
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
            {arrayFollowArtist && (
              <>
                <TitleAlbum
                  type={4}
                  name={'Artists'} />
                <FlatList
                  data={arrayFollowArtist}
                  renderItem={({ item, index }) =>
                    <CircleAlbum
                      id={item.id}
                      name={item.name}
                      artwork={ item.artwork }
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
                      id={item.key}
                      name={item.name}
                      artwork={ item.imageUrl }
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
                      artwork={{ uri: item.imgUrl }}
                      handleNavigator={handleNavigatorAlbum} />}
                  keyExtractor={(item, index) => index}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </>
            )}
          </View>

          {/* ------------------------------FOLLOWING------------------------------ */}
          {/* <View>
            <TitleAlbum
              type={4}
              name={'Following'} />
            <FlatList
            // Chua them data!
              data={}
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

          {/* ------------------------------LIKE------------------------------ */}
          {/* <View>
            <TitleAlbum name={'Likes'} />
            <FlatList
            // Chua them data!
              style={{ marginBottom: 100 }}
              data={}
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

