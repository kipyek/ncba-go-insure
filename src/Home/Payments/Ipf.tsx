import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import DropDown from '../../Component/DropDown';

const data = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
];

const Ipf = () => {

    const [amount, setAmount] = useState('')
    const [value, setValue] = useState('')
    return (
        <View className='ml-4 mr-4'>
            <Text className='mb-1 mt-3 font-[gothici-Regular]'>Please select number of installments</Text>
            <DropDown
                label={"label"}
                value={"value"}
                onchange={(item: any) => setValue(item?.value)}
                datas={data}
                placeholder='---select installment---'
            />

            <View>
                <Text className='mb-1 mt-3 font-[gothici-Regular]'>IPF Amount</Text>
                <TextInput
                    className='p-1 rounded-md '
                    style={{ borderWidth: 1 }}
                    onChangeText={text => setAmount(text)}
                    value={amount}
                    editable={false}
                    placeholder="Kes 0.00"
                    keyboardType="default"
                />
            </View>
        </View>
    )
}

export default Ipf;