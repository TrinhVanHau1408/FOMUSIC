import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function TitleAlbum({name}) {
  return (
    <View style={name==='TRENDING & HOT' ? styles.trending : (name==='TOP CHARTS' ? styles.topChart : styles.recenttlyPlayed)}>
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

    textName: {
        fontFamily: 'Montserrat',
        fontWeight: '700',
        fontSize: 21,
        lineHeight: 21,
        color: '#000000'
    }
})
