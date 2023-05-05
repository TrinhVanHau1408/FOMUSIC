import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../../constants'
export default function MyNavigation(props) {
    const { title, textButton, handleNavigator} = props;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity
                onPress={handleNavigator}
            >
                <Text style={styles.textButton}>{textButton}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },

    title: {
        fontFamily: 'Montserrat',
        marginLeft: 4,
        fontStyle: 'normal',
        fontSize: 13,
        lineHeight: 18,
        color: "#000000"
    },
    button: {
        paddingHorizontal: 4,
        paddingVertical: 4,
    },
    textButton: {
        fontFamily: 'Montserrat',
        marginLeft: 4,
        fontWeight: 700,
        fontSize: 13,
        lineHeight: 18,
        color: colors.primary,
        textDecorationLine: 'underline'
    }
})