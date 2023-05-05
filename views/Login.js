import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import HeaderSign from '../components/header/HeaderSign';
import FooterSign from '../components/footer/FooterSign';
import MyInput from '../components/misc/MyInput';
import { icons } from '../constants';
import MyButton from '../components/misc/MyButton';
import OrLine from '../components/misc/OrLine';
import MyNavigation from '../components/misc/MyNavigation';

const LogIn = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleNavigatorRegister = () => {
    navigation.navigate('Register')
  }
  const handleSignUp = () => {
    // handle sign up logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderSign title={'Login'} />
      </View>
      <View style={styles.contentContainer}>
        <MyInput icon={icons.mail} placeholder={'Email'} />
        <MyInput icon={icons.lock} placeholder={'Password'} />

        <View style={{ marginTop: 36 }}>
          <MyButton title={'Login'} />
        </View>
        <View style={styles.TextContainer}>
          <TouchableOpacity>
            <Text style={styles.textForgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <OrLine />
      </View>

      <View style={styles.footerContainer}>
        <FooterSign />
      </View>

      <MyNavigation title='Don’t have an account?' textButton={'Register'}  handleNavigator={handleNavigatorRegister}/>
    </View>
  );
};

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

export default LogIn;