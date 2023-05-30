import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function IconText({
  icon,
  title,
  handleonClick
}) {
  return (
    <TouchableOpacity onPress={() => handleonClick(true)} activeOpacity={1.0} style={styles.container}>
      <Image source={icon} style={{ width: 32, height: 32 }} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    margin: 5
  },
  text: {
    fontSize: 20,
    marginLeft: 10,
  }
})