import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Crypto from 'expo-crypto';
import uuid from 'react-native-uuid';
import DropDown from '../../Component/DropDown'
import { Alert } from 'react-native';
import HomeCss from '../HomeCss';
import { apis } from '../../Services';
import userData from '../../Component/UserData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import StepperComponet from '../../Component/StepperComponet'
import { Header } from '../../Component/Header'

const datas = [
  { label: 'First time', value: '1' },
  { label: 'Renewal', value: '2' },
];

const QuoteRequest = () => {
  const navigation: any = useNavigation()
  const [value, setValue] = useState(null);
  const [uid, setUid] = useState<any>('');
  const [vehicleCost, setVehicleCost] = useState('');
  const [windscreen, setWindScreen] = useState('');
  const [eunit, setEunit] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [capacity, setCapacity] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [coverType, setCoverType] = useState([]);
  const [vehicleUsed, setVehicleUsed] = useState([]);
  const [motorType, setMotorType] = useState([]);
  const [make, setMake] = useState([]);
  const [model, setModel] = useState([]);
  const [date, setDate] = useState('');
  const [selectedCoverType, setSelectedCoverType] = useState<any>(Object);
  const [selectedMotorType, setSelectedMotorType] = useState<any>('');
  const [selectedMake, setSelectedMake] = useState<any>('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedVehicleUsed, setSelectedVehicleUsed] = useState<any>(Object);

  const activeUser = userData();
  const dispatch = useDispatch()


  useEffect(() => {
    handleGenerateYears();
    handleCoverType();
    handleMotorType();
    handleMotorType();
    handleMake();
    setUid(uuid.v4())

  }, []);


  useEffect(() => {
    handleModel();
  }, [selectedMake, selectedMotorType]);

  useEffect(() => {
    handleVehicleUsed()
  }, [selectedMotorType, selectedCoverType]);

  const handleQuote = () => {

    navigation.navigate("QuoteList")
    //onNextStepPress();
    //handleMorethan15()
  };

  console.log(selectedMake)

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
    apis.get("Common/CoverTypes")
      .then(response => {
        const data = response.data
        setCoverType(data)
        console.log(data)
      }).catch(error => {
        console.log(error.response?.data?.message)
      })
  }


  const handleMotorType = () => {
    apis.get("Common/ProductClasses")
      .then(response => {
        const data = response.data
        setMotorType(data)
        console.log(data)
      }).catch(error => {
        console.log(error.response?.data?.message)
      })
  }

  const handleMake = () => {
    apis.get("MotorQuotes/Makes")
      .then(response => {
        const data = response.data
        setMake(data)
        console.log(data)
      }).catch(error => {
        console.log(error.response?.data?.message)
      })
  }

  const handleVehicleUsed = () => {
    apis.get(`Common/ProductGroups?productClass=${selectedMotorType}&coverType=${selectedCoverType.id}`)
      .then(response => {
        const data = response.data;
        setVehicleUsed(data)
      }).catch(error => {
        console.log(error.response?.data?.message)
      })
  }

  const handleModel = () => {
    apis.get(`MotorQuotes/Models?makeId=${selectedMake}&prodClass=${selectedMotorType}`)
      .then(response => {
        const data = response.data
        setModel(data)
        console.log(data)
      }).catch(error => {
        console.log(error.response.data.message)
      })
  }

  // const handleEncryption = async () => {
  //   const digest = await Crypto.digestStringAsync(
  //     Crypto.CryptoDigestAlgorithm.SHA256,
  //     'Digitex22'
  //   );
  //   setSe
  // }


  const handleGetQuote = () => {
    setisLoading(true)
    const payload = {
      "productClassId": 1,
      "productGroupId": selectedVehicleUsed.id,
      "coverTypeId": selectedCoverType.id,
      "vehicleValue": vehicleCost,
      "policyPeriod": 12,
      "countryCode": "254",
      "emailAddress": activeUser.userEmail,
      "phoneNumber": activeUser.userPhone,
      "sessionId": uid,
      "userID": activeUser.userId,
      "quoteType": value,
      "capacity": capacity ? capacity : 0,
      "windscreenValue": windscreen,
      "entertainmentValue": eunit,
      "productId": 0,
      "additionalBenefits": []
    }
    apis.post("MotorQuotes/GetMotorQuote", payload)
      .then(response => {
        const data = response.data
        //dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data })
        const datas = JSON.stringify(data)
        AsyncStorage.setItem('motorQuote', datas);
        handleQuote()
      }).catch(error => {
        console.log("error", error.response?.data)
      }).finally(() =>
        setisLoading(false)
      )
  }


  return (
    <View className='flex-1 bg-white'>
      <StatusBar backgroundColor='#87CEEB' />
      <Header
        label={"Get Quote"}
      />
      <StepperComponet currentPage={0} />

      <ScrollView >
        <View className=' mb-5 ml-1 mr-1'>
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
              placeholder='---Select one---'
            />

            <Text className='mb-1 mt-3 font-[gothici-Regular]'>What type of cover would you like?*</Text>
            <DropDown
              label={"description"}
              value={"id"}
              onchange={(item: any) => setSelectedCoverType(item)}
              datas={coverType}
              placeholder=''
            />

            <Text className='mb-1 mt-3 font-[gothici-Regular]'>Select type of motor*</Text>
            <DropDown
              label={"description"}
              value={"id"}
              onchange={(item: any) => setSelectedMotorType(item?.id)}
              datas={motorType}
              placeholder='---Select motor type---'
            />

            <Text className='mb-1 mt-3 font-[gothici-Regular]'>Please select the make*</Text>
            <DropDown
              label={"description"}
              value={"id"}
              onchange={(item: any) => setSelectedMake(item?.id)}
              datas={make}
              placeholder='---Select vehicle make---'
            />

            <Text className='mb-1 mt-3 font-[gothici-Regular]'>What is the model of your car*</Text>
            <DropDown
              label={"description"}
              value={"id"}
              onchange={(item: any) => setSelectedModel(item?.id)}
              datas={model}
              placeholder='---Select vehicle model---'
            />

            <Text className='mb-1 mt-3 font-[gothici-Regular]'>How do you use your vehicle?*</Text>
            <DropDown
              label={"description"}
              value={"id"}
              onchange={(item: any) => setSelectedVehicleUsed(item)}
              datas={vehicleUsed}
              placeholder=''
            />


            <Text className='mb-1 mt-3 font-[gothici-Regular]'>What is the year of manufacture?*</Text>
            <DropDown
              label={"year"}
              value={"year"}
              onchange={(item: any) => setDate(item?.year)}
              datas={dateRange}
              placeholder='---Select year of manufacture---'
            />

            <Text className='mb-1 mt-3 font-[gothici-Regular]'>Estimated value of your vehicle(KES)</Text>
            <TextInput
              className='p-1 rounded-md flex-1'
              style={{ borderWidth: 1 }}
              onChangeText={text => setVehicleCost(text)}
              value={vehicleCost}
              placeholder="1,500,000"
              keyboardType="default"
            />

            {/** Start Logic need to change after adding apis */}
            {selectedMotorType === 1 && selectedCoverType.id === 1 &&
              <View>
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
              </View>
            }
            {selectedVehicleUsed.hasCapacity === true &&
              <View>
                <Text className='mb-1 mt-3 font-[gothici-Regular]'>Key in seating capacity of your vehicle</Text>

                <TextInput
                  className='p-1 rounded-md flex-1'
                  style={{ borderWidth: 1 }}
                  onChangeText={text => setCapacity(text)}
                  value={capacity}
                  placeholder="2"
                  keyboardType="default"
                />
              </View>
            }
            {/** End of Logic need to change after adding apis */}

            <View className='item-center bg-primary p-4 mt-4 rounded-md '>
              {!isLoading ?
                <TouchableOpacity onPress={() => handleGetQuote()}>
                  <Text className='text-center text-white font-["gothici-Bold"]'>GET QUOTE</Text>
                </TouchableOpacity>
                :
                <Text className='text-center text-white font-["gothici-Bold"]'>Processing...</Text>
              }
            </View>

          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default QuoteRequest

const styles = StyleSheet.create({})