import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Image, ToastAndroid } from 'react-native';
// import { Icon } from 'react-native-elements';
// import firebase from 'firebase';
import { icons, colors } from '../../constants';
import {
    readDataFirebase,
    writeDataFirebase,
    deleteDataFirebase,
} from '../../firebase/controllerDB';
import { useDispatch, useSelector } from 'react-redux'
import { serverTimestamp } from 'firebase/database';

const CommentForm = ({ songId, SetSignal, setIdRep, idRep }) => {
    const [comment, setComment] = useState('');

    const { user, loading, error } = useSelector((state) => state.user)

    const handleComment = async (e) => {
        if (comment !== '') {
            //   firebase.database().ref(`songs/${songId}/comments`).push({
            //     text: comment,
            //     timestamp: firebase.database.ServerValue.TIMESTAMP,
            //   });
            //   setComment('');
            // console.log(comment);
            // console.log(user);
            const data = {
                userId: user.uid,
                songId: songId,
                content: comment,
                createAt: serverTimestamp(),
                modefyAt: serverTimestamp(),
                replys: {

                }
            }
            try {
                if (idRep) {
                    const rep = await writeDataFirebase(`comments/${idRep}/replys`, data)
                    if (rep) {
                        ToastAndroid.show(`Successfull`, ToastAndroid.SHORT);
                        setComment('')
                        SetSignal((previous) => !previous)
                    }
                    else {
                        ToastAndroid.show(`Failed`, ToastAndroid.SHORT);
                    }
                }
                else {
                    const rep = await writeDataFirebase('comments', data)
                    if (rep) {
                        ToastAndroid.show(`Successfull`, ToastAndroid.SHORT);
                        setComment('')
                        SetSignal((previous) => !previous)
                    }
                    else {
                        ToastAndroid.show(`Failed`, ToastAndroid.SHORT);
                    }
                }

            }
            catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <View style={styles.container}>
            {/* <TextInput
                placeholder="Viết bình luận..."
                value={comment}
                onChangeText={setComment}
            /> */}
            {/* <Button onPress={handleComment} >
                <Image src={icons.send}/>
            </Button> */}
            <View style={styles.InputTextContainer}>
                <TextInput
                    placeholder={"Viết bình luận..."}
                    style={styles.InputText}
                    value={comment}
                    onChangeText={(e) => setComment(e)} />

            </View>
            <TouchableOpacity onPress={handleComment}>
                <Image source={icons.send} style={styles.Icon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '10%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    InputTextContainer: {
        // flexDirection: 'row',
        // alignItems: 'center',
        borderColor: colors.primary,
        borderWidth: 2,
        margin: 5,
        marginTop: 16,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 20,
        width: '80%',
        height: 45,

    },
    InputText:
    {
        padding: 4,
        margin: 0,
        height: 40,
        color: "#555454",
        flex: 1
    },
    Icon:
    {
        marginLeft: 0,
        marginTop: 5,
        marginRight: 8,
        marginBottom: 4,
        tintColor: colors.primary,
        height: 40,
        width: 40,
    },
})

export default CommentForm;
