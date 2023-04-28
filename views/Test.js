import React from 'react'
import { StyleSheet, View, Text} from 'react-native';

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center'
  }
});
export default function Test({navigation}) {
  return (
    <View style={styles.view}>
        <Text style={{
          textAlign: 'center',
          color: '#ffffff',
        }}>FOMUSIC </Text>
    </View>
  )
}