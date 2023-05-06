import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { icons, colors } from '../../constants'

const HeaderApp = ({
    title = "Home"
}) => {
  return (
    <View style={styles.container}>
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
      position:'absolute',
      tintColor: colors.primary,
      top: -100,
      height:150,
      left: 0,
    },
    imageRight:
    {
      position:'absolute',
      tintColor: colors.primary,
      top:0,
      right: 0
    },
    title:
    {
      marginTop:20,
      textAlign: 'center',
      color: colors.primary,
      fontWeight: 'bold',
      fontSize:20
    }
})