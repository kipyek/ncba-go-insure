import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Help = () => {
  return (
    <View className='flex-1 bg-white'>
      <Image source={require("../../../assets/images/ncba.png")} style={styles.image} />
      <View style={styles.card}>
        <Text className='mt-2 font-[gothici-Regular]'>Mara Rd. Upper-hill </Text>
        <Text className='mt-2 font-[gothici-Regular]'>P.O Box 44599-00100, Nairobi Kenya </Text>
        <Text className='mt-2 font-[gothici-Regular]'>Customer Contact Centre </Text>
        <Text className='mt-2 font-[gothici-Regular]'>Tel:+254 20 2884444 </Text>
        <Text className='mt-2 font-[gothici-Regular]'>Whatsapp +254 717 804 444</Text>
        <Text className='mt-2 font-[gothici-Regular]'>Toll Free Number: 0800 720 444</Text>
        <Text className='mt-2 font-[gothici-Regular]'>Mobile: +254 711 056444/+254 732 156444</Text>
        <Text className='mt-2 font-[gothici-Regular]'>Whistleblow Line (Toll Free): 0800722626</Text>
        <Text className='mt-2 font-[gothici-Regular]'>Toll Free Fax: 00800007788</Text>
      </View>

    </View>
  )
}

export default Help

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: '15%',
    marginTop: 40,
    backgroundColor: 'grey',

  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  }
})