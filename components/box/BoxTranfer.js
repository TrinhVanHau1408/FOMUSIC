import { StyleSheet, Text, View } from 'react-native'
import Swiper from 'react-native-swiper';
import React, { useRef, useState } from 'react'

import { colors, icons } from '../../constants';
import Box from './Box';

export default function BoxTranfer() {
  const swiperRef = React.useRef(null);
  const [index, setIndex] = useState(0)

  return (
    <View style={styles.container}>
      <Swiper
        autoplay={true}
      >
          <View style={styles.slide}>
            <Box width={"85%"} height={"85%"} />
          </View>
          <View style={styles.slide}>
            <Box width={"85%"} height={"85%"} />
          </View>
          <View style={styles.slide}>
            <Box width={"85%"} height={"85%"} />
          </View>
      </Swiper>
      <Text style={styles.controlLeft} > &lt;</Text>
      <Text style={styles.controlRight} >&gt;</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  controlLeft: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    left: "9%",
    top: "40%"
  },
  controlRight: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    top: "40%",
    right: "9%"
  },
});