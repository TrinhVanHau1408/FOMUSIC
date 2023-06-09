import { View, Text, Modal, TouchableWithoutFeedback, StyleSheet, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { pick, types, isCancel } from 'react-native-document-picker'
import MyButton from '../misc/MyButton';
import MyInput from '../misc/MyInput';
import { colors, icons } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPlaylistByUserId } from '../../redux/slices/playlistsSlice';
import { writeDataFirebase } from '../../firebase/controllerDB';
import { uploadFileStorage } from '../../firebase/controllerStorage';
import { serverTimestamp } from 'firebase/database';


export default function PopupCreateNewPlaylist({ isVisiblePopup, isCreatNewPlaylistSucces, setIsVisiblePopup, handleMoveToPopupAddSong }) {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user)
    const { playlists } = useSelector((state) => state.playlists)
    const [nameNewPlaylist, setNamNewPlaylist] = useState('');
    const [descriptionNewPlaylist, setDescriptionNewPlaylist] = useState('');
    const [imgUrlNewPlaylist, setImgUrlNewPlaylist] = useState('');
    const [imgNameNewPlaylist, setImgNameNewPlaylist] = useState('')
    const handleMovePickSong = () => {
        handleMoveToPopupAddSong(nameNewPlaylist, descriptionNewPlaylist, imgUrlNewPlaylist, imgNameNewPlaylist);

    }

    useEffect(() => {
        if (isCreatNewPlaylistSucces) {
            setNamNewPlaylist('');
            setDescriptionNewPlaylist('');
            setImgUrlNewPlaylist('');
            setImgNameNewPlaylist('');

        }
    }, [isCreatNewPlaylistSucces])
    // const handleCreatePlaylist = () => {
    //     handleClickButtonCreate(nameNewPlaylist, descriptionNewPlaylist, imgUrlNewPlaylist, imgNameNewPlaylist)

    // }
    const hanleUploadImg = async () => {
        try {
            const res = await pick({
                type: [types.images]
            })

            setImgNameNewPlaylist(res[0].name)
            setImgUrlNewPlaylist(res[0].uri)
            ToastAndroid.show('Upload image successfully', ToastAndroid.SHORT);
        } catch (err) {
            if (isCancel(err)) {
                console.log("User cancelled upload", err)
            }
            else {
                console.log(err)
            }
        }
    }

    const handleCreateNewPlaylist = async () => {
        // Xử lý ảnh
        // Nếu có chọn ảnh
        const checkNameExist = playlists.find(({ name }) => name === nameNewPlaylist)
        if (nameNewPlaylist != '') {
            if (!checkNameExist) {
                let imageUrl = ''
                if (imgUrlNewPlaylist) {
                    const result = await fetch(imgUrlNewPlaylist)
                    const blob = await result.blob()
                    imageUrl = await uploadFileStorage(`images/${imgNameNewPlaylist}`, blob)
                } else {
                    imageUrl = '';
                }

                setImgUrlNewPlaylist(imageUrl);
                const newPlaylist = {
                    name: nameNewPlaylist,
                    description: descriptionNewPlaylist,
                    userId: user.uid,
                    imageUrl: imageUrl,
                    songs: "",
                    createdAt: serverTimestamp(),
                    modifyAt: serverTimestamp(),
                }

                // Thêm dữ liệu newplaylist vào firebase

                try {
                    const responeNewPlaylist = await writeDataFirebase('playlists', newPlaylist);
                    if (responeNewPlaylist) {
                        dispatch(getAllPlaylistByUserId({ userId: user.uid }))
                        setIsVisiblePopup(false);
                        // setIsVisiblePoupCreateNewPlaylist(false)
                        setNamNewPlaylist("");
                        setDescriptionNewPlaylist("");
                        setImgNameNewPlaylist("");
                        setImgUrlNewPlaylist("");

                        ToastAndroid.show('Tạo playlist mới thành công', ToastAndroid.SHORT);
                    } else {
                        ToastAndroid.show('Tạo playlist mới thất bại', ToastAndroid.SHORT);
                    }
                } catch (e) {
                    ToastAndroid.show('Tạo playlist mới thất bại ' + e.code, ToastAndroid.SHORT);
                }
            } else {
                ToastAndroid.show(`Tên ${nameNewPlaylist} đã tồn tại`, ToastAndroid.SHORT);
            }
        } else {
            ToastAndroid.show(`Vui lòng nhập tên`, ToastAndroid.SHORT);
        }

    }

    const handleOpressOut = () => {
        setIsVisiblePopup(false);
        setNamNewPlaylist("");
        setDescriptionNewPlaylist("");
        setImgUrlNewPlaylist("");
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisiblePopup}

        >

            <TouchableWithoutFeedback
                onPressOut={handleOpressOut}>
                <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={[styles.container]}>
                        <View style={{ marginTop: 5, marginLeft: 15, marginRight: 15 }}>
                            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: colors.primary }}>Tạo mới playlist</Text>
                        </View>
                        <View style={{ marginTop: 5, marginLeft: 15, marginRight: 15 }}>
                            <MyInput
                                placeholder={"Tên playlist"}
                                icon={icons.userCircle}
                                setState={setNamNewPlaylist}
                                valueState={nameNewPlaylist}
                            />
                        </View>
                        <View style={{ marginLeft: 15, marginRight: 15 }}>
                            <MyInput
                                placeholder={"Mô tả về playlist"}
                                icon={icons.userCircle}
                                setState={setDescriptionNewPlaylist}
                                valueState={descriptionNewPlaylist}
                            />
                        </View>
                        <View style={{ marginLeft: 35, marginRight: 35 }}>
                            <TouchableOpacity style={{
                                // backgroundColor: 'rgba(0, 0, 255,0.6)',
                                borderRadius: 20, display: 'flex', justifyContent: 'center',
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 10,

                            }}
                                onPress={hanleUploadImg}
                            >
                                <View style={{display: 'flex', justifyContent: 'center', position: 'relative'}}>
                                    {
                                        <Image source={imgUrlNewPlaylist ? { uri: imgUrlNewPlaylist } : icons.cameraAddPhoto} style={imgUrlNewPlaylist ? { height: 150, width: 150, borderRadius: 20 } : { height: 60, width: 60 }} />
                                    }
                                    {
                                        imgUrlNewPlaylist && <View style={{height: 150, width: 150, position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            <Image source={icons.cameraEdit} style={{ height: 60, width: 60,  }} />
                                        </View>

                                    }
                                </View>
                                {/* <Text style={{ fontSize: 17, color: 'white', fontWeight: 'bold' }}>{imgNameNewPlaylist ? imgNameNewPlaylist : "Hình ảnh"}</Text> */}
                            </TouchableOpacity>
                        </View>

                        <View style={styles.optionContainer}>
                            {/* <MyButton title="Tạo playlist" handleButton={handleCreateNewPlaylist} />
                            <MyButton title="Chọn thêm nhạc" handleButton={handleMovePickSong} /> */}
                            <TouchableOpacity style={styles.optionCreateNew} onPress={handleCreateNewPlaylist} >
                                <Text style={styles.textYes}>Tạo mới</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionAddSong} onPress={handleMovePickSong} >
                                <Text style={styles.textNo}>Thêm nhạc</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, height: 10 }}></View>
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
        borderRadius: 5,
        paddingBottom: 20,
        paddingTop: 20
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
        alignSelf: 'center',
        marginTop: 20,
        justifyContent: 'space-between',
        // backgroundColor: colors.primary

    },
    optionCreateNew:
    {
        paddingHorizontal: 15,
        borderRadius: 30,
        backgroundColor: colors.primary,

    },
    optionAddSong:
    {
        paddingHorizontal: 15,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    textYes:
    {
        fontFamily: 'Baloo',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 45,
        alignSelf: 'center',
        color: '#ffffff',
    },
    textNo:
    {
        fontFamily: 'Baloo',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 45,
        alignSelf: 'center',
        color: colors.primary,
    },
});