import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../constants'

export default function Title(
    {
        title
    }
) {
  return (
    <Text style={styles.title}>{title}</Text>
  )
}

const styles = StyleSheet.create({
    title:
    {
      height:"10%",
      paddingLeft:"7%",
      fontWeight:"bold",
      color:colors.second,
      fontSize:20,
    },
})