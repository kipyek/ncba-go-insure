import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import DropDown from '../../Component/DropDown'
import { Alert } from 'react-native';
import HomeCss from '../HomeCss';
import { api } from '../../Services';
const datas = [
  { label: 'First time', value: '1' },
  { label: 'Renewal', value: '2' },
];

const data = [
  { label: 'Health', value: '1' },
  { label: 'Life', value: '2' },
  { label: 'Homeowner', value: '3' },
  { label: 'Car Insurance', value: '4' },
];

const QuoteRequest = ({ onNextStepPress }: any) => {
  const [value, setValue] = useState(null);
  const [windscreen, setWindScreen] = useState('');
  const [eunit, setEunit] = useState('');
  const [capacity, setCapacity] = useState('');
  const [dateRange, setDateRange] = useState([])

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

  const handleGenerateYears = () => {
    const currentYear = new Date().getFullYear();
    const years40YearsAgo: any = [];

    for (let year = currentYear - 34; year < currentYear; year++) {
      years40YearsAgo.push({ year: (year + 1).toString(), value: years40YearsAgo.length + 1 });
    }
    const reverse = years40YearsAgo.reverse()
    setDateRange(reverse)

  }

  const handleCoverType = () => {
    api.get("https://ncbadigitalapi.pensoft.co.ke/api/Common/CoverTypes")
      .then(response => {
        const data = response.data
        console.log(data)
      }).catch(error => {
        console.log(error.response?.data?.message)
      })
  }


  const handleMotorType = () => {
    api.get("https://ncbadigitalapi.pensoft.co.ke/api/Common/ProductClasses")
      .then(response => {
        const data = response.data
        console.log(data)
      }).catch(error => {
        console.log(error.response?.data?.message)
      })
  }

  const handleMake = () => {
    api.get("https://ncbadigitalapi.pensoft.co.ke/api/MotorQuotes/Makes")
      .then(response => {
        const data = response.data
        console.log(data)
      }).catch(error => {
        console.log(error.response?.data?.message)
      })
  }


  return (
    <View className=''>
      <ScrollView >
        <View className=' mb-52'>
          <View style={HomeCss.introCard}>
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
              label={"year"}
              value={"year"}
              onchange={(item: any) => setValue(item?.year)}
              datas={dateRange}
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

            <View className='item-center bg-primary p-4 mt-4 rounded-md '>
              <TouchableOpacity onPress={() => handleMake()}>
                <Text className='text-center text-white font-["gothici-Bold"]'>GET QUOTE</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ScrollView>

    </View>
  )
}

export default QuoteRequest;