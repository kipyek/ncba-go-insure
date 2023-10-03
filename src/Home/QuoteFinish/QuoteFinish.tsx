import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import HomeCss from '../HomeCss';
import StepperComponet from '../../Component/StepperComponet';
import { Header } from '../../Component/Header';
import { Ionicons } from "@expo/vector-icons"

const QuoteFinish = ({ onNewQuote }: any) => {
    const navigation: any = useNavigation();

    const handleOnClick = () => {
        navigation.navigate("Quote")
    }

    return (
        <View>
            <Header
                label={"Get Quote"}
                leftButton={{
                    child: <Ionicons name="arrow-back" size={24} color="black" />,
                    onPress: () => { navigation.goBack() }
                }}
            />
            <StepperComponet currentPage={4} />
            <View style={HomeCss.introCard}>
                <Text className='font-[gothici-Regular]'>Your quotation number is <Text className='font-bold font-[gothici-Regular]'>Q01721</Text> and total payable is <Text className='font-bold font-[gothici-Regular]'>Kes 184,868.00.</Text></Text>
                <Text className='font-[gothici-Regular]'>Please click on  <Text className='font-bold font-[gothici-Regular]'>"GO FOR IT"</Text> to proceed to buy the cover. If you wish to quote for another vehicle, please click on <Text className='font-bold font-[gothici-Regular]'>"QUOTE FOR ANOTHER VEHICLE"</Text></Text>

                <View className='flex-row justify-between'>
                    <View className='item-center bg-[#EEE017] p-1 mt-4 rounded-md w-32'>
                        <TouchableOpacity onPress={() => navigation.navigate("QuoteDetails")}>
                            <Text className='text-center font-["gothici-Bold"]'>GO FOR IT</Text>
                        </TouchableOpacity>
                    </View>
                    <View className='item-center bg-primary p-1 mt-4 rounded-md w-32'>
                        <TouchableOpacity onPress={handleOnClick}>
                            <Text className='text-center text-white font-["gothici-Bold"]'>NEW QUOTE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default QuoteFinish;