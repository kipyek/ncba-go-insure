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

    const api = "Q01721"
    const apiStatus = "NOT PAID"
    return (
        <View className=''>
            <View style={HomeCss.introCard} className='flex-row justify-between'>
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