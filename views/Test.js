import React from 'react'
import { StyleSheet, View, Text} from 'react-native';
import ControlMusic from '../components/misc/ControlMusic';


export default function Test({navigation}) {
  return (
    <View s>
        <Text >Test </Text>
        <View>
          <ControlMusic />
        </View>
    </View>
  )
}