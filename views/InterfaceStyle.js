import React from 'react'
import { View, StyleSheet } from 'react-native/'
import HeaderApp from '../components/header/HeaderApp'
import { icons } from '../constants'
import MyButton from '../components/misc/MyButton'
import MyWhiteButton from '../components/misc/MyWhiteButton'

const styles=StyleSheet.create({
    container:
    {
        flex: 1,
        flexDirection: 'column'
    },
    contentContainer:
    {
        marginTop: '5%',
    },
})
export default function InterfaceStyle({navigation}) {

    const goBack = () => {
        navigation.goBack();
    }
    return(
        <View style={styles.container}>
            <HeaderApp 
            iconLeft={icons.arrowBack} 
            title='Interface Style'
            goBack={goBack}/>
            <View style={styles.contentContainer}>
                <MyWhiteButton title='Light'/>                                                            
                <MyWhiteButton title='Dark'/>
            </View>
        </View>
    )
}