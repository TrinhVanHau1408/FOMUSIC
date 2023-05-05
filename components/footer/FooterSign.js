import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { colors, icons } from '../../constants';
// import IconFacebook from "../../assets/facebook.png";
// import IconGoogle from "../../assets/Google.png";
// import IconTwitter from "../../assets/twitter.png";



const FooterSign = () => {
    return (

        <View style={styles.rowIcon}>
            <TouchableOpacity>
                <Image source={icons.google} style={styles.icon} />
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
        flex: 2,
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