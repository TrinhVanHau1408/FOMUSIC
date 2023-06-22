import { View, Text, Modal, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React from 'react'
import MyButton from '../misc/MyButton';
import { colors } from '../../constants';
import { deleteDataFirebase } from '../../firebase/controllerDB';
import { useDispatch, useSelector } from 'react-redux';
import { getArtistFollowByUserUid } from '../../redux/slices/userSlice';
import { getAllPlaylistByUserId } from '../../redux/slices/playlistsSlice';
export default function PopupDelele({ parentNode, Seclected, isVisiblePopup, setIsVisiblePopup, handleCheckDeleleSuccess }) {

    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user);
    const {key, name, title} = Seclected;

    const handleSelectYesDelete= async () => {

        console.log('handleDeleteById')
        try{
            const path = `${parentNode}/${key}`
            const resDelete = await deleteDataFirebase(path)
            if(resDelete)
            {
                if (parentNode === 'playlists') {
                    dispatch(getAllPlaylistByUserId({userId: user.uid}));
                    ToastAndroid.show(`Xóa thành công ${name?name:title}`, ToastAndroid.SHORT);
                } else {
                    handleCheckDeleleSuccess(key);
                }
               
               
            }
        }
        catch(err){
            console.log(err)
            ToastAndroid.show(`Xóa thất bại ${name?name:title}`, ToastAndroid.SHORT);
        }

        setIsVisiblePopup(false)
    }

    const handleSelectNoDelete = () => {
        console.log('Chọn no')
        setIsVisiblePopup(false)
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisiblePopup}

        >
            <TouchableWithoutFeedback
                onPressOut={() => setIsVisiblePopup(false)}>
                <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 15, marginRight: 15 }}>
                    <View style={styles.container}>
                        <Text style={(styles.textwithMarginTop)}>Bạn có chắc xoá bài hát</Text>
                        <Text style={styles.text}>{name?name:title}</Text>
                        <View style={styles.optionContainer}>
                            <TouchableOpacity style={styles.optionYes} onPress={handleSelectYesDelete}>
                                <Text style={styles.textYes}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionNo} onPress={handleSelectNoDelete}>
                                <Text style={styles.textNo}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>

    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        height: 'auto',
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 15,
        paddingBottom: 20,
        paddingTop: 20,
        borderWidth: 3,
        borderColor: colors.primary
    },

    liststyle: {
        margin: 20,
        display: 'flex',
        flexDirection: 'row'
    },

    optionContainer: 
    {
        display: 'flex',
        flexDirection: 'row',
        width: 300,
        alignSelf:'center',
        marginTop: 20,
        justifyContent: 'space-between',
        // backgroundColor: colors.primary

    },
    optionYes:
    {
        width: 120,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#AD004A',
    },
    optionNo:
    {
        width: 120,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#00AD63',
    },
    textYes:
    {
        fontFamily: 'Baloo',
        fontWeight: 'bold',
        fontSize: 25,
        lineHeight: 45,
        alignSelf: 'center',
        color: '#AD004A',
    },
    textNo:
    {
        fontFamily: 'Baloo',
        fontWeight: 'bold',
        fontSize: 25,
        lineHeight: 45,
        alignSelf: 'center',
        color: '#00AD63',
    },
    
    textwithMarginTop:
    {
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fontSize: 18,
        color: colors.primary,
        alignSelf: 'center',
        marginTop: 30
    },
    text:
    {
        fontFamily: 'Montserrat',
        fontWeight: '600',
        fontSize: 18,
        color: colors.primary,
        alignSelf: 'center',
    },
});