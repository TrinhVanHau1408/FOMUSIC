import { View, Text, Image, StyleSheet, FlatList, Alert} from 'react-native'
import React from 'react'
import HeaderApp from '../components/header/HeaderApp'
import { icons, images } from '../constants'
import TitleAlbum from '../components/misc/TitleAlbum'
import SquareAlbum from '../components/misc/SquareAlbum'
const dataAlbum = [
  {
    id: 0,
    name: 'Name 1',
    img: images.demo
  },
  {
    id: 1,
    name: 'Name 2',
    img: images.demo
  },
  {
    id: 2,
    name: 'Name 3',
    img: images.demo
  },
  {
    id: 3,
    name: 'Name 4',
    img: images.demo
  },
  {
    id: 4,
    name: 'Name 5',
    img: images.demo
  }
]
export default function Artist({navigation}) {
  const handleButton = () => {
    Alert.alert('Test', 'Library button');
  }

  const goBack = () => {
    navigation.goBack();
  }
  return (
    <View>
      <HeaderApp title={'Artist'} iconLeft={icons.arrowBack} iconRight={icons.follow} goBack={goBack} />
      <View style={styles.infoArtist}>
        <Image source={images.defaultAvt} style={{ height: 150, width: 150, borderRadius: 100 }} />
        <Text style={styles.pageName}>Big Bang</Text>
        <View style={styles.pageFollower}>
          <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: 500 }}>Followers</Text>
          <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 500 }}>123,890,567</Text>
        </View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.containerPlaylist}>
        <View style={{marginTop: 29}}>
          <TitleAlbum name={'Album'} />
          <FlatList
            data={dataAlbum}
            renderItem={({ item }) =>
              <SquareAlbum id={item.id} name={item.name} img={item.img} handleButton={handleButton} />}
            keyExtractor={(item, index) => index}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={{marginTop: 22}}>
          <TitleAlbum name={'Popular Releases'} />
          <FlatList
            data={dataAlbum}
            renderItem={({ item }) =>
              <SquareAlbum id={item.id} name={item.name} img={item.img} handleButton={handleButton} />}
            keyExtractor={(item, index) => index}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  infoArtist: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Montserrat',
  },
  pageName: {

    marginTop: 9,
    fontWeight: 'bold',
    fontSize: 20,
  },
  pageFollower: {
    marginTop: 17,
    marginBottom: 29,
  },
  line: {
    height: 3,
    width: '100%',
    borderColor: '#EDEDED',
    elevation: 4,
  },
  containerPlaylist: {
    marginLeft: 24,
  }
})