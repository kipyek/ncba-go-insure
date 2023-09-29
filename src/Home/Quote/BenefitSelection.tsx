import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import HomeCss from '../HomeCss';

const Additionals = [
  {
    name: "Capsicum",
    price: 1.2
  },
  {
    name: "Paneer",
    price: 2.0
  },
  {
    name: "Red Paprika",
    price: 2.5
  },
]

const BenefitSelection = ({ onNextStepPressSelection, handleBackStep }: any) => {
  const [total, setTotal] = useState(0);
  const [checkedState, setCheckedState] = useState(
    new Array(Additionals.length).fill(false)
  );
  const handleNext = () => {
    onNextStepPressSelection()
  };

  const handleBack = () => {
    handleBackStep()
  }

  const handleOptional = (position: any) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + Additionals[index].price;
        }
        return sum;
      },
      0
    );

    setTotal(totalPrice);
  };

  return (
    <View>
      <ScrollView>
        <View className='mb-52'>
          <View style={HomeCss.introCard}>
            <Text className='font-[gothici-Regular]'>Please review the details of your quote including the scope of the cover under Cover Summary. To buy the cover, click "NEXT"</Text>
          </View>

          <View style={HomeCss.card}>
            <View className='flex-row items-center'>
              <Image source={require("../../../assets/images/uap.jpg")} className='w-32 h-32' />
              <View className='w-48'>
                <Text>UAP Insurance Company Ltd</Text>
                <Text >MOTOR PSV - SELF DRIVE COMPREHENSIVE</Text>
                <View className='item-center bg-primary p-2 mt-4 rounded-md '>
                  <TouchableOpacity>
                    <Text className='text-center text-white font-["gothici-Bold"]'>SEND TO MY EMAIL</Text>
                  </TouchableOpacity>
                </View>

              </View>

            </View>

            <View style={{ borderWidth: 0.6, opacity: 0.5, borderColor: 'grey' }} />
            {/**Start of Additional selections */}
            <View>
              {/* {Additionals.map(({ name, price }, index) => {
        <View>
          <Text>{name}{price}</Text>
        </View>
      })} */}
            </View>
            {/**End of Additional selections */}
            {/**Pricing */}
            <View>
              <View className='flex-row mt-4 justify-between bg-gray-200'>
                <Text>Basic premium:</Text>
                <Text className='font-bold ml-2'>Kes 130,000</Text>
              </View>

              <View className='flex-row mt-2 justify-between bg-gray-200'>
                <Text>Windscreen:</Text>
                <Text className='font-bold ml-2'>Kes 130,000</Text>
              </View>
              <View className='flex-row mt-2 justify-between bg-gray-200'>
                <Text>Entertainment unit:</Text>
                <Text className='font-bold ml-2'>Kes 0</Text>
              </View>
              <View className='flex-row mt-2 justify-between bg-gray-200'>
                <Text>Extensions:</Text>
                <Text className='font-bold ml-14'>Kes 130,000</Text>
              </View>
              <View className='flex-row mt-2 justify-between bg-gray-200'>
                <Text>Total premium:</Text>
                <Text className='font-bold ml-2'>Kes 130,000</Text>
              </View>
              <View className='flex-row mt-2 justify-between bg-gray-200'>
                <Text>Levies:</Text>
                <Text className='font-bold ml-16'>Kes 130,000</Text>
              </View>
              <View className='flex-row mt-2 justify-between bg-gray-200'>
                <Text className='font-bold '>Gross premium:</Text>
                <Text className='font-bold ml-2'>Kes 130,000</Text>
              </View>

              <View className='flex-row justify-between mt-10'>
                <View className='item-center bg-primary p-2 mt-4 rounded-md w-36'>
                  <TouchableOpacity onPress={handleBack}>
                    <Text className='text-center text-white font-["gothici-Bold"]'>BACK</Text>
                  </TouchableOpacity>
                </View>
                <View className='item-center bg-primary p-2 mt-4 rounded-md w-36'>
                  <TouchableOpacity onPress={() => handleNext()} >
                    <Text className='text-center text-white font-["gothici-Bold"]'>NEXT</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </View>
        </View>
      </ScrollView>

    </View>

  )
}

export default BenefitSelection;