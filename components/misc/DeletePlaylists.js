import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image, Alert, Dimensions, Animated, FlatList } from "react-native";
import { colors, icons, images, sizes } from '../../constants'
import { readDataFirebase, writeDataFirebase, deleteDataFirebase } from "../../firebase/controllerDB";
import { serverTimestamp } from 'firebase/database'
import MyButton from "./MyButton";
import MyInput from "./MyInput";
import { getDataAsyncStorage } from "../../utilities/AsyncStorage";

const heigtScreen = Dimensions.get('window').height;

export default function DeletePlaylists({ id ,title, handleNavigator,
    height = heigtScreen * 0.5,
}) {
    const translateY = React.useState(new Animated.Value(heigtScreen * 0.5))[0];

    React.useEffect(() => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [])

    const handleDeletePlaylist = async () => {
        // console.log('Delete Playlist')
        try{
            const path = `playlists/${id}`
            const rep = await deleteDataFirebase(path)
            if(rep)
            {
                handleNavigator(false)
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <View style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }}>
            <TouchableOpacity style={{ height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', top: 0, zIndex: -1 }}
                onPress={() => handleNavigator(false)}
                activeOpacity={1.0} />
            <Animated.View style={[styles.container, { transform: [{ translateY }], height: height }]}>
                <View style={{ marginTop: 5, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ fontSize:20, marginTop:10, marginBottom:10, textAlign:'center', fontWeight:'bold'}}>Bạn đã chắt chắn xóa playlist {title.name}?</Text>
                </View>
                <View >
                    <MyButton title="Xóa" handleNavigator={handleDeletePlaylist} />
                </View>
                <View style={{ flex: 1, height: 10 }}></View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '40%',
        marginHorizontal: 2,
        borderRadius: 30,
        borderRadius: 30,
        width: '99%',
        maxHeight: heigtScreen * 0.5,
        backgroundColor: 'rgba(255, 255, 255,1)',
        translateY: - heigtScreen * 0.5,
        zIndex: 1
    },

    liststyle: {
        margin: 20,
        display: 'flex',
        flexDirection: 'row'
    }

});
