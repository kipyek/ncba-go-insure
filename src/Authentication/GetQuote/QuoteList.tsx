import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Fragment, useState } from 'react';
import { Cover } from '../../../DummyData/Data';
import { BottomModal, ModalContent } from 'react-native-modals';
import AuthCss from '../AuthCss';

const QuoteList = ({ onNextStepPressList }: any) => {
  const [modalVisibles, setModalVisibles] = useState(false);
  console.log(Cover)

  const handleQuoteList = () => {
    onNextStepPressList()
  }
  return (
    <Fragment>
      <View>
        <View style={AuthCss.introCard}>
          <Text className='font-[gothici-Regular]'>Please review the quotes below from different insurers. Click "BUY" against your preferred insurer to add optional benefits.</Text>
        </View>

        <View className='item-center bg-primary p-1 mt-4 w-32 ml-4 justify-end rounded-md '>
          <TouchableOpacity onPress={() => setModalVisibles(true)}>
            <Text className='text-center text-white font-["gothici-Bold"]'>Cover Summary</Text>
          </TouchableOpacity>
        </View>

        <View style={AuthCss.card}>
          <View className='flex-row items-center'>
            <Image source={require("../../../assets/images/uap.jpg")} className='w-32 h-32' />
            <View className='w-48'>
              <Text>Insurance company:</Text>
              <Text >UAP Insurance Company Ltd </Text>
              <View className='flex-row mt-2'>
                <Text>Premium: </Text>
                <Text>184,828</Text>

              </View>


            </View>
          </View>


          <View className='item-center bg-primary p-3 mt-4 rounded-md '>
            <TouchableOpacity onPress={handleQuoteList}>
              <Text className='text-center text-white font-["gothici-Bold"]'>BUY</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
      {/**Cover Summary */}
      <BottomModal
        visible={modalVisibles}
        onTouchOutside={() => setModalVisibles(false)}
        onHardwareBackPress={() => true}
        onSwipeOut={() => setModalVisibles(false)}
      >
        <ModalContent>
          <View style={{ borderWidth: 1, width: 50, alignSelf: 'center', marginBottom: 12, borderColor: 'gray' }} />
          <View >
            {Cover.map(i =>
              <View key={i.title}>
                <Text className='text-center mt-1 mb-1 font-[gothici-Bold]'>{i.title}</Text>
                <Text>{i.body}</Text>
              </View>
            )}
          </View>
        </ModalContent>
      </BottomModal>
    </Fragment>

  )
}

export default QuoteList;