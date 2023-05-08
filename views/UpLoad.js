import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import HeaderApp from "../components/header/HeaderApp";
import { Images, colors, icons, images } from "../constants";
import MyInputNotIcon from "../components/misc/MyInputNotIcon";
import CheckBox from '@react-native-community/checkbox';


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

        color: colors.black
    },
    textEditPic:
    {
        fontFamily: 'Montserrat',
        fontSize: 17,
        fontWeight: '700',
        color: colors.black,
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
    const [isChecked, setIsChecked] = useState(false);
    const handleIsChecked = () => {
        setIsChecked(!isChecked);
    }
    return (
        <View style={styles.container}>
            <View style={[styles.headerContenContainer, styles.elevation]}>
                <HeaderApp
                    title='Upload'
                    iconLeft={icons.arrowBack}
                    iconRight={icons.save} />
                <View>
                    <Image source={images.defaultAvt} style={styles.img} />
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
                    <CheckBox  
                        tintColors={{true:colors.primary, false:colors.primary}} 
                        value = {isChecked}
                        onChange={handleIsChecked}
                    />
                    
                </TouchableOpacity>

                {/* Hậu chỉnh trạng thái checkbox giúp nha, mò chưa ra */}

            </View>
        </View>
    )
}