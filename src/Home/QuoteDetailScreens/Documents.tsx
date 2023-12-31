//This is one of the custom tabs
import { Text, TouchableOpacity, View, ScrollView, Platform, FlatList, Dimensions } from 'react-native';
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
import { cacheDirectory, copyAsync, getInfoAsync, makeDirectoryAsync, EncodingType, readAsStringAsync } from 'expo-file-system';
import Payments from '../Transaction/Payments';
import PaymentScreen from '../QuoteDetails/PaymentScreen';
import { useNavigation } from '@react-navigation/native';


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


const Documents = ({ item }: any) => {
    const data = item
    const documents = data?.documents
    const navigation: any = useNavigation()
    const activeUser = userData()
    const [modalVisible, setModalVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState(Object);
    const [selectedDoc, setSelectedDoc] = useState<any>(null);
    const [security, setSecurity] = useState<any>(null);
    const [userSession, setUserSession] = useState<any>(null);
    const [updatedData, setUpdatedData] = useState(documents);

    useEffect(() => {
        sendTest();
    }, [activeUser.userId])

    useEffect(() => {
        setUpdatedData(documents)
    }, [data])

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

    const document = updatedData

    const handleOptions = (i: any) => {
        setModalVisible(true)
        setSelectedFile(i)
        setSelectedDoc(null)
    }

    const handleSubmitQuote = () => {
        setVisible(true)
        apis.get(`Common/GetQuote?quoteId=${data?.id}`, {
            headers: {
                "SecurityToken": security,
                "UserSessionId": userSession,
            },
        })
            .then(response => {
                const data = response.data
                const docs = data.documents
                setUpdatedData(docs)
                const hasNullContent = docs.some((i: any) => i.fileName === null);
                if (hasNullContent === false) {
                    navigation.replace("QuoteDetails", { item: item })
                }
                console.log(hasNullContent)
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
    const handleDocUpload = async (items: any) => {
        setVisible(true)
        const payload = {
            "documentRefId": items.fileId,
            "documentName": items.fileName,
            "fileName": items.docId,
            "fileContent": items.docName
        }
        await apis.post("Common/UploadeQuoteDocument", payload, {
            headers: {
                "SecurityToken": security,
                "UserSessionId": userSession,
            },
        })
            .then(response => {
                const data = response.data
                // navigation.navigate("QuoteDetails", { item: data })
            }).catch(error => {
                console.log("", error.response)

            }).finally(() => {
                handleSubmitQuote();
                const hasNullContent = updatedData.some((doc: any) => doc.fileContent === null);
                console.log("2", hasNullContent)
                setVisible(false)
            })
    }

    const Item = ({ i }: any) => {
        return (
            <Box className='mt-1 ml-4 mr-4'>

                <View style={HomeCss.container1} className='mt-2 '>
                    {i.fileName !== null &&
                        <View>
                            <Text className='text-center'>{i.documentName}</Text>
                            <Text className='text-center'>Uploaded</Text>
                        </View>
                    }

                    {i.fileName === null &&

                        <View style={HomeCss.uploadBtnContainer1}>

                            {selectedFile.documentName === i.documentName && visible ?
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

            </Box>
        )
    }

    return (
        <Fragment>
            <View>
                <View className=' mt-2'>
                    <Text className='font-[gothici-Regular] mr-4 ml-4'>Upload all required documents first before you can proceed to next steps</Text>
                    <View className='flex-1 justify-center items-center mt-6'>
                        {/* {document.length < 1 &&
                            <ActivityIndicator size="large" color="#00BFFF" />
                        } */}
                    </View>

                    <FlatList
                        data={document}
                        renderItem={({ item }) => <Item i={item} />}
                        keyExtractor={(item: any) => item.documentRefId}
                        contentContainerStyle={{ paddingBottom: 50 }}
                        ListFooterComponent={<View style={{ height: Dimensions.get('window').height }}></View>}
                    />

                </View>
            </View>

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

export default Documents;