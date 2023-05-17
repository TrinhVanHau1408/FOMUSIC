import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, SliderComponent, Slider, SliderBase } from 'react-native';
import { icons } from '../constants';
const PlayingMore = ({ navigation }) => {
    return (
        <View style={styles.containerMore}>
            <View style={styles.headerContainer}>
                <TouchableOpacity>
                    <Image source={icons.arrowBackBlack}/>
                </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>     
                    <TouchableOpacity style={styles.ButtonContainer}>
                        <Image source={icons.iconGoToPlaylist}/>                       
                        <Text style={styles.TextMore}>
                            Đi tới danh sách phát
                        </Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.ButtonContainer}>
                        <Image source={icons.loopBlack}/>
                        <Text style={styles.TextMore}>
                            Lặp lại
                        </Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.ButtonContainer}>
                        <Image source={icons.random}/>
                        <Text style={styles.TextMore}>
                            Phát ngẫu nhiên
                        </Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.ButtonContainer}>
                        <Image source={icons.heartAdd}/>
                        <Text style={styles.TextMore}>
                            Thêm bài hát yêu thích
                        </Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.ButtonContainer}>
                        <Image source={icons.removeCircle}/>
                        <Text style={styles.TextMore}>
                            Ẩn bài hát
                        </Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.ButtonContainer}>
                        <Image source={icons.playlistAdd}/>
                        <Text style={styles.TextMore}>
                            Thêm vào playlist
                        </Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.ButtonContainer}>
                        <Image source={icons.listAdd}/>
                        <Text style={styles.TextMore}>
                            Thêm vào danh sách chờ
                        </Text>
                    </TouchableOpacity>  
                                 

            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    containerMore:
    {
        flex: 1,
        // position: 'relative',
        backgroundColor: '#ffffff',
    },
    headerContainer:
    {
        flex: 0.06,
        height: '10%',
        paddingTop: '5%',
        paddingLeft: '5%'
    },
    contentContainer:
    {
        flex: 0.5,
        height: '60%',
        // justifyContent: 'space-evenly',
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