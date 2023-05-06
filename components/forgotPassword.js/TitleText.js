import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
export default function TitleText(props) {
    const { text } = props;
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 36,
        marginBottom: 18,
        fontFamily: 'Montserrat',
        fontWeight: 500,
        fontSize: 13,
        lineHeight: 16,
        
    },

    text: {
        textAlign: 'center', 
        width: '70%',
        color: '#000000'
    }
})