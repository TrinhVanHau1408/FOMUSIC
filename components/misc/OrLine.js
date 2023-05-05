import React from 'react'
import { View, Text } from 'react-native'
export default function OrLine() {
  return (
    <View style={{ flexDirection: 'row', marginTop: 10 }}>
    <View style={{ flex: 4, height: 1, backgroundColor: '#555454', marginTop: 10, marginLeft: 10 }} />
    <Text style={{ flex: 1, marginLeft: "auto", marginRight: "auto", textAlign: 'center' }}>OR</Text>
    <View style={{ flex: 4, height: 1, backgroundColor: '#555454', marginTop: 10, marginRight: 10 }} />
  </View>
  )
}
