import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { colors, icons } from '../constants'
import HeaderSign from '../components/header/HeaderSign';
import FooterSign from '../components/footer/FooterSign';
import MyInput from '../components/misc/MyInput';
import MyButton from '../components/misc/MyButton';
const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 17 }}>
          <Text style={{ fontSize: 13, color: "#555454" }}>Already have an acount?</Text>
          <TouchableOpacity>
            <Text style={{ fontWeight: "bold", textDecorationLine: 'underline', color: '#8950F8', paddingHorizontal: 4, paddingVertical: 4 }}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <View style={{ flex: 4, height: 1, backgroundColor: '#555454', marginTop: 10, marginLeft: 10 }} />
          <Text style={{ flex: 1, marginLeft: "auto", marginRight: "auto", textAlign: 'center' }}>OR</Text>
          <View style={{ flex: 4, height: 1, backgroundColor: '#555454', marginTop: 10, marginRight: 10 }} />
        </View>
      </View>
      <View style={styles.footerContainer}>
        <FooterSign />
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

    flex: 2,
    display: 'flex',
    alignItems: 'center'
  },
  InputTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: "#8950F8",
    borderWidth: 1,
    margin: 5,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 20
  },
  InputText:
  {
    padding: 4,
    margin: 0,
    color: "#555454",
    flex: 1
  },
  Icon:
  {
    marginLeft: 10,
    marginTop: 4,
    marginRight: 8,
    marginBottom: 4,
    width: 20,
    height: 20,
    color: colors.primary,
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

export default SignUp;
