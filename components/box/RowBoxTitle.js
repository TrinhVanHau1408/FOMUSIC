import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

import { icons, colors } from '../../constants'
import BoxTitle from './BoxTitle'
import Title from './Title'

export default function RowBoxTitle(
  {
    title = "TOP CHARTS",
    data = [
      {
        title: "None",
        srcImage: null
      },
      {
        title: "None",
        srcImage: null
      },
      {
        title: "None",
        srcImage: null
      },
      {
        title: "None",
        srcImage: null
      },
      {
        title: "None",
        srcImage: null
      },
    ]
  }
) {
  return (
      <View style={styles.container}>
        <Title title={title}/>
        <View horizontal={true} style={styles.box}>
          {
            data.map((value, index) =>
            {
              return <View style={styles.BoxTitle}>
                  <BoxTitle title={value.title} width={"100%"} srcImage={value.srcImage}/>
              </View>
            })
          }
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  box: {
    height:"95%",
    width:"100%",
    flex: 1,
    flexDirection: 'row',
  },
  BoxTitle:
  {
    width: "35%",
    marginLeft: "6%",
    marginTop: "5%",
  }
})