import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { icons } from '../../constants'

export default function ControlDetatilPlaylist() {
    const [isLikedPlaylist, setIsLikedPlaylist ] = useState(false);
    const [isLikedPausePlaylist, setIsLikedPausePlaylist ] = useState(false);
    return (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 12 }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => setIsLikedPausePlaylist(!isLikedPausePlaylist)}>
                    <Image source={isLikedPausePlaylist?icons.pause:icons.play} style={{ marginRight: 9, height: 52.5, width: 52.5 }} />
                </TouchableOpacity>
                <TouchableOpacity >
                    <Image source={icons.share} style={{ height: 38, width: 38 }} />
                </TouchableOpacity>

            </View>
            <TouchableOpacity onPress={() => setIsLikedPlaylist(!isLikedPlaylist)}>
                <Image source={isLikedPlaylist?icons.heart:icons.unHeart} style={{ height: 32, width: 32 }} />
            </TouchableOpacity>
        </View>
    )
}