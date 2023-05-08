import { StyleSheet, Text, View, Image } from 'react-native'
import Swiper from 'react-native-swiper';
import React, { useRef, useState } from 'react'

import { colors, images } from '../../constants';

export default function BoxTranfer() {
  const swiperRef = React.useRef(null);
  const [index, setIndex] = useState(0)

  return (
    <View >
      <View style={{ display: 'flex', alignItems: 'center'}}>
        <Swiper style={{height: 265}}
          autoplay={true}
        >
          <View style={styles.slide}>
            <Image source={images.defaultAvt} style={styles.img} />
          </View>
          <View style={styles.slide}>
            <Image source={images.defaultAvt} style={styles.img} />
          </View>
          <View style={styles.slide}>
            <Image source={images.demo} style={styles.img} />
          </View>
        </Swiper>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  img: {
    width: '90%', height: 202, borderRadius: 20
  }
});