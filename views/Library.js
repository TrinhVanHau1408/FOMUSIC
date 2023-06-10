import React, { useEffect, useState } from 'react';
import { Image, Text, View, FlatList, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import HeaderApp from '../components/header/HeaderApp';
import { colors, icons, images } from '../constants';
import SquareAlbum from '../components/misc/SquareAlbum';
import { ScrollView, State } from 'react-native-gesture-handler';
import CircleAlbum from '../components/misc/CircleAlbum';
import RectangleAlbum from '../components/misc/RectangleAlbum';
import TitleAlbum from '../components/misc/TitleAlbum';
import { useDispatch, useSelector } from 'react-redux';

import { getAllPlaylistByUserId, getPlayLists } from '../redux/slices/playlistsSlice'

import { getAlbum } from '../redux/slices/albumSlice';
import { getHistorySong } from '../redux/slices/songSlice';
import { getUserUid,getArtistFollowByUserUid } from '../redux/slices/userSlice';
import { filterObject } from '../utilities/Object';
import PopupCreateNewPlaylist from '../components/popup/PopupCreateNewPlaylist';
import PopupAddSong from '../components/popup/PopupAddSong';

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
  const {playlists} = useSelector((state) => state.playlists);
  const followedArtist  = useSelector((state) => state.followedArtist);
  const album = useSelector((state) => state.album.album);

  const [imgUrlNewPlaylist, setImgUrlNewPlaylist] = useState('');
  const [imgNameNewPlaylist, setImgNameNewPlaylist] = useState('');
  const [infoNewPlaylist, setInfoNewPlaylist] = useState({}); // name, description, imgUrl
  const [isVisiblePopupCreateNewPlaylist, setIsVisiblePopupCreateNewPlaylist] = useState(false)
  const [isVisiblePopupAddSong, setIsVisiblePopupAddSong] = useState(false);
  // ------------------------------History-------------------------------------------
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (user != null) {
      dispatch(getHistorySong({userId: user.uid}));
    }
  },[dispatch, user])

  // console.log('history result: ', historySongs)
  //---------------------------------- Artist--------------------------------------------

  // queryFollowedArtists(userId)
  // useEffect(() => {
  //   const getdata = async () => {
  //     dispatch(queryFollowedArtists({userId}))
  //   }
  //   getdata()
  // }, [dispatch, userId])

  useEffect(() => {
    // const data = []
    // for (key in followedArtist) {
    //   // if (playlists[key].userId == user.user.uid) {
    //     data.push({
    //       name: followedArtist[key].name,
    //       imageUrl: followedArtist[key].photoUrl,
    //       id: key
    //     })
    //   // }
    // }
    // setArrayFollowArtist(data)

    dispatch(getArtistFollowByUserUid());


  }, [])


  // console.log("ARTIST dang follow: ", followedArtist)

  // ------------------------------Playlist------------------------------------
  
  useEffect(() => {
     if (user != null) {
      dispatch(getAllPlaylistByUserId({userId: user.uid}))
     }
  }, [user])

  // useEffect(() => {
  //   const data = []
  //   for (key in playlists) {
  //     // if (playlists[key].userId == user.user.uid) {
  //       data.push({
  //         name: playlists[key].name,
  //         imageUrl: playlists[key].imageUrl,
  //         id: key
  //       })
  //     // }
  //   }
  //   setArrayPlaylist(data)
  // }, [playlists])

  // console.log('playlist moi tao ne: ', playlists)


  


  // --------------------------------- ALBUM----------------------------------------------

  // React.useEffect(() => {
  //   const getdata = async () => {
  //     dispatch(getAlbum())
  //   }
  //   getdata()
  // }, [dispatch])
  // console.log("ALBUM: ", album)


  // React.useEffect(() => {
  //   const data = []
  //   for (key in album) {
  //     data.push({
  //       name: album[key].name,
  //       imgUrl: album[key].imgUrl,
  //       id: key
  //     })
  //   }
  //   setArrayAlbum(data)
  // }, [album])




  const handleButton = () => {
    Alert.alert('Test', 'Library button');
  }
  const handleNavigatorArtist = (id) => {
    navigation.navigate('Artist', { id: id });
  }

  const handleNavigatorPlaylist = (id, ) => {

    // const playlist = filterObject(playlists, 'key', id);
    // console.log(id, playlist)
    navigation.navigate('Playlist', {playlists});
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
  

  const handleOpenPopuCreatnNePlaylist = () => {
    setIsVisiblePopupCreateNewPlaylist(true)
  }

  const handleOpenPopupAddSong_setInfoNewPlaylist = (namePlaylist, descriptionPlaylist, imgUrlNewPlaylist, imgNameNewPlaylist) => {

    // Set thông tin của playlist mới
    setInfoNewPlaylist({
      ...infoNewPlaylist,
      'name': namePlaylist,
      'description': descriptionPlaylist
    })

    setImgUrlNewPlaylist(imgUrlNewPlaylist);
    setImgNameNewPlaylist(imgNameNewPlaylist);

    // console.log('handleOpenPopupAddSong_setInfoNewPlaylist - setInfoNewPlaylist: ', namePlaylist + '' + descriptionPlaylist + '' + imgUrlNewPlaylist 
    // + " " + imgNameNewPlaylist);
    // if (infoNewPlaylist != {}) console.log('handleOpenPopupAddSong_setInfoNewPlaylist - setInfoNewPlaylist: ', infoNewPlaylist)
    // Di chuyển qua popup chọn nhạc thêm vào playlist
    setIsVisiblePopupCreateNewPlaylist(false);
    setIsVisiblePopupAddSong(true);
  }
 
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
                <TitleAlbum
                  type={4}
                  name={'Playlist'} />
               {playlists ?  <FlatList
                  data={playlists}
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
                />: <TouchableOpacity onPress={handleOpenPopuCreatnNePlaylist}><Text>Ddd</Text></TouchableOpacity>}
            
            
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
          <PopupCreateNewPlaylist
          isVisiblePopup={isVisiblePopupCreateNewPlaylist}
          setIsVisiblePopup={setIsVisiblePopupCreateNewPlaylist}
          handleMoveToPopupAddSong={handleOpenPopupAddSong_setInfoNewPlaylist}
           />

{/* playlist, infoImg, isVisiblePopup, setIsVisiblePopup, handleGoBackPopup */}
           <PopupAddSong 
           playlist={infoNewPlaylist} 
           infoImg={{imgUrlNewPlaylist, imgNameNewPlaylist}}
           isVisiblePopup={isVisiblePopupAddSong}
           setIsVisiblePopup={setIsVisiblePopupAddSong}
           />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

