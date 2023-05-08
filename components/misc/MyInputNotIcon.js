import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../constants';
export default function MyInput(props) {

  const { placeholder } = props;
  return (
    <View style={styles.InputTextContainer}>
      <TextInput placeholder={placeholder} style={styles.InputText} />
    </View>
  )
}

const styles = StyleSheet.create({
  InputTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.primary,
    borderWidth: 2,
    margin: 5,
    marginTop: 16,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 20
  },
  InputText:
  {
    paddingLeft: '5%',
    margin: 0,
    height: 40,
    color: "#555454",
    flex: 1
  },
})