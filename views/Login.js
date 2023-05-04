import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

import HeaderSign from '../components/header/HeaderSign';
import FooterSign from '../components/footer/FooterSign';

import IconSquare from '../assets/user-square.png';
import IconMail from '../assets/mail.png';
import IconPassword from '../assets/lock.png';
import IconCheckbox from '../assets/check-circle-2.png'

const LogInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // handle sign up logic here
  };

  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
            <HeaderSign/>
        </View>

        <View style={styles.contentContainer}>

            <View style={styles.InputTextContainer}>
                <Image source={IconMail} style={styles.Icon}></Image>
                <TextInput placeholder="Email" style={styles.InputText} />
            </View>

            <View style={styles.InputTextContainer}>
                <Image source={IconPassword} style={styles.Icon}></Image>
                <TextInput placeholder="Password" style={styles.InputText} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', padding:10 }}>
                <TouchableOpacity style={{  marginLeft: 'auto', marginRight: 'auto',backgroundColor: '#8950F8', padding: 5, borderRadius: 15, width:'50%'}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginLeft: 'auto', marginRight: 'auto', fontSize: 16, fontWeight: 'bold', color: '#fff' }}>Login</Text>
                    </View>
                 </TouchableOpacity>
            </View>

            <View style={styles.TextContainer}>
                <Text style={{width: 123, height: 16, marginLeft: 'auto', marginRight: 'auto', 
                              color: '#8950F8', fontFamily: 'Monsterat', fontWeight: 'bold', fontSize: 13, lineHeight: 16,
                              alignItems: 'center', textAlign: 'center'}}>Forgot Password</Text>
            </View>

            <View style={{flexDirection: 'row', marginTop:10}}>
              <View style={{flex:4, height: 0.5, backgroundColor: '#555454', marginTop:10, marginLeft: 20, marginRight: 10 }} />
              <Text style={{flex:1, marginLeft:"auto", marginRight:"auto", textAlign: 'center', fontWeight: 'bold', color: '#000000'}}>OR</Text>
              <View style={{flex:4, height: 0.5, backgroundColor: '#555454', marginTop:10, marginLeft: 10, marginRight: 20 }} />
            </View>
        </View>

        <View style={styles.footerContainer}>
          <FooterSign/>
        </View>

        <Text style={{ marginLeft: 'auto', marginRight: 'auto', fontSize: 13,  color:"#555454" }}>Don’t have an account?
                <Text style={{fontWeight:"bold", color:'#8950F8'}}> Register</Text>
            </Text>
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
    flex:3,
  },
  contentContainer: {
    marginTop:20,
    flex:5,
  },
  footerContainer: {
    flex:1,
  },
  InputTextContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    borderColor:"#8950F8",
    borderWidth:1,
    margin:5,
    marginLeft:15,
    marginRight:15,
    borderRadius:20
  },
  InputText:
  {
    padding:4,
    margin:0,
    color:"#555454",
    flex: 1
  },
  Icon:
  {
    marginLeft:10,
    marginTop:4,
    marginRight:8,
    marginBottom:4
  },
  TextContainer:
  {
    flexDirection: 'row',
    alignItems: 'center', 
    margin:5,
    marginLeft:15,
    marginRight:15,
  }
});

export default LogInScreen;