import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Header } from '../../Component/Header';
import HomeCss from '../HomeCss';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons"
import { companiesDetails } from '../../Component/util';

const ClaimDocuments = ({ route }: any) => {
    const { item, id } = route.params
    const navigation: any = useNavigation();
    return (
        <View className='flex-1'>
            <Header
                label="Claims Documents"
                leftButton={{
                    child: <Ionicons name="arrow-back" size={24} color="black" />,
                    onPress: () => navigation.navigate("ClaimForm")
                }}
            />
            <View style={HomeCss.introCard}>

                {/**Intro statement */}
                <View className='ml-2 mr-2 pt-4 '>
                    <Text className='font-[gothici-Regular] pb-2'>-Thank you for visiting {companiesDetails.name} App.</Text>
                    <Text className='font-[gothici-Regular] pb-2'>-We have received your claim and one of our staff will reach out to you.</Text>
                    <Text className='font-[gothici-Regular] pb-2'>-Your Ticket number is <Text className='font-[gothici-Bold]'>{item?.claimNo}.</Text></Text>
                    <Text className='font-[gothici-Regular] pb-2'>-To complete claims application, download the claim form from the link below then upload the completed form alongside other documents requested below.</Text>
                </View>

                <View className='flex-row'>
                    <View className='item-center bg-primary p-2 mr-1 flex-1 mt-2 rounded-md '>
                        <TouchableOpacity onPress={() => { }}>
                            <Text className='text-center text-white font-["gothici-Bold"]'>DOWNLOAD FORM</Text>
                        </TouchableOpacity>
                    </View>

                    <View className='item-center bg-primary p-2 ml-1 flex-1 mt-2 rounded-md '>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ClaimsDocumentsScreen", { item: item, id: id })}
                        >
                            <Text className='text-center text-white font-["gothici-Bold"]'>SUBMIT DOCUMENTS</Text>
                        </TouchableOpacity>
                    </View>

                </View>


                <View className='item-center bg-primary p-3 mt-2 rounded-md '>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Transaction")}
                    >
                        <Text className='text-center text-white font-["gothici-Bold"]'>SUBMIT DOCUMENTS LATER</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    )
}

export default ClaimDocuments;