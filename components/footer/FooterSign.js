import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { icons } from '../../constants';
// import IconFacebook from "../../assets/facebook.png";
// import IconGoogle from "../../assets/Google.png";
// import IconTwitter from "../../assets/twitter.png";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

const FooterSign = ()=> {
    return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flexDirection:"row", alignItems: 'center', justifyContent: 'center' }}>
                <Image source={icons.google} style={{margin:10,  width:25,resizeMode:"contain"}}></Image>
                <Image source={icons.facebook}  style={{margin:10,  width:25,resizeMode:"contain"}}></Image>
                <Image source={icons.twitter} style={{margin:10,  width:25,resizeMode:"contain"}}></Image>
            </View>
        </View>)
}

export default FooterSign