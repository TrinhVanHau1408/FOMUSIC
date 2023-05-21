import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import BoxTranfer from './BoxTranfer'
import Title from './Title'

export default function RowBoxTranfer({}) {
  return (
    <View style={styles.container}>
      <BoxTranfer styles={styles.boxTranfer}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
   height: 400,
    flexDirection: 'column',
    justifyContent: 'center',
  },
 
})