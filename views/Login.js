
import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import HeaderSign from '../components/header/HeaderSign';
import FooterSign from '../components/footer/FooterSign';
import MyInput from '../components/misc/MyInput';
import { icons } from '../constants';
import MyButton from '../components/misc/MyButton';
import OrLine from '../components/misc/OrLine';
import MyNavigation from '../components/misc/MyNavigation';
import { auth, signInWithEmailAndPassword, firebaseDatabaseRef, get, child, firebaseDatabase } from '../firebase/connectDB';
// import { saveDataAsyncStorage } from '../untiles/AsyncStorage';
export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormatEmail, setIsFormatEmail] = useState(false)
  const [isSign, setIsSign] = useState(false)
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

    var validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validRegex.test(email)) {
      setIsFormatEmail(true)
    } else {
      setIsFormatEmail(false)
    }
    // var validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!validRegex.test(email)) {
    //   setIsFormatEmail(true)
    // } else {
    //   setIsFormatEmail(false)
    // }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          const dbRef = firebaseDatabaseRef(firebaseDatabase);

          // Lấy dữ liệu user từ firebase
          get(child(dbRef, `fomusic/users/${user.id}`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                const id = snapshot.key;
                const displayName = snapshot.val().displayName;
                const imgUrl = snapshot.val().imgUrl;
                const currUser = {
                  id: id,
                  displayName: displayName,
                  imgUrl: imgUrl ? imgUrl : null
                }

                saveDataAsyncStorage("user", currUser); ư
                navigation.navigate('App');
              }
            })
        }
      }).catch((err) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == 'auth/wrong-password' || errorCode == 'auth/user-not-found') {
          setIsSign(true)
        } else {
          setIsSign(false)
        }
        console.log(errorCode)
      })
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderSign title={'Login'} goBack={goBack} />
      </View>
      <View style={styles.contentContainer}>
        {isSign && <Text style={{ textAlign: 'center', fontSize: 13, color: 'red' }}>Tên đăng nhập hoặc mật khẩu không đúng!</Text>}
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

          <MyInput icon={icons.mail} placeholder={'Email'} setState={setEmail} valueState={email} />
          {isFormatEmail && <Text style={{ textAlign: 'center', fontSize: 13, color: 'red' }}>Vui lòng nhập lại email - sai cú pháp!</Text>}
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

      {/* <View style={styles.footerContainer}>
        <FooterSign />
      </View> */}

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

