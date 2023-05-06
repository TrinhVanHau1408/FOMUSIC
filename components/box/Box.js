import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../constants'

const Box = (
    {
        width = 120,
        height = 120,
        srcImage = null,
        borderRadius = 10,
        borderWidth = 2,
    }
) => {
    const styles = StyleSheet.create({
        box: {
            width: width,
            height: height,
            borderRadius: borderRadius,
            borderWidth: borderWidth,
            borderColor: colors.primary,
        },
        boxnoimage: {
            width: width,
            height: height,
            borderRadius: borderRadius,
            borderWidth: borderWidth,
            borderColor: colors.primary,
            backgroundColor: colors.backgrougLyrics
        }
    })
  return (
    <View style={srcImage?styles.box:styles.boxnoimage}>
      
    </View>
  )
}

export default Box
