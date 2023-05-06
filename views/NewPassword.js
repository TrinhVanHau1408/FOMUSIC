
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import HeaderSign from '../components/header/HeaderSign';
import FooterSign from '../components/footer/FooterSign';
import MyInput from '../components/misc/MyInput';
import { icons } from '../constants';
import MyButton from '../components/misc/MyButton';
import OrLine from '../components/misc/OrLine';
import MyNavigation from '../components/misc/MyNavigation';
import TitleText from '../components/forgotPassword.js/TitleText';
export default function NewPassword({navigation}) {
  const handleChangePassword = () => {
    Alert.alert('Test button', 'Change password successfull')
  }

  const goBack = () => {
    navigation.goBack();
  }
  return (
   <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderSign title={'New password'} goBack={goBack} />
      </View>
      <View style={styles.contentContainer}>
        <TitleText text={'Your password must contain of least onr number,at least one special character (e.g @ # $, etc)and 8 digits long'}/>
        <MyInput icon={icons.lock} placeholder={'New password'} />
        <MyInput icon={icons.lock} placeholder={'Confirm new password'} />
        <View style={{ marginTop: 36 }}>
          <MyButton title={'Submit'}  handleNavigator={handleChangePassword}/>
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


