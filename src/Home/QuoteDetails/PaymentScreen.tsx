import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomTabs from '../../Component/CustomTabs'
import { Ipf, Mpesa, Ncba } from '../Payments';
import HomeCss from '../HomeCss';
import Humanize from 'humanize-plus';

const PaymentScreen = (item: any) => {
    const data = item?.item
    const [tabSelected, setTabSelected] = useState(1);
    const onTabSelected = (value: React.SetStateAction<number>) => {
        setTabSelected(value)
    }

    return (
        <View>
            {/**Amount */}
            <View style={HomeCss.introCard} className='mt-1 mb-0'>
                <Text className='font-[gothici-Regular]' style={{ fontSize: 18 }}>Total premium: Kes {Humanize.formatNumber(data.totalPremium, 2)}
                </Text>
            </View>
            {/**Quote Card */}
            <View style={HomeCss.introCard} className='flex-row justify-between mt-1'>
                <Text className='font-[gothici-Regular]' style={{ fontSize: 18 }}>Quote details ({data.quotationNo})</Text>
                <View className='bg-red-500 rounded-md p-1'>
                    <Text className='text-white font-[gothici-Bold]'>{data.status}</Text>
                </View>
            </View>
            <CustomTabs
                selectionMode={1}
                option1="NCBA Account"
                option2="M-Pesa"
                option3="IPF"
                onSelectSwitch={onTabSelected}

            />
            {tabSelected === 1 ? <Ncba item={item} /> : tabSelected === 2 ? <Mpesa item={item} /> : <Ipf item={item} />}
        </View>
    )
}

export default PaymentScreen;