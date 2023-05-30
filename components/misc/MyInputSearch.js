import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../constants';
export default function MyInputSearch(props) {

  const { icon, placeholder, setState, valueState, handleSearch } = props;
  return (
    <View style={styles.InputTextContainer}>
      <Image source={icon} style={styles.Icon} />
      <TextInput 
      placeholder={placeholder} 
      style={styles.InputText}
      value={valueState}
      onChangeText={text => setState(text)}
      onSubmitEditing={handleSearch}/>
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
    padding: 4,
    margin: 0,
    height: 40,
    color: "#555454",
    flex: 1
  },
  Icon:
  {
    marginLeft: 10,
    marginTop: 4,
    marginRight: 8,
    marginBottom: 4,
    tintColor: colors.primary,
    height: 24,
    width: 24,
  },
})