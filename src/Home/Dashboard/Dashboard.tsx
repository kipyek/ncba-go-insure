import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect } from 'react';
import Toast from 'react-native-root-toast'
import { Header } from '../../Component/Header';
import { Feather } from '@expo/vector-icons';
import HomeCss from '../HomeCss';
import { StatusBar } from 'expo-status-bar';
import CryptoJS from 'crypto-js';
import uuid from 'react-native-uuid';
import userData from '../../Component/UserData';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const Base64 = {
  btoa: (input: string = '') => {
    let str = input;
    let output = '';

    for (let block = 0, charCode, i = 0, map = chars;
      str.charAt(i | 0) || (map = '=', i % 1);
      output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

      charCode = str.charCodeAt(i += 3 / 4);

      if (charCode > 0xFF) {
        throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      }

      block = block << 8 | charCode;
    }

    return output;
  },
};
const Dashboard = () => {
  const activeUser = userData();
  const handleToastTest = () => {
    Toast.show("You have successfully created account", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      backgroundColor: 'green',
      shadow: false,
      animation: true,
      hideOnPress: true,
      delay: 0,
    })
  }

  useEffect(() => {
    sendTest()
  }, [])


  function sendTest() {
    let data = activeUser.userId
    let userId = "12345678";
    let uid: any = uuid.v4();
    let base64 = Base64.btoa(uid);
    let userKey = base64 + 'Digitek22';

    let SecurityToken = encrypt(userId, userKey);
    console.log("Security2", data)
    console.log(userId)
    let UserSessionId = base64;
    console.log("UserSessionId2", UserSessionId)
  }


  function encrypt(plainText: any, key: any) {
    key = CryptoJS.enc.Utf8.parse(key);
    key = CryptoJS.MD5(key)
    key.words.push(key.words[0], key.words[1]);
    var options = {
      mode: CryptoJS.mode.ECB
    };

    let textWordArray = CryptoJS.enc.Utf8.parse(plainText);
    let encrypted = CryptoJS.TripleDES.encrypt(textWordArray, key, options);
    let base64String = encrypted.toString();
    return base64String;
  }



  return (
    <SafeAreaView className='flex-1 '>
      <StatusBar backgroundColor='#87CEEB' />
      <Header
        label="Dashboard"
      />
      <Image source={require("../../../assets/images/background.png")} style={HomeCss.homeImage} />

    </SafeAreaView>
  )
}

export default Dashboard;