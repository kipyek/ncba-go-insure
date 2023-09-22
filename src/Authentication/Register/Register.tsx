import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Fragment, useState } from 'react'
import { RadioButton } from '../../Component/RadioButton';
import { useNavigation } from '@react-navigation/native';
import { Fontisto } from '@expo/vector-icons';
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';
import { api } from '../../Services';
import AuthCss from '../AuthCss';

const Register = () => {
  const navigation: any = useNavigation()
  const [selectedOption, setSelectedOption] = useState('customer');
  const [date, setDate] = useState(null);
  const [fname, setFname] = useState('');
  const [sname, setSname] = useState('');
  const [otherName, setOtherName] = useState('');
  const [id, setId] = useState('');
  const [kra, setKra] = useState('');
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [pass, setPass] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [title, setTitle] = useState('')


  const handleRadioButtonChange = (value: any) => {
    setSelectedOption(value);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirmDate = (date: any) => {
    setDate(date)
    hideDatePicker()
  }

  const handleConfirmEMail = () => {
    Alert.alert('Welcome to NCBA Go Insure',
      'Thank you for your interest in NCBA Go Insure. Please check your email for a link to activate your account.Incase you have not received the confirmation email, click "Resend" below to send a new code',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Resend', onPress: () => console.log('OK Pressed') },
      ]);
  }



  const handleRegistration = () => {
    const payload = {
      "phoneNumber": "0718477952",
      "emailAddress": "d.kipyek@gmail.com",
      "firstName": "Kip",
      "lastName": "Denis",
      "gender": "string",
      "idNumber": "36550053",
      "password": "denis23",
      "userType": 0,
      "otherNames": "Kos",
      "pin": "",
      "dateOfBirth": "2023-09-18T06:49:39.468Z"
    }

    api.post("Authentication/Register", payload)
      .then(response => {
        const data = response.data
        console.log("All of the data", data)
      }).catch(error => {
        console.log("Error in", error.response)
      })
  }

  return (
    <Fragment>
      <View className='flex-1'>
        <View className='mt-14 ml-4' style={AuthCss.card}>
          <Text className='font-["gothici-Regular"] text-[#333333]' style={{ fontSize: 20 }}>Welcome to NCBA Go Insure</Text>
          <Text className='font-["gothici-Regular"]'>Please register here</Text>
        </View>
        <View className='mt-1 ml-4 mr-4'>
          <Text className='mb-3 font-["gothici-Regular"]'>Register as</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8 }}>
            <RadioButton
              label="Customer"
              value="customer"
              selected={selectedOption === 'customer'}
              onSelect={handleRadioButtonChange}
            />
            <RadioButton
              label="Agent"
              value="agent"
              selected={selectedOption === 'agent'}
              onSelect={handleRadioButtonChange}
            />
          </View>

          <View style={{ borderColor: 'grey', borderWidth: 0.5, opacity: 0.5 }} />
        </View>

        <ScrollView>
          <View className='mt-4 ml-4 mr-4'>
            <View className='flex-row item-center gap-1'>
              <TextInput
                className='p-1 rounded-md flex-1'
                style={{ borderWidth: 1 }}
                onChangeText={text => setSname(text)}
                value={sname}
                placeholder="Enter Surname"
                keyboardType="default"
              />
              <TextInput
                className='p-1 rounded-md flex-1'
                style={{ borderWidth: 1 }}
                onChangeText={text => setFname(text)}
                value={fname}
                placeholder="Enter first name"
                keyboardType="default"
              />
            </View>

            <TextInput
              className='p-1 rounded-md mt-2'
              style={{ borderWidth: 1 }}
              onChangeText={text => setOtherName(text)}
              value={otherName}
              placeholder="Enter your other names"
              keyboardType="default"
            />
            {selectedOption === 'customer' ?
              <View className='flex-row item-center gap-1 mt-2'>
                <TextInput
                  className='p-1 rounded-md flex-1'
                  style={{ borderWidth: 1 }}
                  onChangeText={text => setId(text)}
                  value={id}
                  placeholder="Enter your national ID"
                  keyboardType="default"
                />
                <TextInput
                  className='p-1 rounded-md flex-1'
                  style={{ borderWidth: 1 }}
                  onChangeText={text => setKra(text)}
                  value={kra}
                  placeholder="Enter your KRA PIN"
                  keyboardType="default"
                />
              </View>
              :
              null
            }

            {selectedOption === 'agent' ?
              <TextInput
                className='p-1 rounded-md  mt-2'
                style={{ borderWidth: 1 }}
                onChangeText={text => setCode(text)}
                value={code}
                placeholder="Enter your DSA Code"
                keyboardType="default"
              />
              :
              null
            }

            <TextInput
              className='p-1 rounded-md mt-2'
              style={{ borderWidth: 1 }}
              onChangeText={text => setEmail(text)}
              value={email}
              placeholder="Enter your email"
              keyboardType="default"
            />
            <TextInput
              className='p-1 rounded-md mt-2'
              style={{ borderWidth: 1 }}
              onChangeText={text => setPhone(text)}
              value={phone}
              placeholder="07XXXXXXXX"
              keyboardType="default"
            />

            <View className='flex-row justify-between p-2 rounded-md mt-2' style={{ borderWidth: 1 }}>
              {date ?
                <Text>{Moment(date).format('Do MMMM, YYYY')}</Text>
                :
                <Text className='text-gray-400'>Select date of birth</Text>
              }
              <Fontisto name="date" size={20} color="black" onPress={() => setDatePickerVisibility(true)} />
            </View>


            <View className='flex-row item-center gap-1 mt-2'>
              <TextInput
                className='p-1 rounded-md flex-1'
                style={{ borderWidth: 1 }}
                onChangeText={text => setPassword(text)}
                value={password}
                placeholder="Type your password"
                keyboardType="default"
              />
              <TextInput
                className='p-1 rounded-md flex-1'
                style={{ borderWidth: 1 }}
                onChangeText={text => setPass(text)}
                value={pass}
                placeholder="Confirm password"
                keyboardType="default"
              />
            </View>

            <View className='item-center bg-[#302A29] p-4 mt-4 rounded-md '>
              <TouchableOpacity onPress={handleConfirmEMail}>
                <Text className='text-center text-white font-["gothici-Bold"]'>REGISTER</Text>
              </TouchableOpacity>
            </View>
          </View>


          <View className='ml-4 mr-4 mt-10'>
            <View className='flex-row'>
              <Text className='font-["gothici-Regular"]'>Already have an account?</Text>
              <Text className='font-["gothici-Bold"] text-[#00BFFF]' onPress={() => navigation.navigate("Login")}> Please Login</Text>
            </View>
            <Text className='mt-2 font-["gothici-Regular"] text-[#00BFFF]' onPress={() => navigation.navigate("GetQuote")}>Get Motor Quote</Text>
          </View>
        </ScrollView>

      </View >
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        display='default'
        pickerContainerStyleIOS={{ justifyContent: "center", paddingHorizontal: 150 }}
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />
    </Fragment>

  )
}

export default Register