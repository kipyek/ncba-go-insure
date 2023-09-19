import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, } from 'react-native';
import React, { Fragment, useState } from 'react';
import Moment from 'moment';
import { Fontisto, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import DropDown from '../../Component/DropDown';
import DateTimePicker from 'react-native-modal-datetime-picker';

const data = [
  { label: 'Health', value: '1' },
  { label: 'Life', value: '2' },
  { label: 'Homeowner', value: '3' },
  { label: 'Car Insurance', value: '4' },
];

const QuoteConfirm = ({ onNextStepPressConfirm }: any) => {
  const [number, setNumber] = useState("");
  const [value, setValue] = useState('')
  const [date, setDate] = useState(null);
  const [policyDate, setPolicyDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisibles, setDatePickerVisibilitys] = useState(false);
  const [finance, setFinance] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const handlefinance = () => {
    setFinance(!finance)
  }

  const handleConfirm = () => {
    setConfirmed(!confirmed)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirmDate = (date: any) => {
    setDate(date)
    hideDatePicker()
  }

  const hideDatePickerPolicy = () => {
    setDatePickerVisibilitys(false)
  }

  const handleConfirmPolicy = (date: any) => {
    setPolicyDate(date)
    hideDatePicker()
  }

  const handleNext = () => {
    onNextStepPressConfirm()
  }



  return (
    <Fragment>
      <ScrollView >
        <View className='ml-4 mr-4 mb-52'>
          <View className=''>
            <Text className='mb-1 mt-3 font-[gothici-Regular]'>Please provide the vehicle registration number.</Text>
            <TextInput
              className='p-1 rounded-md flex-1'
              style={{ borderWidth: 1 }}
              onChangeText={text => setNumber(text)}
              value={number}
              placeholder="e.g KAA 123A"
              keyboardType="default"
            />
          </View>

          <View className='mt-2 mb-2'>
            <Text className='mb-1 mt-3 font-[gothici-Regular]'>Select policy start date</Text>
            <View className='flex-row justify-between p-2 rounded-md' style={{ borderWidth: 1 }}>
              {policyDate ?
                <Text>{Moment(policyDate).format('Do MMMM, YYYY')}</Text>
                :
                <Text className='text-gray-400'>Select policy start date</Text>
              }
              <Fontisto name="date" size={20} color="black" onPress={() => setDatePickerVisibilitys(true)} />
            </View>
          </View>


          <View className='mt-2 '>
            <Text className=' font-[gothici-Regular]'>Please tell us more about yourself.</Text>
            <Text className=' font-[gothici-Regular]'>If you already have an account, please click </Text>
            <Text className=' font-[gothici-Regular]'>here to login</Text>
          </View>

          {/**Start of Condition for financing */}
          <View className='mt-4 mb-2'>
            <View className='flex-row items-center mb-2'>
              <TouchableOpacity onPress={handlefinance}>
                {finance ?
                  <FontAwesome name="check-square-o" size={24} color="black" />
                  :
                  <MaterialIcons name="check-box-outline-blank" size={24} color="black" />
                }

              </TouchableOpacity>
              <Text className='font-[gothici-Regular] ml-2 mr-4'>Select the box if the vehicle is financed by a financial institution or used as security for a loan.</Text>
            </View>

            {finance ?
              <View>
                <Text className=' mt-1 font-[gothici-Regular]'>Select the financial institution here</Text>
                <DropDown
                  label={"label"}
                  value={"value"}
                  onchange={(item: any) => setValue(item?.value)}
                  datas={data}
                  placeholder=''
                />
              </View>
              : null
            }
          </View>
          {/**End of Condition for financing */}

          <View className='mb-2'>
            <Text className=' mb-1 mt-3 font-[gothici-Regular]'>How did you hear about us?</Text>
            <DropDown
              label={"label"}
              value={"value"}
              onchange={(item: any) => setValue(item?.value)}
              datas={data}
              placeholder=''
            />
          </View>

          {/**Confirmation of information */}
          <View className='flex-row mb-2'>
            <TouchableOpacity onPress={handleConfirm}>
              {confirmed ?
                <FontAwesome name="check-square-o" size={24} color="black" />
                :
                <MaterialIcons name="check-box-outline-blank" size={24} color="black" />
              }
            </TouchableOpacity>
            <Text className='font-[gothici-Regular] ml-2 mr-4'>I confirm that the information provided here is accurate</Text>
          </View>


          {/**Buttons */}
          <View className='flex-row justify-between'>
            <View className='item-center bg-[#302A29] p-2 mt-3 rounded-md w-32'>
              <TouchableOpacity>
                <Text className='text-center text-white font-["gothici-Bold"]'>BACK</Text>
              </TouchableOpacity>
            </View>
            {confirmed ?
              <View className='item-center bg-[#302A29] p-3 mt-2 rounded-md w-32'>
                <TouchableOpacity onPress={handleNext}>
                  <Text className='text-center text-white font-["gothici-Bold"]'>GO FOR IT</Text>
                </TouchableOpacity>
              </View>
              :
              null}
          </View>
        </View>
      </ScrollView>

      <DateTimePicker
        isVisible={isDatePickerVisibles}
        mode="date"
        display='default'
        pickerContainerStyleIOS={{ justifyContent: "center", paddingHorizontal: 150 }}
        onConfirm={handleConfirmPolicy}
        onCancel={hideDatePickerPolicy}
      />

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

export default QuoteConfirm

const styles = StyleSheet.create({})