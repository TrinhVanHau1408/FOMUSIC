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
import { getHistorySong, reactHeartSong } from '../redux/slices/songSlice';
import { getUserUid, getArtistFollowByUserUid } from '../redux/slices/userSlice';
import { filterObject } from '../utilities/Object';
import PopupCreateNewPlaylist from '../components/popup/PopupCreateNewPlaylist';
import PopupAddSong from '../components/popup/PopupAddSong';
import { getAllAritist, getAllAritistByUserId, getArtistByUserId } from '../redux/slices/artistSlice';
import { addTracks } from '../redux/slices/playerSlice';

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
  const { user, follows } = useSelector((state) => state.user);
  const { userHistory } = useSelector((state) => state.userHistory);
  const historySongs = useSelector(state => state.song.historySongs);
  const { playlists } = useSelector((state) => state.playlists);
  const { artist }  = useSelector((state) => state.artist);
  const { album } = useSelector((state) => state.album);

  const [imgUrlNewPlaylist, setImgUrlNewPlaylist] = useState('');
  const [imgNameNewPlaylist, setImgNameNewPlaylist] = useState('');
  const [infoNewPlaylist, setInfoNewPlaylist] = useState({}); // name, description, imgUrl
  const [isVisiblePopupCreateNewPlaylist, setIsVisiblePopupCreateNewPlaylist] = useState(false)
  const [isVisiblePopupAddSong, setIsVisiblePopupAddSong] = useState(false);
  // ------------------------------History-------------------------------------------

  const dispatch = useDispatch();

  useEffect(() => {
    if (user != null) {
      dispatch(getHistorySong({ userId: user.uid }));
    }
  }, [dispatch, user])

  // console.log('history result: ', historySongs)
  //---------------------------------- Artist--------------------------------------------

  

  // ------------------------------Playlist------------------------------------

  useEffect(() => {
    if (user != null) {
      dispatch(getAllPlaylistByUserId({ userId: user.uid }))
    }
  }, [user])

  

  // console.log('playlist moi tao ne: ', playlists)





  // --------------------------------- ALBUM----------------------------------------------

  useEffect(() => {
      dispatch(getAlbum())
  }, [dispatch])

  // console.log("ALBUM: ", album)


  const handleButton = () => {
    Alert.alert('Test', 'Library button');
  }
  // const handleNavigatorArtist = (id) => {
  //   navigation.navigate('Artist', { id: id });
  // }

  //-----------------------------------LIKES-------------------------------------------------

  useEffect(() => {
    dispatch(reactHeartSong())
  }), [dispatch]



  const handleNavigatorHistory = (id, songs) => {
    dispatch(addTracks({songs, songCurrentId: id}));
    navigation.navigate('Playing');
  }
  const handleNavigatorPlaylist = (id,) => {

    // const playlist = filterObject(playlists, 'key', id);
    // console.log(id, playlist)
    navigation.navigate('Playlist', { playlists });
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

  const handleNavigatorArtist = (artist) => {
    navigation.navigate('Artist', { artist });
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
                        songs={historySongs}
                        handleNavigator={handleNavigatorHistory}
                      // img={item.songImg}
                      handleButton={handleButton}
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
          {/* <View>
            <TitleAlbum
              type={4}
              name={'Artists'} />
            {artist ?
              (<FlatList
                data={[...artist].reverse()}
                renderItem={({ item, index }) =>
                  <CircleAlbum
                    id={item.id}
                    name={item.name}
                    img={item.photoUrl}
                    handleNavigator={handleNavigatorArtist} />}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
              />) : null}
          </View> */}

          {/* ----------------------------------PLAYLIST----------------------------------------------  */}

          <View>
            <TitleAlbum
              type={4}
              name={'Playlist'} />
            {playlists ? <FlatList
              data={[...playlists].reverse()}
              renderItem={({ item, index }) =>
                <RectangleAlbum
                  id={item.key}
                  name={item.name}
                  artwork={item.imageUrl}
                  type={2}
                  isPlaylist={true}
                  handleNavigator={handleNavigatorPlaylist} />}
              keyExtractor={(item, index) => index}
              horizontal
              showsHorizontalScrollIndicator={false}
            /> : <TouchableOpacity onPress={handleOpenPopuCreatnNePlaylist}><Text>Ddd</Text></TouchableOpacity>}


          </View>

          {/* ------------------------------ALBUM------------------------------ */}
          <View>
            <TitleAlbum
                  type={4}
                  name={'Album'} />
                {album? ( 
                <FlatList
                  data={album}
                  renderItem={({ item, index }) =>
                    <SquareAlbum
                      id={item.key}
                      name={item.name}
                      artwork={item.imgUrl}
                      handleNavigator={handleNavigatorAlbum} />}
                  keyExtractor={(item, index) => index}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />) : null}
          </View>

          {/* ------------------------------FOLLOWING------------------------------ */}
          <View style={{marginBottom: 40}}>
            <TitleAlbum
              type={4}
              name={'Following'} />
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <CircleAlbum

                img={images.all}
                handleNavigatorAllFollowing={handleNavigatorFollowing} />
              <FlatList
                // Chua them data!
                data={follows && follows.filter(({ active }) => active == true)}
                renderItem={({ item }) =>
                  <CircleAlbum
                    id={item.key}
                    name={item.name}
                    img={item.photoUrl}
                    handleNavigatorArtist={handleNavigatorArtist} />}
                keyExtractor={(item, index) => index}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>

          {/* ------------------------------LIKE------------------------------ */}
          <View>
            <TitleAlbum name={'Likes'} />
            <FlatList
            // Chua them data!
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
          <PopupCreateNewPlaylist
            isVisiblePopup={isVisiblePopupCreateNewPlaylist}
            setIsVisiblePopup={setIsVisiblePopupCreateNewPlaylist}
            handleMoveToPopupAddSong={handleOpenPopupAddSong_setInfoNewPlaylist}
          />

          {/* playlist, infoImg, isVisiblePopup, setIsVisiblePopup, handleGoBackPopup */}
          <PopupAddSong
            playlist={infoNewPlaylist}
            title={'Thêm nhạc'}
            infoImg={{ imgUrlNewPlaylist, imgNameNewPlaylist }}
            isVisiblePopup={isVisiblePopupAddSong}
            setIsVisiblePopup={setIsVisiblePopupAddSong}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
        
};

