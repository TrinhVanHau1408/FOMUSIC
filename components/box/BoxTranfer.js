import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import Swiper from 'react-native-swiper';
import React, { useRef, useState } from 'react'

import { colors, images } from '../../constants';

export default function BoxTranfer() {
  const swiperRef = React.useRef(null);
  const [index, setIndex] = useState(0)

  return (
   
      <ScrollView>
        <View style={{height:260, display: 'flex', alignItems: 'center'}}>
        <Swiper
          autoplay={true}
        >
          <View style={styles.slide}>
            <Image source={images.imgBanner1} style={styles.img} />
          </View>
          <View style={styles.slide}>
            <Image source={images.imgBanner2} style={styles.img} />
          </View>
          <View style={styles.slide}>
            <Image source={images.imgBanner3} style={styles.img} />
          </View>
        </Swiper>
      </View>
      </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  slide: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 0
    
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