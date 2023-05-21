import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { colors, icons } from '../constants'
import HeaderSign from '../components/header/HeaderSign';
import FooterSign from '../components/footer/FooterSign';
import MyInput from '../components/misc/MyInput';
import MyButton from '../components/misc/MyButton';
import OrLine from '../components/misc/OrLine';
import MyNavigation from '../components/misc/MyNavigation';
import {
  auth,
  createUserWithEmailAndPassword,
  firebaseDatabase,
  firebaseDatabaseRef,
  firebaseDatabaseSet,
  serverTimestamp,
  sendEmailVerification


} from '../firebase/connectDB';
const Register = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isEmailAlready, setIsEmailAlready] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isLengtPassword, setIsLengtPassword] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [isInvaildName, setIsValidName] = useState(false);
  const [isInvaidChecked, setIsInvaidChecked] = useState(false)
  const [isConfirmPassword, setIsConfirmPassword] = useState(false)
  const [isFormatEmail, setIsFormatEmail] = useState(false)
  const handleNavigatorLogin = () => {
    navigation.navigate('Login');

  }

  const goBack = () => {
    navigation.goBack();
  }

  const handleCreateAccount = () => {
    // Alert.alert("Create account", username + " " + email + " " + password + " " + rePassword  )

    if (email == '') {
      setIsInvalidEmail(true);
    } else {
      setIsInvalidEmail(false);
    }

    if (password.length < 6 || password.length > 20) {
      setIsLengtPassword(true);
    } else {
      setIsLengtPassword(false);
    }

    if (password == '') {
      setIsInvalidPassword(true);
    } else {
      setIsInvalidPassword(false);
    }

    if (userName == '') {
      setIsValidName(true)
    } else {
      setIsValidName(false)
    }

    if (!isChecked) {
      setIsInvaidChecked(true)
    } else {
      setIsInvaidChecked(false)
    }

    if (password != rePassword) {
      setIsConfirmPassword(true);
    } else {
      setIsConfirmPassword(false);
    }

    var validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validRegex.test(email)) {
      setIsFormatEmail(true)
    } else {
      setIsFormatEmail(false)
    }

    // if (!(isInvaildName || isEmailAlready || isInvalidEmail || isInvalidPassword || isLengtPassword || isInvaidChecked)) {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userId = user.uid

        // Send email verification
        sendEmailVerification(user)
          .then(() => {
            Alert.alert('Vui lòng xác nhận ở Email!')
          })
          .catch((error) => {
            console.log('Error sending email verification:', error);
          });
        firebaseDatabaseSet(
          firebaseDatabaseRef(firebaseDatabase, `users/${userId}`), {
          displayName: userName,
          email: user.email,
          emailVerified: user.emailVerified,
          accessToken: user.accessToken,
          provider: user.providerId,
          typeUser: 'user',
          agreeTerm: isChecked,
          createdAt: serverTimestamp()
        })

        navigation.navigate("Login")
      })
      .catch((error) => {
        console.log(`user not oke:  ${error.message} + ${error.code}`);

        //auth/email-already-in-use

        if (error.code == 'auth/email-already-in-use') {
          setIsEmailAlready(true)
        }
      })

    // }
  
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderSign title={'Sign up'} goBack={goBack} />
      </View>
      <View style={styles.contentContainer}>
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <MyInput icon={icons.userSquare} placeholder={'Name'} setState={setUserName} valueState={userName} />
          {isInvaildName && <Text style={{ textAlign: 'center', fontSize: 13, color: 'red' }}>Vui lòng nhập tên!</Text>}
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <MyInput icon={icons.mail} placeholder={'Email'} setState={setEmail} valueState={email} />
          {isInvalidEmail && <Text style={{ textAlign: 'center', fontSize: 13, color: 'red' }}>Vui lòng nhập email!</Text>}
          {isEmailAlready && <Text style={{ textAlign: 'center', fontSize: 13, color: 'red' }}>Vui lòng nhập lại email - đã tồn tại!</Text>}
          {(isFormatEmail && !isInvalidEmail)&&<Text style={{ textAlign: 'center', fontSize: 13, color: 'red' }}>Vui lòng nhập lại email - sai cú pháp!</Text>}
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <MyInput icon={icons.lock} placeholder={'Password'} setState={setPassword} valueState={password} />
          {(isLengtPassword && !isInvalidPassword) && <Text style={{ textAlign: 'center', fontSize: 13, color: 'red' }}>Vui lòng nhập password từ 6 đến 20 ký tự!</Text>}
          {isInvalidPassword && <Text style={{ textAlign: 'center', fontSize: 13, color: 'red' }}>Vui lòng nhập password!</Text>}
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <MyInput icon={icons.lock} placeholder={'Retype password'} setState={setRePassword} valueState={rePassword} />
        {isConfirmPassword&&<Text style={{ textAlign: 'center', fontSize: 13, color: 'red' }}>Mật khẩu không khớp!</Text>}
        </View>
        <View style={styles.TextContainer}>
          <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
            <Image source={isChecked ? icons.checkedCircle : icons.unCheckedCircle}
              style={{
                width: 20,
                height: 20,
                tintColor: colors.primary,
                resizeMode: 'cover'
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Montserrat',
              marginLeft: 5,
              fontSize: 13,
              lineHeight: 17,
              color: isInvaidChecked? 'red':'#000000'
            }}>
            I agree to the processing of Personal data
          </Text>
        </View>
        <MyButton title={'Create account'} handleButton={handleCreateAccount} />
        <MyNavigation
          title='Already have an acount?'
          textButton='Login'
          handleNavigator={handleNavigatorLogin} />
        <OrLine />
        <View style={styles.footerContainer}>
          <FooterSign />
        </View>
      </View>

    </ScrollView>
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
