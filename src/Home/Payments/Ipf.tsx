import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropDown from '../../Component/DropDown';
import { apis } from '../../Services';
import IpfTerms from './IpfTerms';
import Humanize from 'humanize-plus';
import { companiesDetails } from '../../Component/util';

const data = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
];

const Ipf = (item: any) => {
    const incoming = item?.item?.item


    const [amount, setAmount] = useState<any>(null);
    const [value, setValue] = useState<any>(null);
    const [updatedAmount, setUpdatedAmount] = useState<any>(null);
    const [showing, setShowing] = useState(false);
    const [repayment, setRepayment] = useState([]);

    useEffect(() => {
        handleRepaymentMonths()
    }, [])

    useEffect(() => {
        handleComputation()
    }, [value])



    const handleSwitchingScreens = () => {
        if (value !== null) {
            setShowing(true)
        } else {
            alert("Select number of installments to proceed")
        }

    }

    console.log(value)

    const handleRepaymentMonths = async () => {
        await apis.get("IPF/RepaymentMonths")
            .then(response => {
                const data = response.data
                const convertedArray = data.map((value: any) => ({
                    label: value.toString(),
                    value: value.toString(),
                }));

                setRepayment(convertedArray)
                console.log("IPF months", convertedArray)
            })
            .catch(error => {
                console.log(error.response?.data?.message)
            })
    }

    const handleComputation = () => {
        apis.get(`IPF/Compute?months=${value}&amount=${incoming.totalPremium}`)
            .then(response => {
                const data = response.data
                const installment = data.result.installment
                setUpdatedAmount(installment)
            })
    }

    let payload = {
        "item": incoming,
        "value": value,
        "amount": updatedAmount
    }

    console.log("payloadss", payload)

    return (
        <View className='ml-4 mr-4'>
            {!showing ?
                <View>
                    <Text className='mb-1 mt-3 font-[gothici-Regular]'>Please select number of installments</Text>
                    <DropDown
                        label={"label"}
                        value={"value"}
                        onchange={(item: any) => setValue(item?.value)}
                        datas={repayment}
                        placeholder='---select installment---'
                    />

                    <View>
                        <Text className='mb-1 mt-3 font-[gothici-Regular]'>IPF Amount</Text>
                        <TextInput
                            className='p-1 rounded-md '
                            style={{ borderWidth: 1 }}
                            editable={false}
                            placeholder={`Kes ${Humanize.formatNumber(updatedAmount, 2)}`}
                            keyboardType="default"
                        />
                    </View>

                    <View className='item-center bg-[#EEE017] p-3 mt-2 rounded-md w-32'>
                        <TouchableOpacity onPress={() => handleSwitchingScreens()}>
                            <Text className='text-center font-["gothici-Bold"]'>{companiesDetails.submission}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                :
                <IpfTerms item={payload} />
            }
        </View>
    )
}

export default Ipf;