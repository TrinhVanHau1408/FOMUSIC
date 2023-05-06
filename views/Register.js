import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { colors, icons } from '../constants'
import HeaderSign from '../components/header/HeaderSign';
import FooterSign from '../components/footer/FooterSign';
import MyInput from '../components/misc/MyInput';
import MyButton from '../components/misc/MyButton';
import OrLine from '../components/misc/OrLine';
import MyNavigation from '../components/misc/MyNavigation';
const Register = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleNavigatorLogin = () => {
    navigation.navigate('Login')
  }

  const handleSignUp = () => {
    // handle sign up logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderSign title={'Sign up'} />
      </View>
      <View style={styles.contentContainer}>
        <MyInput icon={icons.userSquare} placeholder={'Name'} />
        <MyInput icon={icons.mail} placeholder={'Email'} />
        <MyInput icon={icons.lock} placeholder={'Password'} />
        <View style={styles.TextContainer}>
          <Image source={icons.checkedCircle} />
          <Text
            style={{
              fontFamily: 'Montserrat',
              marginLeft: 5,
              fontSize: 13,
              fontWeight: 500,
              lineHeight: 17,
              color: '#000000'
            }}>
            I agree to the processing of Personal data
          </Text>
        </View>
        <MyButton title={'Create account'} />
        <MyNavigation
          title='Already have an acount?'
          textButton='Login'
          handleNavigator={handleNavigatorLogin} />
        <OrLine />
        <View style={styles.footerContainer}>
          <FooterSign />
        </View>
      </View>

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

    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  TextContainer:
  {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    marginLeft: 15,
    marginRight: 15,
  }
});

export default Register;
