import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import React, {useState} from 'react'
import HeaderApp from '../components/header/HeaderApp'
import { icons, images } from '../constants'
import RectangleAlbum from '../components/misc/RectangleAlbum'
import ControlDetatilPalylist from '../components/playlist/ControlDetatilPlaylist'
import MyLike from '../components/like/MyLike';
import ControlMusic from '../components/misc/ControlMusic';
const dataLike = [
  {
    id: 1,
    songName: 'Song name 1',
    songImg: images.defaultAvt,
    artistName: 'Artis 1',
    isLiked: true
  },
  {
    id: 2,
    songName: 'Song name 2',
    songImg: images.defaultAvt,
    artistName: 'Artis 2',
    isLiked: false
  },
  {
    id: 3,
    songName: 'Song name 3',
    songImg: images.defaultAvt,
    artistName: 'Artis 3',
    isLiked: false
  },
  {
    id: 4,
    songName: 'Song name 4',
    songImg: images.defaultAvt,
    artistName: 'Artis 4',
    isLiked: true
  },
  {
    id: 5,
    songName: 'Song name 5',
    songImg: images.defaultAvt,
    artistName: 'Artis 5',
    isLiked: true
  },
  {
    id: 6,
    songName: 'Song name 5',
    songImg: images.defaultAvt,
    artistName: 'Artis 5',
    isLiked: true
  }
]
export default function DetailPlaylist() {
  const [isVisible, setIsVisible ] = useState(false);
  
  const[idSong, setIdSong] = useState(0);
  const handleLayout = (id) => {
    setIsVisible(true);
    setIdSong(id);
   
  }
  return (
    <View style={{flex:1}}>
      <HeaderApp title={'Playlist'} iconLeft={icons.arrowBack} iconRight={icons.option} />
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
        <RectangleAlbum id={1} name={'Playlist 1'} img={null} isPlaylist={true} isDetailPlaylist={true} />
      </View>
      <ControlDetatilPalylist />
      <View style={styles.line}></View>
      {/* <View style={{ marginTop: 28 }}> */}
        <FlatList
        style={{marginTop: 28, marginBottom: 150}}
          data={dataLike}
          renderItem={({ item, index }) =>
            <MyLike
              id={item.id}
              idSongSelected={idSong}
              songName={item.songName}
              songImg={item.songImg}
              artistName={item.artistName}
              isLike={item.isLiked}
              index={index} 
              handleLayout={handleLayout} 
            />}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
        />
     
        {isVisible&&<ControlMusic song={dataLike.find(({id}) => id === idSong)}/>}
        
    </View>
  )
}

const styles = StyleSheet.create({
  line: {
    height: 3,
    width: '100%',
    borderColor: '#EDEDED',
    elevation: 4,
    marginTop: 28
  },
})