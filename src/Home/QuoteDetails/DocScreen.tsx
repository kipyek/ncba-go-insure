import { Text, TouchableOpacity, View, ScrollView, Platform } from 'react-native';
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
import * as FileSystem from 'expo-file-system';
import { concat } from 'react-native-reanimated';


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
    const activeUser = userData()
    const [national, setNational] = useState('');
    const [importDoc, setImportDoc] = useState('');
    const [kra, setKra] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const [imageUri, setImageUri] = useState("");
    const [selectedFile, setSelectedFile] = useState(Object);
    const [selectedDoc, setSelectedDoc] = useState<any>(null)
    const [security, setSecurity] = useState<any>(null)
    const [userSession, setUserSession] = useState<any>(null)
    const [updatedData, setUpdatedData] = useState(item)

    useEffect(() => {
        sendTest()
    }, [activeUser.userId])


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

    const documents = updatedData?.documents




    const handleOptions = (i: any) => {
        setModalVisible(true)
        setSelectedFile(i)
        setSelectedDoc(null)
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
                setUpdatedData(data)
            }).catch(error => {
                console.log(error.response)
            }).finally(() => {
                setVisible(false)
            })
    }






    const pickImage = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            copyToCacheDirectory: true
        });
        // let file = await toBase64(result);
        console.log("file", result)
        let uri = result.uri

        if (Platform.OS === "android") {
            console.log("ANdroid")
            // change the file:// to content:// uri
            // FileSystem.getContentUriAsync(file_path).then((uri) => {file_path = uri});
            await FileSystem.getContentUriAsync(uri).then(cUri => {
                console.log("jjjkbkbnm,", cUri);
                uri = cUri

            });
        }

        console.log("uri2", uri)
        const file: any = await FileSystem.readAsStringAsync(
            uri,
            {
                encoding: FileSystem?.EncodingType?.UTF8,
            });

        let base64File = concat(result?.mimeType, ";base64", file)

        setSelectedDoc({
            "fileName": selectedFile.documentName,
            "fileId": selectedFile.documentRefId
        });
        console.warn("this is it", selectedDoc)
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
            handleSubmitQuote()
            console.log("this is itdfg", selectedFile)
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
            })
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
                                        <View>
                                            <Text className='text-center'>{i.documentName}</Text>
                                            <Text className='text-center'>Uploaded</Text>
                                        </View>
                                    }
                                    {i.fileContent === null &&

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