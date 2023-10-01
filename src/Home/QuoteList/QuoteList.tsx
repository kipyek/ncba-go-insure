import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import StepperComponet from '../../Component/StepperComponet'
import { Header } from '../../Component/Header'
import { Cover } from '../../../DummyData/Data';
import { BottomModal, ModalContent } from 'react-native-modals';
import HomeCss from '../HomeCss';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuoteList = () => {

  const [modalVisibles, setModalVisibles] = useState(false);
  const [listData, setListData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('motorQuote');
        if (storedData !== null) {
          const parsedData = JSON.parse(storedData);
          setListData(parsedData)
          console.log("incoming data", parsedData)
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    }
    fetchData()
  }, [])


  const Item = ({ item }: any) => (
    <View style={HomeCss.card}>
      <View className='flex-row items-center'>
        <Image source={{ uri: item.insurerLogo }} className='w-28 h-28' resizeMode='contain' />
        <View className='w-48 ml-4'>
          <Text>Insurance company:</Text>
          <Text className='font-[gothici-Bold]'>{item.insurerName} </Text>
          <View className='flex-row mt-2'>
            <Text>Premium: </Text>
            <Text className='font-[gothici-Bold]'> {item.grossPremium}</Text>
          </View>
        </View>
      </View>

      <View className='item-center bg-primary p-3 mt-4 rounded-md '>
        <TouchableOpacity onPress={() => { }}>
          <Text className='text-center text-white font-["gothici-Bold"]'>BUY</Text>
        </TouchableOpacity>
      </View>

    </View>
  );

  return (
    <Fragment>
      <View>
        <Header
          label={"Get Quote"}
        />
        <StepperComponet currentPage={1} />

        <View style={HomeCss.introCard}>
          <Text className='font-[gothici-Regular]'>Please review the quotes below from different insurers. Click "BUY" against your preferred insurer to add optional benefits.</Text>
        </View>

        <View className='item-center bg-primary p-1 mt-4 w-32 ml-4 justify-end rounded-md '>
          <TouchableOpacity onPress={() => setModalVisibles(true)}>
            <Text className='text-center text-white font-["gothici-Bold"]'>Cover Summary</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={listData}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item: any) => item.productId}
          ListFooterComponent={<View style={{ height: 300 }}></View>}
        />

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
          <View>
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

export default QuoteList

const styles = StyleSheet.create({})