import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, icons, images } from '../../constants'

const Box = (
    {
        width = 120,
        height = 120,
        srcImage = images.demo,
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
        {srcImage&&
        <Image source={srcImage} style={{resizeMode:'cover', width:'100%', height:'100%'}}/>
        }
    </View>
  )
}

export default Box
