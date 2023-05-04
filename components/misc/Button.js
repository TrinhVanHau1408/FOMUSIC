import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const CustomButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>Click me!</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});

export default CustomButton;
