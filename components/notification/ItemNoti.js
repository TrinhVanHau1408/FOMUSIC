import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { colors, icons, images } from '../../constants'

const styles = StyleSheet.create({
    container:
    {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        marginVertical: 7,
    },
    imgNoti:
    {
        resizeMode: 'cover',
        width: 70,
        height: 70,
        borderRadius: 40,
        borderWidth: 0
    },
    textContent:
    {
        fontFamily: 'Montserrat',
        paddingLeft: 20

    },
    textTitle:
    {
        fontSize: 14,
        fontWeight: '700',
    },
    textOwner:
    {
        fontSize: 12,
        fontWeight: '400'

    }

})
export default function ItemNoti({ id, notiImage, title, owner, time }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.container}>
                <View style={styles.imgNoti}>

                    {/* Ko load được file ảnh từ đối số truyền vào nên xài cứng từ '../constant/images' */}
                    <Image source={images.defaultAvt} style={styles.imgNoti}/>
                </View>
                <View style={styles.textContent}>
                    <Text style={styles.textTitle}>{title}</Text>
                    <Text style={styles.textOwner}>{owner}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )

}