import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function TitleAlbum({name, type}) {
  return (
    <View style={type===1 ? styles.trending : (type===2 ? styles.topChart : (type===3? styles.recenttlyPlayed : styles.titleInViewLibrary))}>
        <Text style={styles.textName}>{name}</Text>
    </View>
  )};

const styles = StyleSheet.create({
    trending:
    {
      marginTop: 45,
      marginBottom: 10
    },
    topChart:
    {
      marginTop: 0,
      marginBottom: 10
    },
    recenttlyPlayed:
    {
      marginTop: 35,
      marginBottom: 10
    },
    titleInViewLibrary:
    {
      marginTop: 22,
      marginBottom: 10
    },

    textName: {
        fontFamily: 'Montserrat',
        fontWeight: '700',
        fontSize: 21,
        lineHeight: 21,
        color: '#000000'
    }
})
