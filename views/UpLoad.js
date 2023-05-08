import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import HeaderApp from "../components/header/HeaderApp";
import { Images, colors, icons } from "../constants";
import MyInputNotIcon from "../components/misc/MyInputNotIcon";
import CheckBox from '@react-native-community/checkbox';
import DropShadow from "react-native-drop-shadow";
import Test from "./Test";

// const initialState = {
//     public: false,
//   };
// const [state, setState] = React.useState(initialState);

const styles = StyleSheet.create({
    container:
    {
        flex: 10,
        backgroundColor: '#ffffff'
    },
    headerContenContainer:
    {
        flex: 3.5,
        alignItem: 'center',
        
    },
    elevation:
    {
        shadowOffset: {width: 2, height: 4},
        shadowColor: '#D9D9D9',
        shadowOpacity: '30%',
        elevation: 20

    },
    img:
    {
        width: 155,
        height: 155,
        marginTop: '5%',
        borderRadius: 20,
        alignSelf: 'center'
    },
    text:
    {
        marginLeft: 30,
        // marginTop: 20,
        fontFamily: 'Montserrat',
        fontWeight: '700',
        alignSelf: 'center',

        color: '000000'
    },
    textEditPic:
    {
        fontFamily: 'Montserrat',
        fontSize: 17,
        fontWeight: '700',
        color: '000000',
        alignSelf: 'center'
    },
    inputContainer:
    {
        // flex: 3,
        marginTop: '5%',
        height: '30%',
        justifyContent: 'space-between'
    }
})

export default function UpLoad() {
    return (
        <View style={styles.container}>
            <View style={[styles.headerContenContainer, styles.elevation]}>
                <HeaderApp
                    title='Upload'
                    iconLeft={icons.arrowBack}
                    iconRight={icons.save} />
                <View>
                    <Image source={icons.greyAvt} style={styles.img} />
                    <TouchableOpacity>
                        <Text style={styles.textEditPic}>
                            Edit Picture
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <MyInputNotIcon placeholder={'Title'} />
                    <MyInputNotIcon placeholder={'Genre'} />
                    <MyInputNotIcon placeholder={'Discribe your track'} />
                    <MyInputNotIcon placeholder={'Add caption to your posts'} />
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', width: '95%', justifyContent: 'space-between', marginTop: '3%' }}>
                    <Text style={styles.text}>
                        Make this track public
                    </Text>
                    <CheckBox>
                        
                    </CheckBox>
                    
                </TouchableOpacity>

                {/* Hậu chỉnh trạng thái checkbox giúp nha, mò chưa ra */}

            </View>
        </View>
    )
}