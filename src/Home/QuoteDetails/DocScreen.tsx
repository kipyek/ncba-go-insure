import { Image, Text, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Box } from '../../Component/Theme';
import HomeCss from '../HomeCss';
import * as ImagePicker from 'expo-image-picker';
import { BottomModal, ModalContent } from 'react-native-modals';
import { Camera, requestCameraPermissionsAsync, getCameraPermissionsAsync } from "expo-camera";
import * as DocumentPicker from 'expo-document-picker';



const DocScreen = ({ item }: any) => {
    console.log("Datasdats", item)
    const [national, setNational] = useState('');
    const [importDoc, setImportDoc] = useState('');
    const [kra, setKra] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const [imageUri, setImageUri] = useState("")


    const cameraRef = useRef();

    useEffect(() => {
        requestPermissions();
    }, []);

    const requestPermissions = async () => {
        await requestCameraPermissionsAsync();
    };

    const getPermissions = async () => {
        const cameraPermission = await getCameraPermissionsAsync();

        return cameraPermission.granted;
    };

    const takePicture = async () => {
        setVisible(true)
        const { uri } = await cameraRef?.current?.takePictureAsync();
        setImageUri(uri)
        // navigation.navigate("Camera", { item: uri })
    };

    if (!getPermissions()) {
        return Alert.alert(
            "Permissions Required!",
            "You need to provide the permissions to access the camera",
            [{ text: "Got it" }]
        );
    }



    const pickImage = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        alert(result);
        console.log(result);

        // console.log("Message", result);

        // if (!result.canceled) {
        //     setNational(result.assets[0].uri);
        //     setModalVisible(false)
        // }
    };


    const handleCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.image,
            base64: true,
            allowsEditing: false,
            quality: 1,
        });
        setNational(uri);
        console.log("last", result);

        if (!result.canceled) {
            setNational(result.assets[0].uri);
            setModalVisible(false)
        }
    }

    return (
        <Fragment>
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
                                        <TouchableOpacity onPress={() => setModalVisible(true)} style={HomeCss.uploadBtn} >
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
                                    <TouchableOpacity onPress={() => { }} style={HomeCss.uploadBtn} >
                                        <Text className='font-[gothici-Regular]'>Copy of KRA PIN</Text>
                                        <AntDesign name="plus" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </Box>
                    </View>
                </ScrollView>

            </View >
            <BottomModal
                visible={modalVisible}
                onTouchOutside={() => setModalVisible(false)}
                onHardwareBackPress={() => true}
                onSwipeOut={() => setModalVisible(false)}
            >
                <ModalContent>
                    <View style={{ borderWidth: 1, width: 50, alignSelf: 'center', marginBottom: 12, borderColor: 'gray' }} />

                    <View>
                        {/**All data here */}
                        <View className='item-center bg-primary p-4 mt-4 rounded-md '>
                            <TouchableOpacity onPress={() => pickImage()}>
                                <Text className='text-center text-white font-["gothici-Bold"]'>Upload Document</Text>
                            </TouchableOpacity>
                        </View>
                        {/**All data here */}
                        <View className='item-center bg-primary p-4 mt-4 rounded-md '>
                            <TouchableOpacity onPress={() => handleCamera()}>
                                <Text className='text-center text-white font-["gothici-Bold"]'>Open Camera</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ModalContent>
            </BottomModal>
        </Fragment>
    )
}

export default DocScreen;