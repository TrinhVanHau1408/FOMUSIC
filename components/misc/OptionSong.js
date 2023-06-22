import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { colors, icons } from '../../constants';
import { useState } from 'react';
import Slider from '@react-native-community/slider';
export default function OptionSong({ navigation, setToggleMore, options }) {
    // const [toggleMore, setToggleMore] = useState(false);
    const goBack = () => {
        setToggleMore(false);
    }
    // const handleToggleMore = () => {
    //     setToggleMore(true);
    // }
    return (
        <View style={styles.containerMore}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => setToggleMore(false)} style={{ width: '100%', height: '100%' }}>

                </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
                <View style={{ flex: 1, }}>
                    {
                        options.map((value, key) => {
                            return <TouchableOpacity
                                style={styles.ButtonContainer}
                                onPress={value.hanle}
                                key={key}
                            >
                                <Image source={value.icon} />
                                <Text style={styles.TextMore}>
                                   {value.title}
                                </Text>
                            </TouchableOpacity>
                        })
                    }
                    {/* <TouchableOpacity
                        style={styles.ButtonContainer}
                        onPress={handleNavigatorDetailSong}
                    >
                        <Image source={icons.blackEyeOpen} />
                        <Text style={styles.TextMore}>
                            Xem thông tin bài hát
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.ButtonContainer}
                        onPress={handleNavigatorEditDetaillSong}
                    >
                        <Image source={icons.blackEditProfile} />
                        <Text style={styles.TextMore}>
                            Sửa thông tin bài hát
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ButtonContainer}>
                        <Image source={icons.heartAdd} />
                        <Text style={styles.TextMore}>
                            Thêm bài hát yêu thích
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ButtonContainer}>
                        <Image source={icons.blackEyeClose} />
                        <Text style={styles.TextMore}>
                            Ẩn bài hát
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ButtonContainer}>
                        <Image source={icons.playlistAdd} />
                        <Text style={styles.TextMore}>
                            Thêm vào playlist
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ButtonContainer}>
                        <Image source={icons.listAdd} />
                        <Text style={styles.TextMore}>
                            Thêm vào album
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.ButtonContainer}
                        onPress={handleNavigatorDeleteSong}
                    >
                        <Image source={icons.removeCircle} />
                        <Text style={styles.TextMore}>
                            Xóa bài hát
                        </Text>
                    </TouchableOpacity> */}

                </View>

            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    containerMore:
    {
        flex: 1,
        // position: 'relative',
        // backgroundColor: 'rgba(255, 255, 255, 0.7)',
        // backgroundColor: colors.primary
        width: '100%',
        height: '100%',
        position: 'absolute',

    },
    headerContainer:
    {
        flex: 2,
        padding: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    contentContainer:
    {
        flex: 3,
        height: '80%',
        marginBottom: '15%',
        // justifyContent: 'space-evenly',
        display: 'flex',
        justifyContent: 'flex-end',
        // backgroundColor: colors.primary
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,

    },
    ButtonContainer:
    {
        flex: 1,
        width: '80%',
        paddingHorizontal: '7%',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },
    TextMore:
    {
        fontFamily: 'Lexend',
        fontSize: 17,
        fontWeight: '400',
        paddingLeft: '5%'
    }
})
