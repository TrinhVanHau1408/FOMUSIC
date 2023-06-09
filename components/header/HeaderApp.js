import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../constants'

const HeaderApp = (props) => {
  const { title, iconLeft, iconRight, goBack, handleNavigator } = props;
  return (
    <View style={(iconLeft && iconRight) ? styles.container2 : (iconLeft ? styles.container3 : styles.container1)}>
      {iconLeft && <TouchableOpacity onPress={goBack}>
        <Image source={iconLeft} style={{ tintColor: colors.primary }} />
      </TouchableOpacity>}
      <Text style={[styles.title, (iconLeft || iconRight) ? styles.color2 : styles.color1]}>{title}</Text>
      {iconRight && <TouchableOpacity onPress={handleNavigator}>
        <Image source={iconRight} style={{height: 42, width: 42 }} />
      </TouchableOpacity>}
    </View>
  )
}

export default HeaderApp

const styles = StyleSheet.create({
  container1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  container2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    textAlign: 'center'

  },
  container3: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    textAlign: 'center'

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
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
    alignSelf: 'center',
  },

  color1: {
    color: colors.primary,
  },
  color2: {
    color: '#000000',
  },
  user:
  {
    position: 'absolute',
    top: '40%',
    right: "6%",
    color: colors.second,
  }
})