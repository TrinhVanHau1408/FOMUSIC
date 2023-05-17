import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { colors, icons } from '../../constants';
const FooterSign = () => {
    return (

        <View style={styles.rowIcon}>
            <TouchableOpacity>
                <Image source={icons.google} style={styles.icon}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={icons.facebook} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={icons.twitter} style={styles.icon} />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    rowIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
    },

    icon: {
        margin: 10,
        width: 32,
        height: 32,
        tintColor: colors.primary,
        resizeMode: "cover"
    }
})
export default FooterSign