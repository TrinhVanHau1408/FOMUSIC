import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../constants'

export default function HeaderComment({
    title,
    onClose
}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>TOP100K Comments</Text>
            <TouchableOpacity onPress={onClose} style={styles.close}>
                <Text style={{ fontSize: 18 }}>Đóng</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '10%',
        // paddingTop: 15,
        borderBottomWidth: 2,
        borderBottomColor: colors.primary,
        // justifyContent: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems:'center'

    },
    text: {
        width: '100%',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    close:
    {
        position: 'absolute',
        top: 15,
        right: 20,
    }
})