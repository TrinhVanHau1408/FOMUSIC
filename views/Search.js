import { View, Text, TextInput, StyleSheet, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderApp from '../components/header/HeaderApp'
import { icons, colors, images } from '../constants'
import TitleAlbum from '../components/misc/TitleAlbum'
import RectangleImg from '../components/search/RectangleImg'
import SquareImg from '../components/search/SquareImg'
import { useDispatch } from 'react-redux'

import { readDataFirebase } from '../firebase/controllerDB'
import { convertObjectToArray } from '../utilities/Object'
import CriticleArtistSearch from '../components/search/CriticleArtistSearch'
import SquareSongSearch from '../components/search/SquareSongSearch'
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
export default function Search({ navigation }) {

  // const dispatch = useDispatch();

  const [keySearch, setKeySearch] = useState('');
  const [allSong, setAllSong] = useState([]);
  const [allArtist, setAllArtist] = useState([]);
  const [searchSong, setSearchSong] = useState(null);
  const [searchArtist, setSearchArtist] = useState(null);
  const getAllSong = async () => {
    try {
      const resSong = await readDataFirebase('songs');
      if (resSong) {
        setAllSong(convertObjectToArray(resSong))
      }
    } catch (error) {
      console.log("Get all song error: ", error);
    }
  }
  const getAllArtist = async () => {
    try {
      const resArtist = await readDataFirebase('artists');
      if (resArtist) {
        setAllArtist(convertObjectToArray(resArtist))
      }
    } catch (error) {
      console.log("Get all artist error: ", error);
    }
  }
  useEffect(() => {
    getAllArtist();
    getAllSong();
  }, [])



  const goBack = () => {
    navigation.goBack();
     setKeySearch('');
    setSearchArtist(null);
    setSearchSong(null)
  }

  const handleChangInputSearch = (inputSearch) => {
    setKeySearch(inputSearch)
    console.log(inputSearch)
    if (inputSearch != '') {
      inputSearch = inputSearch.toLowerCase();
      // console.log('resSearchSong: ', allSong)
      // console.log('resSearchArtist: ', allArtist)
      const resSearchSong = allSong.filter(({ title }) => (title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(inputSearch)));
      const resSearchArtist = allArtist.filter(({ name }) => (name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(inputSearch)));
      // console.log('resSearchSong: ', resSearchSong)
      console.log('resSearchArtist: ', resSearchArtist)
      setSearchSong(resSearchSong);
      setSearchArtist(resSearchArtist);
    } else {
      setSearchSong([]);
      setSearchArtist([]);
    }

  }

  const handleNavigatorArtist = (artistId) => {
    const filterArtist = searchArtist.filter(({key}) => key ===artistId)[0];
    console.log('handleNavigatorArtist', filterArtist)
    // setKeySearch('');
    // setSearchArtist(null);
    // setSearchSong(null)
    navigation.navigate('Artist', {artist :filterArtist})

    
  }
  return (
    <View>
      <HeaderApp title={'Search'} iconLeft={icons.arrowBack} goBack={goBack} />
      <View style={styles.InputTextContainer}>
        <Image source={icons.search} style={styles.Icon} />
        <TextInput
          placeholder={'Demo'} style={styles.InputText}
          value={keySearch}
          onChangeText={handleChangInputSearch}
        />
      </View>
      {(searchArtist|| searchSong) ?
        <View>
          <Text style={{ marginLeft: 25, marginBottom: 10, textAlign: 'center' }}>
            {searchArtist.length + searchSong.length} kết quả tìm kiếm
          </Text>


          {searchArtist.length >0 && <Text style={{ marginLeft: 28, marginBottom: 10 }}>Nghệ sĩ</Text>}
          <FlatList
            style={{
              marginHorizontal: 20
            }}
            data={searchArtist}
            renderItem={({ item }) =>
              <CriticleArtistSearch
                id={item.key}
                name={item.name}
                image={item.photoUrl}
                hanldeCLick={handleNavigatorArtist}
              />
            }
          />

          {searchSong.length > 0 && <Text style={{ marginLeft: 28, marginBottom: 10 }}>Bài hát</Text>}
          <FlatList
            style={{
              marginHorizontal: 20
            }}
            data={searchSong}
            renderItem={({ item }) =>
              <SquareSongSearch
                id={item.key}
                name={item.name}
                image={item.artwork}
              />
            }
          />

        </View>
        : <View>
          <View style={{ marginLeft: 24 }}>
            <TitleAlbum type={3} name={'Tìm kiếm gần đây'} />
            <FlatList
              // style={{ marginTop: 0 }}
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
            <TitleAlbum type={4} name={'Đề xuất'} />
            <FlatList
              style={{ marginBottom: 120 }}
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
        </View>}
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
    marginLeft: 24,
    marginRight: 24,
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
  info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgInfo: {
    height: 60,
    width: 60,
    borderRadius: 100,
    overflow: 'hidden',
    shadowColor: '#171717',
    // shadowOffset: { width: -2, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    // elevation: 10

  }, content: {
    margin: 2
  },
  userName: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 22
  },
})