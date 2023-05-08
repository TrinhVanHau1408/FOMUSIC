import { StyleSheet, Text, View } from 'react-native'

import React from 'react'
import Box from './Box'


export default function BoxTitle({
  title = 'None',
  width = 100,
  height = 100,
  srcImage = null,
}) {
  return (
    <View style={styles.container}>
      <Box width={width}/>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop:20,
    marginLeft:20
  },
  title: {
    textAlign: 'center'
  }
})