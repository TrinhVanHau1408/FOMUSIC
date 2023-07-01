import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, TouchableOpacity, ToastAndroid, TextInput, Alert } from 'react-native';
import { icons, images, colors } from '../../constants';
import { readDataFirebase, updateDataFirebase, deleteDataFirebase } from '../../firebase/controllerDB';
import { useDispatch, useSelector } from 'react-redux';

const ItemComment = ({ comment, SetSignal, signal, setIdRep }) => {

    const [isMore, setIsMore] = useState(false)
    const [isSave, setIsSave] = useState(false)
    const { user, loading, error } = useSelector((state) => state.user)
    const inputElement = useRef(null)
    const [value, setValue] = useState(comment.content)

    const formatTime = (timestamp) => {
        const currentTime = Date.now();
        const diffTime = Math.abs(currentTime - timestamp);
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMinutes < 1) {
            return 'Vừa xong';
        } else if (diffHours < 1) {
            return `${diffMinutes} phút trước`;
        } else if (diffDays < 1) {
            return `${diffHours} giờ trước`;
        } else {
            const date = new Date(timestamp);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }
    }

    const deletedata = async () => {
        // ToastAndroid.show(`Bạn được quyền này`, ToastAndroid.SHORT);
        try {
            const rep = await deleteDataFirebase(`comments/${comment.id}`)
            if (rep) {
                SetSignal(!signal)
                ToastAndroid.show(`Successfull`, ToastAndroid.SHORT);
                setIsMore(false)
            }
            else {
                ToastAndroid.show(`Failed`, ToastAndroid.SHORT);
            }
        }
        catch
        {
            ToastAndroid.show(`Failed`, ToastAndroid.SHORT);
        }
    }

    const handleDelete = async () => {
        if (user.uid == comment.userId) {
            // ToastAndroid.show(`Bạn được quyền này`, ToastAndroid.SHORT);
            Alert.alert(title = "Xác nhận xóa",
                message = "Bạn có chắc chắn muốn xóa?",
                buttons =
                [
                    { text: 'Hủy', onPress: () => { setIsMore(false); }, style: 'cancel' },
                    { text: 'Xóa', onPress: deletedata }
                ]
            )
        }
        else {
            ToastAndroid.show(`Bạn không có quyền với commnent này`, ToastAndroid.SHORT);
        }
    }

    const handleChange = () => {
        setIsMore(false)
        setIsSave(true)
       
       
    }

    console.log('handleChange setIsSave', isSave)
    const handleSave = async () => {

        // console.log(comment.userId, user.uid )

        if (value !== '' && user.uid === comment.userId) {
            try {
                const rep = await updateDataFirebase(`comments/${comment.id}/`, { content: value });
                console.log(rep);
                if (rep) {
                    ToastAndroid.show(`Successfull`, ToastAndroid.SHORT);
                    setIsMore(true);
                    setIsSave(false);
                    SetSignal(!signal)
                }

            }
            catch (err) {
                console.log(err)
                ToastAndroid.show(`Failed`, ToastAndroid.SHORT);
            }
        }
    }

    // useEffect(() => {
    //     if (isSave) {
    //         inputElement.current.focus()
    //     }

    // }, [isSave])

    return (
        <View style={styles.commentContainer}>
            <View style={styles.userInfoContainer}>
                <Image
                    source={images.defaultAvt}
                    style={styles.userImage}
                />
                <Text style={styles.userName}>{comment.nameUser}</Text>
                <TouchableOpacity onPress={() => setIsMore(!isMore)}>
                    <Image
                        source={icons.more_horizontal}
                        style={styles.more_horizontal}
                    />
                </TouchableOpacity>

            </View>
            <TextInput style={(!isSave) ? styles.commentText : styles.commentTextChange}
                value={value}
                ref={inputElement}
                editable={isSave}
                onChangeText={(text) => setValue(text)}
            >

            </TextInput>
            <View style={styles.footerContainer}>
                <Text style={styles.heartIcon}>❤️</Text>
                <Text style={styles.numHeart}>100</Text>
                <Text style={styles.commentTime}>{formatTime(parseInt(comment.createAt))}</Text>
                <TouchableOpacity style={styles.replyButton} >
                    <Text style={styles.replyButtonText}>Reply</Text>
                </TouchableOpacity>

            </View>
            {
                isMore && <View style={styles.ismore}>
                    <TouchableOpacity onPress={handleDelete}>
                        <Text style={styles.textmore}>
                            Xóa
                        </Text >
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleChange}>
                        <Text style={styles.textmore}>
                            Chỉnh sửa
                        </Text>
                    </TouchableOpacity>
                </View>
            }
            {
                isSave && <View style={styles.ismore}>
                    <TouchableOpacity onPress={handleSave}>
                        <Text style={styles.textmore}>
                            Lưu
                        </Text >
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
};

const styles = {
    commentContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    commentText: {
        fontSize: 14,
        marginBottom: 10,
        color: 'black',
    },
    commentTextChange: {
        backgroundColor: 'rgba(0, 0, 0,0.15)',
        borderRadius: 10,
        padding: 10,
        padding: 4,
        fontSize: 14,
        marginBottom: 10,
        color: 'black',
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    heartIcon: {
        marginRight: 10,
    },
    commentTime: {
        marginRight: 50,
    },
    replyButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    replyButtonText: {
        fontSize: 14,
        // fontWeight: 'bold',
    },
    numHeart:
    {
        marginRight: 50,
    },
    more_horizontal: {
        position: 'absolute',
        top: -10,
        right: -210,

    },
    ismore:
    {
        position: 'absolute',
        right: 66,
        borderWidth: 2,
        borderColor: colors.primary,
        padding: 9,
        top: 15,
        borderRadius: 10,
    },
    textmore: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.primary,
    }
};

export default ItemComment;
