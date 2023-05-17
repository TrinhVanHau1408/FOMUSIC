import { View, Text, Image } from 'react-native'
import React from 'react'

// import { auth, firebaseDatabase, firebaseDatabaseRef, firebaseDatabaseSet, onAuthStateChanged } from '../firebase/connectDB'
import { colors, icons } from '../constants'
export default function Wellcome({navigation}) {
  return (
    <View style={{
      backgroundColor: colors.primary, 
      flex:1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'}}>
      <View style={{marginBottom: 10}}>
        <Image source={icons.logoFomusic} />
      </View>
      <View>
      <Image source={icons.fomusic} />
      </View>
    </View>
  )
}