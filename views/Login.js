
import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../redux/slices/authSlice';
import HeaderSign from '../components/header/HeaderSign';
import FooterSign from '../components/footer/FooterSign';
import MyInput from '../components/misc/MyInput';
import { icons } from '../constants';
import MyButton from '../components/misc/MyButton';
import OrLine from '../components/misc/OrLine';
import MyNavigation from '../components/misc/MyNavigation';

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
 
  const [email, setEmail] = useState('tvh140802@gmail.com');
  const [password, setPassword] = useState('123456');
  // const [isFormatEmail, setIsFormatEmail] = useState(false)
  // const [isSign, setIsSign] = useState(false)
  const handleNavigatorRegister = () => {
    navigation.navigate('Register');

  }

  const handleNavigatorForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  }

  const goBack = () => {
    navigation.goBack();
  }


  const handleLogin = () => {
    console.log("Clicked button login")

    dispatch(logIn({ email, password }));

    if (!loading && error == null) {
      navigation.navigate('App');
    }
    
  }
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderSign title={'Login'} goBack={goBack} />
      </View>
      <View style={styles.contentContainer}>

        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

          <MyInput icon={icons.mail} placeholder={'Email'} setState={setEmail} valueState={email} />

        </View>
        <MyInput icon={icons.lock} placeholder={'Password'} setState={setPassword} valueState={password} />
        <View style={{ marginTop: 36 }}>
          <MyButton title={'Login'} handleNavigator={handleLogin} />
        </View>
        <View style={styles.TextContainer}>
          <TouchableOpacity
            onPress={handleNavigatorForgotPassword}
          >
            <Text style={styles.textForgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <OrLine />
        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <FooterSign />
          <MyNavigation title='Don’t have an account?' textButton={'Register'} handleNavigator={handleNavigatorRegister} />
        </View>
      </View>

    </ScrollView>
  );
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

