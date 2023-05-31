import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { colors, images } from '../../constants';


export default function MyButtonWithCheckBox(props) {
  const { title, handleNavigator } = props;

  return (
    <View >
      <TouchableOpacity
        onPress={handleNavigator}
        style={(styles.container)}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    height: 43,
    marginBottom: '6%',
    marginHorizontal: 32,

    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: 15,

    backgroundColor: '#FFFFFF',
    // backgroundColor: colors.black,

    shadowColor: '#000000',
    elevation: 10,
  },
  // shaDow:
  // {
  //   backgroundColor: '#FFFFFF',
  //   shadowOffset: { width: 0, height: 4 },
  //   shadowColor: '#000000',
  //   shadowOpacity: 1,
  //   elevation: 20,
  // },
  title: {
    alignSelf: 'flex-start',
    paddingLeft: '5%',
    fontFamily: 'Montserrat',
    fontSize: 15,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 18,
    color: '#000000',
    lineHeight: 21,
    alignSelf: 'center'

  },
});