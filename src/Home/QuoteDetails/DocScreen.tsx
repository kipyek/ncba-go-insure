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
    const [national, setNational] = useState('');
    const [importDoc, setImportDoc] = useState('');
    const [kra, setKra] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const [imageUri, setImageUri] = useState("");
    const [selectedFile, setSelectedFile] = useState(Object);
    const [selectedDoc, setSelectedDoc] = useState<any>(null)

    const documents = item?.documents


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


    const handleOptions = (i: any) => {
        setModalVisible(true)
        setSelectedFile(i)
        setSelectedDoc(null)
    }





    const pickImage = async () => {
        let result = await DocumentPicker.getDocumentAsync({});

        setSelectedDoc({
            "name": result.name,
            "fileName": selectedFile.documentName,
            "fileId": selectedFile.documentRefId
        });
        console.warn("this is it", selectedDoc.name)
    };


    const handleCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.image,
            base64: true,
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled) {
            setNational(result.assets[0].uri);
            setSelectedDoc({
                "fileName": selectedFile.documentName,
                "fileId": selectedFile.documentRefId
            });
            console.warn("this is itdfg", selectedDoc)
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


                            {documents.map((i: any) => (
                                <View style={HomeCss.container1} className='mt-2'>
                                    {i.fileContent !== null &&
                                        <Text className='text-center'>{i.fileName}</Text>
                                    }
                                    {i.documentName !== "Fully Filled Proposal Forms" &&

                                        <View style={HomeCss.uploadBtnContainer1}>


                                            <TouchableOpacity onPress={() => handleOptions(i)} style={HomeCss.uploadBtn} >
                                                <Text className='font-[gothici-Regular]'>{i.documentName}</Text>
                                                <AntDesign name="plus" size={20} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                    }
                                </View>
                            ))}

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