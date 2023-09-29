import { TextInput, View } from 'react-native'
import React from 'react'
import CQuote from '../../Component/CQuote'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'

const ConfirmedQuote = () => {
    const navigation: any = useNavigation();
    return (
        <View className='flex-1'>
            <StatusBar backgroundColor='#87CEEB' />
            <View className='mr-4 ml-4 mt-2'>
                <TextInput
                    style={{
                        height: 40,
                        borderRadius: 10,
                        paddingLeft: 20,
                        marginBottom: 10,
                        backgroundColor: 'grey',
                    }}
                    //   onChangeText={(text) => {
                    //     searchFilterFunction(text)
                    //     UpdateSearch(text)
                    //   }}
                    //value={search}
                    underlineColorAndroid="transparent"
                    placeholder="Search by Quote No"
                />
            </View>

            <CQuote
                Quote={"Q01718"}
                Product={"Motor Commercial Own Goods (Third party only)"}
                Insurer={"GA Insurance Company LTD"}
                Reg={"KVV 123H"}
                Gross={"Kes 20,090.00"}
                Amount={"Kes 0.00"}
                Oustanding={"Kes 20,090.00"}
                onPress={() => navigation.navigate("QuoteDetails")} //It should have id of particular details
            />
        </View>
    )
}

export default ConfirmedQuote;