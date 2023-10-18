import { Text, TouchableOpacity, View, ScrollView, Platform, ActivityIndicator } from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import { AntDesign } from "@expo/vector-icons";
import { Box } from '../../Component/Theme';
import HomeCss from '../HomeCss';
import * as ImagePicker from 'expo-image-picker';
import { BottomModal, ModalContent } from 'react-native-modals';
import * as DocumentPicker from 'expo-document-picker';
import userData from '../../Component/UserData';
import uuid from 'react-native-uuid';
import { apis } from '../../Services';
import CryptoJS from 'crypto-js';
import { cacheDirectory, copyAsync, getInfoAsync, makeDirectoryAsync, EncodingType, readAsStringAsync } from 'expo-file-system'
import apiHeaders from '../../Component/apiHeaders';



const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const Base64 = {
    btoa: (input: string = '') => {
        let str = input;
        let output = '';

        for (let block = 0, charCode, i = 0, map = chars;
            str.charAt(i | 0) || (map = '=', i % 1);
            output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

            charCode = str.charCodeAt(i += 3 / 4);

            if (charCode > 0xFF) {
                throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
            }

            block = block << 8 | charCode;
        }

        return output;
    },
};


const DocScreen = ({ item }: any) => {
    console.log("docscreen", item.id)
    const document = item.documents
    const headers = apiHeaders()
    const activeUser = userData()
    const [modalVisible, setModalVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState(Object);
    const [selectedDoc, setSelectedDoc] = useState<any>(null);
    const [security, setSecurity] = useState<any>(null);
    const [userSession, setUserSession] = useState<any>(null);
    const [updatedData, setUpdatedData] = useState(document)

    useEffect(() => {
        sendTest()
    }, [activeUser.userId])

    useEffect(() => {
        setUpdatedData(document)
    }, [activeUser.userId])

    useEffect(() => {
        setTimeout(() => handleSubmitQuote(), 1000)
    }, [])

    const handleLoading = () => {
        return (
            <View className=''>
                <Text>Loading...</Text>
            </View>

        )
    }

    function sendTest() {
        let userId = activeUser.userId;
        let uid: any = uuid.v4();
        let base64 = Base64.btoa(uid);
        let userKey = base64 + 'Digitek22';

        let securityToken = encrypt(userId, userKey);
        setSecurity(securityToken)

        let UserSessionId = base64;
        setUserSession(UserSessionId)
        console.log(securityToken, UserSessionId)

    }


    function encrypt(plainText: any, key: any) {
        key = CryptoJS.enc.Utf8.parse(key);
        key = CryptoJS.MD5(key)
        key.words.push(key.words[0], key.words[1]);
        var options = {
            mode: CryptoJS.mode.ECB
        };

        let textWordArray = CryptoJS.enc.Utf8.parse(plainText);
        let encrypted = CryptoJS.TripleDES.encrypt(textWordArray, key, options);
        let base64String = encrypted.toString();
        return base64String;
    }

    const documents = updatedData

    const handleOptions = (i: any) => {
        setModalVisible(true)
        setSelectedDoc(null)
        setSelectedFile(i)
    }

    const handleSubmitQuote = () => {
        setVisible(true)
        apis.get(`Common/GetQuote?quoteId=${item.id}`, {
            headers: {
                "SecurityToken": security,
                "UserSessionId": userSession,
            },
        })
            .then(response => {
                const data = response.data
                setUpdatedData(data.documents)
            }).catch(error => {
                console.log(error.response)
            }).finally(() => {
                setVisible(false)
            })
    }

    //converting to base64
    async function convertUriToBase64(uri: any, result: any) {
        if (Platform.OS === 'ios') {
            const response = await fetch(uri);
            const blob = await response.blob();
            const base64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(blob);
            });
            return base64;
        } else if (Platform.OS === 'android') {
            const base64 = await readAsStringAsync(uri, { encoding: EncodingType.Base64 });

            const payload = {
                "docName": base64,
                "docId": result.name,
                "fileName": selectedFile.documentName,
                "fileId": selectedFile.documentRefId
            };
            handleDocUpload(payload)
            handleSubmitQuote()
            return base64;

        }
    }

    {/**With the uri provided by documentSelection.uri I am copying the file with the name (documentSelection.name) to a cache directory: */ }
    const createCacheFile = async (result: any) => {
        if (!(await getInfoAsync(cacheDirectory + "uploads/")).exists) {
            await makeDirectoryAsync(cacheDirectory + "uploads/");
        }
        const cacheFilePath = cacheDirectory + "uploads/" + result.name;
        await copyAsync({ from: result.uri, to: cacheFilePath });
        return cacheFilePath;
    }

    const pickImage = async () => {
        let result: any = await DocumentPicker.getDocumentAsync({
            copyToCacheDirectory: false,
        });
        const file = await createCacheFile(result);
        convertUriToBase64(file, result)
        setModalVisible(false)

    };


    const handleCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled) {
            let uri = result.assets[0].uri

            const lastItem = uri.substring(uri.lastIndexOf('/') + 1)

            const payload = {
                "docName": result.assets[0].base64,
                "docId": lastItem,
                "fileName": selectedFile.documentName,
                "fileId": selectedFile.documentRefId
            };
            handleDocUpload(payload)
            setModalVisible(false)
        }
    }


    const handleDocUpload = (items: any) => {
        const payload = {
            "documentRefId": items.fileId,
            "documentName": items.fileName,
            "fileName": items.docId,
            "fileContent": items.docName
        }
        apis.post("Common/UploadeQuoteDocument", payload, {
            headers: {
                "SecurityToken": security,
                "UserSessionId": userSession,
            },
        })
            .then(response => {
                const data = response.data
                console.log("Submiting....", data)

                // navigation.navigate("QuoteDetails", { item: data })
            }).catch(error => {
                console.log(error.response?.data?.message)
            }).finally(() => {
                handleSubmitQuote()
            })
    }

    return (
        <Fragment>
            <View className=' flex-1'>
                <ScrollView>
                    <View className='ml-4 mr-4 mt-2'>
                        <View>
                            <Text className='font-[gothici-Regular]'>Upload all required documents first before you can proceed to next steps</Text>

                        </View>
                        <View className='flex-1 justify-center items-center'>
                            {documents.length < 1 &&
                                <ActivityIndicator size="large" color="#00BFFF" />
                            }
                        </View>

                        <Box className='mt-4'>


                            {documents.map((i: any) => (
                                <View style={HomeCss.container1} className='mt-2'>
                                    {i.fileName !== null &&
                                        <View>
                                            <Text className='text-center'>{i.documentName}</Text>
                                            <Text className='text-center'>Uploaded</Text>
                                        </View>
                                    }

                                    {i.fileName === null &&

                                        <View style={HomeCss.uploadBtnContainer1}>

                                            {selectedFile.documentName === i.documentName || visible ?
                                                < Text className='text-center text-2xl'> Loading...</Text>
                                                :
                                                <TouchableOpacity onPress={() => handleOptions(i)} style={HomeCss.uploadBtn} >
                                                    <Text className='font-[gothici-Regular]'>{i.documentName}</Text>
                                                    <AntDesign name="plus" size={20} color="black" />
                                                </TouchableOpacity>
                                            }
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
        </Fragment >
    )
}

export default DocScreen;