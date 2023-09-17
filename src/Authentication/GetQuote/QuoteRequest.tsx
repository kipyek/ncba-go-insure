import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import DropDown from '../../Component/DropDown'
const datas = [
  { label: 'First time', value: '1' },
  { label: 'Renewing', value: '2' },
];

const data = [
  { label: 'Health', value: '1' },
  { label: 'Life', value: '2' },
  { label: 'Homeowner', value: '3' },
  { label: 'Car Insurance', value: '4' },
];

const QuoteRequest = ({ onNextStepPress }: any) => {
  const [value, setValue] = useState('');
  const [values, setValues] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('')

  const handleQuote = () => {
    onNextStepPress()
  }
  return (
    <View>
      <ScrollView>
        <View className='mb-40 ml-2 mr-2'>
          <Text className='mb-2 font-[gothici-Regular]'>Insuring for first time or renewing your cover?*</Text>
          <DropDown
            label={"label"}
            value={"value"}
            onchange={(item: any) => setValue(item?.value)}
            datas={datas}
            placeholder='First time'
          />

          <Text className='mb-1 mt-3 font-[gothici-Regular]'>What type of cover would you like?*</Text>
          <DropDown
            label={"label"}
            value={"value"}
            onchange={(item: any) => setValue(item?.value)}
            datas={data}
            placeholder=''
          />

          <Text className='mb-1 mt-3 font-[gothici-Regular]'>Select type of motor*</Text>
          <DropDown
            label={"label"}
            value={"value"}
            onchange={(item: any) => setValue(item?.value)}
            datas={data}
            placeholder='---Select motor type'
          />

          <Text className='mb-1 mt-3 font-[gothici-Regular]'>How do you use your vehicle?*</Text>
          <DropDown
            label={"label"}
            value={"value"}
            onchange={(item: any) => setValue(item?.value)}
            datas={data}
            placeholder=''
          />

          <Text className='mb-1 mt-3 font-[gothici-Regular]'>Please select the make*</Text>
          <DropDown
            label={"label"}
            value={"value"}
            onchange={(item: any) => setValue(item?.value)}
            datas={data}
            placeholder='---Select vehicle make---'
          />

          <Text className='mb-1 mt-3 font-[gothici-Regular]'>What is the model of your car*</Text>
          <DropDown
            label={"label"}
            value={"value"}
            onchange={(item: any) => setValue(item?.value)}
            datas={data}
            placeholder='---Select vehicle model---'
          />

          <Text className='mb-1 mt-3 font-[gothici-Regular]'>What is the year of manufacture?*</Text>
          <DropDown
            label={"label"}
            value={"value"}
            onchange={(item: any) => setValue(item?.value)}
            datas={data}
            placeholder='---Select year of manufacture---'
          />

          <Text className='mb-1 mt-3 font-[gothici-Regular]'>Estimated value of your vehicle(KES)</Text>
          <DropDown
            label={"label"}
            value={"value"}
            onchange={(item: any) => setValue(item?.value)}
            datas={data}
            placeholder=''
          />

          <Text className='mb-1 mt-3 font-[gothici-Regular]'>Enter your email address*</Text>
          <TextInput
            className='p-1 rounded-md flex-1'
            style={{ borderWidth: 1 }}
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder="Enter your email"
            keyboardType="default"
          />

          <Text className='mb-1 mt-3 font-[gothici-Regular]'>Enter your phone number*</Text>
          <TextInput
            className='p-1 rounded-md flex-1'
            style={{ borderWidth: 1 }}
            onChangeText={text => setPhone(text)}
            value={phone}
            placeholder="Enter your phoneNumber"
            keyboardType="default"
          />

          <View className='item-center bg-[#302A29] p-4 mt-4 rounded-md '>
            <TouchableOpacity onPress={() => handleQuote()}>
              <Text className='text-center text-white font-["gothici-Bold"]'>GET QUOTE</Text>
            </TouchableOpacity>
          </View>




        </View>
      </ScrollView>

    </View>
  )
}

export default QuoteRequest

const styles = StyleSheet.create({})