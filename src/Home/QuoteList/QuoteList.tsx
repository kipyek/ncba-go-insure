import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import StepperComponet from '../../Component/StepperComponet'
import { Header } from '../../Component/Header'
import { Cover } from '../../../DummyData/Data';
import { BottomModal, ModalContent } from 'react-native-modals';
import Humanize from 'humanize-plus';
import HomeCss from '../HomeCss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { apis } from '../../Services';
import { useDispatch, useSelector } from 'react-redux';
import { selectCapacity, selectFirstTime } from '../../../Slices/QuoteSlice';
import { Ionicons } from "@expo/vector-icons"

const QuoteList = () => {
  const navigation: any = useNavigation()
  const [modalVisibles, setModalVisibles] = useState(false);
  const [listData, setListData] = useState([])

  const origin = useSelector(selectFirstTime)
  const destination = useSelector(selectCapacity)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('motorQuote');
        if (storedData !== null) {
          const parsedData = JSON.parse(storedData);
          setListData(parsedData)

        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    }
    fetchData()
  }, [])



  const handleApplicableBenefits = (item: any) => {
    apis.get(`Common/GetApplicableBenefits?productId=${item.productId}`)
      .then(response => {
        let data = response.data
        data.forEach((element: any) => {
          element.checked = false
        });
        console.log(data)
        navigation.navigate("QuoteBenefit", { item: item, benefits: data })
      }).catch(error => {
        console.log(error.response?.data?.message)
      })
  }

  const Item = ({ item }: any) => (
    <View style={HomeCss.listCard} className='ml-3 mr-3 mb-1'>
      <TouchableOpacity onPress={() => handleApplicableBenefits(item)}>
        <View className='flex-row items-center'>
          <Text>{origin}{destination}</Text>
          <Image source={{ uri: item.insurerLogo }} className='w-28 h-28' resizeMode='contain' />
          <View className='w-48 ml-4'>
            <Text>Insurance company:</Text>
            <Text className='font-[gothici-Bold]'>{item.insurerName} </Text>
            <View className='flex-row mt-2'>
              <Text>Premium: </Text>
              <Text className='font-[gothici-Bold]'> {Humanize.formatNumber(item.grossPremium, 2)}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {/* <View className='item-center bg-primary p-3 mt-4 rounded-md '>
       
          <Text className='text-center text-white font-["gothici-Bold"]'>BUY</Text>
>
      </View> */}

    </View>
  );

  return (
    <Fragment>
      <View>
        <Header
          label={"Get Quote"}
          leftButton={{
            child: <Ionicons name="arrow-back" size={24} color="black" />,
            onPress: () => { navigation.goBack() }
          }}
        />
        <StepperComponet currentPage={1} />

        <View style={HomeCss.introCard}>
          <Text className='font-[gothici-Regular]'>Please review the quotes below from different insurers. Click "BUY" against your preferred insurer to add optional benefits.</Text>
        </View>

        {/* <View className='item-center bg-primary p-1 mt-4 w-32 ml-4 justify-end rounded-md '>
          <TouchableOpacity onPress={() => setModalVisibles(true)}>
            <Text className='text-center text-white font-["gothici-Bold"]'>Cover Summary</Text>
          </TouchableOpacity>
        </View> */}
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