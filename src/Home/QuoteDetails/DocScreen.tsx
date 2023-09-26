import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from "@expo/vector-icons";
import { Box } from '../../Component/Theme';
import HomeCss from '../HomeCss';
import * as ImagePicker from 'expo-image-picker';


const DocScreen = () => {
    const [national, setNational] = useState('');
    const [importDoc, setImportDoc] = useState('');
    const [kra, setKra] = useState('');



    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setNational(result.assets[0].uri);
        }
    };
    const pickImage1 = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImportDoc(result.assets[0].uri);
        }
    };

    const pickImage2 = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setKra(result.assets[0].uri);
        }
    };

    return (
        <View className=' flex-1'>
            <ScrollView>
                <View className='ml-4 mr-4 mt-2'>
                    <Text className='font-[gothici-Regular]'>Upload all required documents first before you can proceed to next steps</Text>
                    <Box className='mt-4'>
                        <View className='mb-4'>
                            <View style={HomeCss.container1}>
                                {national && <Image source={{ uri: national }} style={{ width: 400, height: 100 }} />}
                                <View style={HomeCss.uploadBtnContainer1}>

                                    <TouchableOpacity onPress={pickImage} style={HomeCss.uploadBtn} >
                                        <Text className='font-[gothici-Regular]'>Upload National ID /Passport</Text>
                                        <AntDesign name="plus" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View className='mb-4'>
                            <View style={HomeCss.container1}>
                                {importDoc && <Image source={{ uri: importDoc }} style={{ width: 400, height: 100 }} />}
                                <View style={HomeCss.uploadBtnContainer1}>
                                    <TouchableOpacity onPress={pickImage1} style={HomeCss.uploadBtn} >
                                        <Text className='font-[gothici-Regular]'>Upload Logbook or Import Documents</Text>
                                        <AntDesign name="plus" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View className='mb-4'>
                            <View style={HomeCss.container1}>
                                <View style={HomeCss.uploadBtnContainer1}>
                                    {/* <TouchableOpacity onPress={() => { }} style={HomeCss.uploadBtn} >
                                        <Text className='font-[gothici-Regular]'>Fully Filled Proposal Forms</Text>
                                        <AntDesign name="plus" size={20} color="black" />
                                    </TouchableOpacity> */}
                                </View>
                            </View>
                        </View>




                        <View style={HomeCss.container1}>
                            <View style={HomeCss.uploadBtnContainer1}>
                                {kra && <Image source={{ uri: kra }} style={{ width: 400, height: 100 }} />}
                                <TouchableOpacity onPress={pickImage2} style={HomeCss.uploadBtn} >
                                    <Text className='font-[gothici-Regular]'>Copy of KRA PIN</Text>
                                    <AntDesign name="plus" size={20} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </Box>
                </View>
            </ScrollView>

        </View >
    )
}

export default DocScreen;