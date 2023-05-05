import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { colors, icons } from '../constants'
export default function MyButton(props) {
  const {title} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Montserrat',
    marginTop: 26,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  button: {
    
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8950F8',
    padding: 5,
    borderRadius: 25,
    width: '50%',
    height: 50,
  },
  title: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: 17,
    lineHeight: 21,

  }
});