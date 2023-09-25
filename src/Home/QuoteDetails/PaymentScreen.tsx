import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomTabs from '../../Component/CustomTabs'
import { Ipf, Mpesa, Ncba } from '../Payments';
import HomeCss from '../HomeCss';

const PaymentScreen = () => {
    const [tabSelected, setTabSelected] = useState(1);
    const onTabSelected = (value: React.SetStateAction<number>) => {
        setTabSelected(value)
    }

    const api = "Q01721";
    const apiStatus = "NOT PAID";
    const apiAmount = "184,828.00"
    return (
        <View>
            {/**Amount */}
            <View style={HomeCss.introCard} className='mt-1 mb-0'>
                <Text className='font-[gothici-Regular]' style={{ fontSize: 18 }}>Total premium: Kes {apiAmount}
                </Text>
            </View>
            {/**Quote Card */}
            <View style={HomeCss.introCard} className='flex-row justify-between mt-1'>
                <Text className='font-[gothici-Regular]' style={{ fontSize: 18 }}>Quote details ({api})</Text>
                <View className='bg-red-500 rounded-md p-1'>
                    <Text className='text-white font-[gothici-Bold]'>{apiStatus}</Text>
                </View>
            </View>
            <CustomTabs
                selectionMode={1}
                option1="NCBA Account"
                option2="M-Pesa"
                option3="IPF"
                onSelectSwitch={onTabSelected}

            />
            {tabSelected === 1 ? <Ncba /> : tabSelected === 2 ? <Mpesa /> : <Ipf />}
        </View>
    )
}

export default PaymentScreen;