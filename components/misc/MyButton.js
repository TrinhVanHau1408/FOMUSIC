import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { colors, icons } from '../constants'
export default function MyButton(props) {
  const {title, handleNavigator, handleButton} = props;
  
  console.log('Error saving data:', handleButton);
  return (
    <View style={styles.container}>
      <TouchableOpacity 
      style={styles.button}
      onPress={handleNavigator?handleNavigator:handleButton}
      >
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Montserrat',
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
    fontSize: 17,
    lineHeight: 21,

  }
});