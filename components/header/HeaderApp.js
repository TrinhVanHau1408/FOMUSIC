import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { icons, colors } from '../../constants'

const HeaderApp = (props) => {

  const { title } = props;
  return (
    <View style={styles.container}>
      {/* <View style={styles.user}>
        <Image source={icons.userCircleBlack} style={{tintColor: colors.second}}/>
      </View>
      <View style={styles.imageLeft}>
        <Image source={icons.musicNote1} style={{tintColor: colors.primary,resizeMode:'contain', width:124}}/>
      </View>
      <View style={styles.imageRight}>
        <Image source={icons.musicNote2} style={{tintColor: colors.primary, resizeMode:'contain', width:117}}/>
      </View> */}

      <Text style={styles.title}>{title}</Text>

    </View>
  )
}

export default HeaderApp

const styles = StyleSheet.create({
  container: {

    padding: 15,

  },
  // imageLeft:
  // {
  //   position: 'absolute',
  //   tintColor: colors.primary,
  //   top: -82,
  //   left: 0,
  //   zIndex: -1,
  // },
  // imageRight:
  // {
  //   position: 'absolute',
  //   tintColor: colors.primary,
  //   top: -13,
  //   right: 0,
  //   zIndex: -1,
  //   height: "10%"
  // },
  title:
  {
    marginTop: 20,
    textAlign: 'center',
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 20
  },
  user:
  {
    position: 'absolute',
    top: '40%',
    right: "6%",
    color: colors.second,
  }
})