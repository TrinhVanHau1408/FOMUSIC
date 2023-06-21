import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { icons, images } from '../../constants'

export default function CriticleArtistSearch({ id, name, image, hanldeCLick }) {
    return (
        <TouchableOpacity onPress={() => hanldeCLick(id)}>
            <View style={styles.container}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={image ? { uri: image } : images.demo} style={styles.imgAvt} />
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                        <View>
                            <Text style={styles.textNameArtist}>{name}</Text>
                        </View>
                        <View>
                            <Text style={{  marginLeft: 30,}}>Nghệ sĩ</Text>
                        </View>
                    </View>
                   
                </View>
                <Image source={icons.skipNext} />

            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    imgAvt: {
        borderRadius: 100,
        height: 70,
        width: 70
    },
    textNameArtist: {
        marginLeft: 30,
        fontSize: 18,
        fontWeight: 'bold'
    }
})
