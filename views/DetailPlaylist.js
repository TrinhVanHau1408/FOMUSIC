import { View, Text } from 'react-native'
import React from 'react'
import HeaderApp from '../components/header/HeaderApp'
import { icons } from '../constants'
import RectangleAlbum from '../components/misc/RectangleAlbum'

export default function DetailPlaylist() {
  return (
    <View>
      <HeaderApp title={'Playlist'} iconLeft={icons.arrowBack} iconRight={icons.option}/>
      <View style={{display:'flex', justifyContent: 'center', alignItems:'center', marginTop: 25}}>
        <RectangleAlbum id={1} name={'Playlist 1'} img={null} isPlaylist={true}/>
      </View>
    </View>
  )
}