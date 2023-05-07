import { View, Text, FlatList, Alert, StyleSheet } from 'react-native'
import React from 'react'
import HeaderApp from '../components/header/HeaderApp'
import SquareAlbum from '../components/misc/SquareAlbum'
import { icons, images } from '../constants'
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
  },
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
  },
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

export default function Album() {
  const handleButton = () => {
    Alert.alert('Test', 'Library button');
  }
  return (
    <View>
      <HeaderApp title='Albums' iconLeft={icons.arrowBack} />
      <View style={styles.container}>
        <FlatList
          data={dataAlbum}
          renderItem={({ item }) =>
            <SquareAlbum 
            id={item.id} 
            name={item.name} 
            img={item.img} 
            handleButton={handleButton} 
            isAlbum={true}/>}
          keyExtractor={(item, index) => index}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
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