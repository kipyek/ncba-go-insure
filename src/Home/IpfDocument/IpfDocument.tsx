import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import HomeCss from '../HomeCss'
import { Box } from '../../Component/Theme';
import { AntDesign } from "@expo/vector-icons"
import { apis } from '../../Services';
import CryptoJS from 'crypto-js';
import userData from '../../Component/UserData';
import * as ImagePicker from 'expo-image-picker';
import { BottomModal, ModalContent } from 'react-native-modals';
import * as DocumentPicker from 'expo-document-picker';
import * as IntentLauncher from 'expo-intent-launcher';
import { cacheDirectory, copyAsync, getInfoAsync, makeDirectoryAsync, EncodingType, readAsStringAsync } from 'expo-file-system'
import { Header } from '../../Component/Header';
import * as FileSystem from 'expo-file-system';

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

    atob: (input: string = '') => {
        let str = input.replace(/=+$/, '');
        let output = '';

        if (str.length % 4 == 1) {
            throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
        }
        for (let bc = 0, bs = 0, buffer, i = 0;
            buffer = str.charAt(i++);

            ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
                bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
        ) {
            buffer = chars.indexOf(buffer);
        }

        return output;
    }
};

const IpfDocument = ({ route }: any) => {
    const { item } = route.params
    const [show, setShow] = useState(false) //Add to the downloading function
    const activeUser = userData()
    const [modalVisible, setModalVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState(Object);
    const [selectedDoc, setSelectedDoc] = useState<any>(null);
    const [security, setSecurity] = useState<any>(null);
    const [userSession, setUserSession] = useState<any>(null);
    const [updatedData, setUpdatedData] = useState([]);

    // useEffect(() => {
    //     sendTest();
    // }, [activeUser.userId])

    // useEffect(() => {
    //     requestFileWritePermission()
    // }, [])


    // function sendTest() {
    //     let userId = activeUser.userId;
    //     let uid: any = uuid.v4();
    //     let base64 = Base64.btoa(uid);
    //     let userKey = base64 + 'Digitek22';

    //     let securityToken = encrypt(userId, userKey);
    //     setSecurity(securityToken)

    //     let UserSessionId = base64;
    //     setUserSession(UserSessionId)
    //     console.log(securityToken, UserSessionId)

    // }


    // function encrypt(plainText: any, key: any) {
    //     key = CryptoJS.enc.Utf8.parse(key);
    //     key = CryptoJS.MD5(key)
    //     key.words.push(key.words[0], key.words[1]);
    //     var options = {
    //         mode: CryptoJS.mode.ECB
    //     };

    //     let textWordArray = CryptoJS.enc.Utf8.parse(plainText);
    //     let encrypted = CryptoJS.TripleDES.encrypt(textWordArray, key, options);
    //     let base64String = encrypted.toString();
    //     return base64String;
    // }

    const handleOptions = (i: any) => {
        setModalVisible(true)
        setSelectedFile(i)
        setSelectedDoc(null)
    }

    // const handleSubmitQuote = () => {
    //     setVisible(true)
    //     apis.get(`Common/GetQuote?quoteId=${item.id}`, {
    //         headers: {
    //             "SecurityToken": security,
    //             "UserSessionId": userSession,
    //         },
    //     })
    //         .then(response => {
    //             const data = response.data
    //             setUpdatedData(data.documents)
    //         }).catch(error => {
    //             console.log(error.response)
    //         }).finally(() => {
    //             setVisible(false)
    //         })
    // }

    //converting to base64
    // async function convertUriToBase64(uri: any, result: any) {
    //     if (Platform.OS === 'ios') {
    //         const response = await fetch(uri);
    //         const blob = await response.blob();
    //         const base64 = await new Promise((resolve, reject) => {
    //             const reader = new FileReader();
    //             reader.onload = () => resolve(reader.result);
    //             reader.onerror = (error) => reject(error);
    //             reader.readAsDataURL(blob);
    //         });
    //         return base64;
    //     } else if (Platform.OS === 'android') {
    //         const base64 = await readAsStringAsync(uri, { encoding: EncodingType.Base64 });

    //         const payload = {
    //             "docName": base64,
    //             "docId": result.name,
    //             "fileName": selectedFile.documentName,
    //             "fileId": selectedFile.documentRefId
    //         };
    //         handleDocUpload(payload)
    //         handleSubmitQuote()
    //         return base64;

    //     }
    // }

    {/**With the uri provided by documentSelection.uri I am copying the file with the name (documentSelection.name) to a cache directory: */ }
    // const createCacheFile = async (result: any) => {
    //     if (!(await getInfoAsync(cacheDirectory + "uploads/")).exists) {
    //         await makeDirectoryAsync(cacheDirectory + "uploads/");
    //     }
    //     const cacheFilePath = cacheDirectory + "uploads/" + result.name;
    //     await copyAsync({ from: result.uri, to: cacheFilePath });
    //     return cacheFilePath;
    // }

    // const pickImage = async () => {
    //     let result: any = await DocumentPicker.getDocumentAsync({
    //         copyToCacheDirectory: false,
    //     });
    //     const file = await createCacheFile(result);
    //     convertUriToBase64(file, result)
    //     setModalVisible(false)

    // };


    // const handleCamera = async () => {
    //     let result = await ImagePicker.launchCameraAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         base64: true,
    //         allowsEditing: false,
    //         quality: 1,
    //     });

    //     if (!result.canceled) {
    //         let uri = result.assets[0].uri

    //         const lastItem = uri.substring(uri.lastIndexOf('/') + 1)

    //         const payload = {
    //             "docName": result.assets[0].base64,
    //             "docId": lastItem,
    //             "fileName": selectedFile.documentName,
    //             "fileId": selectedFile.documentRefId
    //         };
    //         handleDocUpload(payload)
    //         setModalVisible(false)
    //     }
    // }

    // const handleDocUpload = (items: any) => {
    //     const payload = {
    //         "documentRefId": items.fileId,
    //         "documentName": items.fileName,
    //         "fileName": items.docId,
    //         "fileContent": items.docName
    //     }
    //     apis.post("Common/UploadeQuoteDocument", payload, {
    //         headers: {
    //             "SecurityToken": security,
    //             "UserSessionId": userSession,
    //         },
    //     })
    //         .then(response => {
    //             const data = response.data
    //             console.log("Submiting....", data)
    //             handleSubmitQuote()
    //             // navigation.navigate("QuoteDetails", { item: data })
    //         }).catch(error => {
    //             console.log(error.response?.data?.message)
    //         })
    // }
    const requestFileWritePermission = async () => {
        const albumUri = FileSystem.StorageAccessFramework.getUriForDirectoryInRoot("Download");
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync(albumUri);
        if (!permissions.granted) {
            console.log('File write Permissions Denied!!')
            return {
                access: false,
                directoryUri: null
            };
        }
        const uri = permissions.directoryUri

        saveReportFile(uri)
        return {
            access: true,
            directoryUri: permissions.directoryUri,

        };
    }


    const saveReportFile = async (i: string) => {
        const regex = /data:.*base64,/
        const baseData = item.replace(regex, "")
        try {
            await FileSystem.StorageAccessFramework.createFileAsync(i, 'ipfs', 'application/pdf')
                .then(async (uri) => {
                    const data = await FileSystem.writeAsStringAsync(uri, baseData, { encoding: FileSystem.EncodingType.Base64 });
                }).then(res => {
                    console.log("why")
                    Alert.alert('Success', `File Saved`)
                    // IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                    //     data: res,
                    //     flags: 1,
                    // });
                })
                .catch((e) => {
                    console.log(e);
                    alert("Download to download folder or root folder")
                });
        } catch (error: any) {
            Alert.alert('Error', `Could not Download file ${error.message}`);
        }
    }


    //const base64Uri = 'data:image/jpeg;base64,YourBase64DataHere';
    // const localUri = FileSystem.documentDirectory + 'sample.pdf';


    // async function downloadFile() {
    //     console.log("Here in filesystem", localUri)
    //     const binaryData = Base64.atob(base64Uri);
    //     try {
    //         const { uri } = await FileSystem.downloadAsync(binaryData, localUri);
    //         console.log('Downloaded file to:', uri);
    //     } catch (error: any) {
    //         console.error('Error downloading file:', error.message);
    //     }
    // }

    return (
        <Fragment>
            <View className='flex-1 bg-white'>
                <Header
                    label="IPF Documents"
                />
                <View style={HomeCss.introCard}>
                    <Text className='font-[gothici-Regular]'>We acknowledge receipt of your Insurance Premium Financing (IPF) application and we will notify you of the approval status via email.</Text>
                    <Text className='font-[gothici-Regular]'>As part of the IPF application process we request you to deposit the first installment of a minimum of Kes. 23,718.80 to your NCBA account. In case you do not have an account with us, we shall contact you and advise on how to make this first payment. Upon payment, we shall generate a one month certificate within 2 business hours as interim cover while the IPF loan is processed. Once the loan is approved, we shall send you an annual certificate.</Text>
                    <Text className='font-[gothici-Regular]'>To complete your application, kindly upload a duly filled IPF application form. Click on the link below to download the IPF application form.</Text>
                    <Text className='font-[gothici-Regular]'>Kindly note that you can only upload PDF or images.</Text>

                    {/**Button */}
                    <View className='item-center bg-[#EEE017] p-3 mt-4 rounded-md '>
                        {!show ?
                            <TouchableOpacity onPress={() => requestFileWritePermission()}>
                                <Text className='text-center font-["gothici-Bold"]'>DOWNLOAD IPF FORM</Text>
                            </TouchableOpacity>
                            :
                            <Text className='text-center text-white font-["gothici-Bold"]'>Downloading...</Text>
                        }

                    </View>
                </View>


                {/**Uploading Document */}

                <Box className='mt-4'>

                    {updatedData.map((i: any) => (
                        <View style={HomeCss.container1} className='mt-2'>
                            {i.fileContent !== null &&
                                <View>
                                    <Text className='text-center'>{i.documentName}</Text>
                                    <Text className='text-center'>Uploaded</Text>
                                </View>
                            }

                            {i.fileContent === null &&

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
                    ))}

                </Box>

            </View>


        </Fragment>

    )
}

export default IpfDocument

const styles = StyleSheet.create({})