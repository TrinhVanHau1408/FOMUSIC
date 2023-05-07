
import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import HeaderSign from '../components/header/HeaderSign';
import MyInput from '../components/misc/MyInput';
import { icons } from '../constants';
import MyButton from '../components/misc/MyButton';
import TitleText from '../components/forgotPassword.js/TitleText';
export default function ForgotPassword({navigation}) {
  const handleNavigatorVerify = () => {
    navigation.navigate('VerifyAccount');
    
  }

  const goBack = () => {
    navigation.goBack();
  }
  return (
   <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderSign title={'Forgot Passowrd'} goBack={goBack} />
      </View>
      <View style={styles.contentContainer}>
        <TitleText text={'Enter your Email address we’ll send you a code to reset your password'}/>
        <MyInput icon={icons.mail} placeholder={'Email'} />
        <View style={{ marginTop: 36 }}>
          <MyButton title={'Send'} handleNavigator={handleNavigatorVerify} />
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


