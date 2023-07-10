import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import HeaderSign from '../components/header/HeaderSign';
import MyInput from '../components/misc/MyInput';
import { colors, icons } from '../constants';
import MyButton from '../components/misc/MyButton';
import TitleText from '../components/forgotPassword.js/TitleText';
import { Text } from 'react-native-svg';
export default function VerifyAccount({navigation}) {
    const handleNavigatorNewPassword = () => {
        navigation.navigate('Login');
    }

    const goBack = () => {
        navigation.goBack();
      }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <HeaderSign title={'Verify your account'} goBack={goBack} />
            </View>
            <View style={styles.contentContainer}>
                <TitleText text={'We just sent a link to your Email! \nAfter reset your password, you can login as usual!'} />
                {/* <TitleText text={'After reset your password, you can login as usual!'} /> */}
                {/* <MyInput icon={icons.lock} placeholder={'Activation code'} /> */}
                <View style={{ marginTop: 36 }}>
                    <MyButton title={'Go to Login!'}  handleNavigator={handleNavigatorNewPassword}/>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    headerContainer:
    {
        flex: 3,
    },
    contentContainer: {
        marginTop: 20,
        flex: 5,
        // backgroundColor: colors.primary
    },
    footerContainer: {
        flex: 2,
        display: 'flex',
        justifyContent: 'flex-start'
    },

    TextContainer:
    {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 54,

    },

    textForgotPassword: {
        width: 123,
        height: 16,
        color: '#8950F8',
        fontFamily: 'Monsterat',
        fontWeight: 'bold',
        fontSize: 13,
        lineHeight: 16,
        alignItems: 'center',
        textAlign: 'center'
    }
});


