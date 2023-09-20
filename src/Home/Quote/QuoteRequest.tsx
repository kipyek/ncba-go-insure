import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import DropDown from '../../Component/DropDown'
import { Alert } from 'react-native';
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
  const [windscreen, setWindScreen] = useState('')
  const [eunit, setEunit] = useState('')
  const [capacity, setCapacity] = useState('')

  const handleQuote = () => {
    onNextStepPress();
    handleMorethan15()
  };

  const handleMorethan15 = () => {
    Alert.alert('Warning!!',
      'We note that your vehicle is over 15 years old from the date of manufacture. Kindly note that Comprehensive covers are mostly issued for vehicles below 15 years of age unless the insurance is being renewed at the same insurer. To purchase comprehensive cover, please select your current insurer from the list on the next page, otherwise your cover may be downgraded to a third party cover.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Send to my email', onPress: () => console.log('OK Pressed') },
      ]);
  }
  return (
    <View className=''>
      <ScrollView >
        <View className=' mb-52'>
          <View style={styles.introCard}>
            <Text className='font-[gothici-Regular]'>Please fill in the details below to generate a quotation</Text>
          </View>

          <View className='ml-2 mr-2'>
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

            {/** Start Logic need to change after adding apis */}
            <Text className='mb-1 mt-3 font-[gothici-Regular]'>What is the value of windscreen?*</Text>
            <TextInput
              className='p-1 rounded-md flex-1'
              style={{ borderWidth: 1 }}
              onChangeText={text => setWindScreen(text)}
              value={windscreen}
              placeholder="50,000"
              keyboardType="default"
            />


            <Text className='mb-1 mt-3 font-[gothici-Regular]'>What is the value of the entertainment unit?*</Text>

            <TextInput
              className='p-1 rounded-md flex-1'
              style={{ borderWidth: 1 }}
              onChangeText={text => setEunit(text)}
              value={eunit}
              placeholder="30,000"
              keyboardType="default"
            />

            <Text className='mb-1 mt-3 font-[gothici-Regular]'>Key in seating capacity of your vehicle</Text>

            <TextInput
              className='p-1 rounded-md flex-1'
              style={{ borderWidth: 1 }}
              onChangeText={text => setCapacity(text)}
              value={capacity}
              placeholder="2"
              keyboardType="default"
            />
            {/** End of Logic need to change after adding apis */}

            <View className='item-center bg-[#302A29] p-4 mt-4 rounded-md '>
              <TouchableOpacity onPress={() => handleQuote()}>
                <Text className='text-center text-white font-["gothici-Bold"]'>GET QUOTE</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ScrollView>

    </View>
  )
}

export default QuoteRequest

const styles = StyleSheet.create({
  introCard: {
    backgroundColor: '#87CEEB',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  }
})