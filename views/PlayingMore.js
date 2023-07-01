import { StyleSheet, View, Text, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { icons } from '../constants';
import { useRef, useEffect } from 'react';
const PlayingMore = ({ setToggleMore, setComments }) => {


    const opacity = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        animateIn();
    }, []);

    const animateIn = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };
    return (
        <View style={styles.containerMore}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => setToggleMore(false)}>
                    <Image source={icons.arrowBackBlack} />
                </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.ButtonContainer} onPress={() => {
                        setComments(true)
                        setToggleMore(false)
                    }
                    }>
                        <Image source={icons.iconGoToPlaylist} />
                        <Text style={styles.TextMore}>
                            Bình luận
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ButtonContainer}>
                        <Image source={icons.iconGoToPlaylist} />
                        <Text style={styles.TextMore}>
                            Đi tới danh sách phát
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ButtonContainer}>
                        <Image source={icons.loopBlack} />
                        <Text style={styles.TextMore}>
                            Lặp lại
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ButtonContainer}>
                        <Image source={icons.random} />
                        <Text style={styles.TextMore}>
                            Phát ngẫu nhiên
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ButtonContainer}>
                        <Image source={icons.heartAdd} />
                        <Text style={styles.TextMore}>
                            Thêm bài hát yêu thích
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ButtonContainer}>
                        <Image source={icons.removeCircle} />
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
                            Thêm vào danh sách chờ
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    containerMore:
    {
        flex: 1,
        // position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',

    },
    headerContainer:
    {
        flex: 2,
        padding: 15
    },
    contentContainer:
    {
        flex: 3,
        height: '60%',
        // justifyContent: 'space-evenly',
        display: 'flex',
        justifyContent: 'flex-end'
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
export default PlayingMore;