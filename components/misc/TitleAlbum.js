import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function TitleAlbum({name}) {
  return (
    <View style={styles.container}>
        <Text style={styles.textName}>{name}</Text>
    </View>
  )};

const styles = StyleSheet.create({
    container: {
        marginTop: 14,
        marginBottom: 7
    },

    textName: {
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000000'
    }
})
