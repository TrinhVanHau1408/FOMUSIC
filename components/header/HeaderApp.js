import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { icons, colors } from '../../constants'

const HeaderApp = ({
    title = "Home"
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image source={icons.userCircleBlack} style={{tintColor: colors.second}}/>
      </View>
      <View style={styles.imageLeft}>
        <Image source={icons.musicNote1} style={{tintColor: colors.primary,resizeMode:'contain'}}/>
      </View>
      <View style={styles.imageRight}>
        <Image source={icons.musicNote2} style={{tintColor: colors.primary, resizeMode:'contain'}}/>
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default HeaderApp

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
      position: 'relative',
      height:"25%",
    },
    imageLeft:
    {
      position:'relative',
      tintColor: colors.primary,
      top: -70,
      left: 0,
      height:50,
      zIndex:-1,
    },
    imageRight:
    {
      position:'absolute',
      tintColor: colors.primary,
      top:0,
      right: 0,
      zIndex:-1,
      height:"10%"
    },
    title:
    {
      marginTop:20,
      textAlign: 'center',
      color: colors.primary,
      fontWeight: 'bold',
      fontSize:20
    },
    user:
    {
      position:'absolute',
      top:'40%',
      right:"6%",
      color: colors.second,
    }
})